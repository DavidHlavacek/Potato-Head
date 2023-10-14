import Phaser from 'phaser'
import MainCharacter from '../components/mainCharacter/mainCharacter.js'
import {FirstEnemy, SecondEnemy} from '../components/enemies/Enemy.js'
import {Trash, Bullet, Laser, Bone, Weapon} from '../components/projectiles/projectiles.js'
export default class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
      this.enemyActiveProjectiles = []; // Array to store active projectiles
      this.friendlyActiveProjectiles = [];
      this.enemySequence = [
        FirstEnemy,
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
      this.load.image('bullet', require('../assets/sprites/projectiles/bullet.png'));
      this.load.image('trash', require('../assets/sprites/projectiles/trash.png'));


    }
  
    create() {
      this.camera = this.cameras.add(0, 0, 1200, 600);
      this.camera.setBackgroundColor('rgba(255, 0, 255, 1)');

      this.mainCharacter = new MainCharacter(this, 0 + 100, 548, 'mainCharacter', 10, 15);
      this.cursors = this.input.keyboard.createCursorKeys();
      this.mainCharacter.setScale(0.3);

      this.spawnCurrentEnemy();
<<<<<<< HEAD

         this.hearts = new Hearts(this, 3, this.mainCharacter);

  

      // Set the scale and position of the hearts
      this.heartsTotal = this.hearts.totalHearts
      }
=======
      this.hearts = [];
      for (let i = 0; i < 3; i++) {
        const heart = this.add.image(100 + i * 30, 50, 'heart');
        heart.setScale(0.02);
        this.hearts.push(heart);
      }
  

      // Set the scale and position of the hearts
   
  
  }
>>>>>>> 531599f8e2eec0c18ce759cb673af1fc475d1415

    spawnBullet(scene,x, y) {
        // Create and handle bullet projectiles
        const bullet = new Bullet(scene, x, y);
        bullet.setScale(0.1);
        this.enemyActiveProjectiles.push(bullet);
    }

    spawnTrash(scene, x, y) {
        // Create and handle bullet projectiles
        const trash = new Trash(scene, x, y);
        trash.setScale(0.15);
        this.enemyActiveProjectiles.push(trash);
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
    

        // Check if all hearts are gone (game over condition)
       
    
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
              this.hearts.pop().destroy();
      
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
                  repeat: 1,
                  yoyo: true,
              });
      
              console.log('MainCharacter lives left: ' + mainCharacter.lives);
      
              // Call loseHeart from Hearts class
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
        for (let i = 0; i < this.hearts.length; i++) {
            this.hearts[i].x = this.mainCharacter.x + i * 25 - 25;
            this.hearts[i].y = this.mainCharacter.y - 60;
          }
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
  

