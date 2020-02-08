import Taro from '@tarojs/taro'
import {SUBJECT} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view-III";
import {MangaSubjectItem} from "@/components/manga-item";
import {AtList} from "taro-ui";

const Subject: Taro.FC = () => {

  return (
    <ListView key='subject' fetchCondition={({tab}) => tab === 4}
      url={SUBJECT} renderList={(list = []) => <AtList>
      {list.map((e: SubjectItem, i) => {
        return <MangaSubjectItem key={i} {...e} />
      })}
    </AtList>}
    />
  )
}

export default Subject
