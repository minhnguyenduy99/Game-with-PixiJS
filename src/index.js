require.context('./assets/images', true)
import * as pixi from 'pixi.js'
import { GameManager, Bump } from './core'
import TestScene from './scenes/test-scene'

const b = new Bump(pixi)
console.log(b)

GameManager.setup().then(() => {
  GameManager.addScene(new TestScene("test"))
  GameManager.start()
})

