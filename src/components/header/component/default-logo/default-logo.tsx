import Taro,{useCallback} from "@tarojs/taro";
import {Image} from "@tarojs/components";
import logo from "@/asset/image/head_logo.gif";
import useStores from "@/hooks/use-stores";
import {ITouchEvent} from "@tarojs/components/types/common";
import './default-logo-scss.scss'

const DefaultLogo: Taro.FC = () => {

  const {otherStore,otherStore: {setDebug}} = useStores()

  const handleTouch = useCallback((()=>{
    let timer = 0;
    return (e: ITouchEvent) => {
      const {type, timeStamp} = e
      if(type === 'touchstart') {
        timer = timeStamp
      } else
      if(type === 'touchend') {
        const t = timeStamp - timer
        if(t > 30000) setDebug(!otherStore.debug)
      }
    }
  })(),[])

  return (<Image className='nav-logo' onTouchStart={handleTouch} onTouchEnd={handleTouch} src={logo} />)
}

export default DefaultLogo
