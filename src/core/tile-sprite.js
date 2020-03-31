import * as pixi from 'pixi.js'
import ResourceManager from './resource-manager'


export default class TileSprite extends pixi.TilingSprite {

  /**
   * @protected
   * @type {Number}
   */
  _columns

  /**
   * @private
   * @type {Number}
   */
  _currentTileIndex

  /**
   * 
   * @param {pixi.Texture} texture
   * @param {Number} width 
   * @param {Number} height
   */
  constructor(name, width, height) {
    super(ResourceManager.getTextureByName(name), width, height)
    this._columns = Math.floor(this.texture.width / width)
    this._currentTileIndex = 0
  }
  
  /**
   * Change the current texture of the sprite
   * @param {pixi.Texture} texture 
   */
  changeTexture(texture) {
    this.texture = texture
  }

  /**
   * Update the tile 
   */
  nextTile() {
    this._currentTileIndex = (this._currentTileIndex + 1) % this._columns
    this.tilePosition.x = this.width * this._currentTileIndex
  }

  /**
   * @public
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