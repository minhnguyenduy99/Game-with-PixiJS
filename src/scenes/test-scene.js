import { BaseScene, ControlComponent, ResourceManager, GameObject } from "../core"
import TileMap from "../components//tile-map";
import Player from "../core/player"


export default class TestScene extends BaseScene {

  constructor() {
    super()

    this.__initializeGameObjects()
  }

  __initializeGameObjects() {
    let mapContainer = new GameObject()
    mapContainer.addComponent(new TileMap(mapContainer, null))
    this.addChild(mapContainer)
  }
}

