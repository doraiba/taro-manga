import Taro from '@tarojs/taro'
import {RANK} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view-II";
import {MangaItem} from "@/components/manga-item";
import {AtList, AtTag} from "taro-ui";

import './rank.scss'

/**
 * 主页tab->排行
 * @constructor
 */
const Rank: Taro.FC = () => {

  return (
    <ListView  className='mg-discovery' key='rank'
      url={RANK} renderList={(list = []) => <AtList>
      {list.map((e, i) => {
        return <MangaItem key={i} {...e} >
          <AtTag type='primary' circle>{i + 1}</AtTag>
        </MangaItem>
      })}
    </AtList>}
    />
  )
}

export default Rank
