import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import Header from "@/components/header/header";

import MangaContainer from '@/components/manga-container/manga-container';

import './index.scss'

const Index: Taro.FC = () => {

  return (
    <View id='app-container'>
      <Header />
      <MangaContainer />
    </View>
  )
}

Index.config = {
  enablePullDownRefresh: false
}
export default Index
