/**
 * 个人中心->我的订阅
 */
import Taro from '@tarojs/taro'
import {Block, View} from '@tarojs/components'
import {observer} from '@tarojs/mobx';

import './subscribe.scss'

const Subscribe: Taro.FC = () => {

  return (
    <Block>
      <View>TODO订阅记录</View>
    </Block>)
}
Subscribe.config = {
  navigationBarTitleText: '我的订阅',
  enablePullDownRefresh: true
}

export default observer(Subscribe)
