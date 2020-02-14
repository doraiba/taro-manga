import {Block, Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { observer } from "@tarojs/mobx";
import useStores from "@/hooks/use-stores";
import './search-history.scss'

const SearchHistory: Taro.FC<{onClick?: (q: string) => void}> = ({onClick})=>{
  const {searchStore} = useStores()
  const {repository,clear} = searchStore
  return (
    <Block>
      <View className='at-card__header at-card__header__fix'>
        <View>
          <View className='at-icon at-icon-bookmark' style={{verticalAlign: 'baseline'}} />
        </View>
        <Text className='taro-text at-card__header-title'>历史记录</Text>
        <Text className='taro-text at-card__header-extra' onClick={clear}>清除历史</Text>
      </View>
      <View className='at-card__content'>
        <View className='at-card__content-info'>
          <View className='at-row at-row--wrap'>
            {repository.map((e,i)=> <View key={i} onClick={()=>onClick && onClick(e)} className='at-col at-col-4 mg-item__history'>{e}</View>)}
            {!repository.length && <View className='mg-search__history_block'>赶紧来搜索吧 :-D</View>}
          </View>
        </View>
      </View>
    </Block>
  )
}
SearchHistory.options = {
  addGlobalClass: true
}
export default observer(SearchHistory)
