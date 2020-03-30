import * as pixi from 'pixi.js'
import GameObject from './game-object'

export default class BaseScene extends pixi.Container {

  /**
   * 
   * @param {String} name Name of the scene 
   */
  constructor(name) {
    super()
    this.name = name
  }

  /**
   * Update the scene
   * @virtual
   * @param {Number} delta 
   */
  update(delta) {
    this.children.forEach( (child) => {
      if (child instanceof GameObject) {
        child.update(delta)
      }
    })
  }
}