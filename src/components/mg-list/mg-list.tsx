import Taro from '@tarojs/taro'
import {AtList} from "taro-ui";
import {MangaItem} from "@/components/manga-item";

type MangaListProps = {
  list: Array<LatestItem>
}


const MangaList: Taro.FC<MangaListProps> = ({list}) => {
  return (
    <AtList>
      {list.map((e, i) => {
        return <MangaItem key={i} item={{...e}} />
      })}
    </AtList>
  )
}
MangaList.defaultProps = {
  list: []
}
export default MangaList
