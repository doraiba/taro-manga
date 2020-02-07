import Taro, {useCallback,navigateTo} from '@tarojs/taro'
import {View} from "@tarojs/components";
import DefaultLogo from "@/components/header/component/default-logo/default-logo";
import {AtAvatar, AtIcon} from "taro-ui";
import useStores from "@/hooks/use-stores";
import { observer } from '@tarojs/mobx';
import {LOGIN_PAGE, USER_PAGE} from "@/utils/app-constant";

import './header.scss'

// eslint-disable-next-line react/no-multi-comp
const Header: Taro.FC = ({children}) => {

  const {tokenStore,userStore} =  useStores()
  const toAuth = useCallback(() => {
    if(tokenStore.authed) {
    return navigateTo({url: USER_PAGE})
    }
    navigateTo({url: LOGIN_PAGE})
    // eslint-disable-next-line
  }, [])

  const {authed} = tokenStore
  const {avatar} = userStore
  return (
    <View className='nav-header'>
      <View className='nav-leading'><DefaultLogo /></View>
      <View className='nav-title'>{children}</View>
      <View className='nav-actions'>
        <View onClick={toAuth}>
          {authed ? <AtAvatar size='small' circle className='mg-avatar'
            image={avatar}
          />: <AtIcon  value='user' className='mg-search' />}

        </View>
        <AtIcon className='mg-search' value='search'></AtIcon>
      </View>
    </View>
  )
}


export default observer(Header)
