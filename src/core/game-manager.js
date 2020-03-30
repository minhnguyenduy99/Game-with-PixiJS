import * as pixi from 'pixi.js'
import ControlComponent from './control-component'
import ResourceManager from './resource-manager'
import SceneManager from './scene-manager'
import BaseScene from './base-scene'

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
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: 1,
      transparent: true,
      resizeTo: window
    })
    this._graphics = new pixi.Graphics()
    this._sceneManager = new SceneManager()
    this._sceneManager.onCurrentSceneChanged((oldScene, newScene) => this._replaceSceneChildFromApp(oldScene, newScene))
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