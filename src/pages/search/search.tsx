/**
 * 个人中心->浏览记录
 */
import Taro, {useEffect} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtList, AtListItem, AtSearchBar} from 'taro-ui';
import {observer, useLocalStore} from '@tarojs/mobx';
import debounce from 'lodash-es/debounce';
import {reaction} from "mobx";
import useAxios from 'axios-hooks'
import {parsePath} from "@/utils";
import {SEARCH_TIPS} from '@/contexts/manga-api';
import {navigateToIndex, navigateToManga} from "@/utils/app-constant";
import SearchHistory from "@/components/search-history/search-history";
import useStores from "@/hooks/use-stores";
import './search.scss'

const Search: Taro.FC = () => {

  const {searchStore: {push}} = useStores()
  const store = useLocalStore(() => ({
    q: '',
    setQ(q: string) {
      this.q = q;
    },
    focus: false,
    setFocus(focus: boolean){
      this.focus = focus
    }
  }));
  const [{data = []}, refetch] = useAxios<SearchTipsEntity[]>({}, {manual: true})

  useEffect(() => reaction(() => store.q, debounce((q) => q && refetch({url: parsePath(SEARCH_TIPS, {q})}),300)), [])

  const {q, setQ,focus,setFocus} = store;
  return (
    <View className='mg-search'>
      <AtSearchBar
        fixed value={q} onChange={setQ}
        focus={focus} onFocus={()=> setFocus(true)} onBlur={()=> setFocus(false)}
        showActionButton actionName='取消' onActionClick={() => Taro.navigateBack({
        fail: () => navigateToIndex()
      })}
        onConfirm={()=>{
          push(q)
        }}
      />
      <View className={`mg-search-panel ${focus ? 'mg-search-panel__mask' : ''}`}>
        <View className={`mg-search-tips ${focus ? '' : 'mg-hidden'}`}>
          <AtList hasBorder={false}>
            {data.map((e, i) => <AtListItem key={i} title={e.title} extraText={e.last_name} arrow='right' onClick={() => navigateToManga(`oid=${e.id}`)} />)}
          </AtList>
        </View>
        <View className='mg-search-history'>
          <SearchHistory onClick={setQ} />
        </View>
        <View className='mg-search-hot'>

        </View>
      </View>
    </View>)
}
Search.config = {
  navigationBarTitleText: '我的订阅',
  enablePullDownRefresh: false
}

export default observer(Search)
