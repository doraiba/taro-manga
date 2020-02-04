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
