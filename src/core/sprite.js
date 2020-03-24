import * as pixi from 'pixi.js'
import ResourceManager from './resource-manager'

export default class Sprite extends pixi.Sprite {

  /**
   * 
   * @param {String} name Name of the texture resource
   */
  constructor(name) {
    super(ResourceManager.getTextureByName(name))
  }
  
  /**
   * Change the current texture of the sprite
   * @param {pixi.Texture} texture 
   */
  changeTexture(texture) {
    this.texture = texture
  }
}
