import Taro, {
  useEffect,
  useCallback,
  useReducer,
  useMemo,
  navigateTo,
  Reducer,
  ReducerAction,
  ReducerState
} from '@tarojs/taro'
import {observer, useAsObservableSource} from '@tarojs/mobx';
import useAxios from "axios-hooks";
import {parsePath} from "@/utils";
import {SUBSCRIBE} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";
import dayjs from "dayjs";
import {AtButton} from "taro-ui";
import {autorun} from "mobx";
import {AtButtonProps} from "taro-ui/@types/button";
import {LOGIN_PAGE} from "@/utils/app-constant";

type ActionType = 'REQUEST_ADD' | 'REQUEST_CANCEL'

type SubscribeNowProps = {
  oid: number | string, //漫画id
  timestamp?: number //通知刷新用
} & Omit<AtButtonProps, 'onClick' | 'loading'>

const SubscribeNow: Taro.FC<SubscribeNowProps> = (ignore) => {
  const {timestamp, oid, ...props} = ignore
  const source = useAsObservableSource({timestamp, oid})
  const {tokenStore} = useStores()

  const [{loading, data = {} as MGResult}, reFetch] = useAxios<MGResult>({url: parsePath(SUBSCRIBE, source)}, {manual: true})
  const [{loading: subLoading, data: subData = {} as MGResult}, refetch] = useAxios<MGResult>({}, {manual: true})

  useEffect(() => autorun(() => tokenStore.authed && reFetch({params: {timestamp: source.timestamp}})), [])

  const initialState = useMemo(() => ({
    status: -1,
    tag: '加载中'
  }), [])
  const reducer: Reducer<typeof initialState, { type: ActionType, payload?: typeof initialState }> = useCallback((state: typeof initialState, {type, payload}) => {
    switch (type) {
      case "REQUEST_ADD":
        return {...state, ...{tag: '取消订阅', status: 0}}
      case "REQUEST_CANCEL":
        return {...state, ...{tag: '立即订阅', status: 1}}
      default:
        return state
    }
  }, [initialState])

  const [state, dispatch] = useReducer(reducer, initialState)
  const handleClick = useCallback(async () => {
    if (!tokenStore.authed) {
      return await navigateTo({url: LOGIN_PAGE})
    }


  }, [])

  useEffect(() => {

  }, [data])

  const {data: isSubscribe} = data
  return (<AtButton {...props} loading={loading} onClick={handleClick}>{state.tag}</AtButton>)
}

SubscribeNow.defaultProps = {
  timestamp: dayjs().unix(),
  size: 'small',
}

export default observer(SubscribeNow)
