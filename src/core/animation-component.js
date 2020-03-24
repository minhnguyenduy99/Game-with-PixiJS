
import Component from './component'

const ANIMATION_STATE = {
  IDLE: 0,
  PLAYING: 1,
  PAUSED: 2
}

export default class AnimationComponent extends Component {

  /**
   * @private
   * @type {Number}
   */
  _state

  /**
   * @private
   * @type {Number}
   */
  _totalFrame

  /**
   * @private
   * @type {Number}
   */
  _currentFrame

  /**
   * @type {() => void}
   */
  _actionCallback

  /**
   * @param {PIXI.Sprite} attachObj The sprite object attaching this component
   * @param {() => void} action
   * @param {Number} speed The action to perform in animation
   */
  constructor(attachObj, action, speed = 30) {
    super(attachObj)
    this._state = ANIMATION_STATE.IDLE 
    this._currentFrame = 0
    this._actionCallback = action
    this.setAnimationSpeed(speed)
  }

  /**
   * 
   * @param {Number} speed 
   */
  setAnimationSpeed(speed) {
    this._totalFrame = Math.floor(60 / speed)
  }

  /**
   * 
   * @param {(delta: Number) => void} cb 
   */
  setAnimationCallback(cb) {
    this._actionCallback = cb
  }

  start() {
    this._state = ANIMATION_STATE.PLAYING
    this.activate()
  }

  pause() {
    this._state = ANIMATION_STATE.PAUSED
    this.deactive()
  }

  /**
   * 
   * @param {Number} delta 
   */
  update(delta) {
    this._currentFrame++
    if (this._currentFrame < this._totalFrame) {
      return
    }
    this._currentFrame = 0
    this._actionCallback()
  }

  get isPlaying() { return this._state === ANIMATION_STATE.PLAYING }
  get isIdle() { return this._state === ANIMATION_STATE.IDLE }
  get isPaused() { return this._state === ANIMATION_STATE.PAUSED }
}