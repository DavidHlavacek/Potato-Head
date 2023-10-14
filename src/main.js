import Phaser from 'phaser'


import MainScene from './scenes/mainScene.js';


const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  pixelArt: true,
  scene: MainScene,
  default: 'arcade',
  arcade: {
    gravity: { y: 200 }, // Set the gravity value as needed
    debug: true // Set to true for debugging physics
  }
};

const game = new Phaser.Game(config);
