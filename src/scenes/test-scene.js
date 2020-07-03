import { BaseScene, ControlComponent, ResourceManager, GameObject } from "../core"
import TileMap from "../components//tile-map";
import Player from "../prefab/player";
// import Rigibody from "../components/rigibody";
//import GameManagerInstance from "../core/game-manager";
//import PhysicalInstance from "../core/physical";


export default class TestScene extends BaseScene {

  constructor() {
    super()

    this.__initializeGameObjects()
  }

  __initializeGameObjects() {
    let mapContainer = new GameObject()
    //PhysicalInstance.tilemap = mapContainer.addComponent(new TileMap(mapContainer, null))
    //PhysicalInstance.tilemap.setFilter(0x000080)

    let p = new Player(2, 2)
    p.position.set(45 << 2, 200)
    p.setFilter(0xff0000)
    //p.addComponent(new Rigibody(p, 0, 15))
    mapContainer.addChild(p)

    this.addChild(mapContainer)
    this.addChild(p)
  }
}