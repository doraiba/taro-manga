import Taro from "@tarojs/taro";
import {observer} from "@tarojs/mobx";
import {View, Block} from '@tarojs/components'
import useAxios from 'axios-hooks'
import {AtLoadMore} from 'taro-ui'
import {RECOMMEND} from "@/contexts/manga-api";

import './recommend.scss'
import Category46 from "./category-46";
import useEffect = Taro.useEffect;

const Recommend: Taro.FC = () => {
  const [{loading, error, data = []}, refetch] = useAxios(RECOMMEND, {manual: true})
  useEffect(()=>{refetch()},[refetch])
  const [c46] = data
  return (
    <Block>
      {loading && <AtLoadMore />}
      {!loading && <View className='mg-recommend'>
        <Category46 {...c46} />
      </View>
      }
    </Block>
  )
}
export default observer(Recommend)
