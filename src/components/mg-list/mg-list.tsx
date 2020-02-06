import Taro from '@tarojs/taro'
import {AtList, AtListItem} from "taro-ui";

type MangaListProps = {
  list: Array<LatestItem>
}


const MangaList: Taro.FC<MangaListProps> = ({list}) => {
  return (
    <AtList>
      {list.map((e, i) => {
        const {title, authors, cover, last_update_chapter_name} = e
        return <AtListItem key={i} title={title} thumb={cover} note={authors} extraText={last_update_chapter_name} />
      })}
    </AtList>
  )
}
MangaList.defaultProps = {
  list: []
}
export default MangaList
