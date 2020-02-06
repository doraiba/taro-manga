import Taro from '@tarojs/taro'
import {LATEST} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view";
import {View} from "@tarojs/components";
import {MangaItem} from "@/components/manga-item";
import {AtList} from "taro-ui";

const Latest: Taro.FC = () => {

  return (
    <ListView psize={30} fetchCondition={({tab}) => tab === 1}
      url={LATEST} renderList={(list = []) => <AtList>
      {list.map((e: LatestItem, i) => {
        return <MangaItem key={i} {...e} >
          <View>{e.last_update_chapter_name}</View>
        </MangaItem>
      })}
    </AtList>}
    />
  )
}

export default Latest
