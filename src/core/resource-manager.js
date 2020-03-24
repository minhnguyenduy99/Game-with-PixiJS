import * as pixi from 'pixi.js'


class ResourceManager {
  
  /**
   * @private
   * @type {PIXI.Loader}
   */
  __loader

  /**
   * @public
   * @param {pixi.Loader} __loader The resource __loader to use 
   */
  constructor(loader = pixi.Loader.shared) {
    if (!loader) {
      if (pixi.Loader.shared) {
        throw new Error("__loader has not been instantiated")
      }
      this.__loader = pixi.Loader.shared
    } else {
      this.__loader = loader
    }
  }

  /**
   * Load all added resources
   */
  load() {
    return new Promise((resolve) => {
      this.__loader.load((loader, resources) => {
        console.log(resources)
        resolve()
      })
    })
  }

  /**
   * @public
   * @param {String} tag a label to for the all the added textures
   * @param {{name: String, path: String}[]} resources resource collection
   */
  addTextureCollection(tag = '', resources = []) {
    resources.forEach(resource => {
      this.addTexture(this.generateResourceName(tag, resource.name), resource.path)
    })
  }

  /**
   * @public
   * @param {String} tag tag of the texture resource
   * @returns {{ name: String, texture: PIXI.Texture}[]} Array of TextureObject
   */
  getTextureCollection(tag) {
    const resourceArr = Object.values(this.__loader.resources)

    return resourceArr
      .filter(resource => resource.name.includes(tag))
      .map(resource => {
        return {
          name: resource.name,
          texture: resource.texture
        }
      })
  }

  /**
   * Load a resource from a resource collection
   * @public
   * @param {String} name Name of the texture
   * @param {String} tag Tag of texture collection
   * @returns {PIXI.Texture}
   * @example
   *   ResourceManager.addTetxureCollection("player", "run")
   *   .then(()) => {
   *   const playerRunTexture = ResourceManager.getTextureIncludeTag("player", "run")
   *   })
   * 
   */
  getTextureIncludeTag(name, tag) {
    let resourceName = this.generateResourceName(tag, name)
    return this.__loader.resources[resourceName].texture
  }

  /**
   * Get texture from resource by name of resource
   * @param {String} name Name of the resource
   * @returns {PIXI.Texture} The texture resource
   */
  getTextureByName(name) {
    return this.__loader.resources[name].texture
  }

  /**
   * 
   * @param {String} name alias for the texture
   * @param {String} sourcePath the path to the resource
   */
  addTexture(name, sourcePath) {
    return this.__loader.add(name, sourcePath)
  }


  /**
   * @private
   * Generate the combined value of two strings
   * @param {String} tag 
   * @param {String} name 
   */
  generateResourceName(tag, name) {
    return `${tag}_${name}`
  }
}

const ResrcManager = new ResourceManager()

export default ResrcManager