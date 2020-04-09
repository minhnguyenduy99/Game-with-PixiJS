import { Component, GameObject, TileSprite } from "../core";
import GameManagerInstance from "../core/game-manager";

const test = [
	[1, 1, 1, 1, 1, -1],
	[1, 1, -1, -1, 1, 1],
	[1, 1, 1, -1, 1, 1],
	[1, 1, 1, 1, 1]
]

export default class TileMap extends Component {

	/**
	 * @private
	 * @type {TileSprite[][]}
	 */
	__map

	/**
	* @public
	* @type {number[][]}
	*/
	tile

	/**
	 * @protected
	 * @type {GameObject}
	 */
	_containerObj


	/**
	 * @param {GameObject} attachObj 
	 * @param {Number[][]} tile 
	 */
	constructor(attachObj, tile) {
		super(attachObj)
		this.tile = test.reverse()
		this._containerObj = new GameObject()

		this.__map = new Array(this.tile.length)
		for (let i = 0; i < this.tile.length; i++) {
			this.__map[i] = new Array(this.tile[i].length)
			for (let j = 0; j < this.tile[i].length; j++) {
				if (this.tile[i][j] < 0) {
					continue
				}
				this.__map[i][j] = new TileSprite("tilemap", 32, 32)
				this.__map[i][j].setTileByIndex(this.__getTileIndex(i, j))
				this._containerObj.addChild(this.__map[i][j])
				this.__map[i][j].position.set(j * 32 + 16, i * 32 + 16)

			}
		}

		attachObj.addChild(this._containerObj)
		this.setFilter(0xffffff)
	}
	//#region suport function
	/**
	 * @returns {number} index number in tilemap sprite depending on special location
	 * @param {number} i row
	 * @param {number} j column
	 */
	__getTileIndex(i, j) {
		let ret = this.__getPoint(i, j + 1) | (this.__getPoint(i + 1, j) << 1) | (this.__getPoint(i, j - 1) << 2) | (this.__getPoint(i - 1, j) << 3)
		let flag = 0
		switch (ret) {
			case 3:
				return this.__getPoint(i + 1, j + 1) == 0 ? 16 : 3
			case 6:
				return this.__getPoint(i + 1, j - 1) == 0 ? 17 : 6
			case 7:
				if (this.__getPoint(i + 1, j - 1) == 0)
					flag += 1;
				if (this.__getPoint(i + 1, j + 1) == 0)
					flag += 2;
				return flag > 0 ? 21 - flag : 7
			case 9:
				return this.__getPoint(i - 1, j + 1) == 0 ? 21 : 9
			case 11:
				if (this.__getPoint(i + 1, j + 1) == 0)
					flag += 1;
				if (this.__getPoint(i - 1, j + 1) == 0)
					flag += 2;
				return flag > 0 ? 25 - flag : 11
			case 12:
				return this.__getPoint(i - 1, j - 1) == 0 ? 25 : 12
			case 13:
				if (this.__getPoint(i - 1, j + 1) == 0)
					flag += 1;
				if (this.__getPoint(i - 1, j - 1) == 0)
					flag += 2;
				return flag > 0 ? 29 - flag : 13
			case 14:
				if (this.__getPoint(i - 1, j - 1) == 0)
					flag += 1;
				if (this.__getPoint(i + 1, j - 1) == 0)
					flag += 2;
				return flag > 0 ? 32 - flag : 14
			case 15:
				flag = this.__getPoint(i + 1, j + 1) + (this.__getPoint(i + 1, j - 1) << 1) + (this.__getPoint(i - 1, j - 1) << 2) + (this.__getPoint(i - 1, j + 1) << 3)
				console.log(flag)
				return flag == 15 ? 15 : 32 + flag
		}
		return ret
	}

	/**
	 * @private
	 * @returns number check if map[i][j] is exist and have flatform
	 * @param {number} i
	 * @param {number} j
	 */
	__getPoint(i, j) {
		if (i < 0 || j < 0 || i >= this.tile.length || j >= this.tile[i].length)
			return 0
		return this.tile[i][j] < 0 ? 0 : 1
	}

	//#endregion

	/**
	 *
	 * @param {number} colorCode
	 */
	setFilter(colorCode) {
		this.__map.forEach(tileArr => {
			tileArr.forEach(tile => {
				tile.setFilter(colorCode)
			})
		})
	}

	update(delta) {
		super.update(delta)

		let b = GameManagerInstance.bump

		this.collisionObject.forEach(e => {
			let width = e.getBounds(false).width
			let height = e.getBounds(false).height
			let top = Math.floor((e.y + height / 2) / 32) + 1
			let bot = Math.floor((e.y - height / 2) / 32) - 1
			let left = Math.floor((e.x - width / 2) / 32) - 1
			let right = Math.floor((e.x + width / 2) / 32) + 1
			for (let i = bot; i <= top; i++)
				for (let j = left; j <= right; j++)
					if (this.__getPoint(i, j) > 0) {
						//console.log(`[${this.__map[i][j]}] [${e}]`)
						if (b.hit(e, this.__map[i][j], true))
							e.vy = 10
							console.log("bùm")
					}

		})
	}

	/**
	 * @type {GameObject[]}
	 */
	collisionObject = []

	/**
	 * @public
	 * @param {GameObject} obj 
	 */
	AddColisionObject(obj) {
		this._containerObj.addChild(obj)
		this.collisionObject.push(obj)
	}
}