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
  
  class Bullet extends Projectile {
    constructor(scene, x, y, textureKey, bulletSpeed, bulletDamage) {
      super(scene, x, y, 'bulletTexture', bulletSpeed, bulletDamage);
    }

    update() {
        this.x -= this.speed;
        this.y = Math.random() * 4 - 2;
    }
  
    // Implement bullet-specific behaviors, e.g., update and collision handling
  }
  
  class Laser extends Projectile {
    constructor(scene, x, y, textureKey, laserSpeed, laserDamage) {
      super(scene, x, y, 'laserTexture', laserSpeed, laserDamage);
    }

    update() {

    }
  
    // Implement laser-specific behaviors, e.g., update and collision handling
  }
  