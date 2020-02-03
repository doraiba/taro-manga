import Taro from '@tarojs/taro'
import {SyncStorage} from 'mobx-sync'

export default class TaroSyncStorage implements SyncStorage {
  getItem(key: string): string | null {
    return Taro.getStorageSync(key)
  }
  setItem(key: string, value: string): void {
    Taro.setStorageSync(key, value)
  }
  removeItem(key: string): void {
    Taro.removeStorageSync(key)
  }


}
