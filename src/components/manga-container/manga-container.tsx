import Taro from '@tarojs/taro'
import {observer, useLocalStore} from "@tarojs/mobx";
import {AtTabs, AtTabsPane} from "taro-ui";
import Recommend from "@/components/recommend/recommend";
import {Block} from '@tarojs/components';
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

  return (
    <Block>
      <AtTabs className='mg-tabs' current={current} tabList={[...items]} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <Recommend  />
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <Latest />
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <Category />
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          <Rank />
        </AtTabsPane>
        <AtTabsPane current={current} index={4}>
          <Subject />
        </AtTabsPane>
      </AtTabs>
    </Block>
  )
}

export default observer(MangaContainer)
