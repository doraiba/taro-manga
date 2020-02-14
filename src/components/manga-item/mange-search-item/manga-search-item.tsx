import Taro from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import {ITouchEvent} from "@tarojs/components/types/common";
import {navigateToManga} from "@/utils/app-constant";

import './manga-search-item.scss'

type MangaItemProps = SearchTipsEntity & { onClick?: (event: ITouchEvent, id?: string | number) => any }
/**
 * 搜索item
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
const MangaSearchItem: Taro.FC<MangaItemProps> = ({onClick, children, cover, title,last_name, authors, types, id}) => {
  return (
    <View className='mg-manga-search-item' onClick={e => onClick && onClick(e, id)}>
      <View className='mg-search-info'>
        <View className='mg-search-image-wrapper'>
          <Image className='mg-search-image' lazyLoad src={cover} />
        </View>
        <View className='mg-search-desc'>
          <View className='mg-search-title'>{title}</View>
          <View className='mg-search-produce'>
            <View className='mg-search-name'>${last_name}</View>
            <View className='mg-search-authors'>
              <View className='at-icon at-icon-user' />
              <Text selectable>{authors}</Text>
            </View>
            <View className='mg-search-tag'>
              <View className='at-icon at-icon-bookmark' />
              <Text selectable>{types}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className='mg-item-actions'>
        {children}
      </View>
    </View>)
}
MangaSearchItem.defaultProps = {
  onClick: (_event, id) => navigateToManga(`oid=${id}`)
}
MangaSearchItem.options = {
  addGlobalClass: true
}

export default MangaSearchItem
