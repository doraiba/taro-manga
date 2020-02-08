import Taro, {useCallback, useState, useEffect, usePullDownRefresh, useRouter} from '@tarojs/taro'
import {Block, View} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import useAxios from 'axios-hooks'
import {COMIC} from "@/contexts/manga-api";
import {parsePath} from "@/utils";
import dayjs from "dayjs";
import StartReading from "@/components/start-reading/start-reading";

import './manga.scss'

const Manga: Taro.FC = () => {
  const [timestamp, setTimeStamp] = useState(() => dayjs().unix())
  const {params} = useRouter()
  const [{data = {}}, reFetch] = useAxios<Comic>({url: parsePath(COMIC, params)}, {manual: true})
  const handleRefresh = useCallback(async () => {
    setTimeStamp(() => dayjs().unix())
    await reFetch()
    Taro.stopPullDownRefresh()
  }, [reFetch])

  usePullDownRefresh(handleRefresh)

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

  return (
    <Block>
      <View className='mg-primary'>
        <StartReading timestamp={timestamp} oid={params.oid} />
        <View>{JSON.stringify(data)}</View>
      </View>
    </Block>)
}
Manga.config = {
  enablePullDownRefresh: true
}

export default observer(Manga)
