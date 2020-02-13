import {useEffect, useState, useMemo, DependencyList} from '@tarojs/taro'
import useAxios from 'axios-hooks'
import {parsePath} from "@/utils";
import {COMIC} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";

/**
 * 动漫详情数据 用于阅读时获取章节信息请求图片
 * @param factory
 * @param deps
 */
const useComic = (factory: () => number | string, deps: DependencyList | undefined) => {
  // eslint-disable-next-line
  const oid = useMemo(() => factory() as any - 0, deps)
  const {comicStore: {isValid, findById, insetOrUpdateById}} = useStores()
  const [{loading, error, data, response}, refetch] = useAxios<Comic>({url: parsePath(COMIC, {oid})}, {manual: true})
  const exist = findById(oid), valid = isValid(exist)
  const [comic, setComic] = useState<Comic>(() => exist)
  useEffect(() => {
    if (!valid) refetch()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (isValid(data)) {
      setComic(() => {
        insetOrUpdateById(data)
        return data
      })
    }
    // eslint-disable-next-line
  }, [data])

  return {loading, error, data: comic, response, forceUpdate: insetOrUpdateById, refetch}
}

export default useComic
