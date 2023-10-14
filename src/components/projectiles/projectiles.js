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
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet', 20, 20);

        this.velocityX = 5;  // Horizontal velocity
        this.velocityY = 5;  // Vertical velocity
        this.amplitude = 20; // Amplitude of the zigzag pattern
        this.direction = 1;  // Direction of the zigzag pattern (1 for up, -1 for down)
    }

    handleCollision() {
        console.log("Zigzag projectile collision");
        this.scene.handleCollision(this);
    }

    update() {
        if (this.x < 0 || this.y > 700) {
            this.destroy();
            return;
        }

        // Move horizontally
        this.x -= this.velocityX;

        // Move vertically in a zigzag pattern
        this.y += this.velocityY * this.direction;

        // Change direction when reaching the amplitude limit
        if (Math.abs(this.y - this.y - this.velocityY * this.direction) > this.amplitude) {
            this.direction *= -1;
        }
    }
  
    // Implement bullet-specific behaviors, e.g., update and collision handling
  }
  export class Trash extends Projectile {
    constructor(scene, x, y) {
        super(scene, x, y, 'trash', 20, 20);

        this.velocityX = Phaser.Math.Between(5, 25); // Horizontal velocity (forward)
        this.velocityY = Phaser.Math.Between(10, 22); // Vertical velocity (falling down)
    }

    update() {
        if (this.x < 0 || this.y > 700) {
            this.destroy();
            return;
        }

        // Move forward and downward
        this.x -= this.velocityX;
        this.y += this.velocityY;

        // Add some randomness to the movement
        this.velocityX += Phaser.Math.FloatBetween(-0.5, 0.5);
        this.velocityY += Phaser.Math.FloatBetween(-0.5, 0.5);
    }
}


  export class Bone extends Projectile {
    constructor(scene, x, y) {
      super(scene, x, y, 'bone', 20, 20);

      this.velocityX = -5;  // Horizontal velocity (to the left)
      this.velocityY = Phaser.Math.Between(0, -20); // Initial vertical velocity (upward)
      this.gravity = Phaser.Math.Between(1, 4); 
    }

    handleCollision() {
      console.log("consa waaaa")
      this.scene.handleCollision(this);
    }

    update() {

        if(this.x < 0 || this.y > 700) {
            this.destroy();
            return;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        // Adjust the size of the parabola by changing the vertical velocity
        this.velocityY += this.gravity;
        this.velocityX -= Phaser.Math.Between(0, 2);;
     
      }
  }
  
    // Implement bullet-specific behaviors, e.g., update and collision handling
    export class Weapon extends Projectile {
        constructor(scene, x, y) {
          super(scene, x, y, 'weapon', 20, 20);
    
          this.velocityX = 10;  // Horizontal velocity (to the left)
        }
    
        // handleCollision() {
        //   console.log("consa waaaa")
        //   this.scene.handleCollision(this);
        // }
    
        update() {
    
            // if(this.x < 0 || this.y > 700) {
            //     this.destroy();
            //     return;
            // }
    
            this.x += this.velocityX;
    
            // Adjust the size of the parabola by changing the vertical velocity
         
          }
      }
  
      export class Laser extends Projectile {
        constructor(scene, x, y) {
          super(scene, x, y, 'laser', 20, 20);
    
        }
    
        handleCollision() {
          console.log("consa waaaa")
          this.scene.handleCollision(this);
        }
    
        update() {
            
            

          }
      }
  