import Taro, {useEffect, useRouter} from '@tarojs/taro'
import {Block, View} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import {parsePath} from '@/utils';
import {CHAPTER} from "@/contexts/manga-api";
import useAxios from 'axios-hooks'
import useComic from "@/hooks/use-comic";

const Browse: Taro.FC = () => {
  const {params} = useRouter()

  const {data: comic} = useComic(() => params.oid, [params.oid])

  const [{data}, refetch] = useAxios(parsePath(CHAPTER, params), {manual: true})
  useEffect(() => {
    refetch()
  }, [])
  return (
    <Block>
      <View>{JSON.stringify(params)}</View>
      <View>{JSON.stringify(data)}</View>
      <View>{JSON.stringify(comic)}</View>
    </Block>)
}
Browse.config = {}

export default observer(Browse)
