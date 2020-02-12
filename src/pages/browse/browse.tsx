import Taro, {
  useCallback,
  useEffect,
  useLayoutEffect,
  usePageScroll,
  usePullDownRefresh,
  useReachBottom,
  useRef,
  useRouter,
  useDidHide,
  useScope
} from '@tarojs/taro'
import {Block, Image, View} from '@tarojs/components'
import {observer, useAsObservableSource, useLocalStore} from '@tarojs/mobx';
import {parsePath} from '@/utils';
import {CHAPTER, UPCOMICREINFO} from "@/contexts/manga-api";
import axios from 'taro-axios'
import useAxios from 'axios-hooks'
import useComic from "@/hooks/use-comic";
import {autorun, when} from "mobx";
import flatten from 'lodash-es/flatten'
import debounce from 'lodash-es/debounce'
import throttle from 'lodash-es/throttle'
import {ORIGINAL_IMAGE_SERVER, PROXY_IMAGE_SERVER} from "@/utils/app-constant";

import './browse.scss'

import ObserveCallbackResult = Taro.IntersectionObserver.ObserveCallbackResult;

type PItem = { comic_id: number, chapter_id: number, title: string,proxy_url: string, count: number,page: number }

type OffsetRecord = PItem & {offsetTop: number}
type BrowseStore = {
  primary: number,
  cursor: number,
  chapters: ComicChapter[],
  list: PItem[],
  offsetSource: OffsetRecord[],
  loaded: (url: string) => boolean,
  fetch: (this: BrowseStore, cid: string | number) => void,
}

const Browse: Taro.FC = () => {
  const {params} = useRouter()

  const {data: repository} = useComic(() => params.oid, [params.oid])

  const [{loading}, refetch] = useAxios<ComicChapter>(parsePath(CHAPTER, params), {manual: true})

  const source = useAsObservableSource({loading})
  const store = useLocalStore<BrowseStore>(() => ({
    primary: parseInt(params.oid),
    cursor: parseInt(params.cid),
    chapters: [],
    get list(this: BrowseStore) {
      return flatten(this.chapters.map(({comic_id, chapter_id, page_url,title}) => page_url.map((e,i, _this) => ({
        comic_id,
        chapter_id,
        title,
        page: i + 1,
        count: _this.length,
        proxy_url: e.replace(ORIGINAL_IMAGE_SERVER, PROXY_IMAGE_SERVER)
      }))))
    },
    offsetSource: [] as OffsetRecord[],
    loaded(url){
      return this.offsetSource.findIndex(({proxy_url})=>url === proxy_url) !== -1
    },
    async fetch(cid) {
      const {data} = await refetch({url: parsePath(CHAPTER, {oid: this.primary, cid})})
      this.chapters = [...this.chapters, data].sort((a, b) => a.chapter_order - b.chapter_order)
      await Taro.setNavigationBarTitle({title: data.title})
    },
  }))

  useEffect(() =>
      autorun(() => store.fetch(store.cursor))
    // eslint-disable-next-line
    , [])

  const findInRepository = useCallback((chapterId: number | string, comic: Comic) => {
      const chapterItem = comic.chapters.filter(chapter => chapter.data.findIndex((e) => e.chapter_id == chapterId) !== -1)[0] as Chapter
      const {data} = chapterItem
      const index = data.findIndex(({chapter_id: cid}) => cid == chapterId)
      const prev = (data[index + 1] || {}).chapter_id
      const next = (data[index - 1] || {}).chapter_id
      return {prev, next, chapter: chapterItem}
    }
    , [])

  usePullDownRefresh(() => {
    const {prev} = findInRepository(store.chapters[0]!.chapter_id, repository)
    if(!prev) return;
    store.cursor = prev
    when(() => source.loading, () => {
      Taro.stopPullDownRefresh()
    })
  })

  useReachBottom(debounce(() => {
    const {next} = findInRepository(store.chapters[store.chapters.length-1]!.chapter_id, repository)
    if(!next) return;
    store.cursor = next
  }))
  const {list, offsetSource,loaded} = store

  const lastView = useRef<OffsetRecord>()
  const title = useRef<string>().current
  // const offsetSource = useRef<OffsetRecord[]>([]).current
  usePageScroll(throttle((args)=>{
    const _index = offsetSource.findIndex(({offsetTop}) => offsetTop >= args.scrollTop)
    const offsetRecord = offsetSource[_index] || {}
    // 设置标题
    if(offsetRecord.title !== title) Taro.setNavigationBarTitle({title: offsetRecord.title})
    // 最后阅读到的地方
    if(Object.keys(offsetRecord).length) lastView.current = offsetRecord
  }))

  const updateVisitorLogs = useCallback(()=>{
    const {proxy_url,comic_id,chapter_id} = lastView.current as OffsetRecord
    const page = proxy_url.replace(/.+\/(\d+).+/g,'$1')
    axios.get(parsePath(UPCOMICREINFO,{oid: comic_id,cid: chapter_id,page}))
  },[])

  useDidHide(updateVisitorLogs)

  useEffect(()=>updateVisitorLogs,[])
  const $scope = useScope()
  useLayoutEffect(()=>{

    const intersectionObserver = Taro.createIntersectionObserver($scope,{observeAll: true,thresholds: [0, 0.8]})
    intersectionObserver.relativeToViewport();
    intersectionObserver.observe('.mg-proxy-image',(result: ObserveCallbackResult)=>{
      console.log(result, 'ObserveCallbackResult')
    })
    return () => intersectionObserver.disconnect()
  },[$scope, list.length])
  // 高度问题怎么搞
  return (
    <Block>
      <View id='mg-container'>
        {list.map((e) => <Image
          onLoad={(_e: any)=>{offsetSource.push({...e,offsetTop: _e.target.offsetTop});}}
          data-comic-id={e.comic_id} data-chapter-id={e.chapter_id} data-proxy-url={e.proxy_url} className={`mg-proxy-image ${loaded(e.proxy_url) ? '':'mg-proxy-image__placeholder'}`}
          mode='widthFix' lazyLoad key={e.proxy_url} src={e.proxy_url}
        />)}
      </View>
    </Block>)
}
Browse.config = {
  enablePullDownRefresh: true,
  onReachBottomDistance: 120
}

export default observer(Browse)
