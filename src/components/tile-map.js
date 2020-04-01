import { Component, GameObject, TileSprite } from "../core";

const test = [[1, 1, 1], [1, 1, 0], [1, 0, 0]]

/**
 * @type {TileSprite}
 */
const __tileSprite = new TileSprite("tilemap", 16, 16)

export default class TileMap extends Component {

    /**
     * @private
     * @type {GameObject[][]}
     */
    __map


    /**
     * 
     * @param {GameObject} attachObj 
     * @param {Number[][]} tile 
     */
    constructor(attachObj, tile) {
        super(attachObj)


        tile = test

        this.__map = Array.from({ length: tile.length })
        for (i = 0; i < this.__map.length; i++) {
            this.__map[i] = new Array.from(tile[i].length)
            for (j = 0; j < this.__map[i].length; j++) {
                this.__map[i][j] = new GameObject()
                //this.__map[i][j].setRenderSprite() set cái tile ở đây
            }
        }
    }
}