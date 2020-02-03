import Taro from '@tarojs/taro'
import {AsyncStorage} from 'mobx-sync'

export default class TaroAsyncStorage implements AsyncStorage {
  getItem(key: string): Promise<string | null> {
    return Taro.getStorage({key}).then(e => e.data)
  }
  setItem(key: string, value: string): Promise<void> {
    return Taro.setStorage({key, data: value}).then(() => {})
  }
  removeItem(key: string): Promise<void> {
    return Taro.removeStorage({key}).then(() => {})
  }




}
