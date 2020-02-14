import {observable} from "mobx";

export default class ChapterStore {
  @observable repository: ComicReInfo[] = []

  push = (item: ComicReInfo) => {
    const repository = this.repository.filter(e => e.comic_id !== item.comic_id)
    if(item && Object.keys(item).length){
      repository.unshift(item)
    }
    this.repository = repository
  }

  findById = (id: number) => this.repository.filter(e => e.comic_id == id)[0]
}
