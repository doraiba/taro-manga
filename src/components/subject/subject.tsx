import Taro from '@tarojs/taro'
import {SUBJECT} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view-III";
import {MangaSubjectItem} from "@/components/manga-item";
import {AtList} from "taro-ui";

/**
 * 主页tab->分类  TODO 具体功能未完成
 * @constructor
 */
const Subject: Taro.FC = () => {

  return (
    <ListView className='mg-discovery' key='subject'
      url={SUBJECT} renderList={(list = []) => <AtList>
      {list.map((e: SubjectItem, i) => {
        return <MangaSubjectItem key={i} {...e} />
      })}
    </AtList>}
    />
  )
}

export default Subject
