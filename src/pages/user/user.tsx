/**
 * 个人中心页面 TODO
 */
import Taro, {useEffect, useState} from '@tarojs/taro'
import {Block, View} from '@tarojs/components'
import useStores from "@/hooks/use-stores";
import {AtAvatar, AtButton, AtList, AtListItem} from 'taro-ui';
import {observer} from '@tarojs/mobx';
import {autorun} from "mobx";
import {navigateToHistory, navigateToIndex, navigateToSubscribe} from "@/utils/app-constant";

import './user.scss'

const User: Taro.FC = () => {
  const {userStore, tokenStore,tokenStore: {clearMangaToken}} = useStores()

  const {autoCheckIn, setAutoCheckIn, avatar, nickname} = userStore
  useEffect(()=>autorun(()=>(!tokenStore.authed) && navigateToIndex({redirect: true})),[])
  const [iconSize] = useState(()=>Taro.pxTransform(25*2).replace('px','') as any - 0)
  return (
    <Block>
      <View className='mg-user'>
        <View className='mg-user-card'>
          <View className='mg-user-avatar-wrapp'>
            <AtAvatar className='mg-user-avatar' image={avatar} />
          </View>
          <View className='mg-user-info'>
            <View className='mg-user-nickname'>{nickname}</View>
            <View className='mg-user-subscriber' />
          </View>
        </View>
        <AtList>
          <AtListItem
            onClick={navigateToSubscribe}
            iconInfo={{size: iconSize, color: '#FF4949', value: 'bookmark',}} title='我的订阅'
            arrow='right'
          />
          <AtListItem
            onClick={navigateToHistory}
            iconInfo={{size: iconSize, color: '#60b9ff', value: 'eye',}} title='浏览记录'
            arrow='right'
          />
          <AtListItem iconInfo={{size: iconSize, color: '#ff36e5', value: 'heart',}} title='自动签到'
            switchIsCheck={autoCheckIn}
            onSwitchChange={(e) => setAutoCheckIn(e.detail.value)} isSwitch
          />
        </AtList>
        <View className='mg-user-button'>
          <AtButton onClick={clearMangaToken}>退出</AtButton>
        </View>
      </View>
    </Block>)
}
User.config = {
  navigationBarTitleText: '用户中心'
}

export default observer(User)
