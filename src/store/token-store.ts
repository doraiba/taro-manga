import {action, computed, observable} from "mobx";

export default class TokenStore {

  @observable
  public mangaToken: MangaToken = {} as MangaToken

  @action
  public setMangaToken(mangaToken: MangaToken) {
    console.log("=======",mangaToken)
    this.mangaToken = mangaToken
    console.log("=======",this.mangaToken)
  }

  @action
  clearMangaToken(){
    this.mangaToken = {} as MangaToken
  }

  @computed
  get uid() {
    return this.mangaToken.uid
  }

  get token() {
    return this.mangaToken.dmzj_token
  }

}
