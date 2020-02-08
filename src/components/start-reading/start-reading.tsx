import Taro, {useEffect} from '@tarojs/taro'
import {Block} from '@tarojs/components'
import {observer, useAsObservableSource} from '@tarojs/mobx';
import useAxios from "axios-hooks";
import {parsePath} from "@/utils";
import {COMICREINFO} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";
import dayjs from "dayjs";
import {AtButton} from "taro-ui";
import {reaction} from "mobx";
import {AtButtonProps} from "taro-ui/@types/button";

type StartReadingProps = {
  oid: number | string,
  timestamp?: number //通知刷新用
} & Exclude<AtButtonProps, 'onClick'>

const StartReading: Taro.FC<StartReadingProps> = ({timestamp, oid, ...props}) => {
  const source = useAsObservableSource({timestamp, oid})
  const {tokenStore: {authed}} = useStores()

  const [{data = {} as ComicReInfo}, reFetch] = useAxios<ComicReInfo>({url: parsePath(COMICREINFO, source)}, {manual: true})
  useEffect(() => {
    authed && reFetch()
  }, [authed, reFetch])
  useEffect(() => reaction(() => source.timestamp, () => authed && reFetch()))

  const filter = Object.keys(data).length === 0 ? data : {} as ComicReInfo
  const tag = filter.chapter_name || '开始阅读'
  return (
    <Block>
      <AtButton {...props}>{tag}</AtButton>
    </Block>)
}

StartReading.defaultProps = {
  timestamp: dayjs().unix(),
  size: 'small'
}

export default observer(StartReading)
