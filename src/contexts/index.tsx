import Taro from '@tarojs/taro';
import CounterStore from '@/store/counter'

export const stores = {counterStore: new CounterStore()};

const storesContext = Taro.createContext(stores)
export default storesContext
