import Taro, {useEffect, useRouter} from '@tarojs/taro'
import {Block, View, Image} from '@tarojs/components'
import {observer} from '@tarojs/mobx';
import {parsePath} from '@/utils';
import {CHAPTER} from "@/contexts/manga-api";
import useAxios from 'axios-hooks'
// import useComic from "@/hooks/use-comic";
import {ORIGINAL_IMAGE_SERVER, PROXY_IMAGE_SERVER} from "@/utils/app-constant";

import './browse.scss'

const Browse: Taro.FC = () => {
  const {params} = useRouter()

  // const {data: comic} = useComic(() => params.oid, [params.oid])

  const [{data = {page_url: new Array<string>()} as ComicChapter}, refetch] = useAxios<ComicChapter>(parsePath(CHAPTER, params), {manual: true})
  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])
  const {page_url} = data
  const proxyURL = page_url.map((e) => e.replace(ORIGINAL_IMAGE_SERVER, PROXY_IMAGE_SERVER))
  return (
    <Block>
      <View>
        {proxyURL.map(e => <Image className='mg-proxy-image' mode='widthFix' key={e} src={e} lazyLoad />)}
      </View>
    </Block>)
}
Browse.config = {}

export default observer(Browse)
