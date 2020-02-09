import Taro, {useCallback, usePullDownRefresh, useRouter, useState} from '@tarojs/taro'
import {Block, View} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import dayjs from "dayjs";
import StartReading from "@/components/start-reading/start-reading";
import useComic from "@/hooks/use-comic";


const Manga: Taro.FC = () => {
  const [timestamp, setTimeStamp] = useState(() => dayjs().unix())
  const {params} = useRouter()
  const {data, refetch} = useComic(() => parseInt(params.oid),[])
  const handleRefresh = useCallback(async () => {
    setTimeStamp(() => dayjs().unix())
    await refetch()
    Taro.stopPullDownRefresh()
  }, [refetch])

  usePullDownRefresh(handleRefresh)

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
