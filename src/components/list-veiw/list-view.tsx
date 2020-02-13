import Taro, {useEffect, useMemo} from "@tarojs/taro";
import {observer, useAsObservableSource, useLocalStore} from '@tarojs/mobx'
import {Block, View} from "@tarojs/components";
import useAxios from 'axios-hooks'
import {action, autorun} from "mobx";
import {isFunction} from "@/utils";
import {AtActivityIndicator} from "taro-ui";
import useScrollToLower4Event from "@/hooks/useScrollToLower4Event";
import useScrollToUpper4Event from "@/hooks/useScrollToUpper4Event";
import EventCenter,{EventDefine} from '@/utils/event-center'

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
const ListView: Taro.FC<ListProps> = ({fetchCondition, convert, psize, initial, url, search, renderList}) => {
  const observableSource = useAsObservableSource({url, search, initial, psize}) as Required<CustomProps>;
  const [{error, loading}, refetch] = useAxios({}, {manual: true});
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
      EventCenter.trigger(EventDefine.ScrollToUpperFetchEnd)
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

  useScrollToLower4Event((e) => {
    if (!(fetchCondition) || fetchCondition(e))
      store.forward()
  })

  useScrollToUpper4Event((e)=>{
    if (!(fetchCondition) || fetchCondition(e))
      store.refresh()
  })

  const {list = [], hasMore} = store

  return (
    <Block>
      {error && <View>加载出错</View>}
      {renderList([...list])}
      {((loading || hasMore) && !error) &&
      <AtActivityIndicator className='at-row__justify--center' color='#0094ff' size={50} content='Loading...' />}
    </Block>
  );
}

ListView.defaultProps = {
  fetchCondition: () => true,
  initial: 0,
  psize: 10
}

export default observer(ListView);
