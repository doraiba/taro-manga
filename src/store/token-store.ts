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
  get authed()  {
    return !!this.uid && !!this.token
  }
  @computed
  get uid() {
    return this.mangaToken.uid
  }

  get token() {
    return this.mangaToken.dmzj_token
  }

  get avatar() {
    return 'https://avatar' + (this.mangaToken.photo || '').replace(/(http:\/\/images|\/user)/g,'')
  }

}
