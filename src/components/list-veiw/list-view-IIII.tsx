import Taro, {useEffect, useMemo} from "@tarojs/taro";
import {observer, useAsObservableSource, useLocalStore} from '@tarojs/mobx'
import {Block} from "@tarojs/components";
import useAxios from 'axios-hooks'
import {action, autorun} from "mobx";
import {isFunction} from "@/utils";
import TaroListView from "taro-listview";

type CustomProps = {
  className?: string,
  initial?: number,
  psize?: number,
  url: ((number) => string) | string,
  convert?: (any) => any,
  search?: Record<string, any>,
  renderList: (any) => React.ReactElement
};


type ListProps = CustomProps;
/**
 * 分页加载
 * @param fetchCondition
 * @param convert
 * @param psize
 * @param initial
 * @param url
 * @param search
 * @param renderList
 * @constructor
 */
const ListView: Taro.FC<ListProps> = ({ className,convert, psize, initial, url, search, renderList}) => {
  const observableSource = useAsObservableSource({url, search, initial, psize}) as Required<CustomProps>;
  const [{error}, refetch] = useAxios({}, {manual: true});
  const initialPage = useMemo(() => observableSource.initial, [observableSource.initial]);
  const store = useLocalStore<StoreType, Required<CustomProps>>((source) => ({
    currPage: initialPage,
    get pageSize(){ return source.psize },
    get search(){ return source.search },
    refreshCount: 0,
    list: [],
    totalPage: -1,
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    fetch: action(async function (page: number, _refreshCount?: number) {
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
      this.list = page === initialPage ?list : [...this.list, ...list];
      this.totalPage = totalPage;
      this.hasMore = list.length === this.pageSize
    }),
    forward: action(function (this: StoreType) {
      if (this.hasMore)
        ++this.currPage;
    }),
    refresh: action(function (this: StoreType) {
      this.currPage = initialPage;
      this.refreshCount = this.refreshCount + 1;
    }),
    retry: action(function (this: StoreType) {
      this.list = [];
      this.refresh();
    }),
    hasMore: true
  }), observableSource);

  //  eslint-disable-next-line
  useEffect(() => autorun(() => store.fetch(store.currPage, store.refreshCount)), []);

  const {list = [], hasMore} = store

  return (
    <Block>
      <TaroListView className={className}
        hasMore={hasMore} isError={!!error} isEmpty={!list.length}
        onPullDownRefresh={async (stop)=>{ try { await store.refresh() }finally {stop()}}}
        onScrollToLower={async (stop)=>{ try { await store.forward() }finally {stop()}}}
      >
        {renderList([...list])}
      </TaroListView>
    </Block>
  );
}
ListView.defaultProps = {
  initial: 0,
  psize: 10
}
ListView.options={
  addGlobalClass: true
}
export default observer(ListView);
