import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";

type DialogProps = { renderHeader: any, renderFooter: any }
const  Dialog: Taro.FC<DialogProps> =(props)=> {

    return (
      <View className='dialog'>
        <View className='header'>
          {props.renderHeader}
        </View>
        <View className='body'>
          {props.children}
        </View>
        <View className='footer'>
          {props.renderFooter}
        </View>
      </View>
    )

}
export default Dialog
