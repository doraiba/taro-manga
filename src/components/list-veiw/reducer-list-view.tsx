import Taro, {useCallback, useEffect, useMemo, useReducer,useRef} from "@tarojs/taro";
import {Block} from "@tarojs/components";
import useAxios from 'axios-hooks'
import {isFunction} from "@/utils";
import TaroList from "taro-list";
import dayjs from "dayjs";

type ListProps = {
  timestamp?: number,
  className?: string,
  initial?: number,
  psize?: number,
  url: ((number) => string) | string,
  convert?: (any) => any,
  search?: Record<string, any>,
  renderList: (any) => React.ReactElement
};

type ListViewAction = 'REFRESH' | 'FORWARD' | 'STORE'

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

  const [, refetch] = useAxios({}, {manual: true});

  const initialState = useMemo(()=>({
    curPage: initial as number,
    list: [] as any[],
    hasMore: true
  }),[initial])

  function reducer(state: typeof initialState, {type, payload: {list = [], hasMore}={}}: {type: ListViewAction, payload?: Partial<typeof initialState>}){
    switch (type) {
      case "STORE":
        return {...state,list: [...state.list,...list],hasMore: hasMore}
      case "REFRESH":
        return {...state, curPage: initial}
      case "FORWARD":
        return {...state, curPage: state.curPage + 1}
    }
    return state
  }

  const [{curPage, hasMore, list}, dispatch] = useReducer(reducer, initialState);

  const fetch = useCallback(async (page: number) => {

    let remoteURL: string = url as string
    if (isFunction(url)) {
      remoteURL = url(page) as string
    }
    remoteURL = remoteURL.replace('{0}', `${page}`)
    const response = await refetch({
      method: "get",
      url: remoteURL,
      params: search
    });
    const {list: dataList} = convert ? convert(response) : {list: response.data}
    if (!dataList) return;
    dispatch({type: "STORE", payload: {list: page === initial ?dataList : dataList, hasMore: dataList.length === psize}})
  },[url, refetch, search, convert, initial, psize])

  useEffect(()=>{

    fetch(curPage as number)
  },[curPage, fetch])

  const loadRef = useRef(false)
  useEffect(()=>{
    if(!loadRef.current){
      loadRef.current = true
      return;
    }
    dispatch({type: 'REFRESH'})
  },[timestamp])

  return (
    <Block>
      <TaroList className={className} height='100%'
        dataManager={undefined as any} enableBackToTop
        onRefresh={async (stop)=>{ try { dispatch({type: 'REFRESH'}) }finally {stop()}}}
        onLoadMore={()=>hasMore && dispatch({type: 'FORWARD'})}
      >
        {renderList(list)}
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
export default ListView;
