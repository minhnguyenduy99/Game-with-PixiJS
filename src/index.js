require.context('./assets/images', true)
import GameManager from './core/game-manager'
import Player from './core/player'
import { Bump } from './core/bump'
import * as pixi from 'pixi.js'

const b = new Bump(pixi)
console.log(b)

GameManager.setup().then(() => {
  const player = new Player()
  player.position.set(50, 50) 
  GameManager.currentStage().addChild(player)
  GameManager.start()
})

