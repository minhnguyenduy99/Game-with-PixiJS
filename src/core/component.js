import * as pixi from 'pixi.js'

export default class Component {

  /**
   * @protected
   * @type {PIXI.Sprite} 
   */
  _object

  /**
   * @protected
   * @type {Boolean}
   */
  _isActive

  /**
   * 
   * @param {PIXI.Sprite} attachObj 
   */
  constructor(attachObj) {
    this._object = attachObj
    this.deactive()
  }

  /**
   * Specify if the component is active
   */
  get isActive() {
    return this._isActive
  }

  /**
   * Activate component
   */
  activate() {
    this._isActive = true
  }

  /**
   * Deactivate component
   */
  deactive() {
    this._isActive = false
  }

  /**
   * Update the component
   * @param {Number} delta 
   */
  update(delta) {
    if (!this.isActive) {
      return
    }
  }
}