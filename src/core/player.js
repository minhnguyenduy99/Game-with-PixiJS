import TileSprite from "./tile-sprite";
import ControlComponent from './control-component'
import GameObject from './game-object'

const PLAYER_KEY_CONTROLLER = {
  MOVE_UP: 'W',
  MOVE_LEFT: 'A',
  MOVE_RIGHT: 'D',
  MOVE_DOWN: 'S'
}

export default class Player extends GameObject {

  /**
   * @type {ControlComponent}
   */
  controller

  constructor() {
    super()
    this.setRenderSprite(new TileSprite("player", 100, 100))    //  Add sprite
    this.setMoveDistance(1, 1)
    this.__initializeControlComponent()
    this.addComponent(this.controller)
  }

  /**
   * @private
   * Initialize the controller 
   */
  __initializeControlComponent() {
    this.controller = new ControlComponent(this)
    this.controller.onKeyDown(() => this.moveLeft(), PLAYER_KEY_CONTROLLER.MOVE_LEFT)
    this.controller.onKeyDown(() => this.moveRight(), PLAYER_KEY_CONTROLLER.MOVE_RIGHT)
    this.controller.onKeyDown(() => this.moveTop(), PLAYER_KEY_CONTROLLER.MOVE_UP)
    this.controller.onKeyDown(() => this.moveBottom(), PLAYER_KEY_CONTROLLER.MOVE_DOWN)
  }

  /**
   * 
   * @param {Number} delta 
   */
  update(delta) {
    super.update(delta)
  }
}