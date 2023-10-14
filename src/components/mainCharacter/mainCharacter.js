export default class MainCharacter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey, health, speed) {
      super(scene, x, y, textureKey);
  
      this.scene = scene;
      this.health = health;
      this.speed = speed;
    
        this.scene.add.existing(this).setSize(100, 100);

    }

  
    update() {
      // Move the enemy to the left

    }
  
    takeDamage(damage) {
      this.health -= damage;
  
      // Check if the enemy's health is less than or equal to 0, and destroy it
      if (this.health <= 0) {
        this.destroy();
      }
    }
  }
  