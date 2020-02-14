import Taro, {useEffect} from "@tarojs/taro";
import useAxios from 'axios-hooks'
import {RECOMMEND} from "@/contexts/manga-api";
import TaroList from "taro-list";
import './recommend.scss'
import Category46 from "./category-46";
import Category47 from "./category-47";

/**
 * 主页tab->推荐
 * @constructor
 */
const Recommend: Taro.FC = () => {

  const [{data = []}, refetch] = useAxios(RECOMMEND, {manual: true})
  useEffect(() => {
    refetch()
  }, [refetch])
  const [c46, c47, , , , , c54, , c56] = data
  return (
    <TaroList dataManager={undefined as any} onRefresh={async (stop)=>{
      try { await refetch() }finally {stop()}
    }} className='mg-discovery' height='100%'
    >
      <Category46 {...c46} />
      <Category47 {...c47} />
      <Category47 {...c54} />
      <Category47 {...c56} />
    </TaroList>
  )
}
export default Recommend
