import Phaser from 'phaser'
import MainCharacter from '../components/mainCharacter/mainCharacter.js'
import {FirstEnemy, SecondEnemy} from '../components/enemies/Enemy.js'
import {Bullet, Laser, Bone, Weapon} from '../components/projectiles/projectiles.js'
export default class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
      this.enemyActiveProjectiles = []; // Array to store active projectiles
      this.friendlyActiveProjectiles = [];
      this.enemySequence = [
        FirstEnemy, // The initial enemy type
        SecondEnemy     // The next enemy type
        // Add more enemy types in the desired order
      ];
      this.totalCollisions = 0; // Initialize totalCollisions

      this.currentEnemyIndex = 0;
    }
  
    preload() {
      // Load enemy textures, assets, etc.
    //   this.load.image('background', require ('../assets/background/bg.png'));
      this.load.image('heart', require('../assets/background/heart.png'));
      this.load.image('mainCharacter', require('../assets/sprites/characters/potatoHead.png'));
      this.load.image('firstEnemy', require('../assets/sprites/enemies/skullboi.gif'));
      this.load.image('secondEnemy', require('../assets/sprites/enemies/raccoon.png'));
      this.load.image('bone', require('../assets/sprites/projectiles/bone.png'));
      this.load.image('laser', require('../assets/sprites/projectiles/laser.png'));
      this.load.image('weapon', require('../assets/sprites/projectiles/fireball.gif'));

    }
  
    create() {
      
      this.camera = this.cameras.add(0, 0, 1200, 600);
      this.camera.setBackgroundColor('rgba(255, 0, 255, 1)');
  
      this.mainCharacter = new MainCharacter(this, 0 + 100, 548, 'mainCharacter', 10, 15);
      this.cursors = this.input.keyboard.createCursorKeys();
      this.mainCharacter.setScale(0.3);
  
      this.spawnCurrentEnemy();
  
      // Add hearts
      this.hearts = [];
      const heartCount = 3;
  
      for (let i = 0; i < heartCount; i++) {
          const heart = this.add.image(30 + (i * 30), 30, 'heart').setScale(0.5);
          heart.setScrollFactor(0);
          this.hearts.push(heart);
      }
      this.hearts = this.add.group({
        key: 'heart',
        repeat: 2, // Number of hearts (adjust as needed)
        setXY: { x: 10, y: 10, stepX: 20 } // Adjust positioning as needed
    });

    // Scale down the hearts and reposition them
    this.hearts.children.iterate((heart, index) => {
        heart.setScale(0.05); // Adjust the scale as needed
        heart.x = 20 * index + 10; // Adjust the positioning as needed
    });

    this.heartsTotal = this.hearts.getChildren().length;
    }

    spawnBullet(scene,x, y) {
        // Create and handle bullet projectiles
        console.log("spawn bullet");

        const bullet = new Bullet(this, x, y);

        // console.log(bullet.x);
        // console.log(bullet.y);
        // Implement bullet-specific logic here
        this.enemyActiveProjectiles.push(bullet);
    }

    spawnBone(scene, x, y) {
        // Create and handle bone projectiles
        const bone = new Bone(scene, x, y);
        bone.setScale(0.03);
        this.enemyActiveProjectiles.push(bone);
        
      }

      spawnWeapon(scene, x, y) {
        // Create and handle bone projectiles
        const weapon = new Weapon(scene, x + 65, y);
        weapon.setScale(0.15);
        this.friendlyActiveProjectiles.push(weapon);
        
      }
    
      spawnLaser(scene,x, y) {
        // Create and handle laser projectiles
        const laser = new Laser(this, x, y);
        this.enemyActiveProjectiles.push(laser);
        // Implement laser-specific logic here
      }

      spawnCurrentEnemy() {
        // Create an instance of the current enemy type and add it to the scene
        const enemyType = this.enemySequence[this.currentEnemyIndex];
        const enemy = new enemyType(this, 1000, 470);
        if (enemyType === FirstEnemy) {
            enemy.setScale(1.4);
        } else if (enemyType === SecondEnemy) {
            enemy.setScale(4);
        } // Add more conditions for other enemy types
        this.enemy = enemy;
        
      }
      loseHeart() {
        if (this.hearts.length > 0) {
            const heart = this.hearts.pop();
            heart.destroy();
        }

        // Check if all hearts are gone (game over condition)
        if (this.hearts.length === 0) {
            this.scene.pause();
            console.log('Game over!');
        }
    }
      handleCollision(projectile, mainCharacter) {
        const projectileBounds = new Phaser.Geom.Rectangle(
            projectile.x + 50, // Adjust these values to set the position of the bounding box
            projectile.y + 50,
            50, // Set a very small width
            50  // Set a very small height
        );
    
        const characterBounds = new Phaser.Geom.Rectangle(
            mainCharacter.x + 50, // Adjust these values to set the position of the bounding box
            mainCharacter.y + 50,
            50, // Set a very small width
            50  // Set a very small height
        );
          
        if (Phaser.Geom.Intersects.RectangleToRectangle(projectileBounds, characterBounds)) {
            console.log('Collision detected');
    
            // Remove all projectiles
            this.enemyActiveProjectiles.forEach(projectile => {
                projectile.destroy();
            });
   
            this.enemyActiveProjectiles = [];
    
            // Decrease mainCharacter's lives
            mainCharacter.lives--;
    
            // Check if all lives are gone (game over condition)
            if (mainCharacter.lives <= 0) {
                this.scene.pause();
                console.log('Game over!');
            }
    
            // Flash the tint twice and freeze the screen
            const tintFlashDuration = 500; // Duration for each flash
            this.tweens.add({
                targets: mainCharacter,
                alpha: 0,
                duration: tintFlashDuration,
                repeat: 2,
                yoyo: true,
            });
    
            console.log('MainCharacter lives left: ' + mainCharacter.lives);
        } else {
          mainCharacter.clearTint(); // Clear the tint if there's no collision
      }
        
    }


    enemyHit(projectile, enemy) {
        const projectileBounds = new Phaser.Geom.Rectangle(
            projectile.x + 50, // Adjust these values to set the position of the bounding box
            projectile.y + 50,
            50, // Set a very small width
            50  // Set a very small height
        );
    
        const characterBounds = new Phaser.Geom.Rectangle(
            enemy.x + 5, // Adjust these values to set the position of the bounding box
            enemy.y + 5,
            50, // Set a very small width
            50  // Set a very small height
        );
    
        if (Phaser.Geom.Intersects.RectangleToRectangle(projectileBounds, characterBounds)) {
            if (!enemy.isHitCooldown) {
                console.log('Enemy hit!');
                projectile.destroy();
                enemy.takeDamage();
                enemy.isHitCooldown = true; // Set a cooldown to prevent rapid hits
                enemy.setTint(0xff0000); // Turn the enemy red on hit
    
                // Reset the cooldown after a delay (e.g., 500ms)
                this.time.delayedCall(500, () => {
                    enemy.isHitCooldown = false;
                    enemy.clearTint(); // Clear the tint after the cooldown
                });
            }
        }else {
          enemy.clearTint(); // Clear the tint if there's no collision
      }
        
    }
  
      update() {
        // Update the enemies in the game loop
        this.mainCharacter.update();
        this.enemy.update();
        this.updateProjectiles();

        if (this.enemy.hits >= this.enemy.maxHits) {
            // Increment the enemy index to switch to the next enemy type
            this.enemy.die();
            this.enemyActiveProjectiles.forEach(projectile => {
                projectile.destroy();
            });
            this.enemyActiveProjectiles = [];
            this.friendlyActiveProjectiles.forEach(projectile => {
                projectile.destroy();
            });
            this.friendlyActiveProjectiles = [];
            this.currentEnemyIndex++;
      
            // Check if there are more enemy types in the sequence
            if (this.currentEnemyIndex < this.enemySequence.length) {
              // Replace the current enemy with the next enemy type
              this.spawnCurrentEnemy();
            } else {
              // Handle game-over or level completion logic here
            }
          }
      }

      updateProjectiles() {
        // Iterate through all active projectiles and update their movement
        // You should maintain a list of active projectiles in your game
        // and iterate through them to call their update methods.
        // Example:
        this.enemyActiveProjectiles.forEach(projectile => {
          projectile.update();
  
          // Check for collision with main character
          this.handleCollision(projectile, this.mainCharacter);
      });

      this.friendlyActiveProjectiles.forEach(projectile => {
        projectile.update();

        // Check for collision with main character
        this.enemyHit(projectile, this.enemy);
    });
      
        // Update bullets
    

      }
    
    }
  

