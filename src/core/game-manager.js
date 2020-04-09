import * as pixi from 'pixi.js'
import ControlComponent from './control-component'
import ResourceManager from './resource-manager'
import SceneManager from './scene-manager'
import BaseScene from './base-scene'
import { Bump } from './bump'

class GameManager {

  /**
   * @protected
   * @type {PIXI.Application}
   */
  _app

  /**
   * @protected
   * @type {SceneManager}
   */
  _sceneManager

  /**
   * @protected
   * @type {PIXI.Graphics}
   */
  _graphics

  constructor() {
    this._app = new pixi.Application({
      view: document.getElementById("mycanvas"),
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: 1,
      resizeTo: window
    })
    this._graphics = new pixi.Graphics()
    this._sceneManager = new SceneManager()
    this.setGameColor(0xffffff)
    this._sceneManager.onCurrentSceneChanged((oldScene, newScene) => this._replaceSceneChildFromApp(oldScene, newScene))
  }

  __bump = new Bump(pixi)
  get bump() {
    return this.__bump
  }

  /**
   * @type {PIXI.Graphics}
   */
  get graphics() {
    return this._graphics
  }

  /**
   * Return the auto-generated view of the game
   */
  get gameView() {
    return this._app.view
  }

  /**
   * Set the game background color
   * @param {number} color The color
   */
  setGameColor(color) {
    this._app.renderer.backgroundColor = color
  }

  /**
   * 
   * Add a stage to game
   * @param {PIXI.Container} stage 
   */
  addStage(stage) {
    this._app.stage.addChild(stage)
  }

  /**
   * 
   * @param {BaseScene} scene 
   */
  addScene(scene) {
    this._sceneManager.addScene(scene)
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
    this._sceneManager.nextScene()
    this._app.renderer.backgroundColor = 0x00ff00
    this._app.ticker.maxFPS = 120
    this._app.ticker.add((delta) => {
      this._gameLoop(delta / this._app.ticker.FPS)
    })
  }

  /**
   * @protected
   * Initialize resources of the game
   */
  _initializeResource() {
    ResourceManager.addResource("tilemap", "./assets/images/tilemap.png")
    ResourceManager.addResource("player", "./assets/images/player.png")
    ResourceManager.addResource("b", "./assets/images/b.png")
    ResourceManager.addTextureCollection("player", [
      { name: "run", path: "./assets/images/player.png" }
    ])
    ResourceManager.add
    return ResourceManager.load()
  }

  /**
   * 
   * @param {BaseScene[]} args 
   */
  _replaceSceneChildFromApp([oldScene, newScene]) {
    // If the old scene exists, remove it from application to avoid redundant render
    if (oldScene) {
      const oldSceneChild = this._app.stage.getChildByName(oldScene.name)
      this._app.stage.removeChild(oldSceneChild)
    }
    this._app.stage.addChild(newScene)
  }

  /**
   * @protected
   * @param {Number} delta
   */
  _gameLoop(delta) {
    const currentScene = this._sceneManager.currentScene
    currentScene.render(this._app.renderer)
    currentScene.update(delta)
    ControlComponent.update()
  }
}

const GameManagerInstance = new GameManager()

export default GameManagerInstance