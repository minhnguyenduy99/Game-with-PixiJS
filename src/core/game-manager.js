import * as pixi from 'pixi.js'
import ControlComponent from './control-component'
import ResourceManager from './resource-manager'
import GameObject from './game-object'

class GameManager {
  
  /**
   * @type {PIXI.Application}
   */
  _app

  constructor() {
    this._app = new pixi.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: 1,
      transparent: true
    })
  }
  
  /**
   * Return the auto-generated view of the game
   */
  get gameView() {
    return this._app.view
  }

  /**
   * 
   * Add a stage to game
   * @param {PIXI.Container} stage 
   */
  addStage(stage) {
    this._app.stage.addChild(stage)
  }

  currentStage() {
    return this._app.stage;
  }

  /**
   * Get the stage of game by name of stage
   * @param {String} name
   * @return {PIXI.DisplayObject}
   */
  getStageByName(name) {
    return this._app.stage.getChildByName(name)
  }

  /**
   * Set up the game 
   */
  setup() {
    document.body.appendChild(this.gameView)
    return this._initializeResource()
  }

  /**
   * Start the game
   */
  start() {
    this._app.ticker.add((delta) => this._gameLoop(delta))
  }

  /**
   * @protected
   * Initialize resources of the game
   */
  _initializeResource() {
    ResourceManager.addTexture("player", "./assets/images/player.png")
    ResourceManager.addTextureCollection("player", [
      { name: "run", path: "./assets/images/player.png" }
    ])
    return ResourceManager.load()
  }

  /**
   * @protected
   * @param {Number} delta
   */
  _gameLoop(delta) {
    this._app.stage.children.forEach((child) => {
      if (child instanceof GameObject) {
        child.update(delta)
      }
    })
    ControlComponent.update()
  }
}

const GameManagerInstance = new GameManager()

export default GameManagerInstance