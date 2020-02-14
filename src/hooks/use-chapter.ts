import {DependencyList, useEffect, useMemo, useState, useCallback} from '@tarojs/taro'
import useAxios, {Options} from 'axios-hooks'
import {parsePath} from "@/utils";
import {COMICREINFO} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";
import {AxiosRequestConfig} from "axios";

/**
 * 动漫详情数据 用于阅读时获取章节信息请求图片
 * @param factory
 * @param deps
 */
const useChapter = (factory: () => number | string, deps: DependencyList | undefined) => {

  // eslint-disable-next-line
  const oid = useMemo(() => factory() as any - 0, deps)
  const {chapterStore: {findById, push}} = useStores()
  const [{loading, error, data, response}, refetch] = useAxios<ComicReInfo>({url: parsePath(COMICREINFO, {oid})}, {manual: true})
  const exist = useMemo(() => findById(oid), [oid])
  const [chapter, setChapter] = useState<ComicReInfo>(() => exist)
  useEffect(() => {
    if (!Object.keys(exist).length) refetch()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!Object.keys(data).length) {
      setChapter(() => {
        push(data)
        return data
      })
    }
    // eslint-disable-next-line
  }, [data])

  const wrapperRefresh = useCallback((config: AxiosRequestConfig, options?: Options) => {
    const item = findById(oid)
    if (!item) return refetch(config, options)
    return Promise.resolve({data: item})
  }, [oid, findById, refetch])

  return {loading, error, data: chapter, response, push, refetch: wrapperRefresh}
}

export default useChapter
