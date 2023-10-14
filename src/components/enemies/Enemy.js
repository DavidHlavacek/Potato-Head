class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, textureKey, projectileType, maxHits) {
    super(scene, x, y, textureKey);
    this.scene = scene;
    this.projectileType = projectileType;
    this.maxHits = maxHits;
    this.hits = 0;

    // Add the enemy to the scene
    this.scene.add.existing(this);
  }

  update() {
    // Move the enemy to the left
    
   
  }

  takeDamage() {
    this.hits++;

    if (this.hits >= this.maxHits) {
      this.nextEnemy();
    }
  }

  nextEnemy() {
    
  }

  shoot() {
    // Create and shoot the appropriate projectile based on the enemy's type
   
      // Add more cases for different projectile types
    }
  
}

export class FirstEnemy extends Enemy {
  static textureKey = 'firstEnemy';
  constructor(scene, x, y) {
    super(scene, scene.cameras.main.width + 300, scene.cameras.main.height - 250, 'firstEnemy', "bullet", 20);

    // Add the enemy to the scene
    this.scene.add.existing(this);
    this.lastShakeTime = 0; // Keep track of the last shake time
    this.shake = 5;
  }

  shoot() {
    this.scene.spawnBone(this.scene, this.x, this.y);
    
  }

  update() {
    if(this.x > this.scene.cameras.main.width - this.width + 100) {
      
      this.x -= 10;
    } else {
      const currentTime = this.scene.time.now;
      
      // Check if it's been at least 2 seconds since the last shake
      if (currentTime - this.lastShakeTime >= 500) {
        // Shake the enemy
        this.y += this.shake;
        this.shake *= -1;
        
        // Update the last shake time
        this.lastShakeTime = currentTime;
      }
      
      // Always shoot after shaking
      this.shoot();
    }
  }

  nextEnemy() {
    // Implement logic to replace the enemy with a different one
    // Create a new enemy instance here and add it to the scene
    // For example:
    const newEnemy = new SecondEnemy(this.scene, this.x, this.y);
    this.scene.add.existing(newEnemy);
  }

  // Additional behavior for the different enemy, if needed
}

export class SecondEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'secondEnemy', "bullet"); // 0 maxHits, as it won't be replaced
  }

  shoot() {
    this.scene.spawnBullet(this.x, this.y);
  }

  nextEnemy() {
    // Implement logic to replace the enemy with a different one
    // Create a new enemy instance here and add it to the scene
    // For example:
    const newEnemy = new SecondEnemy(this.scene, this.x, this.y);
    this.scene.add.existing(newEnemy);
  }

  // Additional behavior for the different enemy, if needed
}
