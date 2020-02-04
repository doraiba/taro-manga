import Taro from '@tarojs/taro';
import storesContext from '@/contexts'

const useStores = () => {
  return Taro.useContext(storesContext)
}
export type IStores = ReturnType<typeof useStores>

export default useStores
