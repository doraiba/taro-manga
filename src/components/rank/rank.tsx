import Taro from '@tarojs/taro'
import {RANK} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view";
import {View} from "@tarojs/components";
import {MangaItem} from "@/components/manga-item";
import {AtList} from "taro-ui";
import {observer} from '@tarojs/mobx'

const Rank: Taro.FC = () => {

  return (
    <ListView key='rank' fetchCondition={({tab}) => tab === 3}
      url={RANK} renderList={(list = []) => <AtList>
      {list.map((e: RankItem, i) => {
        return <MangaItem key={i} {...e} >
          <View>{i}</View>
        </MangaItem>
      })}
    </AtList>}
    />
  )
}

export default observer(Rank)
