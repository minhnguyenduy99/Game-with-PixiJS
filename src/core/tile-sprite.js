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
   * @protected
   * @type {number}
   */
  _rows

  /**
   * 
   * @param {pixi.Texture} texture
   * @param {Number} width 
   * @param {Number} height
   */
  constructor(name, width, height) {
    super(ResourceManager.getTextureByName(name), width, height)
    this._columns = Math.floor(this.texture.width / width)
    this._rows = Math.floor(this.texture.height / height)
    this.pivot.set(this.width / 2, this.height / 2)
    this.scale.y = -1
    this._currentTileIndex = 0
  }

  /**
*
* @param {number} row
* @param {number} col
*/
  setTileAt(row, col) {
    this.tilePosition.set(-col * this.width, -row * this.height)
  }

  setTileByIndex(index) {
    if (index < 0 || index >= this._columns * this._rows) {
      throw new Error("invalid index")
    }
    this.setTileAt(Math.floor(index / this._columns), index % this._columns)
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
    this._currentTileIndex = (this._currentTileIndex + 1) % (this._columns * this._rows)
    this.tilePosition.x = this.width * this._currentTileIndex
    this.tilePosition.y = this.height * (Math.round(this._currentTileIndex / this._columns))
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