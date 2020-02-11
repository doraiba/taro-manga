import {observable} from "mobx";

/**
 * TODO 本地浏览记录  是否需要??
 */
export default class BrowseStore {
  @observable repository: ComicReInfo[] = []


  findById = (id: number) => this.repository.filter(({chapter_id}) => chapter_id === id)[0]


}
