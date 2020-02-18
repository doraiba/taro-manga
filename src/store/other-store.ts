import {observable} from "mobx";

export default class OtherStore {
  @observable debug = false
  @observable proxyURL = 'img.javautil.top'

  setDebug = (debug: boolean)=> this.debug = debug
  setProxyURL = (proxyURL: string)=> this.proxyURL = proxyURL
}
