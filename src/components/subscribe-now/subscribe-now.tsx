import Taro, {
  useEffect,
  useCallback,
  useReducer,
  useMemo,
  navigateTo,
  Reducer,
} from '@tarojs/taro'
import {observer, useAsObservableSource} from '@tarojs/mobx';
import useAxios from "axios-hooks";
import {parsePath} from "@/utils";
import {SUBSCRIBE, SUBSCRIBE_ADD, SUBSCRIBE_CANCEL, Ver} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";
import dayjs from "dayjs";
import {AtButton} from "taro-ui";
import {autorun} from "mobx";
import {AtButtonProps} from "taro-ui/@types/button";
import {LOGIN_PAGE} from "@/utils/app-constant";
import qs from 'query-string'

type ActionType = 'REQUEST_ADD' | 'REQUEST_CANCEL'

type SubscribeNowProps = {
  oid: number | string, //漫画id
  timestamp?: number //通知刷新用
} & Omit<AtButtonProps, 'onClick' | 'loading'>

const SubscribeNow: Taro.FC<SubscribeNowProps> = (ignore) => {
  const {timestamp, oid, ...props} = ignore
  const source = useAsObservableSource({timestamp, oid})
  const {tokenStore} = useStores()

  const [{loading}, reFetch] = useAxios<MGResult>({url: parsePath(SUBSCRIBE, source)}, {manual: true})
  const [{loading: subLoading}, refetch] = useAxios<MGResult>({}, {manual: true})

  useEffect(() => autorun(() => tokenStore.authed && reFetch({params: {timestamp: source.timestamp}})), [])

  const initialState = useMemo(() => ({
    status: -1,
    tag: '加载中'
  }), [])
  const reducer: Reducer<typeof initialState, { type: ActionType, payload?: typeof initialState }> = useCallback((state: typeof initialState, {type}) => {
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
    if (state.status === -1) return;
    if (state.status === 0) {
      await refetch({url: parsePath(SUBSCRIBE_CANCEL, {oid})})
      dispatch({type: "REQUEST_ADD"})
    }
    if (state.status === 1) {
      await refetch({
        url: parsePath(SUBSCRIBE_ADD, {oid}),
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-encoded'},
        data: tokenStore.parseAuth(qs.stringify({
          channel: 'ios',
          version: Ver,
          obj_ids: oid,
          type: 'mh',
          uid: '{uid}'
        }))
      })
      dispatch({type: "REQUEST_CANCEL"})
    }
  }, [oid, refetch, state.status, tokenStore])

  useEffect(() => {
    reFetch().then(({data: {result}}) => {
      dispatch({type: result === 1 ? "REQUEST_CANCEL" : "REQUEST_ADD"})
    })
  }, [])

  const buttonLoading = loading || subLoading

  return (<AtButton {...props} loading={buttonLoading} onClick={handleClick}>{state.tag}</AtButton>)
}

SubscribeNow.defaultProps = {
  timestamp: dayjs().unix(),
  size: 'small',
}

export default observer(SubscribeNow)
