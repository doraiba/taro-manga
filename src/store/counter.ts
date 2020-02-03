import { observable, action } from 'mobx'

export default class CounterStore {
  @observable counter = 0

  @action increment = () => {
    this.counter++
  }

  @action decrement = () => {
    this.counter--
  }

  @action incrementAsync = () => {
    setTimeout(() => {
      this.counter++
    }, 3000)
  }
}
