import Taro from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import dayjs from "dayjs";
import {ITouchEvent} from "@tarojs/components/types/common";
import {MANGA_PAGE} from "@/utils/app-constant";

import './manga-item.scss'

type MangaItemProps = (RankItem & LatestItem) & {onClick?: (event: ITouchEvent,id?: string|number) => any}

const MangaItem: Taro.FC<MangaItemProps> = ({onClick,children, cover, title, authors, types, last_updatetime,id,comic_id}) => {
  return (
    <View className='mg-manga-union-item' onClick={e => onClick && onClick(e,id || comic_id)}>
      <View className='mg-union-info'>
        <View className='mg-union-image-wrapper'>
          <Image className='mg-union-image' lazyLoad src={cover} />
        </View>
        <View className='mg-union-desc'>
          <View className='mg-union-title'>{title}</View>
          <View className='mg-union-produce'>
            <View className='mg-union-authors'>{authors}</View>
            <View className='mg-union-tag'>{types}</View>
            <View className='mg-union-date'>{dayjs.unix((last_updatetime as number) ).format('YYYY-MM-DD HH:mm')}</View>
          </View>
        </View>
      </View>
      <View className='mg-item-actions'>
        {children}
      </View>
    </View>)
}
MangaItem.defaultProps = {
  onClick: (_event, id) => Taro.navigateTo({url: `${MANGA_PAGE}?oid=${id}`})
}

export default MangaItem
