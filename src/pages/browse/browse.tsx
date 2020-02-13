/**
 * 漫画预览页面
 */
import Taro, {
  useCallback,
  useDidHide,
  useEffect,
  useLayoutEffect,
  usePageScroll,
  usePullDownRefresh,
  useReachBottom,
  useRef,
  useRouter,
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
import {ORIGINAL_IMAGE_SERVER, PROXY_IMAGE_SERVER} from "@/utils/app-constant";

import './browse.scss'

import ObserveCallbackResult = Taro.IntersectionObserver.ObserveCallbackResult;

type PItem = { comic_id: number, chapter_id: number, title: string,proxy_url: string, count: number,page: number }

type BrowseStore = {
  primary: number,
  cursor: number,
  chapters: ComicChapter[],
  list: PItem[],
  lastView: PItem,
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
    lastView: {} as PItem,
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
    async fetch(cid) {
      const {data} = await refetch({url: parsePath(CHAPTER, {oid: this.primary, cid})})
      this.chapters = [...this.chapters, data].sort((a, b) => a.chapter_order - b.chapter_order)
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
    if(!prev) return Taro.stopPullDownRefresh();
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
  // 方向标识 0:上 1:下
  const decoration = useRef<0|1>(0)
  const handleScroll = useCallback((()=>{
    let initialHeight = 0;
    return ({scrollTop})=>{
      decoration.current = scrollTop > initialHeight ? 1 : 0
      initialHeight = scrollTop
    }
  })(),[])
  usePageScroll(handleScroll)

  const {list, lastView} = store

  const title = useRef<string>().current

  const updateVisitorLogs = useCallback(()=>{
    if(!Object.keys(store.lastView).length) return;
    const {comic_id,chapter_id,page} = store.lastView
    axios.get(parsePath(UPCOMICREINFO,{oid: comic_id,cid: chapter_id,page}))
    // eslint-disable-next-line
  },[])

  useDidHide(updateVisitorLogs)

  useEffect(()=>updateVisitorLogs,[])
  const $scope = useScope()
  useLayoutEffect(()=>{
    if(!list.length) return ;
    const intersectionObserver = Taro.createIntersectionObserver($scope,{observeAll: true, thresholds:[0, 0.5, 0.8]})
    intersectionObserver.relativeToViewport({top: -5});
    intersectionObserver.observe('.mg-proxy-image',((()=>{
      let prevIndex = 0.1;
      return ((result: ObserveCallbackResult & {dataset: PItem & {index: number}})=>{
        const {dataset} = result
        const selector = (!decoration.current ? Math.min(prevIndex,dataset.index): Math.max(prevIndex,dataset.index));
        const localIndex = prevIndex;
        prevIndex = selector;

        if( localIndex === selector) return;
        // 设置标题
        if(dataset.title !== title) Taro.setNavigationBarTitle({title: dataset.title})
        // 最后阅读到的地方
        if(Object.keys(dataset).length) store.lastView = dataset
      })
    })()))
    return () => intersectionObserver.disconnect()
  },[$scope, list.length])
  // 高度问题怎么搞
  return (
    <Block>
      <View id='mg-container'>
        {list.map((e,i) => <Image
          data-comic_id={e.comic_id} data-chapter_id={e.chapter_id} data-proxy_url={e.proxy_url}
          data-title={e.title} data-page={e.page} data-count={e.count} data-index={i}
          className='mg-proxy-image' mode='widthFix' lazyLoad key={e.proxy_url} src={e.proxy_url}
        />)}
      </View>
      <View className='mg-primary-view'>{lastView!.page} / {lastView!.count}</View>
    </Block>)
}
Browse.config = {
  enablePullDownRefresh: true,
  onReachBottomDistance: 120
}

export default observer(Browse)
