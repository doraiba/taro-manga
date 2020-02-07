import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import useStores from "@/hooks/use-stores";
import {AtAvatar, AtList, AtListItem} from 'taro-ui';
import {observer} from '@tarojs/mobx';

import './user.scss'

const User: Taro.FC = () => {
  const {userStore} = useStores()

  const {autoCheckIn, setAutoCheckIn, avatar, nickname} = userStore
  return (
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
        <AtListItem iconInfo={{size: 25, color: '#FF4949', value: 'heart',}} title='自动签到'
          switchIsCheck={autoCheckIn}
          onSwitchChange={(e) => setAutoCheckIn(e.detail.value)} isSwitch
        />
      </AtList>
    </View>
  )
}
User.config = {
  navigationBarTitleText: '用户中心'
}

export default observer(User)
