import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import './manga-card.scss'

type MangaCardProps = { title?: string, leadingIcon?: string, actionIcon?: string, actionClick?: () => void }
/**
 * 主页类目card
 * @param children
 * @param title
 * @param leadingIcon
 * @param actionIcon
 * @param actionClick
 * @constructor
 */
const MangaCard: Taro.FC<MangaCardProps> = ({children, title, leadingIcon = 'check-circle', actionIcon = '', actionClick}) => {
  return (
    <View className='mg-card'>
      <View className='mg-card-header'>
        <View className='mg-card-leading'>
          {title && <AtIcon value={leadingIcon} />}
          <View className='mg-card-title'>{title}</View>
        </View>
        <View className='mg-card-actions'>
          {title && <AtIcon onClick={actionClick} value={actionIcon} />}
        </View>
      </View>
      <View className='mg-card-need'>
        {children}
      </View>
    </View>
  )
}
export default MangaCard
