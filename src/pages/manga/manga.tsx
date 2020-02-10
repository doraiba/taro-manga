import Taro, {useCallback, usePullDownRefresh, useRouter, useState} from '@tarojs/taro'
import {Block, View} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import dayjs from "dayjs";
import useComic from "@/hooks/use-comic";
import MangaHeader from "@/components/manga-header";

import './manga.scss'

const Manga: Taro.FC = () => {
  const [timestamp, setTimeStamp] = useState(() => dayjs().unix())
  const {params: {oid}} = useRouter()

  const {data, refetch} = useComic(() => oid, [oid])
  const handleRefresh = useCallback(async () => {
    setTimeStamp(() => dayjs().unix())
    await refetch()
    Taro.stopPullDownRefresh()
  }, [refetch])

  usePullDownRefresh(handleRefresh)
  const filter = data || {
    id: parseInt(oid),
    authors: [],
    types: [],
    status: [],
    chapters: [{data: [{chapter_id: -1}]}]
  }
  const firstChapter = (filter.chapters[0].data.pop() as any).chapter_id
  return (
    <Block>
      <View className='mg-primary'>
        <MangaHeader {...filter} firstChapter={firstChapter} timestamp={timestamp} />
        <View className='mg-primary-container'>
          <View className='mg-primary-toolbar'>

          </View>
        </View>
      </View>
    </Block>
  )
}
Manga.config = {
  enablePullDownRefresh: true
}

export default observer(Manga)
