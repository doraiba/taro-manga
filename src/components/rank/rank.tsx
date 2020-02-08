import Taro from '@tarojs/taro'
import {RANK} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view-II";
import {MangaItem} from "@/components/manga-item";
import {AtList, AtTag} from "taro-ui";
import {observer} from '@tarojs/mobx'

import './rank.scss'

const Rank: Taro.FC = () => {

  return (
    <ListView key='rank' fetchCondition={({tab}) => tab === 3}
      url={RANK} renderList={(list = []) => <AtList>
      {list.map((e: RankItem, i) => {
        return <MangaItem key={i} {...e} >
          <AtTag type='primary' circle>{i + 1}</AtTag>
        </MangaItem>
      })}
    </AtList>}
    />
  )
}

export default observer(Rank)
