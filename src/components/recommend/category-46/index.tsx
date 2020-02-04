import Taro from '@tarojs/taro'
import {Block, Image, Swiper, SwiperItem, View} from '@tarojs/components'

import './index.scss'


const Category46: Taro.FC<Category> = ({category_id, data = []}) => {
  const filterData = data.filter(e => e.cover)
  return (
    <Block>
      <Swiper
        data-cid={category_id}
        className='mg-recommend-swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        {
          filterData.map((e, i) => <SwiperItem key={i}>
            <View className='mg-swiper-container'>
              <Image className='mg-swiper' src={e.cover} />
              <View className='mg-swiper-desc'>{e.title}</View>
            </View>
          </SwiperItem>)
        }
      </Swiper>
      <View>{JSON.stringify(data)}</View>
    </Block>
  )
}
export default Category46
