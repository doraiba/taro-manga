/**
 * 搜索
 */
import Taro, {useEffect} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtList, AtListItem, AtSearchBar} from 'taro-ui';
import {observer, useLocalStore} from '@tarojs/mobx';
import debounce from 'lodash-es/debounce';
import {reaction, runInAction} from "mobx";
import useAxios from 'axios-hooks'
import {parsePath} from "@/utils";
import {SEARCH_RESULT, SEARCH_TIPS} from '@/contexts/manga-api';
import {navigateToIndex, navigateToManga} from "@/utils/app-constant";
import SearchHistory from "@/components/search-history/search-history";
import useStores from "@/hooks/use-stores";
import SearchHot from "@/components/search-hot/search-hot";
import ListView from "@/components/list-veiw/list-view-IIIII";
import {MangaSearchItem} from '@/components/manga-item';
import dayjs from "dayjs";
import './search.scss'

const Search: Taro.FC = () => {

  const {searchStore: {push}} = useStores()
  const store = useLocalStore(() => ({
    q: '',
    setQ(q: string) {
      this.q = q;
    },
    focus: false,
    setFocus(focus: boolean) {
      this.focus = focus;
    },
    qq: '',
    setQQ(qq: string) {
      this.qq = qq;
      this.timestamp = dayjs().unix()
    },
    setUnion(q: string) {
      this.setQ(q)
      this.setQQ(q)
    },
    timestamp: dayjs().unix(),
  }));
  const [{data = []}, refetch] = useAxios<SearchTipsEntity[]>({}, {manual: true})

  useEffect(() => reaction(() => store.q, debounce((q) => q && refetch({url: parsePath(SEARCH_TIPS, {q})}), 300)), [])

  const {q, setQ, focus, setFocus, qq, setQQ, setUnion,timestamp} = store;
  return (
    <View className='mg-search'>
      <AtSearchBar
        fixed value={q} onChange={setQ}
        focus={focus} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        showActionButton actionName='取消' onActionClick={() => qq ? runInAction(() => {
        setQQ('');
        setFocus(true)
      }) : Taro.navigateBack({
        fail: () => navigateToIndex()
      })}
        onConfirm={() => {
          if(q) {
            push(q);
            setQQ(q)
          }
        }}
      />
      <View className='mg-search-panel'>
        <View className={`mg-search-tips ${focus ? '' : 'mg-hidden'}`}>
          <AtList hasBorder={false}>
            {data.map((e, i) =>
              <AtListItem
                key={i} hasBorder={false} title={e.title} extraText={e.last_name}
                arrow='right' onClick={() => navigateToManga(`oid=${e.id}`)}
              />)}
          </AtList>
        </View>
        {qq && <ListView timestamp={timestamp}
          className='mg-search-result' url={parsePath(SEARCH_RESULT, {qq})}
          renderList={(list: SearchTipsEntity[] = []) => {
            return <AtList>{
              list.map((e, i) => <MangaSearchItem key={i} {...e} />)
            }
            </AtList>
          }}
        />}
        <View className={`mg-search-history ${qq ? 'mg-hidden' : ''}`}>
          <SearchHistory onClick={setUnion} />
        </View>
        <View className={`mg-search-hot ${qq ? 'mg-hidden' : ''}`}>
          <SearchHot onClick={setUnion} />
        </View>

      </View>
      <View className={`${focus ? 'mg-search__mask' : ''}`} />
    </View>)
}
Search.config = {
  enablePullDownRefresh: false
}

export default observer(Search)
