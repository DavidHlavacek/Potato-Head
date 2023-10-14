class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey, speed, damage) {
      super(scene, x, y, textureKey);
      
      this.scene = scene;
      this.speed = speed;
      this.damage = damage;
  
      this.scene.add.existing(this);
    }
  
    update() {
      // Update the position or behavior of the projectile (common to all projectiles)
    }
  
    hitEnemy(enemy) {
      // Handle collision with an enemy (common to all projectiles)
      enemy.takeDamage(this.damage);
      this.destroy();
    }

  }
  
  export class Bullet extends Projectile {
    constructor(scene, x, y,) {
      super(scene, x, y, 'bulletTexture', 20, 20);
    }

    update() {
        this.x -= this.speed;
        this.y += Math.random() * 4 - 2;
        if(this.x < 0) {
            this.destroy();
        }
    }
  
    // Implement bullet-specific behaviors, e.g., update and collision handling
  }

  export class Bone extends Projectile {
    constructor(scene, x, y) {
      super(scene, x, y, 'boneTexture', 20, 20);
      this.startTime = scene.time.now;
     this.arcHeight = Phaser.Math.Between(50, 100);
    }

    update() {
        if (this.x < 0 || this.y > this.scene.cameras.main.height) {
            this.destroy();
            return;
        }
        const elapsedTime = this.scene.time.now - this.startTime;
        const t = elapsedTime / 500; // Adjust this value for the desired speed

        // Calculate the position based on a parabolic path
        this.x -= this.speed;
        this.y = this.arcHeight * Math.sin(Math.PI * t) + this.arcHeight;

    
    }
  }
  
    // Implement bullet-specific behaviors, e.g., update and collision handling

  
  export class Laser extends Projectile {
    constructor(scene, x, y, textureKey, laserSpeed, laserDamage) {
      super(scene, x, y, 'laserTexture', laserSpeed, laserDamage);
    }

    update() {

    }
  
    // Implement laser-specific behaviors, e.g., update and collision handling
  }
  