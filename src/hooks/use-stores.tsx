import Taro from '@tarojs/taro';
import storesContext from '../contexts'

const useStores = () => Taro.useContext(storesContext)
export default useStores
