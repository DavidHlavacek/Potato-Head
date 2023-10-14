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
    
            if(this.x < 0 || this.y > 700) {
                this.destroy();
                return;
            }
    
            const minY = 100;  // Minimum y position
            const maxY = 600;  // Maximum y position
            this.y = Phaser.Math.Between(minY, maxY);

            this.x -= 5;

          }
      }
  