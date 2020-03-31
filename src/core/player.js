import TileSprite from "./tile-sprite";
import ControlComponent from './control-component'
import GameObject from './game-object'
import { GameManager } from ".";
import GameManagerInstance from "./game-manager";

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
    this.setVelocity(10, 10)
    this.__initializeDefaultComponents();
    this._renderObj.setFilter(0xff00ff)
  }

  __initializeDefaultComponents() {
    this.__initializeControlComponent()
    this.addComponent(this.controller)
  }

  /**
   * @private
   * Initialize the controller 
   */
  __initializeControlComponent() {
    this.controller = new ControlComponent(this)
    // this.controller.onKeyDown(() => this.position.x += 10, PLAYER_KEY_CONTROLLER.MOVE_LEFT)
    // this.controller.onKeyDown(() => this.moveRight(), PLAYER_KEY_CONTROLLER.MOVE_RIGHT)
    // this.controller.onKeyDown(() => this.moveTop(), PLAYER_KEY_CONTROLLER.MOVE_UP)
    // this.controller.onKeyDown(() => this.moveBottom(), PLAYER_KEY_CONTROLLER.MOVE_DOWN)
  }

  /**
   * 
   * @param {PIXI.Renderer} renderer 
   */
  render(renderer) {
    super.render(renderer);
  }

  /**
   * 
   * @param {Number} delta 
   */
  update(delta) {
    super.update(delta)
  }
}