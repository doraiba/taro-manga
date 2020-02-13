import Taro, {useCallback} from '@tarojs/taro'
import {observer, useLocalStore} from "@tarojs/mobx";
import {AtTabs, AtTabsPane} from "taro-ui";
import Recommend from "@/components/recommend/recommend";
import {ScrollView, Block, View} from '@tarojs/components';
import {BaseEventOrigFunction} from "@tarojs/components/types/common";
import EventCenter, {EventDefine} from "@/utils/event-center";
import throttle from 'lodash-es/throttle'
import debounce from 'lodash-es/debounce'
import Latest from "@/components/latest/latest";
import Category from "@/components/category/category";
import Rank from "@/components/rank/rank";
import Subject from "@/components/subject/subject";

import './manga-container.scss'

/**
 * 主页容器
 * @constructor
 */
const MangaContainer: Taro.FC = () => {

  const store = useLocalStore(() => ({
    items: [
      {title: '推荐'},
      {title: '更新'},
      {title: '分类'},
      {title: '排行'},
      {title: '专题'}
    ],
    current: 0,
    handleClick(value: number) {
      store.current = value
    }
  }))

  const {current, items, handleClick} = store

  const handleScrollToLower = useCallback(throttle((e: BaseEventOrigFunction<any>) => {
    EventCenter.trigger(EventDefine.ScrollToLowerEvent, {event: e, tab: current})
  }, 2000), [current])

  const handleScrollToUpper = useCallback(debounce((e: BaseEventOrigFunction<any>) => {
    EventCenter.trigger(EventDefine.ScrollToUpperEvent, {event: e, tab: current})
  }, 1000), [current])

  const upperThreshold = -80,lowerThreshold = 100;

  return (
    <Block>
      <AtTabs className='mg-tabs' current={current} tabList={[...items]} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <ScrollView upperThreshold={upperThreshold} onScrollToUpper={handleScrollToUpper} enableBackToTop lowerThreshold={lowerThreshold} scrollY className='mg-discovery' onScrollToLower={handleScrollToLower}>
            <View className='mg-loading-tips'>loading ...</View>
            <Recommend />
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <ScrollView upperThreshold={upperThreshold} onScrollToUpper={handleScrollToUpper} enableBackToTop lowerThreshold={lowerThreshold} scrollY className='mg-discovery' onScrollToLower={handleScrollToLower}>
            <View className='mg-loading-tips'>loading ...</View>
            <Latest />
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <ScrollView upperThreshold={upperThreshold} onScrollToUpper={handleScrollToUpper} enableBackToTop lowerThreshold={lowerThreshold} scrollY className='mg-discovery' onScrollToLower={handleScrollToLower}>
            <View className='mg-loading-tips'>loading ...</View>
            <Category />
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          <ScrollView upperThreshold={upperThreshold} onScrollToUpper={handleScrollToUpper} enableBackToTop lowerThreshold={lowerThreshold} scrollY className='mg-discovery' onScrollToLower={handleScrollToLower}>
            <View className='mg-loading-tips'>loading ...</View>
            <Rank />
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={current} index={4}>
          <ScrollView upperThreshold={upperThreshold} onScrollToUpper={handleScrollToUpper} enableBackToTop lowerThreshold={lowerThreshold} scrollY className='mg-discovery' onScrollToLower={handleScrollToLower}>
            <View className='mg-loading-tips'>loading ...</View>
            <Subject />
          </ScrollView>
        </AtTabsPane>
      </AtTabs>
    </Block>
  )
}

export default observer(MangaContainer)
