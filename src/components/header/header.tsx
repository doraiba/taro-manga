import Taro, {useCallback} from '@tarojs/taro'
import {View} from "@tarojs/components";
import DefaultLogo from "@/components/header/component/default-logo/default-logo";
import {AtAvatar, AtIcon} from "taro-ui";
import useStores from "@/hooks/use-stores";
import {observer} from '@tarojs/mobx';
import {navigateToLogin, navigateToSearchManga, navigateToUser} from "@/utils/app-constant";

import './header.scss'

/**
 * 主页头部信息
 * @param children
 * @constructor
 */
const Header: Taro.FC = ({children}) => {

  const {tokenStore,userStore} =  useStores()
  const toAuth = useCallback(() => {
    if(tokenStore.authed) {
    return navigateToUser()
    }
    navigateToLogin()
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
        <AtIcon className='mg-search' value='search' onClick={navigateToSearchManga} />
      </View>
    </View>
  )
}


export default observer(Header)
