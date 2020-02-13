/**
 * 个人中心->浏览记录
 */
import Taro, {useEffect, usePullDownRefresh} from '@tarojs/taro'
import {Block, ScrollView} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import useAxios from "axios-hooks";
import {COMICREINFO_ALL} from "@/contexts/manga-api";
import {MangaHistoryItem} from "@/components/manga-item";

import './history.scss'

const History: Taro.FC = () => {

  const [{data = [] as ComicReInfo[]}, refetch] = useAxios<ComicReInfo[]>({
    url: COMICREINFO_ALL,
  }, {manual: true})

  usePullDownRefresh(refetch)

  useEffect(()=>{refetch()},[])


  return (
    <Block>
      <ScrollView scrollY enableBackToTop style={{height: '100vh'}}>
        {data.map((e, i)=> <MangaHistoryItem key={i} {...e} />)}
      </ScrollView>
    </Block>
  )
}
History.config = {
  navigationBarTitleText: '浏览记录',
  enablePullDownRefresh: true
}

export default observer(History)
