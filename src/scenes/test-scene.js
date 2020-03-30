import { BaseScene, ControlComponent } from "../core"
import Player from "../core/player"
import Rigibody from "../core/rigibody"

export default class TestScene extends BaseScene {

  constructor() {
    super()

    this.__initializeGameObjects()
  }

  __initializeGameObjects() {
    const player = new Player()
    player.position.set(50, 50)
    player.addComponent(new Rigibody(player,0,100,0,0));
    this.addChild(player)
  }
}

