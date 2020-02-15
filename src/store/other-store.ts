import {observable} from "mobx";

export default class OtherStore {
  @observable debug = true
  @observable proxyURL = ''

  setDebug = (debug: boolean)=> this.debug = debug
  setProxyURL = (proxyURL: string)=> this.proxyURL = proxyURL
}
