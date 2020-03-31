import { BaseScene, ControlComponent, ResourceManager } from "../core"
import Player from "../core/player"
import * as pixi from "pixi.js"

export default class TestScene extends BaseScene {

  constructor() {
    super()

    this.__initializeGameObjects()
  }

  __initializeGameObjects() {
    const player = new Player()
    player.position.set(50, 50)
    //player.addComponent(new Rigibody(player,0,100,0,0));
    this.addChild(player)
  }
}

