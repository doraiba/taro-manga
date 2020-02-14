import {Block, Text, View} from "@tarojs/components";
import Taro, {useEffect} from "@tarojs/taro";
import {observer} from "@tarojs/mobx";
import useAxios from 'axios-hooks'
import {SEARCH_HOT} from "@/contexts/manga-api";
import './search-hot.scss'
import {AtTag} from "taro-ui";

const SearchHot: Taro.FC<{ onClick?: (q: string) => void }> = ({onClick}) => {
  const [{data = []}, refetch] = useAxios<SearchHotEntity[]>(SEARCH_HOT, {manual: true})
  useEffect(() => {
    refetch()
  }, [])
  return (
    <Block>
      <View className='at-card__header at-card__header__fix'>
        <View>
          <View className='at-icon at-icon-bookmark' style={{verticalAlign: 'baseline'}} />
        </View>
        <Text className='taro-text at-card__header-title'>大家都在搜</Text>
      </View>
      <View className='at-card__content'>
        <View className='at-card__content-info'>
          <View className='at-row at-row--wrap'>
            {data.map((e, i) =>
              <View key={i} onClick={() => onClick && onClick(e.name)} className='at-col at-col--auto mg-item__hot'>
                <AtTag type='primary'>{e.name}</AtTag>
              </View>)}
            {!data.length && <View className='mg-search__history_block'>热门搜索生成中 :-D</View>}
          </View>
        </View>
      </View>
    </Block>
  )
}
SearchHot.options = {
  addGlobalClass: true
}
export default observer(SearchHot)
