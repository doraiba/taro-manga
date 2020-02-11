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

type MGResult<T = any> = {
  result: number,
  code: number,
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

type MangaUser = {
  "nickname": string,
  "description": string,
  "birthday": string,
  "sex": 1 | 0,
  "cover": string,
  "blood": number,
  "constellation": string,
  "bind_phone": number,
  "email": string,
  "channel": string,
  "is_verify": 0 | 1,
  "is_modify_name": 0 | 1,
  "data": Array<any>,
  "amount": number,
  "is_set_pwd": 0 | 1,
  "bind": Array<any>
}


interface Type {
  tag_id: number;
  tag_name: string;
}

interface Status {
  tag_id: number;
  tag_name: string;
}

interface Author {
  tag_id: number;
  tag_name: string;
}

interface Datum {
  chapter_id: number;
  chapter_title: string;
  updatetime: number;
  filesize: number;
  chapter_order: number;
}

interface Chapter {
  title: string;
  data: Datum[];
}

interface LatestComment {
  comment_id: number;
  uid: number;
  content: string;
  createtime: number;
  nickname: string;
  avatar: string;
}

interface Comment {
  comment_count: number;
  latest_comment: LatestComment[];
}

interface DhUrlLink {
  title: string;
  list: any[];
}

interface Comic {
  id: number;
  islong: number;
  direction: number;
  title: string;
  is_dmzj: number;
  cover: string;
  description: string;
  last_updatetime: number;
  last_update_chapter_name: string;
  copyright: number;
  first_letter: string;
  comic_py: string;
  hidden: number;
  hot_num: number;
  hit_num: number;
  uid?: any;
  is_lock: number;
  last_update_chapter_id: number;
  types: Type[];
  status: Status[];
  authors: Author[];
  subscribe_num: number;
  chapters: Chapter[];
  comment: Comment;
  url_links: any[];
  isHideChapter: string;
  dh_url_links: DhUrlLink[];
  is_dot: string;
}

interface ComicReInfo {
  uid: number;
  type: number;
  comic_id: number;
  chapter_id: number;
  record: number;
  viewing_time: number;
  comic_name: string;
  cover: string;
  chapter_name: string;
}

type ComicChapter = {
  chapter_id: number;
  comic_id: number;
  title: string;
  chapter_order: number;
  direction: number;
  page_url: string[];
  picnum: number;
  comment_count: number;
}
