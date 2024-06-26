import * as pixi from 'pixi.js'
import Sprite from './sprite'
import Component from './component'
import AnimationComponent from './animation-component'
import TileSprite from './tile-sprite'
import { ControlComponent } from '.'
// import Rigibody from '../components/rigibody'
//import PhysicalInstance from './physical'

const DEFAULT_TILE_ANIMATION_SPEED = 10


/**
 * @type {number} covert cm to pixel
 */
const CENTIMET_TO_PIXEL = 29

export default class GameObject extends pixi.Container {

  /**
   * @public
   * @type {Number}
   */
  vx

  /**
   * @public
   * @type {Number}
   */
  vy

  /**
   * @protected
   * @type {Sprite | TileSprite}
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

  constructor() {
    super()
    this._components = []
    this.setVelocity(0, 0)
  }

  /**
   * @returns {ControlComponent}
   */
  get controlComponent() {
    return this.getComponent(ControlComponent);
  }

  /**
   * Set a sprite to game object. If the sprite already exists, it will be replaced by the new one
   * @param {Sprite | TileSprite} sprite 
   */
  setRenderSprite(sprite) {
    if (this._renderObj) {
      this.removeChild(this._renderObj)
    }
    this._renderObj = sprite
    this.addChild(this._renderObj)
    this._renderObj.pivot.set(this._renderObj.width / 2, this._renderObj.height / 2)
    this._renderObj.scale.y = -1
    this.__addRenderAnimation()
  }

  /**
   * Add a component to game object
   * @returns {Component} component just add
   * @param {Component} newComponent 
   */
  addComponent(newComponent) {
    const componentIndex = this._components.findIndex(function (component) {
      return component.constructor.name === newComponent.constructor.name;
    })
    if (componentIndex !== -1) {
      return;
    }
    // if (newComponent instanceof Rigibody)
    //   PhysicalInstance.RigibodyList.push(newComponent)
    // else
    this._components.push(newComponent)
    newComponent._object = this;
    return newComponent
  }

  /**
   * 
   * @param {Function} componentClass The class of component
   * @returns {Component}
   */
  getComponent(componentClass) {
    if (!(componentClass.prototype instanceof Component)) {
      throw new Error("Component class must be typeof Component");
    }
    return this._components.find(component => {
      return component.constructor.name === componentClass.name;
    });
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

  render(renderer) {
    super.render(renderer)
    this._components.forEach(component => component.render())
  }

  get isGameObject() {
    return true;
  }

  /**
   * @override
   * @param {Number} delta 
   */
  update(delta) {
    this.__updateComponents(delta)
    this.children.forEach((child) => {
      if (child.isGameObject) {
        child.update(delta)
      }
    })
    this.x += this.vx * delta
    this.y += this.vy * delta
  }

  /**
   * Set the velocity of game object
   * @param {Number} vx velocity on x-axis 
   * @param {Number} vy velocity on y-axis
   */
  setVelocity(vx, vy = vx) {
    this.vx = vx
    this.vy = vy
  }

  /**
   * Return the velocity of game object
   * @returns {{ vx: Number, vy: Number }}
   */
  get velocity() {
    return {
      vx: this.vx,
      vy: this.vy
    }
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