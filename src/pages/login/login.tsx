import Taro, {useMemo, useCallback} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import {AtButton, AtForm, AtInput, AtMessage} from 'taro-ui'
import useFormal from '@kevinwolf/formal'
import * as yup from 'yup'
import logo from '@/asset/image/logo.png'
import useAxios from 'axios-hooks'
import {LOGIN} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";
import qs from 'query-string';
import {INDEX_PAGE, REGISTER_PAGE} from "@/utils/app-constant";

import './login.scss'

const Login: Taro.FC = () => {

  const {tokenStore} = useStores()

  const [, refetch] = useAxios<MGResult<MangaToken>>(LOGIN, {manual: true})

  const schema = yup.object().shape({
    nickname: yup.string().required('请输入用户名/手机号'),
    passwd: yup.string().required('请输入密码')
  });

  const initialValues = useMemo(() => ({
    nickname: "",
    passwd: "",
    channel: "ios",
    version: "3.0.2"
  }), []);
  const formal = useFormal(initialValues, {
    schema,
    onSubmit: async (values) => {
      const {data: {result, msg, data}} = await refetch({method: 'post', data: qs.stringify(values),headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

      if (!result) return Taro.atMessage({
        'message': msg,
        'type': 'error',
      })

      tokenStore.setMangaToken(data)
      Taro.redirectTo({url: INDEX_PAGE})
    }
  });
  const toRegister = useCallback(()=>{
    Taro.navigateTo({url: REGISTER_PAGE})
  },[])

  const {submit, change, errors, isSubmitting, getSubmitButtonProps} = formal

  return (
    <View className='mg-login'>
      <AtMessage />
      <View className='mg-logo-wrapper'>
        <Image className='mg-logo' src={logo} />
      </View>
      <AtForm className='mg-login-form'>
        <AtInput clear maxLength={11} title='账号' placeholder='请输入用户名/手机号' error={!!errors.nickname} name='nickname'
          onChange={(e) => change('nickname', e)} onErrorClick={() => Taro.atMessage({message: errors.nickname + '', type: 'error'})}
        />
        <AtInput clear title='密码' placeholder='请输入密码' error={!!errors.passwd} name='password'
          onChange={(e) => change('passwd', e)} onErrorClick={() => Taro.atMessage({message: errors.passwd + '', type: 'error'})} type='password'
        />
        <View className='at-row at-row__justify--around'>
          <AtButton className='at-col' onClick={toRegister}>→ 注册</AtButton>
          <AtButton className='at-col' loading={isSubmitting} onClick={submit} {...getSubmitButtonProps()}>登录</AtButton>
        </View>
      </AtForm>
    </View>
  )
}
Login.config = {
  navigationBarTitleText: '登录'
}

export default Login
