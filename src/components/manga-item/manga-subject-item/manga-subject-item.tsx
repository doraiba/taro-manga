import Taro from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import dayjs from "dayjs";
import './manga-subject-item.scss'


const MangaItem: Taro.FC<SubjectItem> = ({small_cover, title, create_time}) => {
  return (
    <View className='mg-subject-item'>
      <View className='mg-subject-image-wrapper'>
        <Image className='mg-subject-image' mode='widthFix' lazyLoad src={small_cover} />
      </View>
      <View className='mg-subject-desc'>
        <View className='mg-subject-title'>{title}</View>
        <View className='mg-subject-time'>{dayjs.unix(create_time).format('YYYY-MM-DD')}</View>
      </View>
    </View>)
}

export default MangaItem
