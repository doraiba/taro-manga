import Taro from '@tarojs/taro'
import {SUBJECT} from "@/contexts/manga-api";
import ListViewIII from "@/components/list-veiw/list-view-III";
import {MangaSubjectItem} from "@/components/manga-item";
import {AtList} from "taro-ui";
import {observer} from '@tarojs/mobx'

const Rank: Taro.FC = () => {

  return (
    <ListViewIII key='subject' fetchCondition={({tab}) => tab === 4}
      url={SUBJECT} renderList={(list = []) => <AtList>
      {list.map((e: SubjectItem, i) => {
        return <MangaSubjectItem key={i} {...e} />
      })}
    </AtList>}
    />
  )
}

export default observer(Rank)
