import Taro from '@tarojs/taro'
import MangaCard from '@/components/manga-card/manga-card';
import MangaItem from "@/components/manga-item/manga-item";
import './index.scss'


const Category47: Taro.FC<Category> = ({title, data = []}) => {
  return (
    <MangaCard title={title}>
      {data.map((e, i) => <MangaItem {...e} key={i} />)}
    </MangaCard>
  )
}
export default Category47
