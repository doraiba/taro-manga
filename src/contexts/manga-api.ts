const DOMAIN = 'https://v3api.dmzj.com'
const Ver = "v3"
// 推荐
const RECOMMEND = `/${Ver}/recommend.json?channel=ios&version=3.0.2`
// 更新
const LATEST = `/latest/100/{0}.json?channel=ios&version=3.0.2`
// 排行
const RANK = `/rank/0/0/0/{0}.json?channel=ios&version=3.0.2`
// 主题
const SUBJECT = `/subject/0/{0}.json?channel=ios&version=3.0.2`
//类目
const CATEGORY = `/0/category.json?channel=ios&version=3.0.2`
// 登录
const LOGIN = `https://user.dmzj.com/loginV2/m_confirm`
// 注册
const REGISTER = `https://user.dmzj.com/register/m_submit_v2`
// 个人信息
const UCENTER = `/UCenter/comicsv2/{uid}.json?channel=ios&dmzj_token={dmzj_token}`
// 漫画信息
const COMIC = `/comic/comic_{oid}.json`
// 订阅信息
const COMICREINFO = `https://interface.dmzj.com/api/getReInfo/comic/{uid}/{oid}/0`
// 章节信息
const CHAPTER = `/chapter/{oid}/{cid}.json`

export  {
  DOMAIN,
  Ver,
  RECOMMEND,
  LATEST,
  RANK,
  SUBJECT,
  CATEGORY,
  LOGIN,
  REGISTER,
  UCENTER,
  COMIC,
  COMICREINFO,
  CHAPTER
}
export default DOMAIN
