/**
 * 个人中心->我的订阅
 */
import Taro from '@tarojs/taro'
import {Block} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import {SUBSCRIBE_LIST} from "@/contexts/manga-api";

import {AtList, AtListItem} from "taro-ui";
import ListView from "@/components/list-veiw/list-view-IIII";
import {navigateToManga} from "@/utils/app-constant";
import './subscribe.scss'

const Subscribe: Taro.FC = () => {

  return (
    <Block>
      <ListView className='mg-subscribe' url={SUBSCRIBE_LIST} psize={9}
        renderList={(list: SubscribeEntity[] = []) =>{
          return <AtList>{list.map((e: SubscribeEntity,i) => {
            return <AtListItem
              key={i} title={e.name} extraText={e.sub_update} thumb={e.sub_img} note={e.status}
              onClick={()=> navigateToManga(`oid=${e.id}`)}
            />
          })}</AtList>
        }}
      />
    </Block>
  )
}
Subscribe.config = {
  navigationBarTitleText: '我的订阅',
}

export default observer(Subscribe)
