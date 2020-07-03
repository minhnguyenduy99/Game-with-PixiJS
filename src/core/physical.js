import Rigibody from "../components/rigibody";
import TileMap from "../components/tile-map";


class Physical {
    /**
     * List Rigibody object will check collision
     * @private
     * @type {Rigibody[]} 
     */
    RigibodyList

    /**
     * Current tile map
     * @type {TileMap}
     */
    tilemap

    constructor(){}

    Update(delta) {
        this.RigibodyList.forEach(e => e.update(delta))

        //collision call
        if (!this.tilemap)
            return

        this.__RigibodyList.forEach(e => {
            let top = Math.floor((e.y + e.height / 2) / 32) + 1
            let bot = Math.floor((e.y - e.height / 2) / 32) - 1
            let left = Math.floor((e.x - e.width / 2) / 32) - 1
            let right = Math.floor((e.x + e.width / 2) / 32) + 1
            for (let i = bot; i <= top; i++)
                for (let j = left; j <= right; j++)
                    if (this.tilemap.__getPoint(i, j) > 0)
                        sweptAABB(e, this.tilemap.__map[i][j], delta, true)
        })
    }
}

// const PhysicalInstance = new Physical()

// export default PhysicalInstance