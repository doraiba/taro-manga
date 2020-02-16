/**
 * 注册页面
 */
import Taro, {Reducer, useCallback, useMemo, useReducer} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import {AtButton, AtForm, AtInput, AtMessage} from 'taro-ui'
import useFormal from '@kevinwolf/formal'
import * as yup from 'yup'
import logo from '@/asset/image/logo.png'
import useAxios from 'axios-hooks'
import {CAPTCHA, REGISTER} from "@/contexts/manga-api";
import {navigateToLogin} from "@/utils/app-constant";
import axios from 'taro-axios'
import {createFormData, parsePath} from "@/utils";

import './register.scss'

type ActionType = 'UN_SEND' | 'SEND'

const Register: Taro.FC = () => {


  const [, refetch] = useAxios<MGResult<MangaToken>>(REGISTER, {manual: true})

  const schema = yup.object().shape({
    tel: yup.string().required('请输入手机号'),
    valid_code: yup.string().required('请输入验证码'),
    passwd: yup.string().required('请输入密码'),
  });

  const initialValues = useMemo(() => ({
    tel: "",
    valid_code: "",
    passwd: "",
  }), []);
  const formal = useFormal(initialValues, {
    schema,
    onSubmit: async (values) => {
      const {headers,data} = createFormData(values)
      const {data: {result, msg}} = await refetch({
        method: 'post',headers, data
      })
      if (!result) return Taro.atMessage({
        'message': msg,
        'type': 'error',
      })
      navigateToLogin()
    }
  });

  const toLogin = useCallback(navigateToLogin,[])

  const {submit, change, errors, isSubmitting, getSubmitButtonProps,values} = formal

  const reducer: Reducer<{status: 0|1,text: string},{type: ActionType,payload?: number}> = function (state, {type, payload}) {
    switch (type) {
      case 'SEND':
        return {status: 1, text: `${payload}s`}
      case "UN_SEND":
        return {status: 0, text: `再来一次`}
    }
    return state
  }

  const [state, dispatch] = useReducer(reducer,{status: 0,text: '发送验证码'})

  const handleSendCaptcha = useCallback(async ()=>{
    if(state.status === 1) return ;
    if((!values.tel) || values.tel.length !== 11) return Taro.atMessage({message: '可怜啊,手机号都不知道是个啥', type: 'error'})
    const {data: {code, msg}} = await axios.get<MGResult>(parsePath(CAPTCHA,values))
    const valid = code === 0
    !valid && Taro.atMessage({message: msg, type: 'error'})
    valid && ~function sender(timer: number){
      if(timer === 0) return dispatch({type: "UN_SEND"})
      setTimeout(()=>{
        dispatch({type: "SEND", payload: timer})
        sender(--timer)
      },1000)
    }(60)
  },[state, values])

  return (
    <View className='mg-login'>
      <AtMessage />
      <View className='mg-logo-wrapper'>
        <Image className='mg-logo' src={logo} />
      </View>
      <AtForm className='mg-login-form'>
        <AtInput clear maxLength={11} placeholder='请输入手机号' error={!!errors.tel} name='nickname' value={values.tel}
          onChange={(e) => change('tel', e)} onErrorClick={() => Taro.atMessage({message: errors.tel + '', type: 'error'})}
        >
          <View className={`captcha ${state.status === 1 ? 'at-tag--disabled' : ''}`} onClick={handleSendCaptcha}>{state.text}</View>
        </AtInput>
        <AtInput
          name='valid_code'
          value={values.valid_code}
          clear
          title='验证码'
          type='text'
          maxLength='6'
          placeholder='验证码'
          error={!!errors.valid_code}
          onErrorClick={() => Taro.atMessage({message: errors.valid_code + '', type: 'error'})}
          onChange={(e) => change('valid_code', e)}
        />
        <AtInput clear title='密码' placeholder='请输入密码' error={!!errors.passwd} name='password' value={values.passwd}
          onChange={(e) => change('passwd', e)} onErrorClick={() => Taro.atMessage({message: errors.passwd + '', type: 'error'})} type='password'
        />
        <View className='at-row at-row__justify--around'>
          <AtButton className='at-col' onClick={toLogin}>→ 登录</AtButton>
          <AtButton className='at-col' loading={isSubmitting} onClick={submit} {...getSubmitButtonProps()}>注册</AtButton>
        </View>
      </AtForm>
    </View>
  )
}
Register.config = {
  navigationBarTitleText: '注册'
}

export default Register
