import Taro from '@tarojs/taro'
import MangaCard from '@/components/manga-card/manga-card';
import {MangaRecommendItem} from "@/components/manga-item";
import './index.scss'


const Category47: Taro.FC<Category> = ({title, data = []}) => {
  return (
    <MangaCard title={title}>
      {data.map((e, i) => <MangaRecommendItem {...e} key={i} />)}
    </MangaCard>
  )
}
export default Category47
