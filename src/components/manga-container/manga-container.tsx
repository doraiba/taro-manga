import Taro from '@tarojs/taro'
import {observer, useLocalStore} from "@tarojs/mobx";
import {AtTabs, AtTabsPane} from "taro-ui";
import Recommend from "@/components/recommend/recommend";
import {ScrollView, View} from '@tarojs/components';

import './manga-container.scss'

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


  return (
    <AtTabs className='mg-tabs' current={current} tabList={[...items]} onClick={handleClick}>
      <ScrollView scrollY className='mg-discovery'>
        <AtTabsPane current={current} index={0}>
          <Recommend />
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View>更新</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View>分类</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          <View>排行</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={4}>
          <View>专题</View>
        </AtTabsPane>
      </ScrollView>
    </AtTabs>
  )
}

export default observer(MangaContainer)
