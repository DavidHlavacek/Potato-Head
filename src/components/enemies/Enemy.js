class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, textureKey, projectileType, maxHits) {
    super(scene, x, y, textureKey);
    this.scene = scene;
    this.projectileType = projectileType;
    this.maxHits = maxHits;

    // Add the enemy to the scene
    this.scene.add.existing(this);
  }

  update() {
    // Move the enemy to the left
    
   
  }

  die() {
    const tweens = this.scene.tweens;
    tweens.add({
        targets: this,
        x: this.x - 1300, // Adjust the distance as needed
        duration: 1000, // Adjust the duration as needed
        onComplete: () => {
            this.destroy();
        }
    });
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
    super(scene, scene.cameras.main.width + 300, scene.cameras.main.height - 250, 'firstEnemy', "bullet", 10);

    // Add the enemy to the scene
    this.scene.add.existing(this);
    this.lastShakeTime = 0; // Keep track of the last shake time
    this.shake = 5;

    this.lastShotTime = 0; // Keep track of the last shot time
    this.nextShotDelay = Phaser.Math.Between(500, 3000);
    this.hits = 0;

    
  }

  takeDamage() {
    if (this.hits < this.maxHits) {
      this.hits++;
  }
  console.log(this.hits)
   
  }

  shoot() {
    this.scene.spawnBone(this.scene, this.x - 190, this.y - 100);
    
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
      if (currentTime - this.lastShotTime >= this.nextShotDelay) {
        this.shoot();
        
        // Set a new random delay for the next shot
        this.nextShotDelay = Phaser.Math.Between(300, 2000);
        this.lastShotTime = currentTime;
      }
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
    super(scene, scene.cameras.main.width + 200, scene.cameras.main.height - 350, 'secondEnemy', "trash", 15);

    // Add the enemy to the scene
    this.scene.add.existing(this);
    this.lastShakeTime = 0; // Keep track of the last shake time
    this.shake = 8;

    this.lastShotTime = 0; // Keep track of the last shot time
    this.nextShotDelay = Phaser.Math.Between(500, 3000);

    this.hits = 0;
    
  }

  takeDamage() {
    this.hits++;
   
  }

  shoot() {
    this.scene.spawnTrash(this.scene, this.x - 265, this.y - 110);
    
  }

  update() {
    if(this.x > this.scene.cameras.main.width - this.width) {
      
      this.x -= 10;
    } else {
      const currentTime = this.scene.time.now;
      
      // Check if it's been at least 2 seconds since the last shake
      if (currentTime - this.lastShakeTime >= 500) {
        // Shake the enemy
        this.x += this.shake;
        this.shake *= -1;
        
        // Update the last shake time
        this.lastShakeTime = currentTime;
      }
      
      // Always shoot after shaking
      if (currentTime - this.lastShotTime >= this.nextShotDelay) {
        this.shoot();
        
        // Set a new random delay for the next shot
        this.nextShotDelay = Phaser.Math.Between(300, 2000);
        this.lastShotTime = currentTime;
      }
    }
  }

  nextEnemy() {
    // Implement logic to replace the enemy with a different one
    // Create a new enemy instance here and add it to the scene
    // For example:
    const newEnemy = new SecondEnemy(this.scene, this.x, this.y);
    this.scene.add.existing(newEnemy);
  }

}


export class ThirdEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, scene.cameras.main.width + 200, scene.cameras.main.height - 300, 'thirdEnemy', "ghost", 20);

    // Add the enemy to the scene
    this.scene.add.existing(this);
    this.lastShakeTime = 0; // Keep track of the last shake time
    this.shake = 11;

    this.lastShotTime = 0; // Keep track of the last shot time
    this.nextShotDelay = Phaser.Math.Between(500, 3000);

    this.hits = 0;
    
  }

  takeDamage() {
    this.hits++;
   
  }

  shoot() {
    this.scene.spawnGhost(this.scene, this.x + 200, Phaser.Math.Between(-200, 800));
    
  }

  update() {
    if(this.x > this.scene.cameras.main.width - this.width + 150) {
      
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
      if (currentTime - this.lastShotTime >= this.nextShotDelay) {
        this.shoot();
        
        // Set a new random delay for the next shot
        this.nextShotDelay = Phaser.Math.Between(300, 2000);
        this.lastShotTime = currentTime;
      }
    }
  }

  nextEnemy() {
    // Implement logic to replace the enemy with a different one
    // Create a new enemy instance here and add it to the scene
    // For example:
    const newEnemy = new SecondEnemy(this.scene, this.x, this.y);
    this.scene.add.existing(newEnemy);
  }

}
