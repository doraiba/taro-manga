import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'

import './manga-item.scss'

type MangaItemProps = RankItem | LatestItem

const MangaItem: Taro.FC<MangaItemProps> = (props) => {
  return (
    <View className='mg-manga-union-item'>
      {JSON.stringify(props)}
    </View>)
}
export default MangaItem
