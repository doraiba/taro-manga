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

const ListView: Taro.FC<ListProps> = ({fetchCondition, convert, psize = 10, initial = 0, url, search, renderList}) => {
  const observableSource = useAsObservableSource({url, search, initial, psize}) as Required<CustomProps>;
  const [{error, loading}, refetch] = useAxios({}, {manual: true});
  const initialPage = useMemo(() => initial, [initial]);
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
      console.log(this.list, 'before')
      this.list = [...this.list, ...list];
      console.log(this.list, 'after')
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

  const {currPage, totalPage, list} = store
  return (<Block>
    {error && <View>重试</View>}
    {(loading && currPage === initialPage) && <View>加载中</View>}
    <Block>
      {renderList([...list])}
      {(!loading && totalPage === 0 && !error) && <View>刷新</View>}
    </Block>
  </Block>);
}

ListView.defaultProps = {
  fetchCondition: () => true
}

export default observer(ListView);
