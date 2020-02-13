import Taro from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import dayjs from "dayjs";
import {ITouchEvent} from "@tarojs/components/types/common";
import {navigateToManga} from "@/utils/app-constant";

import './manga-item.scss'

type MangaItemProps = (RankItem & LatestItem) & { onClick?: (event: ITouchEvent, id?: string | number) => any }
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
const MangaItem: Taro.FC<MangaItemProps> = ({onClick, children, cover, title, authors, types, last_updatetime, id, comic_id}) => {
  return (
    <View className='mg-manga-union-item' onClick={e => onClick && onClick(e, id || comic_id)}>
      <View className='mg-union-info'>
        <View className='mg-union-image-wrapper'>
          <Image className='mg-union-image' lazyLoad src={cover} />
        </View>
        <View className='mg-union-desc'>
          <View className='mg-union-title'>{title}</View>
          <View className='mg-union-produce'>
            <View className='mg-union-authors'>
              <View className='at-icon at-icon-user' />
              <Text selectable>{authors}</Text>
            </View>
            <View className='mg-union-tag'>
              <View className='at-icon at-icon-bookmark' />
              <Text selectable>{types}</Text>
            </View>
            <View className='mg-union-date'>
              <View className='at-icon at-icon-clock' />
              <Text>{dayjs.unix((last_updatetime as number)).format('YYYY-MM-DD HH:mm')}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className='mg-item-actions'>
        {children}
      </View>
    </View>)
}
MangaItem.defaultProps = {
  onClick: (_event, id) => navigateToManga(`oid=${id}`)
}
MangaItem.options = {
  addGlobalClass: true
}

export default MangaItem
