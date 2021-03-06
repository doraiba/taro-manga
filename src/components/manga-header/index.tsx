import Taro,{useEffect} from '@tarojs/taro'
import {Block, Image, ScrollView, Text, View} from '@tarojs/components'

import dayjs from "dayjs";
import SubscribeNow from "@/components/subscribe-now/subscribe-now";
import StartReading from "@/components/start-reading/start-reading";
import './index.scss'

/**
 * 漫画详情展示头部card
 * @param id
 * @param title
 * @param cover
 * @param authors
 * @param types
 * @param hot_num
 * @param subscribe_num
 * @param status
 * @param last_updatetime
 * @param description
 * @param firstChapter
 * @param timestamp
 * @constructor
 */
const MangaHeader: Taro.FC<Comic & {firstChapter?: number,timestamp?: number}> = ({id,title,cover, authors, types, hot_num, subscribe_num, status, last_updatetime,description, firstChapter, timestamp}) => {

  useEffect(()=>{
    title && Taro.setNavigationBarTitle({title})
  },[title])

  return <Block>
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
          <SubscribeNow className='mg-primary-button__w80' timestamp={timestamp} oid={id} />
          <View className='mg-primary-space' />
          <StartReading onChange={(r)=>console.log('receive:', r)} className='mg-primary-button__w80 mg-primary-button' timestamp={timestamp} oid={id} cid={firstChapter} />
        </View>
      </View>
    </View>
    <ScrollView scrollY className='mg-primary-desc-scroll'>
      <View className='at-article__p'>
        {description}
      </View>
    </ScrollView>
  </Block>
}

MangaHeader.defaultProps = {
  authors: [],
  types: [],
  status: [],
  chapters: [{data: [{chapter_id: -1}]}],
  timestamp: dayjs().unix(),
} as any
MangaHeader.options = {addGlobalClass: true}
export default MangaHeader
