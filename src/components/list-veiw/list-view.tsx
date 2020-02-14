import Taro, {useEffect, useMemo} from "@tarojs/taro";
import {observer, useAsObservableSource, useLocalStore} from '@tarojs/mobx'
import {Block} from "@tarojs/components";
import useAxios from 'axios-hooks'
import {action, autorun, reaction} from "mobx";
import {isFunction} from "@/utils";
import TaroList from "taro-list";
import dayjs from "dayjs";

type CustomProps = {
  timestamp?: number,
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
const ListView: Taro.FC<ListProps> = ({ className,convert,timestamp, psize, initial, url, search, renderList}) => {
  const observableSource = useAsObservableSource({url, search, initial, timestamp,psize}) as Required<CustomProps>;
  const [, refetch] = useAxios({}, {manual: true});
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
      let remoteURL: string = source.url as string
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
  useEffect(()=>reaction(()=>observableSource.timestamp,store.refresh),[])
  //  eslint-disable-next-line
  useEffect(() => autorun(() => store.fetch(store.currPage, store.refreshCount)), []);

  const {list = [], hasMore} = store

  return (
    <Block>
      <TaroList className={className} height='100%'
        dataManager={undefined as any} enableBackToTop
        onRefresh={async (stop)=>{ try { await store.refresh() }finally {stop()}}}
        onLoadMore={()=>hasMore && store.forward()}
      >
        {renderList([...list])}
      </TaroList>
    </Block>
  );
}
ListView.defaultProps = {
  initial: 0,
  psize: 10,
  timestamp: dayjs().unix()
}
ListView.options={
  addGlobalClass: true
}
export default observer(ListView);
