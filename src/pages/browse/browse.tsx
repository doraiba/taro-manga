import Taro, {useEffect, useRouter} from '@tarojs/taro'
import {Block, View} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import {parsePath} from '@/utils';
import {CHAPTER} from "@/contexts/manga-api";
import useAxios from 'axios-hooks'

const Browse: Taro.FC = () => {
  const {params} = useRouter()
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const [{data},refetch] =  useAxios(parsePath(CHAPTER, params), {manual: true})
  useEffect(() => {refetch()},[])
  return (
    <Block>
      <View>{JSON.stringify(params)}</View>
      <View>{JSON.stringify(data)}</View>
    </Block>)
}
Browse.config = {
}

export default observer(Browse)
