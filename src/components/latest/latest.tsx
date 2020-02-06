import Taro from '@tarojs/taro'
import {LATEST} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view";
import {Block} from "@tarojs/components";
import MangaList from "@/components/mg-list/mg-list";

const Latest: Taro.FC = () => {
  return (
    <ListView fetchCondition={({tab}) => tab === 1}
      url={LATEST} renderList={(list) => <Block><MangaList  list={list} /></Block>}
    />
  )
}

export default Latest
