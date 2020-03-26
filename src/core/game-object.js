import * as pixi from 'pixi.js'
import Sprite from './sprite'
import Component from './component'
import AnimationComponent from './animation-component'
import TileSprite from './tile-sprite'

const DEFAULT_TILE_ANIMATION_SPEED = 20

export default class GameObject extends pixi.Container {

  /**
   * @protected
   * @type {Number}
   */
  _vX

  /**
   * @protected
   * @type {Number}
   */
  _vY

  /**
   * @protected
   * @type {Sprite}
   */
  _renderObj

  /**
   * @protected
   * @type {Component[]}
   */
  _components

  /**
   * @protected
   * @type {AnimationComponent}
   */
  _tileAnimationComponent

  /**
   * 
   * @param {PIXI.Container} stage 
   */
  constructor() {
    super()
    this._components = []
    this.setVelocity(0, 0)
  }

  /**
   * Set a sprite to game object. If the sprite already exists, it will be replaced by the new one
   * @param {Sprite} sprite 
   */
  setRenderSprite(sprite) {
    if (this._renderObj) {
      this.removeChild(this._renderObj)
    }
    this._renderObj = sprite
    this.addChild(this._renderObj)
    this.pivot.set(this.width / 2, this.height / 2)
    this.__addRenderAnimation()
  }

  /**
   * Add a component to game object
   * @param {Component} component 
   */
  addComponent(component) {
    this._components.push(component)
  }

  /**
   * Set animation of 
   * @param {Number} speed 
   */
  setTileAnimationSpeed(speed) {
    if (speed < 0) {
      throw new Error("The speed cannot be negative")
    }
    this._tileAnimationComponent.setAnimationSpeed(speed)
  }

  /**
   * @override
   * @param {Number} delta 
   */
  update(delta) {
    this.__updateComponents(delta)
  }

  /**
   * Set the velocity of game object
   * @param {Number} vx velocity on x-axis 
   * @param {Number} vy velocity on y-axis
   */
  setVelocity(vx, vy = vx) {
    this._vX = vx
    this._vY = vy
  }

  /**
   * Return the velocity of game object
   * @returns {{ vx: Number, vy: Number }}
   */
  get velocity() {
    return {
      vx: this._vX,
      vy: this._vY
    }
  }

  moveLeft() {
    this.position.x -= this._vX
  }

  moveRight() {
    this.position.x += this._vX
  }

  moveTop() {
    this.position.y -= this._vY
  }

  moveBottom() {
    this.position.y += this._vY
  }

    /**
   * Flip the sprite vertically
   */
  flipVertical() {
    this.scale.set(-1, 1)
  }

  /**
   * Flip the sprite horizontally
   */
  flipHorizontal() {
    this.scale.set(1, -1)
  }


  /**
   * Add render animation if the `_renderObj` is typeof `TileSprite`
   * @private
   */
  __addRenderAnimation() {
    if (!this._renderObj || !(this._renderObj instanceof TileSprite)) {
      return
    }
    this._tileAnimationComponent = new AnimationComponent(this, () => this._renderObj.nextTile(), DEFAULT_TILE_ANIMATION_SPEED)
    this._components.push(this._tileAnimationComponent)
  }

  /**
   * Update the components of object
   * @private
   * @param {Number} delta 
   */
  __updateComponents(delta) {
    this._components.forEach(component => {
      if (!component.isActive) {
        component.activate()
      }
      component.update(delta)
    })
  }
}