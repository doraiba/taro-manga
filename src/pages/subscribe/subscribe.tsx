/**
 * 个人中心->我的订阅
 */
import Taro, {useState, usePullDownRefresh} from '@tarojs/taro'
import {Block, View} from '@tarojs/components'
import {AtSearchBar} from 'taro-ui';
import {observer} from '@tarojs/mobx';

import './subscribe.scss'

const Subscribe: Taro.FC = () => {

  usePullDownRefresh(()=>{
    console.log("usePullDownRefresh")
  })

  const [searchParam, setSearchParam] = useState(()=>'')

  return (
    <Block>
      <AtSearchBar
        value={searchParam}
        onChange={setSearchParam}
      />

      <View className={`mg-shadow mg-shadow-${searchParam&&'open'}`}>

      </View>
      <View className='mg-subscribe'>

      </View>
    </Block>)
}
Subscribe.config = {
  navigationBarTitleText: '我的订阅',
  enablePullDownRefresh: true
}

export default observer(Subscribe)
