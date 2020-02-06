import Taro from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import dayjs from "dayjs";

import './manga-item.scss'

type MangaItemProps = RankItem | LatestItem

const MangaItem: Taro.FC<MangaItemProps> = ({children, cover, title, authors, types, last_updatetime}) => {
  return (
    <View className='mg-manga-union-item'>
      <View className='mg-union-info'>
        <View className='mg-union-image-wrapper'>
          <Image className='mg-union-image' lazyLoad src={cover} />
        </View>
        <View className='mg-union-desc'>
          <View className='mg-union-title'>{title}</View>
          <View className='mg-union-produce'>
            <View className='mg-union-authors'>{authors}</View>
            <View className='mg-union-tag'>{types}</View>
            <View className='mg-union-date'>{dayjs.unix((last_updatetime as number) ).format('YYYY-MM-DD HH:mm')}</View>
          </View>
        </View>
      </View>
      <View className='mg-item-actions'>
        {children}
      </View>
    </View>)
}

export default MangaItem
