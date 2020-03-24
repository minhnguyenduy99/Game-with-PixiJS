require.context('./assets/images', true)
import GameManager from './core/game-manager'
import Player from './core/player'

GameManager.setup().then(() => {
  const player = new Player()
  player.position.set(50, 50) 
  GameManager.currentStage().addChild(player)
  GameManager.start()
})

