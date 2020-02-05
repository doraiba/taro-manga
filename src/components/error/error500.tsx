import Taro from '@tarojs/taro'
import {Block} from '@tarojs/components'
import {AtCard, AtIcon} from 'taro-ui'

import './error500.scss'

const Error500: Taro.FC = () => {
  return <Block>
    <AtCard
      isFull
      title='出现错误啦'
    >
      <AtIcon value='clock' className='mg-full-img' color='#F00' />

    </AtCard>
  </Block>
}
export default Error500
