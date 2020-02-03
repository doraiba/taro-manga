import Taro, { useCallback, useEffect } from '@tarojs/taro'
// import { View, Button, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtNavBar } from 'taro-ui'
// import { useAxios } from 'use-axios-client'
import './index.scss'

const Index: Taro.FC = () => {


  // const { data, error, loading } = useAxios({
  //   url: 'https://v3api.dmzj.com/v3/recommend.json?channel=ios&version=3.0.2',
  // });

  // useEffect(() => {
  //   console.log(error, data, loading)
  // }, [data, error, loading])

  const handleClick = useCallback((e) => {
    console.log(e)
  }, [])

  return (
    <AtNavBar
      onClickRgIconSt={handleClick}
      onClickRgIconNd={handleClick}
      onClickLeftIcon={handleClick}
      color='#000'
      title='NavBar 导航栏示例'
      leftText='返回'
      rightFirstIconType='bullet-list'
      rightSecondIconType='user'
    />

  )
}
Index.config = {
  navigationBarTitleText: '首页'
}

export default observer(Index)
