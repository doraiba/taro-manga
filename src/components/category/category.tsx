import Taro, {useEffect} from '@tarojs/taro'
import {AtActivityIndicator, AtGrid} from "taro-ui";
import useAxios from 'axios-hooks'
import {CATEGORY} from '@/contexts/manga-api';
import {ScrollView} from "@tarojs/components";

const Category: Taro.FC = () => {
  const [{loading, error, data = []}, refetch] = useAxios(CATEGORY, {manual: true})
  useEffect(() => {
    refetch()
  }, [refetch])
  const filter = data.map(({cover: image, title: value}) => ({image, value}))
  if (loading || error) return <AtActivityIndicator color='#0094ff' size={50} mode='center' content='Loading...' />
  return (<ScrollView enableBackToTop className='mg-discovery' scrollY><AtGrid  className='mg-grid' hasBorder={false} data={filter} /></ScrollView>)
}

export default Category
