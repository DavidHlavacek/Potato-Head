  import Phaser from 'phaser'


  import MainScene from './scenes/mainScene.js';


  const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    pixelArt: true,
    scene: MainScene
  };

  const game = new Phaser.Game(config);
