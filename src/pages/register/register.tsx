import Taro, {useMemo} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import {AtButton, AtForm, AtInput, AtMessage} from 'taro-ui'
import useFormal from '@kevinwolf/formal'
import * as yup from 'yup'
import logo from '@/asset/image/logo.png'
import useAxios from 'axios-hooks'
import {REGISTER} from "@/contexts/manga-api";
import qs from 'query-string';
import {LOGIN_PAGE} from "@/utils/app-constant";

import './register.scss'

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
      const {data: {result, msg}} = await refetch({method: 'post', data: qs.stringify(values),headers: {'Content-Type': 'multipart/form-data'}})

      if (!result) return Taro.atMessage({
        'message': msg,
        'type': 'error',
      })

      Taro.redirectTo({url: LOGIN_PAGE})
    }
  });
  const {submit, change, errors, isSubmitting, getSubmitButtonProps} = formal

  return (
    <View className='mg-login'>
      <AtMessage />
      <View className='mg-logo-wrapper'>
        <Image className='mg-logo' src={logo} />
      </View>
      <AtForm className='mg-login-form'>
        <AtInput clear maxLength={11} placeholder='请输入手机号' error={!!errors.tel} name='nickname'
          onChange={(e) => change('tel', e)} onErrorClick={() => Taro.atMessage({message: errors.tel + '', type: 'error'})}
        >
          <View>发送验证码</View>
        </AtInput>
        <AtInput
          name='valid_code'
          clear
          title='验证码'
          type='text'
          maxLength='6'
          placeholder='验证码'
          error={!!errors.valid_code}
          onErrorClick={() => Taro.atMessage({message: errors.valid_code + '', type: 'error'})}
          onChange={(e) => change('valid_code', e)}
        />
        <AtInput clear title='密码' placeholder='请输入密码' error={!!errors.passwd} name='password'
          onChange={(e) => change('passwd', e)} onErrorClick={() => Taro.atMessage({message: errors.passwd + '', type: 'error'})} type='password'
        />
        <View className='at-row at-row__justify--around'>
          <AtButton className='at-col' onClick={()=> Taro.navigateTo({url: LOGIN_PAGE})}>登录→</AtButton>
          <AtButton className='at-col' loading={isSubmitting} onClick={submit} {...getSubmitButtonProps()}>注册</AtButton>
        </View>
      </AtForm>
    </View>
  )
}
Register.config = {
  navigationBarTitleText: '登录'
}

export default Register
