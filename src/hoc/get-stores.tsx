import Taro from "@tarojs/taro";
import {observer} from "@tarojs/mobx";
import useStores, {IStores} from "@/hooks/use-stores";
import {Block} from "@tarojs/components";

/**
 * hoc组件: 获取mobx store
 * @param renderFC
 * @constructor
 */
const GetStores: Taro.FC<{ renderFC: (iStores: IStores) => React.ReactElement }> = ({renderFC}) => {
  if (typeof renderFC !== 'function')
    throw Error('only support function children!');
  const stores = useStores();
  return <Block>{renderFC(stores)}</Block>;
};

export default observer(GetStores);
