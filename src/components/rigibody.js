import Component from '../core/component'
import GameObject from '../core/game-object'

export default class Rigibody extends Component {
    /**
     * @public
     * @type {number}
     */
    ax;

    /**
     * @public
     * @type {number}
     */
    ay;

    /**
     * Init rigibody physic
     * @param {GameObject} gameObject attach GameObject
     * @param {Number} vx Init vx velocity
     * @param {Number} vy Init vy velocity
     * @param {Number} vy Init ax acceleration
     * @param {Number} vy Init ay acceleration
     */
    constructor(gameObject, vx = 0, vy = 0) {
        super(gameObject);
        this._object.setVelocity(vx, vy);
        this.ax = -1;
        this.ay = -9.8;
    }

    /**
     * @override
     * @param {number} delta delta time
     */
    update(delta) {
        super.update(delta);
        this._object.vx += this.ax * delta;
        this._object.vy += this.ay * delta;
    }
}