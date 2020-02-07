const DOMAIN = 'https://v3api.dmzj.com'
const Ver = "v3"
const RECOMMEND = `/${Ver}/recommend.json?channel=ios&version=3.0.2`
const LATEST = `/latest/100/{0}.json?channel=ios&version=3.0.2`
const RANK = `/rank/0/0/0/{0}.json?channel=ios&version=3.0.2`
const SUBJECT = `/subject/0/{0}.json?channel=ios&version=3.0.2`
const CATEGORY = `/0/category.json?channel=ios&version=3.0.2`
const LOGIN = `https://user.dmzj.com/loginV2/m_confirm`
const REGISTER = `https://user.dmzj.com/register/m_submit_v2`
const UCENTER = `/UCenter/comicsv2/{uid}.json?channel=ios&dmzj_token={dmzj_token}`

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
  UCENTER
}
export default DOMAIN
