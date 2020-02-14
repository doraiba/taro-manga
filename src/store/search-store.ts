import {action, observable} from "mobx";

export default class SearchStore {
  // 存储元素总数: 9
  @observable repository: string[] = []

  @action push = (item: string) => {
    const _repository = this.repository.filter(e => !!e).filter(e => e !== item).slice(0, 8)
    _repository.unshift(item)
    this.repository = _repository
  }

  clear = () => this.repository = []

}
