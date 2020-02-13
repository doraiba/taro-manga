import Taro, {useEffect} from "@tarojs/taro";
import ListView from 'taro-listview';
import useAxios from 'axios-hooks'
import {RECOMMEND} from "@/contexts/manga-api";
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
    <ListView onPullDownRefresh={async (stop)=>{
      try { await refetch() }finally {stop()}
    }} className='mg-discovery' noMore='' footerLoadedText=''
    >
      <Category46 {...c46} />
      <Category47 {...c47} />
      <Category47 {...c54} />
      <Category47 {...c56} />
    </ListView>
  )
}
export default Recommend
