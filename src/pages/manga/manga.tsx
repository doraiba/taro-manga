import Taro, {useCallback, usePullDownRefresh, useRouter, useState} from '@tarojs/taro'
import {Block, View, Image,Text} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import dayjs from "dayjs";
import StartReading from "@/components/start-reading/start-reading";
import SubscribeNow from "@/components/subscribe-now/subscribe-now";
import useComic from "@/hooks/use-comic";

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
  const {cover, authors, types, hot_num, subscribe_num, status, last_updatetime, chapters} = data || {
    authors: [],
    types: [],
    status: [],
    chapters: [{data: [{chapter_id: -1}]}]
  }
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
              <View className='mg-primary-authors mg-primary-item'>
                <View className='at-icon at-icon-user' />
                <Text selectable className='mg-primary-text'>{authors.map(e => e.tag_name).join()}</Text>
              </View>
              <View className='mg-primary-types mg-primary-item'>
                <View className='at-icon at-icon-bookmark' />
                <Text selectable className='mg-primary-text'>{types.map(e => e.tag_name).join()}</Text>
              </View>
              <View className='mg-primary-hot mg-primary-item'>
                <View className='at-icon at-icon-bookmark' />
                <Text selectable className='mg-primary-text'>{`人气 ${hot_num}`}</Text>
              </View>
              <View className='mg-primary-subscribe mg-primary-item'>
                <View className='at-icon at-icon-bookmark' />
                <Text selectable className='mg-primary-text'>{`订阅 ${subscribe_num}`}</Text>
              </View>
              <View className='mg-primary-update mg-primary-item'>
                <View className='at-icon at-icon-clock' />
                <Text className='mg-primary-text'>{dayjs.unix(last_updatetime).format('YYYY-MM-DD')} {status.map(e => e.tag_name).join()}</Text>
              </View>
            </View>
            <View className='mg-primary-service'>
              <SubscribeNow className='mg-primary-button' timestamp={timestamp} oid={oid} />
              <View className='mg-primary-space' />
              <StartReading className='mg-primary-button' timestamp={timestamp} oid={oid} cid={firstChapter} />
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
