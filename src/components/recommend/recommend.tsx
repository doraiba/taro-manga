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

  const [{t1,t2}, setTimestamp] = useState(()=>({t1:1581691184,t2:1581691184}))
  const [{data = []}, refetch] = useAxios(RECOMMEND, {manual: true})
  useEffect(() => {
    refetch()
  }, [refetch])
  const [c46, c47, , , , , c54, , c56] = data
  return (
    <TaroList dataManager={undefined as any} onRefresh={async (stop) => {
      try {

        setTimestamp(() => {
          const timestamp = dayjs().unix()
          return {t1: timestamp, t2: timestamp}
        })
        await refetch()
      } finally {
        stop()
      }
    }} className='mg-discovery' height='100%'
    >
      <Category46 {...c46} />
      <Category50 actionIcon='chevron-right' actionClick={navigateToSubscribe} timestamp={t1} URL={U_SUBSCRIBE} />
      <Category50 actionIcon='reload' actionClick={()=> setTimestamp((t)=> ({...t,t2: dayjs().unix()}))} timestamp={t2} URL={U_LIKE} />
      <Category47 {...c47} />
      <Category47 {...c54} />
      <Category47 {...c56} />
    </TaroList>
  )
}
export default Recommend
