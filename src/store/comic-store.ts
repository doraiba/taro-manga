import {action, computed, observable, reaction,IReactionDisposer} from "mobx";
import dayjs from "dayjs";

export type ExpireComic = {
  expired: number,
  comic: Comic
}

export default class ComicStore {
  @observable private repository: ExpireComic[] = []

  disposer: IReactionDisposer

  constructor() {
    // 数量>30 进行清除老条目
    this.disposer = reaction(() => this.repository.length > 77, this.clearExpired)
  }

  @computed get filterRepository() {
    const timestamp = dayjs().unix()
    return this.repository
      .filter(({expired}) => timestamp <= expired)

  }


  // 幸存者
  @computed get survivor() {
    return this.filterRepository.map(({comic}) => comic)
  }

  @computed get length() {
    return this.survivor.length
  }

  @action has = (id: number) => {
    return this.survivor.some(({id: oid}) => id === oid)
  }

  @action findById = (id: number) => {
    return this.survivor.filter(({id: oid}) => id === oid)[0]
  }

  @action insert = (comic: Comic) => {
    this.repository.push({expired: this.getExpired(), comic})
  }

  @action insetOrUpdateById = (comic: Comic) => {
    const survivor = this.repository.filter(({comic: {id}}) => comic.id !== id)
    survivor.unshift({expired: this.getExpired(), comic})
    this.repository = survivor
  }

  @action clearExpired = () => {
    this.repository = this.filterRepository
  }

  getExpired = () => dayjs().add(5, "minute").unix()
  isValid = (comic: any) => (!!comic) && (!!(Object.keys(comic).length))

  //释放
  dispose = () => this.disposer && this.disposer()


}
