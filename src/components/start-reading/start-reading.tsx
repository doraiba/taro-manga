import Taro, {useEffect, navigateTo} from '@tarojs/taro'
import {observer, useAsObservableSource} from '@tarojs/mobx';
import useAxios from "axios-hooks";
import {parsePath} from "@/utils";
import {COMICREINFO} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";
import dayjs from "dayjs";
import {AtButton} from "taro-ui";
import {autorun} from "mobx";
import {AtButtonProps} from "taro-ui/@types/button";
import {BaseEventOrig} from "@tarojs/components/types/common";
import {BROWSE_PAGE} from "@/utils/app-constant";

type StartReadingProps = {
  onClick?: (e: BaseEventOrig<any>, r?: ComicReInfo, chapter?: number) => void,
  oid: number | string, //漫画id
  cid?: number //章节初始id,第一话
  timestamp?: number //通知刷新用
} & Omit<AtButtonProps, 'onClick'|'loading'>

const StartReading: Taro.FC<StartReadingProps> = (ignore) => {
  const {timestamp, oid,cid, onClick, ...props} = ignore
  const source = useAsObservableSource({timestamp, oid})
  const {tokenStore} = useStores()

  const [{loading, data = {} as ComicReInfo}, reFetch] = useAxios<ComicReInfo>({url: parsePath(COMICREINFO, source)}, {manual: true})

  useEffect(() => autorun( () => tokenStore.authed && reFetch({params:{timestamp: source.timestamp}})), [])

  // TODO 远程数据不存在获取本地缓存
  const filter = Object.keys(data).length !== 0 ? data : {comic_id: oid} as ComicReInfo
  const tag = filter.chapter_name || '开始阅读'
  return (<AtButton {...props} loading={loading} onClick={event => onClick && onClick(event,filter,cid)}>{tag}</AtButton>)
}

StartReading.defaultProps = {
  timestamp: dayjs().unix(),
  size: 'small',
  onClick: (_e, r , c) => {
    const {comic_id, chapter_id = c} = r as ComicReInfo
    if(!chapter_id) return Taro.showToast({title: `无法定位章节信息:${comic_id}/${chapter_id}`})
    navigateTo({url: `${BROWSE_PAGE}?oid=${comic_id}&cid=${chapter_id}`})
  }
}

export default observer(StartReading)
