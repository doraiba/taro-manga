import Taro from '@tarojs/taro'
import {Image, View} from '@tarojs/components'

import './manga-item.scss'

type Item = RankItem | LatestItem
type MangaItemProps = {
  item: Item,
  renderActions?: (item: Item) => React.ReactElement
}

const MangaItem: Taro.FC<MangaItemProps> = ({renderActions, item}) => {
  const {cover, title, authors, types, last_updatetime} = item
  return (
    <View className='mg-manga-union-item'>
      <View className='mg-union-info'>
        <View className='mg-union-image-wrapper'>
          <Image className='mg-union-image' lazyLoad mode='widthFix' src={cover} />
        </View>
        <View className='mg-union-desc'>
          <View className='mg-union-title'>{title}</View>
          <View className='mg-union-produce'>
            <View className='mg-union-authors'>{authors}</View>
            <View className='mg-union-tag'>{types}</View>
            <View className='mg-union-date'>{last_updatetime}</View>
          </View>
        </View>
      </View>
      <View className='mg-item-actions'>
        {renderActions && renderActions(item)}
      </View>
    </View>)
}
MangaItem.defaultProps = {
  item: {} as Item
}
export default MangaItem
