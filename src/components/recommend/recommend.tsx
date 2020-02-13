import Taro, {useEffect} from "@tarojs/taro";
import {observer} from "@tarojs/mobx";
import {View} from '@tarojs/components'
import useAxios from 'axios-hooks'
import {AtActivityIndicator} from 'taro-ui'
import {RECOMMEND} from "@/contexts/manga-api";

import './recommend.scss'
import Category46 from "./category-46";
import Category47 from "./category-47";

/**
 * 主页tab->推荐
 * @constructor
 */
const Recommend: Taro.FC = () => {

  const [{loading, error, data = []}, refetch] = useAxios(RECOMMEND, {manual: true})
  useEffect(() => {
    refetch()
  }, [refetch])
  const [c46, c47, , , , , c54, , c56] = data
  if (loading || error) return <AtActivityIndicator color='#0094ff' size={50} mode='center' content='Loading...' />
  return (
    <View className='mg-recommend'>
      <Category46 {...c46} />
      <Category47 {...c47} />
      <Category47 {...c54} />
      <Category47 {...c56} />
    </View>
  )
}
export default observer(Recommend)
