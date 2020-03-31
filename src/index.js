require.context('./assets/images', true)
import * as pixi from 'pixi.js'
import { GameManager, Bump } from './core'
import TestScene from './scenes/test-scene'

const b = new Bump(pixi)
console.log(b)

GameManager.setup().then(() => {
  window.document.body.appendChild(GameManager.gameView)
  const scene = new TestScene("test");
  scene.pivot.set(0, window.innerHeight);
  scene.scale.set(1, -1);
  GameManager.addScene(scene);
  GameManager.start()
})

