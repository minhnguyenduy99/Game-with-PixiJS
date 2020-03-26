import BaseScene from './base-scene'
import { Subject } from './observer-pattern'

export default class SceneManager{
  
  /**
   * @private
   * @type {Subject}
   */
  __currentSceneChanged

  /**
   * @protected
   * @type {BaseScene[]}
   */
  _scenes

  /**
   * @protected
   * @type {Number}
   */
  _currentSceneIndex

  /**
   * @protected
   * @type {BaseScene}
   */
  _currentScene

  /**
   * @protected
   * @type {Boolean}
   */
  _isLastScene

  constructor() {
    this.__currentSceneChanged = new Subject()
    this._scenes = []
    this._isLastScene = null
    this._currentSceneIndex = -1
  }

  /**
   * Get the current scene
   * @returns {BaseScene}
   */
  get currentScene() {
    return this._currentScene
  }

  get numberOfScenes() {
    return this._scenes.length
  }

  /**
   * Is the current scene is the last one
   */
  get isLastScene() {
    return this._currentSceneIndex === this._scenes.length - 1
  }

  /**
   * Set the current scene by name
   * @param {String} sceneName Name of the scene in the `SceneManager`
   */
  setCurrentScene(sceneName) {
    const scene = this.getSceneByName(sceneName)
    if (!scene) {
      throw new Error(`Scene named ${sceneName} does not exist`)
    }
    const oldScene = this._currentScene
    this._currentSceneIndex = this._scenes.indexOf(scene)
    this._currentScene = scene
    this.__currentSceneChanged.notifyObservers(oldScene, this._currentScene)
  }

  /**
   * Get the scene by name. Returns `null` if no scene is found
   * @param {String} sceneName 
   */
  getSceneByName(sceneName) {
    return this._scenes.find(scene => scene.name === sceneName)
  }

  /**
   * Add a scene to `SceneManager`. If the scene's name already exists, an error will be thrown
   * @param {BaseScene} scene 
   */
  addScene(scene) {
    if (!scene) {
      throw new Error("Null scene is not allowed")
    } 
    this._scenes.push(scene)
  }

  /**
   * Go to next scene. 
   * Throw error if the current scene is the last one
   */
  nextScene() {
    if (this._scenes.length === 0) {
      return
    }
    if (!this._currentScene) {
      this.__setCurrentSceneByIndex(0)
    } else {
      this.__setCurrentSceneByIndex(++this._currentSceneIndex)
    }

    // notify that the currentSceneChanged has been commited
    this.__currentSceneChanged.notifyObservers(
      this._scenes[this._currentSceneIndex - 1], 
      this.currentScene)
  }

  /**
   * 
   * @param {(oldScene: BaseScene, newScene: BaseScene) => void} callback 
   */
  onCurrentSceneChanged(callback) {
    if (!callback) {
      return
    }
    this.__currentSceneChanged.addObserver(callback)
  }

  /**
   * @private
   * @param {Number} index 
   */
  __setCurrentSceneByIndex(index) {
    this._currentScene = this._scenes[index]
    this._currentSceneIndex = index
  }
} 