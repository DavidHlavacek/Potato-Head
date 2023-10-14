export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey, health, speed) {
      super(scene, x, y, textureKey);

      this.scene = scene;
      this.health = health;
      this.speed = speed;
<<<<<<< Updated upstream

      
    
        this.scene.add.existing(this);
=======
>>>>>>> Stashed changes

      this.isJumping = false; // Flag to check if the character is currently jumping

      this.scene.add.existing(this);
      this.scene.physics.world.enable(this);
      this.setCollideWorldBounds(true);

      // Set the sprite to not move with the camera
      this.setScrollFactor(1);

      // Set the size of the hitbox for better collision detection (if needed)
      this.setSize(50, 80);
  }

  update() {
      this.handleMovement();
  }

  handleMovement(cursors) {
    if (cursors.left.isDown) {
        this.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        this.setVelocityX(160);
    } else {
        this.setVelocityX(0);
    }

    if (cursors.up.isDown && !this.isJumping) {
        this.jump();
    }
}

jump() {
    this.setVelocityY(-330);
    this.isJumping = true;

  }
}
 

  

  

