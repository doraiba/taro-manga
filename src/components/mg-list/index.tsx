import Taro from '@tarojs/taro'
import {AtList, AtListItem} from "taro-ui";

import './index.scss'

type MangaListProps = {
  list: Array<LatestItem>
}

const MangaList: Taro.FC<MangaListProps> = ({list}) => {
  return (
    <AtList>
      {list.map(({title, authors, cover, last_update_chapter_name}, i) =>
        <AtListItem key={i} title={title} thumb={cover} note={authors} extraText={last_update_chapter_name} />)}
    </AtList>
  )
}
export default MangaList
