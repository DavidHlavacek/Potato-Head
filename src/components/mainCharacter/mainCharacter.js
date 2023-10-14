export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey, health, speed) {
      super(scene, x, y, textureKey);

      this.scene = scene;
      this.health = health;
      this.speed = speed;

      this.scene.add.existing(this);     
      this.isJumping = false;
      this.lastShootTime = 0; // Initialize lastShootTime
      this.lives = 3;
      
  }

  shoot() {
    // Create and shoot the appropriate projectile based on the enemy's type
    this.scene.spawnWeapon(this.scene, this.x, this.y);
  }

  update() {
    if(this.scene.cursors.space.isDown) {
      const currentTime = this.scene.time.now;
      if (currentTime - this.lastShootTime >= 500) { // 2000 milliseconds (2 seconds)
        this.shoot();
        this.lastShootTime = currentTime;
      }
    }
    
    if (this.scene.cursors.left.isDown && this.x > 55) {
        this.x -= this.speed;
    } if (this.scene.cursors.right.isDown && this.x < 600) {
        this.x += this.speed;
    }

    if (this.scene.cursors.up.isDown && !this.isJumping) {
      this.isJumping = true;
  
      const jumpHeight = 220; // Adjust the jump height as needed
      const jumpDuration = 265; // Adjust the jump duration as needed
  
      // Use quadratic easing for the jump animation
      this.scene.tweens.add({
          targets: this,
          y: this.y - jumpHeight,
          duration: jumpDuration,
          ease: 'Quad.easeOut', // This eases the upward motion
          onComplete: () => {
              this.scene.tweens.add({
                  targets: this,
                  y: this.y + jumpHeight,
                  duration: jumpDuration,
                  ease: 'Quad.easeIn', // This eases the downward motion
                  onComplete: () => {
                      this.isJumping = false;
                  }
              });
          }
      });
  }
}
}
