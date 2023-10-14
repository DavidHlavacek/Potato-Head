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
      this.load.image('mainCharacter', require('../assets/sprites/characters/potatoHead.png'));
      this.load.image('firstEnemy', require('../assets/sprites/enemies/skullboi.gif'));
      this.load.image('secondEnemy', require('../assets/sprites/enemies/raccoon.png'));
      this.load.image('bone', require('../assets/sprites/projectiles/bone.png'));
    }
  
    create() {

        this.camera = this.cameras.add(0, 0, 1200, 600  );
        
      
        this.camera.setBackgroundColor('rgba(255, 0, 255, 1)');
        

        this.mainCharacter = new MainCharacter(this, 0 + 100, 548, 'mainCharacter', 10, 15);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.mainCharacter.setScale(0.3);

        this.spawnCurrentEnemy();
      // Create an enemy instance
  
      // Add the enemy to the update list
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
        const weapon = new Weapon(scene, x, y);
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
            this.totalCollisions++;
            this.scene.pause();
            console.log('Game over!');
            mainCharacter.setTint(0xff0000); // Turn main character red on collision
      } else {
          mainCharacter.clearTint(); // Clear the tint if there's no collision
      }
        
    }


    enemyHit(projectile, enemy) {
        const projectileBounds = new Phaser.Geom.Rectangle(
            projectile.x + 10, // Adjust these values to set the position of the bounding box
            projectile.y + 10,
            18, // Set a very small width
            18  // Set a very small height
        );
    
        const characterBounds = new Phaser.Geom.Rectangle(
            enemy.x + 5, // Adjust these values to set the position of the bounding box
            enemy.y + 5,
            18, // Set a very small width
            18  // Set a very small height
        );
    
        if (Phaser.Geom.Intersects.RectangleToRectangle(projectileBounds, characterBounds)) {
            console.log('Enemy hit!');
            this.totalCollisions++;
            projectile.destroy();
            enemy.takeDamage();
            enemy.setTint(0xff0000); // Turn main character red on collision
      } else {
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
  

