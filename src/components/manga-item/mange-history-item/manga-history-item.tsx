import Taro from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import dayjs from "dayjs";
import {ITouchEvent} from "@tarojs/components/types/common";
import {navigateToManga} from "@/utils/app-constant";

import './manga-history-item.scss'

type MangaHistoryItemProps = ComicReInfo & { onClick?: (event: ITouchEvent, id?: string | number) => any }
/**
 * 主页更新/排行tab的子项
 * @param onClick
 * @param children
 * @param cover
 * @param title
 * @param authors
 * @param types
 * @param last_updatetime
 * @param id
 * @param comic_id
 * @constructor
 */
const MangaHistoryItem: Taro.FC<MangaHistoryItemProps> = ({onClick, children, cover,comic_name, comic_id,chapter_name,record,viewing_time}) => {
  return (
    <View className='mg-manga-history-item' onClick={e => onClick && onClick(e, comic_id)}>
      <View className='mg-history-info'>
        <View className='mg-history-image-wrapper'>
          <Image className='mg-history-image' lazyLoad src={cover} />
        </View>
        <View className='mg-history-desc'>
          <View className='mg-history-title'>{comic_name}</View>
          <View className='mg-history-produce'>
            <View className='mg-history-tag'>
              <View className='at-icon at-icon-bookmark' />
              <Text selectable>{`看到: ${chapter_name} 第${record}页`}</Text>
            </View>
            <View className='mg-history-date'>
              <View className='at-icon at-icon-clock' />
              <Text>{`时间: ${dayjs.unix((viewing_time as number)).format('YYYY-MM-DD HH:mm')}`}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className='mg-item-actions'>
        {children}
      </View>
    </View>)
}
MangaHistoryItem.defaultProps = {
  onClick: (_event, id) => navigateToManga(`oid=${id}`)
}
MangaHistoryItem.options = {
  addGlobalClass: true
}

export default MangaHistoryItem
