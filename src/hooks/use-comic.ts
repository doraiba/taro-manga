import {useEffect, useState, useMemo, DependencyList} from '@tarojs/taro'
import useAxios from 'axios-hooks'
import {parsePath} from "@/utils";
import {COMIC} from "@/contexts/manga-api";
import useStores from "@/hooks/use-stores";

const useComic = (factory: () => number, deps: DependencyList | undefined) => {
  const oid = useMemo(factory, deps)
  const {comicStore: {isValid, findById, insetOrUpdateById}} = useStores()
  const [{loading, error, response}, refetch] = useAxios<Comic>({url: parsePath(COMIC, {oid})}, {manual: true})
  const exist = findById(oid), valid = isValid(exist)
  const [comic, setComic] = useState<Comic>(() => exist)
  useEffect(() => {
    if (!valid) {
      refetch().then(({data}) => {
        setComic(() => {
          insetOrUpdateById(data)
          return data
        })
      }).catch(e => console.log('remote server error', e))
    }
    // eslint-disable-next-line
  }, [])

  return {loading, error, data: comic, response, forceUpdate: insetOrUpdateById, refetch}
}

export default useComic
