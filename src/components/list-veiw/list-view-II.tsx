import Taro, {useEffect, useMemo} from "@tarojs/taro";
import {observer, useAsObservableSource, useLocalStore} from '@tarojs/mobx'
import {Block, View} from "@tarojs/components";
import useAxios from 'axios-hooks'
import {autorun} from "mobx";
import {isFunction} from "@/utils";
import useScrollToLower4Event from "@/hooks/useScrollToLower4Event";


type CustomProps = {
  fetchCondition?: (any) => boolean
  initial?: number,
  psize?: number,
  url: ((number) => string) | string,
  convert?: (any) => any,
  search?: Record<string, any>,
  renderList: (any) => React.ReactElement
};


type ListProps = CustomProps;

const ListViewII: Taro.FC<ListProps> = ({fetchCondition, convert, psize, initial, url, search, renderList}) => {
  const observableSource = useAsObservableSource({url, search, initial, psize}) as Required<CustomProps>;
  const [{error, loading}, refetch] = useAxios({}, {manual: true});
  const initialPage = useMemo(() => observableSource.initial, [observableSource.initial]);
  const store = useLocalStore<StoreType, Required<CustomProps>>((source) => ({
    currPage: initialPage,
    pageSize: source.psize,
    refreshCount: 0,
    list: [],
    search: source.search || {},
    totalPage: -1,
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    fetch: (async function (page: number, _refreshCount?: number) {
      let remoteURL: string = url as string
      if (isFunction(url)) {
        remoteURL = url(page) as string
      }
      remoteURL = remoteURL.replace('{0}', `${page}`)
      const response = await refetch({
        method: "get",
        url: remoteURL,
        params: this.search
      });
      const {list, totalPage} = convert ? convert(response) : {list: response.data, totalPage: 0}
      if (!list) return;
      this.list = [...this.list, ...list];
      this.totalPage = totalPage;
      this.hasMore = list.length === this.pageSize

    }),
    forward: (function (this: StoreType) {
      if (this.hasMore)
        ++this.currPage;
    }),
    refresh: (function (this: StoreType) {
      this.currPage = initialPage;
      this.refreshCount = this.refreshCount + 1;
    }),
    retry: (function (this: StoreType) {
      this.list = [];
      this.refresh();
    }),
    hasMore: true
  }), observableSource);

  //  eslint-disable-next-line
  useEffect(() => autorun(() => store.fetch(store.currPage, store.refreshCount)), []);

  useScrollToLower4Event((e) => {
    if (!(fetchCondition) || fetchCondition(e))
      store.forward()
  })
  const {list} = store
  return (<Block>
    {(loading || error) && <View>加载中</View>}
    {renderList([...list])}
  </Block>);
}

ListViewII.defaultProps = {
  fetchCondition: () => true,
  initial: 0,
  psize: 10
}

export default observer(ListViewII);
