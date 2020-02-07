import {action, computed, observable} from "mobx";

export default class UserStore {

  @observable
  autoCheckIn = false

  @observable
  mangaUser: MangaUser = {} as MangaUser

  @action.bound
  setAutoCheckIn(autoCheckIn: boolean) {
    this.autoCheckIn = autoCheckIn
  }

  @action.bound
  public setMangaUser(mangaUser: MangaUser) {
    this.mangaUser = mangaUser
  }

  @computed get nickname() {
    return this.mangaUser.nickname
  }

  @computed get avatar() {
    return this.mangaUser.cover
  }

  @action.bound
  clear() {
    this.autoCheckIn = false
    this.mangaUser = {} as MangaUser
  }

}
