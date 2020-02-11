import dayjs from "dayjs";

const DOMAIN = 'https://v3api.dmzj.com'
export const Ver = "v3"
export const suffix = 'channel=ios&version=3.0.2'
// 推荐
export const RECOMMEND = `/${Ver}/recommend.json?${suffix}`
// 更新
export const LATEST = `/latest/100/{0}.json?${suffix}`
// 排行
export const RANK = `/rank/0/0/0/{0}.json?${suffix}`
// 主题
export const SUBJECT = `/subject/0/{0}.json?${suffix}`
//类目
export const CATEGORY = `/0/category.json?${suffix}`
// 登录
export const LOGIN = `https://user.dmzj.com/loginV2/m_confirm`
// 注册
export const REGISTER = `https://user.dmzj.com/register/m_submit_v2`
// 个人信息
export const UCENTER = `/UCenter/comicsv2/{uid}.json?${suffix}&dmzj_token={dmzj_token}`
// 漫画信息
export const COMIC = `/comic/comic_{oid}.json?${suffix}`
// 访问记录
export const COMICREINFO = `https://interface.dmzj.com/api/getReInfo/comic/{uid}/{oid}/0?${suffix}`
// 章节信息
export const CHAPTER = `/chapter/{oid}/{cid}.json?${suffix}`
// 是否订阅
export const SUBSCRIBE = `/subscribe/0/{uid}/{oid}?${suffix}`
// 取消订阅
export const SUBSCRIBE_CANCEL = `/subscribe/cancel?${suffix}&type=mh&uid={uid}&obj_ids={oid}&dmzj_token={dmzj_token}`
// 订阅漫画
export const SUBSCRIBE_ADD = `/subscribe/add`
// 上传浏览记录
export const UPCOMICREINFO = `https://interface.dmzj.com/api/record/getRe?callback=record_jsonpCallback&uid=110332672&type=3&st=comic&json=[{"time" : "${dayjs().unix()}","chapterId": "{cid}","{oid}": "{cid}","comicId": {oid},"page": {page}}]&${suffix}`


export default DOMAIN
