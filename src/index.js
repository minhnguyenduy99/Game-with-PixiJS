import * as pixi from 'pixi.js'

const app = new pixi.Application({ 
  width: 256, 
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1 
})

document.appendChild(app.view)




