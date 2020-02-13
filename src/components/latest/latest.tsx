import Taro,{useCallback} from '@tarojs/taro'
import {LATEST} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view";
import {View} from "@tarojs/components";
import {MangaItem} from "@/components/manga-item";
import {AtIcon, AtList} from "taro-ui";
import {BROWSE_PAGE} from "@/utils/app-constant";

import './latest.scss'

/**
 * 主页tab->更新
 * @constructor
 */
const Latest: Taro.FC = () => {
  const handleClick = useCallback((oid: number,cid: number)=>()=>{
    Taro.navigateTo({url: `${BROWSE_PAGE}?oid=${oid}&cid=${cid}`})
  },[])

  return (
    <ListView key='latest' psize={30} fetchCondition={({tab}) => tab === 1}
      url={LATEST} renderList={(list = []) => <AtList>
      {list.map((e: LatestItem&RankItem, i) => {
        return <MangaItem key={i} {...e} >
          <View className='mg-latest' onClick={handleClick(e.id,e.last_update_chapter_id)}>
            <AtIcon value='tags' size={36} color='#ffbb1a' />
            <View className='mg-latest-title' >{e.last_update_chapter_name}</View>
          </View>
        </MangaItem>
      })}
    </AtList>}
    />
  )
}

export default Latest
