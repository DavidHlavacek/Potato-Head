export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey, health, speed) {
      super(scene, x, y, textureKey);

      this.scene = scene;
      this.health = health;
      this.speed = speed;

      this.scene.add.existing(this);     
      this.isJumping = false;
      
  }

  update() {
    if (this.scene.cursors.left.isDown) {
        this.x -= this.speed;
    } else if (this.scene.cursors.right.isDown) {
        this.x += this.speed;
    }

    if (this.scene.cursors.up.isDown && !this.isJumping) {
        this.isJumping = true;

        this.scene.tweens.add({
            targets: this,
            y: this.y - 100,
            duration: 500,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this,
                    y: this.y + 100,
                    duration: 500,
                    onComplete: () => {
                        this.isJumping = false;
                    }
                });
            }
        });
    }
}
}
