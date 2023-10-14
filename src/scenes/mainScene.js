import Phaser from 'phaser'
import MainCharacter from '../components/mainCharacter/mainCharacter.js'
import {FirstEnemy, SecondEnemy} from '../components/enemies/Enemy.js'
import {Bullet, Laser, Bone} from '../components/projectiles/projectiles.js'
export default class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
      this.activeProjectiles = []; // Array to store active projectiles
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
      this.load.image('mainCharacter', require('../assets/sprites/characters/potatoHead.avif'));
      this.load.image('firstEnemy', require('../assets/sprites/enemies/skullboi.gif'));
      this.load.image('secondEnemy', require('../assets/sprites/enemies/raccoon.png'));
      this.load.image('bone', require('../assets/sprites/projectiles/bone.png'));
    }
  
    create() {

        this.camera = this.cameras.add(0, 0, 1200, 600  );
        
      
        this.camera.setBackgroundColor('rgba(255, 0, 255, 1)');
        

        this.mainCharacter = new MainCharacter(this, 200, 400, 'mainCharacter', 10, 15);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.mainCharacter.setScale(0.15);

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
        this.activeProjectiles.push(bullet);
    }

    spawnBone(scene, x, y) {
        // Create and handle bone projectiles
        const bone = new Bone(scene, x, y);
        bone.setScale(0.03);
        this.activeProjectiles.push(bone);
        
      }
    
      spawnLaser(scene,x, y) {
        // Create and handle laser projectiles
        const laser = new Laser(this, x, y);
        this.activeProjectiles.push(laser);
        // Implement laser-specific logic here
      }

      spawnCurrentEnemy() {
        // Create an instance of the current enemy type and add it to the scene
        const enemyType = this.enemySequence[this.currentEnemyIndex];
        const enemy = new enemyType(this, 1000, 470);
        this.enemy = enemy;
        this.enemy.setScale(1.4);
      }
      handleCollision(projectile) {
        // Check for collision manually
        if (projectile.getBounds().intersects(this.mainCharacter.getBounds())) {
            // Handle collision logic
            this.totalCollisions++; // Assuming you have a variable to track total collisions
            this.scene.pause();
            console.log('Game over!'); // Example message, replace with your game-over logic
        }
    }
  
      update() {
        // Update the enemies in the game loop
        this.mainCharacter.update();
        this.enemy.update();
        this.updateProjectiles();

        if (this.enemy.hits >= this.enemy.maxHits) {
            // Increment the enemy index to switch to the next enemy type
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
        
        // Update bullets
        this.activeProjectiles.forEach(Projectile => {
          Projectile.update();
        });

      }
    
    }
  

