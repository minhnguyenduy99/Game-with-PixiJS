import { BaseScene, ControlComponent, ResourceManager, GameObject } from "../core"
import TileMap from "../components//tile-map";
import Player from "../prefab/player";
import Rigibody from "../components/rigibody";


export default class TestScene extends BaseScene {

  constructor() {
    super()

    this.__initializeGameObjects()
  }

  __initializeGameObjects() {
    let mapContainer = new GameObject()
    let map = mapContainer.addComponent(new TileMap(mapContainer, null))
    map.setFilter(0x000080)

    let p = new Player(2, 2)
    p.position.set(32 << 1, 300)
    p.setFilter(0xff0000)
    p.addComponent(new Rigibody(p, 0, 1))
    map.AddColisionObject(p)
    this.addChild(mapContainer)
  }
}