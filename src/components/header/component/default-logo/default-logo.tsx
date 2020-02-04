import Taro from "@tarojs/taro";
import {Image} from "@tarojs/components";
import logo from "@/asset/image/head_logo.gif";

import './default-logo-scss.scss'

const DefaultLogo: Taro.FC = () => {
  return (<Image className='nav-logo' src={logo} />)
}

export default DefaultLogo
