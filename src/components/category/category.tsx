import Taro, {useEffect} from '@tarojs/taro'
import {AtActivityIndicator, AtGrid} from "taro-ui";
import useAxios from 'axios-hooks'
import {CATEGORY} from '@/contexts/manga-api';
import TaroList from "taro-list";

const Category: Taro.FC = () => {
  const [{loading, error, data = []}, refetch] = useAxios(CATEGORY, {manual: true})
  useEffect(() => {
    refetch()
  }, [refetch])
  const filter = data.map(({cover: image, title: value}) => ({image, value}))
  if (loading || error) return <AtActivityIndicator color='#0094ff' size={50} mode='center' content='Loading...' />
  return (<TaroList dataManager={undefined as any} onRefresh={(async cb => {await refetch(); cb()})} enableBackToTop className='mg-discovery' height='100%'><AtGrid  className='mg-grid' hasBorder={false} data={filter} /></TaroList>)
}

export default Category
