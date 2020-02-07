// 20200204190208
// http://v3api.dmzj.com/v3/recommend.json?channel=ios&version=3.0.2

type Category<T extends CategoryItem = CategoryItem> = {
  "category_id": string,
  "title": string,
  "sort": number,
  "data": T[]
}

type CategoryItem = {
  "id": number,
  "cover": string,
  "title": string,
  "sub_title": string,
  "authors": string,
  "type": number,
  "url": string,
  "obj_id": number,
  "status": string
}

type LatestItem = {
  "id": number,
  "title": string,
  "islong": number,
  "authors": string,
  "types": string,
  "cover": string,
  "status": string,
  "last_update_chapter_name": string,
  "last_update_chapter_id": number,
  "last_updatetime": number
}
type RankItem = {
  "comic_id": string,
  "title": string,
  "authors": string,
  "status": string,
  "cover": string,
  "types": string,
  "last_updatetime": string,
  "last_update_chapter_name": string,
  "comic_py": string,
  "num": string,
  "tag_id": string
}

type SubjectItem = {
  "id": number,
  "title": string,
  "short_title": string,
  "create_time": number,
  "small_cover": string,
  "page_type": number,
  "sort": number,
  "page_url": string
}


interface StoreType {
  refreshCount: number,
  currPage: number,
  totalPage: number,
  pageSize: number,
  list: Array<any>,
  fetch: (page: number, refreshCounte?: number) => void,
  refresh: VoidFunction,
  forward: VoidFunction,
  retry: VoidFunction,
  hasMore: boolean
}

type MGResult<T = any>  = {
  result: number,
  msg: string,
  data: T
}

type MangaToken = {
  "uid": string,
  "nickname": string,
  "dmzj_token": string,
  "photo": string,
  "bind_phone": string,
  "email": string,
  "passwd": string
}
