import Taro from '@tarojs/taro'
import {Image, View} from '@tarojs/components'

import './manga-item.scss'

const MangaItem: Taro.FC<CategoryItem> = ({cover, title, sub_title, authors}) => {

  return (
    <View className='mg-manga-item'>
      <View className='mg-manga-item-cover'>
        <Image className='mg-manga-item-cover-img' src={cover} />
      </View>

      <View className='mg-manga-item-title'>{title}</View>
      <View className='mg-manga-item-subtitle'>{sub_title || authors}</View>
    </View>)
}
export default MangaItem
