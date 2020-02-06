import Taro from '@tarojs/taro'
import {LATEST} from "@/contexts/manga-api";
import ListView from "@/components/list-veiw/list-view";
import {View} from "@tarojs/components";
import {MangaItem} from "@/components/manga-item";
import {AtIcon, AtList} from "taro-ui";

import './latest.scss'

const Latest: Taro.FC = () => {

  return (
    <ListView key='latest' psize={30} fetchCondition={({tab}) => tab === 1}
      url={LATEST} renderList={(list = []) => <AtList>
      {list.map((e: LatestItem, i) => {
        return <MangaItem key={i} {...e} >
          <View className='mg-latest'>
            <AtIcon value='tags' size={36} color='#ffbb1a' />
            <View className='mg-latest-title'>{e.last_update_chapter_name}</View>
          </View>
        </MangaItem>
      })}
    </AtList>}
    />
  )
}

export default Latest
