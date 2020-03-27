import Component from './component'
import { GameObject } from '.';

export default class Rigibody extends Component {
    /**
     * @public
     * @type {number}
     */
    gravity = -9.8;

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
    constructor(gameObject, vx = 0, vy = 0, ax = 0, ay = 0) {
        super(gameObject);
        this._object.setVelocity(vx,vy);
        this.ax = ax;
        this.ay = ay;
    }

    /**
     * @override
     * @param {number} delta delta time
     */
    update(delta) {
        super.update(delta);
        this._object.vx += this.ax * delta;
        this._object.vy += (this.ay + this.gravity) * delta;
    }
}