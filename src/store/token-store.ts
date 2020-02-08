import {action, computed, observable} from "mobx";
import {parsePath} from '@/utils'

export default class TokenStore {

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
    return parsePath(url, this.mangaToken)
  }

}
