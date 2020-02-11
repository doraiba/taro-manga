import Taro, {useEffect, useRouter, useCallback, useReachBottom, usePullDownRefresh} from '@tarojs/taro'
import {Block, Image, View} from '@tarojs/components'
import {observer, useAsObservableSource, useLocalStore} from '@tarojs/mobx';
import {parsePath} from '@/utils';
import {CHAPTER} from "@/contexts/manga-api";
import useAxios from 'axios-hooks'
import useComic from "@/hooks/use-comic";
import {autorun, when} from "mobx";
import flatten from 'lodash-es/flatten'
import debounce from 'lodash-es/debounce'
import {ORIGINAL_IMAGE_SERVER, PROXY_IMAGE_SERVER} from "@/utils/app-constant";

import './browse.scss'

type BrowseStore = {
  primary: number,
  cursor: number,
  chapters: ComicChapter[],
  list: { comic_id: number, chapter_id: number, proxy_url: string }[],
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
      return flatten(this.chapters.map(({comic_id, chapter_id, page_url}) => page_url.map(e => ({
        comic_id,
        chapter_id,
        proxy_url: e.replace(ORIGINAL_IMAGE_SERVER, PROXY_IMAGE_SERVER)
      }))))
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
  const {list} = store
  // const proxyURL = page_url.map((e) => e.replace(ORIGINAL_IMAGE_SERVER, PROXY_IMAGE_SERVER))
  return (
    <Block>
      <View>
        {list.map((e) => <Image
          data-comic-id={e.comic_id} data-chapter-id={e.chapter_id} className='mg-proxy-image'
          mode='widthFix' key={e.proxy_url} src={e.proxy_url}
        />)}
      </View>
    </Block>)
}
Browse.config = {
  enablePullDownRefresh: true,
  onReachBottomDistance: 120
}

export default observer(Browse)
