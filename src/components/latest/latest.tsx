import Taro from '@tarojs/taro'
import {LATEST} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view";
import MangaList from "@/components/mg-list";

import 'latest.scss'


const Latest: Taro.FC = () => {
  return (
    <ListView
      fetchCondition={({tab}) => tab === 1}
      url={LATEST} renderList={list => <MangaList list={list} />}
    />
  )
}
export default Latest
