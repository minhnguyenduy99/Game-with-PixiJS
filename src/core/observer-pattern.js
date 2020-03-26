
export class Subject {
  
  /**
   * @type {Observer[]}
   */
  _observers

  constructor() {
    this._observers = []
  }

  /**
   * 
   * @param {Observer | {(...args) => void}} observer 
   */
  addObserver(observer) {
    if (observer instanceof Observer) {
      this._observers.push(observer)
      return 
    }
    this._observers.push(new Observer(observer))
  }

  /**
   * 
   * @param {Observer} observer 
   * @returns `true` if success. Otherwise, `false`
   */
  removeObserver(observer) {
    const observerIndex = this._observers.indexOf(observer)
    if (observerIndex !== -1) {
      this._observers.splice(observerIndex, 1)
      return true
    }
    return false
  }

  /**
   * 
   * @param  {...any} args 
   */
  notifyObservers(...args) {
    this._observers.forEach(observer => observer.onNotified(args))
  }
}

export class Observer {

  /**
   * @protected
   * @type {(...args) => void}
   */
  _callback

  /**
   * 
   * @param {(...args) => void} cb 
   */
  constructor(cb = null) {
    this.setOnNotifiedCallback(cb)
  }

  /**
   * Set the callback. The `cb` will be executed whenever the observer is notified
   * @param {(...args) => void} cb 
   */
  setOnNotifiedCallback(cb) {
    this._callback = cb
  }

  /**
   * @protected
   * @param  {...any} args 
   */
  onNotified(...args) {
    this._callback(...args)
  }
}