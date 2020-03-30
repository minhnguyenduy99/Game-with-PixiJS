import { BaseScene, ControlComponent } from "../core"
import Player from "../core/player"

export default class TestScene extends BaseScene {

  constructor() {
    super()

    this.__initializeGameObjects()
  }

  __initializeGameObjects() {
    const player = new Player()
    player.position.set(50, 50)
    this.addChild(player)
  }
}

