import Taro, {useEffect, useState} from "@tarojs/taro";
import useAxios from 'axios-hooks'
import {RECOMMEND, U_LIKE, U_SUBSCRIBE} from "@/contexts/manga-api";
import TaroList from "taro-list";
import Category50 from "@/components/recommend/category-50";
import Category46 from "@/components/recommend/category-46";
import Category47 from "@/components/recommend/category-47";
import dayjs from "dayjs";
import {navigateToSubscribe} from "@/utils/app-constant";
import './recommend.scss'

/**
 * 主页tab->推荐
 * @constructor
 */
const Recommend: Taro.FC = () => {

  const [timestamp, setTimestamp] = useState()
  const [{data = []}, refetch] = useAxios(RECOMMEND, {manual: true})
  useEffect(() => {
    refetch()
  }, [refetch])
  const [c46, c47, , , , , c54, , c56] = data
  return (
    <TaroList dataManager={undefined as any} onRefresh={async (stop) => {
      try {
        setTimestamp(() => dayjs().unix())
        await refetch()
      } finally {
        stop()
      }
    }} className='mg-discovery' height='100%'
    >
      <Category46 {...c46} />
      <Category50 actionIcon='arrow' actionClick={navigateToSubscribe} timestamp={timestamp} URL={U_SUBSCRIBE} />
      <Category50 timestamp={timestamp} URL={U_LIKE} />
      <Category47 {...c47} />
      <Category47 {...c54} />
      <Category47 {...c56} />
    </TaroList>
  )
}
export default Recommend
