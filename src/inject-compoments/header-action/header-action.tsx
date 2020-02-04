import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import {AtAvatar, AtIcon} from 'taro-ui';

import './header-action.scss'

const HeaderAction: Taro.FC = () => {
  return (
    <View className='mg-action'>
      <AtAvatar size='small' circle className='mg-avatar' image='https://avatar.dmzj.com/3b/8b/3b8b90e14fa6a2cf30ec163dc9621eb9.png' />
      <AtIcon value='search' color='#F00'></AtIcon>
    </View>
  )
}
export default HeaderAction
