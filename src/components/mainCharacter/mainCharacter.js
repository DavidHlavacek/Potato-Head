export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey, health, speed) {
      super(scene, x, y, textureKey);

      this.scene = scene;
      this.health = health;
      this.speed = speed;

      this.scene.add.existing(this);     
      this.isJumping = false;
      
  }

  
}
 

  

  

