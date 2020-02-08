import Taro, {useEffect, navigateTo} from '@tarojs/taro'
import {observer, useAsObservableSource} from '@tarojs/mobx';
import useAxios from "axios-hooks";
import {parsePath} from "@/utils";
import {COMICREINFO} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";
import dayjs from "dayjs";
import {AtButton} from "taro-ui";
import {reaction} from "mobx";
import {AtButtonProps} from "taro-ui/@types/button";
import {BaseEventOrig} from "@tarojs/components/types/common";
import {BROWSE_PAGE} from "@/utils/app-constant";

type StartReadingProps = {
  onClick?: (r: ComicReInfo, e?: BaseEventOrig<any>) => void,
  oid: number | string,
  timestamp?: number //通知刷新用
} & Omit<AtButtonProps, 'onClick'>

const StartReading: Taro.FC<StartReadingProps> = (ignore) => {
  const {timestamp, oid, onClick, ...props} = ignore
  const source = useAsObservableSource({timestamp, oid})
  const {tokenStore: {authed}} = useStores()

  const [{data = {} as ComicReInfo}, reFetch] = useAxios<ComicReInfo>({url: parsePath(COMICREINFO, source)}, {manual: true})
  useEffect(() => {
    authed && reFetch()
  }, [authed, reFetch])
  useEffect(() => reaction(() => source.timestamp, () => authed && reFetch()))

  // TODO 远程数据不存在获取本地缓存
  const filter = Object.keys(data).length === 0 ? data : {} as ComicReInfo
  const tag = filter.chapter_name || '开始阅读'
  return (<AtButton {...props} onClick={event => onClick && onClick(filter, event)}>{tag}</AtButton>)
}

StartReading.defaultProps = {
  timestamp: dayjs().unix(),
  size: 'small',
  onClick: r => {
    navigateTo({url: `${BROWSE_PAGE}?oid=${r.comic_id}`})
  }
}

export default observer(StartReading)
