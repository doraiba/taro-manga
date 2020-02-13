/**
 * 个人中心页面 TODO
 */
import Taro,{useEffect,redirectTo} from '@tarojs/taro'
import {View, Block} from '@tarojs/components'
import useStores from "@/hooks/use-stores";
import {AtAvatar, AtList, AtListItem, AtButton} from 'taro-ui';
import {observer} from '@tarojs/mobx';
import {autorun} from "mobx";
import {LOGIN_PAGE} from "@/utils/app-constant";

import './user.scss'

const User: Taro.FC = () => {
  const {userStore, tokenStore,tokenStore: {clearMangaToken}} = useStores()

  const {autoCheckIn, setAutoCheckIn, avatar, nickname} = userStore
  useEffect(()=>autorun(()=>(!tokenStore.authed) && redirectTo({url: LOGIN_PAGE})),[])
  return (
    <Block>
      <View className='mg-user'>
        <View className='mg-user-card'>
          <View className='mg-user-avatar-wrapp'>
            <AtAvatar className='mg-user-avatar' image={avatar} />
          </View>
          <View className='mg-user-info'>
            <View className='mg-user-nickname'>{nickname}</View>
            <View className='mg-user-subscriber'></View>
          </View>
        </View>
        <AtList>
          <AtListItem iconInfo={{size: 25, color: '#FF4949', value: 'bookmark',}} title='我的订阅'
            arrow='right'
          />
          <AtListItem iconInfo={{size: 25, color: '#60b9ff', value: 'eye',}} title='浏览记录'
            arrow='right'
          />
          <AtListItem iconInfo={{size: 25, color: '#4cff76', value: 'heart',}} title='自动签到'
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
