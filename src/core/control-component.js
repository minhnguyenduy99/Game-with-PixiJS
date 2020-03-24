import Component from "./component";
import Keyboard from 'pixi.js-keyboard'
import Mouse from 'pixi.js-mouse'

export default class ControlComponent extends Component {


  /**
   * 
   * @param {PIXI.Sprite} attachObj 
   */
  constructor(attachObj) {
    super(attachObj)
  }

  /**
   * 
   * @param {Number} key 
   * @param {*} event 
   */
  addKeyController(key, event, handler) {
    Keyboard.events.on(event, (keyCode, ev) => {
      if (Keyboard.keyStates.get(keyCode) !== key) {
        return
      }
      handler()
      ev.preventDefault()
    })
  }

  /**
   * 
   * @param {(keyCode: Number, ev: Event) => void} handler 
   * @param {String} key
   */
  onKeyPressed(handler, key = null) {
    this._onKeyEvent('pressed', handler, key)
  }

  /**
   * 
   * @param {(keyCode: Number, ev: Event) => void} handler 
   * @param {String} key
   */
  onKeyReleased(handler, key = null) {
    this._onKeyEvent('released', handler, key)
  }

  /**
   * 
   * @param {(keyCode: Number, ev: Event) => void} handler 
   * @param {String} key
   */
  onKeyDown(handler, key = null) {
    this._onKeyEvent('down', handler, key)
  }

  /**
   * @param {'pressed' | 'released' | 'down'} eventType 
   * @param {(keyCode: Number, ev: Event) => void} handler 
   * @param {String} key
   */
  _onKeyEvent(eventType, handler, key = null) {
    if (!key) {
      Keyboard.events.on(`${eventType}`, null, (keyCode, ev) => handler(keyCode, ev))
      return
    }
    Keyboard.events.on(`${eventType}_Key${key}`, null, (keyCode, ev) => handler(keyCode, ev))
  }

  /**
   * 
   * @param  {...String} keys Check if all the keys are pressed
   */
  isKeyPressed(...keys) {
    return Keyboard.isKeyPressed(keys)
  }

  /**
   * 
   * @param  {...String} keys Check if all the keys are released
   */
  isKeyReleased(...keys) {
    return Keyboard.isKeyReleased(keys)
  }

  /**
   * 
   * @param  {...String} keys Check if all the keys are down
   */
  isKeyDown(...keys) {
    return Keyboard.isKeyDown(keys)
  }

  /**
   * Update the state of `Keyboard` and `Mouse`.
   * Always call this method in the `GameLoop`
   */
  static update() {
    Keyboard.update()
    Mouse.update()
  }
}