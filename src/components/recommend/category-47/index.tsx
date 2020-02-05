import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtCard} from 'taro-ui'
import MangaItem from "@/components/manga-item/manga-item";
import logo from '@/asset/image/icon_h2_1.png'
import './index.scss'

const Category47: Taro.FC<Category> = ({title, data = []}) => {
  return (
    <AtCard
      isFull
      title={title}
      thumb={logo}
    >
      <View className='mg-card-need'>
        {data.map((e, i) => <MangaItem {...e} key={i} />)}
      </View>
    </AtCard>
  )
}
export default Category47
