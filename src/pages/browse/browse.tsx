import Taro, {useRouter} from '@tarojs/taro'
import {Block, View} from '@tarojs/components'
import {observer} from '@tarojs/mobx';


const Browse: Taro.FC = () => {
  const {params} = useRouter()
  return (
    <Block>
      <View>{JSON.stringify(params)}</View>
    </Block>)
}
Browse.config = {
}

export default observer(Browse)
