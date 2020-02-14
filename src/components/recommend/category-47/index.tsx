/**
 *  推荐tab->内容包裹
 */
import Taro from '@tarojs/taro'
import MangaCard from '@/components/manga-card/manga-card';
import {MangaRecommendItem} from "@/components/manga-item";
import './index.scss'


const Category47: Taro.FC<Category & {actionIcon?: string,actionClick?: () => void }> = ({actionClick,actionIcon,title, data }) => {
  return (
    <MangaCard title={title} actionIcon={actionIcon} actionClick={actionClick}>
      {data.map((e, i) => <MangaRecommendItem {...e} key={i} />)}
    </MangaCard>
  )
}

Category47.defaultProps = {
  data: [],
  title: ''
}
export default Category47
