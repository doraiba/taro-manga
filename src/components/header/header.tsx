import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import DefaultLogo from "@/components/header/component/default-logo/default-logo";
import {AtAvatar, AtIcon} from "taro-ui";
import './header.scss'

// eslint-disable-next-line react/no-multi-comp
const Header: Taro.FC = ({ children}) => {
  return (
    <View className='nav-header'>
      <View className='nav-leading'><DefaultLogo /></View>
      <View className='nav-title'>{children}</View>
      <View className='nav-actions'>
        <AtAvatar size='small' circle className='mg-avatar' image='https://avatar.dmzj.com/3b/8b/3b8b90e14fa6a2cf30ec163dc9621eb9.png' />
        <AtIcon className='mg-search' value='search'></AtIcon>
      </View>
    </View>
  )
}


export default Header
