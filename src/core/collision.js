import GameObject from "./game-object";
import { Rectangle } from "pixi.js";

/**
 * @returns {boolean} 
 * @param {GameObject} a 
 * @param {GameObject} b push object
 */
export function hit(a, b, collision_call = false) {
    let box1 = new Box(a)
    let box2 = new Box(b)
    let ret = !(box1.left > box2.right || box1.right < box2.left || box1.top > box2.bottom || box1.bottom < box2.top)
    if (ret && collision_call) {
        if (a.OnCollision)
            a.OnCollision(new CollisionOut(b))
        if (b.OnCollision)
            b.OnCollision(new CollisionOut(a))
    }
    return ret
}

/**
 * @returns {boolean} is collision
 * @param {GameObject} a moving object
 * @param {GameObject} b push-ed object
 * @param {number} TimeStep frame-by-frame time
 * @param {boolean} collision_call is collision method had been call or not
 */
export function sweptAABB(a, b, TimeStep, collision_call = false) {

    if (hit(a, b, collision_call))
        return

    let box1 = new Box(a)
    let box2 = new Box(b)

    box1.vx -= box2.vx;
    box1.vy -= box2.vy;
    box2.vx = 0;
    box2.vy = 0;

    let xInvEntry, yInvEntry, xInvExit, yInvExit, xEntry, yEntry, xExit, yExit
    if (box1.vx > 0) {
        xInvEntry = box2.x - (box1.x + box1.width)
        xInvExit = (box2.x + box2.width) - box1.x
    }
    else {
        xInvEntry = (box2.x + box2.width) - box1.x
        xInvExit = box2.x - (box1.x + box1.width)
    }
    if (box1.vy > 0) {
        yInvEntry = box2.y - (box1.y + box1.height)
        yInvExit = (box2.y + box2.height) - box1.y
    }
    else {
        yInvEntry = (box2.y + box2.height) - box1.y
        yInvExit = box2.y - (box1.y + box1.height)
    }

    if (box1.vx == 0) {
        xEntry = Number.NEGATIVE_INFINITY
        xExit = Number.POSITIVE_INFINITY
    } else {
        xEntry = xInvEntry / box1.vx
        xExit = xInvExit / box1.vx
    }
    if (box1.vy == 0) {
        yEntry = Number.NEGATIVE_INFINITY
        yExit = Number.POSITIVE_INFINITY
    } else {
        yEntry = yInvEntry / box1.vy
        yExit = yInvExit / box1.vy
    }
    let Entry = Math.max(xEntry, yEntry)
    let Exit = Math.min(xExit, yExit)

    if (Entry > Exit || (xEntry < 0 && yEntry < 0) || (xEntry > TimeStep || yEntry > TimeStep))
        return false

    let normalX, normalY
    if (xEntry > yEntry) {
        if (xInvEntry < 0) {
            normalX = Entry
            normalY = 0
        } else {
            normalX = -Entry
            normalY = 0
        }
    } else {
        if (yInvEntry < 0) {
            normalX = 0
            normalY = Entry
        } else {
            normalX = 0
            normalY = -Entry
        }
    }

    if (collision_call) {
        if (a.OnCollision)
            a.OnCollision(new CollisionOut(b, normalX, normalY, TimeStep))
        if (b.OnCollision)
            b.OnCollision(new CollisionOut(a, normalX, normalY, TimeStep))
    }

    return true
}

export default class CollisionOut {
    /**
     * time to collision in x-axis
     * @type {number}
     */
    normalX
    /**
     * time to collision in y-axis
     * @type {number}
     */
    normalY

    /**
     * time of frame
     * @type {number}
     */
    TimeStep

    /**
     * @type {GameObject}
     */
    gameObject

    /**
     * @param {GameObject} thatObject 
     */
    constructor(thatObject, normalX = 0, normalY = 0, TimeStep = 0) {
        this.gameObject = thatObject
        this.normalX = normalX
        this.normalY = normalY
        this.TimeStep = TimeStep
    }
}

export class Box extends Rectangle {
    /**
     * @param {GameObject} o 
     */
    constructor(o) {
        super(o.x - o.width / 2, o.y - o.height / 2, o.width, o.height)
        if (o.vx)
            this.vx = o.vx
        else
            this.vx = 0
        if (o.vy)
            this.vy = o.vy
        else
            this.vy = 0
    }
    /**
     * velocity x
     * @type {number}
     */
    vx
    /**
     * velocity y
     * @type {number}
     */
    vy
}