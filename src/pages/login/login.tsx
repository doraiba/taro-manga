/**
 * 登录页面
 */
import Taro, {useCallback, useMemo,useState} from '@tarojs/taro'
import {Image, View, Button} from '@tarojs/components'
import {AtButton, AtForm, AtInput, AtMessage, AtModal, AtModalAction, AtModalContent, AtModalHeader} from 'taro-ui'
import useFormal from '@kevinwolf/formal'
import * as yup from 'yup'
import logo from '@/asset/image/logo.png'
import useAxios from 'axios-hooks'
import {LOGIN} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";
import qs from 'query-string';
import {navigateToIndex, navigateToRegister, ORIGINAL_IMAGE_SERVER, PROXY_IMAGE_SERVER} from "@/utils/app-constant";
import {ITouchEvent} from "@tarojs/components/types/common";
import './login.scss'

const Login: Taro.FC = () => {

  const {tokenStore, otherStore} = useStores()

  const [isOpened, setIsOpened] =  useState(() => false)
  const [proxyURL, setProxyURL] =  useState(() => '')
  const handleTouch = useCallback((()=>{
    let timer = 0;
    return (e: ITouchEvent) => {
      // if(otherStore.debug) return
      const {type, timeStamp} = e
      if(type === 'touchstart') {
        timer = timeStamp
      } else
      if(type === 'touchend') {
        const t = timeStamp - timer
        if(t > 3000) {setIsOpened(()=> true)}
      }
    }
  })(),[])

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
      navigateToIndex({redirect: true})
    }
  });
  const toRegister = useCallback(()=>{
    navigateToRegister()
  },[])

  const {submit, change, errors, isSubmitting, getSubmitButtonProps} = formal

  return (
    <View className='mg-login'>
      <AtMessage />
      <AtModal isOpened={isOpened} closeOnClickOverlay onClose={()=> setIsOpened(()=> false)}>
        <AtModalHeader><View style={{fontSize:Taro.pxTransform(24)}}>{`请为${ORIGINAL_IMAGE_SERVER}设置代理地址`}</View></AtModalHeader>
        <AtModalContent>
          <AtInput name='proxyURL' onChange={setProxyURL} placeholder={`${PROXY_IMAGE_SERVER}`} />
        </AtModalContent>
        <AtModalAction><Button onClick={()=> otherStore.setProxyURL(proxyURL)}>设置</Button></AtModalAction>
      </AtModal>
      <View onTouchStart={handleTouch} onTouchEnd={handleTouch} className='mg-logo-wrapper'>
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
