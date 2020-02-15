import Taro, {useDidShow, useEffect} from '@tarojs/taro'
import {observer, useAsObservableSource} from '@tarojs/mobx';
import dayjs from "dayjs";
import {AtButton, AtMessage} from "taro-ui";
import {reaction} from "mobx";
import {AtButtonProps} from "taro-ui/@types/button";
import {BaseEventOrig} from "@tarojs/components/types/common";
import {navigateToBrowse} from "@/utils/app-constant";
import {Block, View} from '@tarojs/components';
import useChapter from "@/hooks/use-chapter";

type StartReadingProps = {
  onChange?: (reInfo: ComicReInfo) => void
  onClick?: (e: BaseEventOrig<any>, r?: ComicReInfo, chapter?: number) => void,
  oid: number | string, //漫画id
  cid?: number //章节初始id,第一话
  timestamp?: number //通知刷新用
} & Omit<AtButtonProps, 'onClick' | 'loading'>
/**
 * 漫画详情页-开始阅读按钮
 * @param ignore
 * @constructor
 */
const StartReading: Taro.FC<StartReadingProps> = (ignore) => {
  const {timestamp, oid, cid, onClick, onChange, ...props} = ignore
  const source = useAsObservableSource({timestamp, oid})

  const {loading, data = {} as ComicReInfo,refetch} = useChapter(()=> oid,[oid])

  const autofetch = async () => {
    try {
      const {data: reInfo} = await refetch()
      onChange && onChange(reInfo)
    } catch (_e) {
      // useDidShow 会报错 axios的CancelToken不存在,内部生命周期有关应该 不影响使用 忽略
    }
  }

  useEffect(() => reaction(()=>source.timestamp,autofetch), [])

  // 用于返回后状态更新,
  useDidShow(autofetch)

  // TODO 远程数据不存在获取本地缓存
  const filter = Object.keys(data).length !== 0 ? data : {comic_id: oid} as ComicReInfo
  const {chapter_name = '开始阅读', chapter_id} = filter
  return (
    <Block>
      <AtMessage />
      <View onLongPress={() => chapter_id && Taro.atMessage({message: `阅读进度: ${chapter_name}`})}>
        <AtButton {...props} loading={loading} onClick={event => onClick && onClick(event, filter, cid)}>
          {chapter_name}
        </AtButton>
      </View>
    </Block>
  )
}

StartReading.defaultProps = {
  timestamp: dayjs().unix(),
  size: 'small',
  onClick: (_e, r, c) => {
    const {comic_id, chapter_id = c} = r as ComicReInfo
    if (!chapter_id) return Taro.showToast({icon: 'none',title: `无法定位章节信息:${comic_id}/${chapter_id}`})
    navigateToBrowse(`oid=${comic_id}&cid=${chapter_id}`)
  }
}

export default observer(StartReading)
