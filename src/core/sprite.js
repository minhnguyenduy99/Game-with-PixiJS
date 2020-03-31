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

  /**
   * 
   */
  setFilter(colorCode) {
    let color = new pixi.filters.ColorMatrixFilter();
    let r = colorCode >> 16 & 0xFF;
    let g = colorCode >> 8 & 0xFF;
    let b = colorCode & 0xFF;
    color.matrix[0] = r / 255;
    color.matrix[6] = g / 255;
    color.matrix[12] = b / 255;
    this.filters = [color]
  }

}
