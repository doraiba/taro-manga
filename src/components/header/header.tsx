import Taro, {useCallback,navigateTo} from '@tarojs/taro'
import {View} from "@tarojs/components";
import DefaultLogo from "@/components/header/component/default-logo/default-logo";
import {AtAvatar, AtIcon} from "taro-ui";
import useStores from "@/hooks/use-stores";
import { observer } from '@tarojs/mobx';

import './header.scss'

// eslint-disable-next-line react/no-multi-comp
const Header: Taro.FC = ({children}) => {

  const {tokenStore} =  useStores()
  const toAuth = useCallback(() => {
    if(tokenStore.authed) {
    return navigateTo({url: '/pages/user/user'})
    }
    navigateTo({url: '/pages/login/login'})
    // eslint-disable-next-line
  }, [])

  const {authed, avatar} = tokenStore
  return (
    <View className='nav-header'>
      <View className='nav-leading'><DefaultLogo /></View>
      <View className='nav-title'>{children}</View>
      <View className='nav-actions'>
        <View onClick={toAuth}>
          {authed ? <AtAvatar size='small' circle className='mg-avatar'
            image={avatar}
          />: <AtIcon  value='user' className='mg-avatar' />}

        </View>
        <AtIcon className='mg-search' value='search'></AtIcon>
      </View>
    </View>
  )
}


export default observer(Header)
