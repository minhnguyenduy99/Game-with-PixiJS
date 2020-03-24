import ResourceManager from './resource-manager'
import Sprite from './sprite'
import { TilingSprite } from 'pixi.js'

export default class ObjectCreator {

  /**
   * Create single-texture object
   * @param {String} name The name of resource
   * @returns {PIXI.Sprite} The sprite from texture resource
   */
  static createSingleTextureObject(name) {
    const texture = ResourceManager.getTextureByName(name)
    return new Sprite(texture)
  }

  /**
   * Create tile-texture object
   * @param {String} tag Tag of the texture collection
   * @param {String} name Name of the texture in the collection
   * @param {Number} width The with of tile
   * @param {Number} height The height of tile
   */
  static createTileSpriteObject(tag, name, width, height) {
    const texture = ResourceManager.getTextureIncludeTag(name, tag)
    return new TilingSprite(texture, width, height)
  }
}