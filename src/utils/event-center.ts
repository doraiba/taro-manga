import Taro from '@tarojs/taro'

export default Taro.eventCenter

export class EventDefine {
  static ScrollToLowerEvent = 'ScrollToLowerEvent'
  static ScrollToUpperEvent = 'ScrollToUpperEvent'
}

