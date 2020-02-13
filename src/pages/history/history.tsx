/**
 * 个人中心->浏览记录
 */
import Taro, {useEffect, usePullDownRefresh,stopPullDownRefresh} from '@tarojs/taro'
import {Block, ScrollView, View} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import useAxios from "axios-hooks";
import {COMICREINFO_ALL} from "@/contexts/manga-api";
import {MangaHistoryItem} from "@/components/manga-item";

import './history.scss'
import {navigateToBrowse} from "@/utils/app-constant";

const History: Taro.FC = () => {

  const [{data = [] as ComicReInfo[]}, refetch] = useAxios<ComicReInfo[]>({
    url: COMICREINFO_ALL,
  }, {manual: true})

  usePullDownRefresh(async ()=>{
    try {
      await refetch()
    }finally {
      stopPullDownRefresh()
    }
  })

  useEffect(()=>{refetch()},[])


  return (
    <Block>
      <ScrollView scrollY enableBackToTop className='mg-history'>
        {data.map((e, i)=> <MangaHistoryItem key={i} {...e} >
          <View className='at-icon at-icon-eye mg-icon-eye' onClick={()=>navigateToBrowse(`oid=${e.comic_id}&cid=${e.chapter_id}`)} />
        </MangaHistoryItem>)}
      </ScrollView>
    </Block>
  )
}
History.config = {
  navigationBarTitleText: '浏览记录',
  enablePullDownRefresh: true,
}


export default observer(History)
