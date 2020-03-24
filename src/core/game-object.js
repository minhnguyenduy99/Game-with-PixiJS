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
  _moveX

  /**
   * @protected
   * @type {Number}
   */
  _moveY

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
   * 
   * @param {PIXI.Container} stage 
   */
  constructor() {
    super()
    this._components = []
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
   * @override
   * @param {Number} delta 
   */
  update(delta) {
    this.__updateComponents(delta)
  }

  /**
   * Set the distance per move
   * @param {Number} x 
   * @param {Number} y 
   */
  setMoveDistance(x, y) {
    this._moveX = x
    this._moveY = y
  }

  moveLeft() {
    this.position.x -= this._moveX
  }

  moveRight() {
    this.position.x += this._moveX
  }

  moveTop() {
    this.position.y -= this._moveY
  }

  moveBottom() {
    this.position.y += this._moveY
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
    this._components.push(new AnimationComponent(this, () => this._renderObj.nextTile(), DEFAULT_TILE_ANIMATION_SPEED))
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

  __callRenderObjMethod(methodName, ...args) {
    if (!this._renderObj) {
      return
    }
    try {
      return Function.call(this._renderObj[methodName], args)
    } catch {
      // do nothing
    }
  }
}