/**
 * 漫画详情页面
 */
import Taro, {useCallback, usePullDownRefresh, useRouter, useState} from '@tarojs/taro'
import {Block, Text, View} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import dayjs from "dayjs";
import useComic from "@/hooks/use-comic";
import MangaHeader from "@/components/manga-header";
import {navigateToBrowse} from "@/utils/app-constant";
import {AtDivider, AtGrid} from 'taro-ui';
import './manga.scss'

const Manga: Taro.FC = () => {
  const [timestamp, setTimeStamp] = useState(() => dayjs().unix())
  const {params: {oid}} = useRouter()

  const {data, refetch} = useComic(() => oid, [oid])
  const handleRefresh = useCallback(async () => {
    setTimeStamp(() => dayjs().unix())
    await refetch()
    Taro.stopPullDownRefresh()
  }, [refetch])

  usePullDownRefresh(handleRefresh)
  const filter = data || {
    id: parseInt(oid),
    authors: [],
    types: [],
    status: [],
    chapters: [{data: [{chapter_id: -1}]}]
  }
  const {chapters} = filter
  const firstChapter = (chapters[0].data.splice(-1)[0] as any).chapter_id
  return (
    <Block>
      <View className='mg-primary'>
        <MangaHeader {...filter} firstChapter={firstChapter} timestamp={timestamp} />
        <View className='mg-primary-container'>
          <View className='at-card__header'>
            <View className='at-card__header-thumb'>
              <View className='taro-img at-card__header-thumb-info'>
                <View className='taro-img__mode-scaletofill at-icon at-icon-bookmark' />
              </View>
            </View>
            <Text className='taro-text at-card__header-title'>漫画章节</Text>
            <Text className='taro-text at-card__header-extra'>TODO排序</Text>
          </View>
          {
            chapters.map((e,i)=><View key={i} className='at-card__content'>
              <AtDivider className='mg-card-divider' content={e.title} fontColor='#2d8cf0' lineColor='#2d8cf0' />
              <View className='at-card__content-info'>
                <AtGrid mode='rect' hasBorder={false} columnNum={4}
                  data={e.data.map(_e=>({value: _e.chapter_title, ..._e, iconInfo: { color: '#FF4949', value: 'bookmark', }}))}
                  onClick={(__e: any)=> navigateToBrowse(`oid=${oid}&cid=${__e.chapter_id}`)}
                />
              </View>
            </View>)
          }
        </View>
      </View>
    </Block>
  )
}
Manga.config = {
  enablePullDownRefresh: true
}

export default observer(Manga)
