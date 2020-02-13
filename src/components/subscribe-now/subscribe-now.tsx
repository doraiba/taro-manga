import Taro, {navigateTo, Reducer, useCallback, useEffect, useMemo, useReducer,} from '@tarojs/taro'
import {observer, useAsObservableSource} from '@tarojs/mobx';
import useAxios from "axios-hooks";
import {parsePath} from "@/utils";
import {SUBSCRIBE, SUBSCRIBE_ADD, SUBSCRIBE_CANCEL} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";
import dayjs from "dayjs";
import {AtButton} from "taro-ui";
import {autorun} from "mobx";
import {AtButtonProps} from "taro-ui/@types/button";
import {LOGIN_PAGE} from "@/utils/app-constant";
import qs from 'query-string'

type ActionType = 'REQUEST_ADD' | 'REQUEST_CANCEL' | 'NEED_LOGIN'

type SubscribeNowProps = {
  oid: number | string, //漫画id
  timestamp?: number //通知刷新用
} & Omit<AtButtonProps, 'onClick' | 'loading'>
/**
 * 漫画详情页-订阅按钮
 * @param ignore
 * @constructor
 */
const SubscribeNow: Taro.FC<SubscribeNowProps> = (ignore) => {
  const {timestamp, oid, ...props} = ignore
  const source = useAsObservableSource({timestamp, oid})
  const {tokenStore} = useStores()

// 初始状态
  const initialState = useMemo(() => ({
    status: -1,
    tag: '⊙ˍ⊙'
  }), [])
  // reducer
  const reducer: Reducer<typeof initialState, { type: ActionType, payload?: typeof initialState }> = useCallback((state: typeof initialState, {type}) => {
    switch (type) {
      case "REQUEST_ADD":
        return {...state, ...{tag: '取消订阅', status: 0}}
      case "REQUEST_CANCEL":
        return {...state, ...{tag: '立即订阅', status: 1}}
      case "NEED_LOGIN":
        return {...state, ...{tag: '→ 登录'}}
      default:
        return state
    }
  }, [initialState])

  const [state, dispatch] = useReducer(reducer, initialState)

  // 请求订阅信息
  const [{loading, data}, reFetch] = useAxios<MGResult>({url: parsePath(SUBSCRIBE, source)}, {manual: true})
  // 待请求 订阅或取消
  const [{loading: subLoading}, refetch] = useAxios<MGResult>({}, {manual: true})

  // 根据父组件传递的时间戳进行刷新
  useEffect(() => autorun(() => tokenStore.authed && reFetch({params: {timestamp: source.timestamp}})), [])

  // 刷新状态解析
  useEffect(() => {
    if(!tokenStore.authed){
      dispatch({type: "NEED_LOGIN"})
      return;
    }
    if (data) {
      dispatch({type: data.code === 1 ? "REQUEST_CANCEL" : "REQUEST_ADD"})
    }
  }, [data])


  const handleClick = useCallback(async () => {
    if (!tokenStore.authed) {
      return await navigateTo({url: LOGIN_PAGE})
    }

    // 初始状态
    if (state.status === -1) return;
    // 未订阅状态
    if (state.status === 1) {
      const {data: {code}} = await refetch({
        url: parsePath(SUBSCRIBE_ADD, {oid}),
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify({
          channel: 'ios',
          version: '3.0.2',
          obj_ids: oid,
          type: 'mh',
          uid: tokenStore.uid,
          dmzj_token: tokenStore.token
        })
      })
      return code === 0 && dispatch({type: "REQUEST_ADD"})
    }
    // 订阅状态
    if (state.status === 0) {
      const {data: {code}} = await refetch({url: parsePath(SUBSCRIBE_CANCEL, {oid})})
      return code === 0 && dispatch({type: "REQUEST_CANCEL"})
    }
  }, [oid, refetch, state.status, tokenStore])

  const buttonLoading = loading || subLoading

  return (<AtButton {...props} loading={buttonLoading} onClick={handleClick}>{state.tag}</AtButton>)
}

SubscribeNow.defaultProps = {
  timestamp: dayjs().unix(),
  size: 'small',
}

export default observer(SubscribeNow)
