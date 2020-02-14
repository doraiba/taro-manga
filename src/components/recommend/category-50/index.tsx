import Taro, {useEffect} from '@tarojs/taro'
import {Block} from '@tarojs/components'
import useAxios from 'axios-hooks'
import Category47 from "@/components/recommend/category-47";
import useStores from "@/hooks/use-stores";
import {observer, useAsObservableSource} from '@tarojs/mobx';
import dayjs from "dayjs";
import {autorun} from "mobx";
import './index.scss'

const Category50: Taro.FC<{ URL: string,timestamp: number ,actionIcon?: string,actionClick?: () => void }> = ({URL,timestamp,actionClick,actionIcon}) => {

  const source = useAsObservableSource({URL,timestamp})
  const {tokenStore, tokenStore: {authed}} = useStores()
  const [{data: {data = {} as Category} = {} }, refetch] = useAxios<MGResult<Category>>(URL, {manual: true})
  useEffect(() => autorun(()=>source.timestamp && tokenStore.authed && refetch()), [])

  return <Block>
    {
      authed && <Category47 {...data} actionClick={actionClick} actionIcon={actionIcon} />
    }
  </Block>
}
Category50.defaultProps = {
  timestamp: dayjs().unix()
}

export default observer(Category50)
