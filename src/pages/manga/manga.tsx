import Taro, {useCallback, usePullDownRefresh, useRouter, useState} from '@tarojs/taro'
import {Block, View, Image} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import dayjs from "dayjs";
import StartReading from "@/components/start-reading/start-reading";
import useComic from "@/hooks/use-comic";

import './manga.scss'

const Manga: Taro.FC = () => {
  const [timestamp, setTimeStamp] = useState(() => dayjs().unix())
  const {params: {oid}} = useRouter()

  const {data, refetch} = useComic(() => oid,[oid])
  const handleRefresh = useCallback(async () => {
    setTimeStamp(() => dayjs().unix())
    await refetch()
    Taro.stopPullDownRefresh()
  }, [refetch])

  usePullDownRefresh(handleRefresh)
  const {cover,authors,types,hot_num,subscribe_num,status,last_updatetime,chapters} = data || {authors:[],types:[],chapters: []}
  const firstChapter = (chapters[0].data.pop() as any).chapter_id
  return (
    <Block>
      <View className='mg-primary'>
        <View className='mg-primary-card'>
          <View className='mg-primary-image-wrapper'>
            <Image src={cover} className='mg-primary-image' />
          </View>
          <View className='mg-primary-header'>
            <View className='mg-primary-desc'>
              <View className='mg-primary-authors'>{authors.map(e=>e.tag_name)}</View>
              <View className='mg-primary-types'>{types.map(e=>e.tag_name)}</View>
              <View className='mg-primary-hot'>{`人气: ${hot_num}`}</View>
              <View className='mg-primary-subscribe'>{`订阅: ${subscribe_num}`}</View>
              <View className='mg-primary-update'>{dayjs.unix(last_updatetime).format('YYYY-MM-DD')} {status.map(e=>e.tag_name)}</View>
            </View>
            <View className='mg-primary-service'>

              <StartReading oid={oid} cid={firstChapter} />
            </View>
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
