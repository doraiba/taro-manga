import {action, computed, observable} from "mobx";

export default class TokenStore {

  static parseAuth = (url: string, auth: MangaToken): string=> {
    return Object.keys(auth).reduce(((seed, item) => seed.replace(`{${item}}`,auth[item])), url)
  }

  @observable
  public mangaToken: MangaToken = {} as MangaToken

  @action.bound
  public setMangaToken(mangaToken: MangaToken) {
    this.mangaToken = mangaToken
  }

  @action.bound
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

  parseAuth = (url: string): string =>{
    return TokenStore.parseAuth(url, this.mangaToken)
  }

}
