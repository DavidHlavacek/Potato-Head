import Phaser from 'phaser'
import MainCharacter from '../components/mainCharacter/mainCharacter.js'
import {FirstEnemy} from '../components/enemies/Enemy.js'
import {Bullet, Laser} from '../components/projectiles/projectiles.js'
export default class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
      this.activeProjectiles = []; // Array to store active projectiles
      this.enemySequence = [
        FirstEnemy, // The initial enemy type
             // The next enemy type
        // Add more enemy types in the desired order
      ];
      this.currentEnemyIndex = 0;
    }
  
    preload() {
      // Load enemy textures, assets, etc.
      this.load.image('mainCharacter', require('../assets/sprites/characters/potatoHead.png'));
      this.load.image('firstEnemy', require('../assets/sprites/characters/potatoHead.png'));
    }
  
    create() {

        this.camera = this.cameras.add(0, 0, 1200, 600  );

        this.camera.setBackgroundColor('rgba(255, 0, 255, 1)');
        this.mainCharacter = new MainCharacter(this, 200, 400, 'mainCharacter', 10, 2);
        this.mainCharacter.setScale(0.2);
        this.spawnCurrentEnemy();
      // Create an enemy instance
  
      // Add the enemy to the update list
    }

    spawnBullet(x, y) {
        // Create and handle bullet projectiles
        console.log("spawn bullet");
        const bullet = new Bullet(this, this.enemy.x, this.enemy.y);
        // Implement bullet-specific logic here
        this.activeProjectiles.push(bullet);
    }
    
      spawnLaser(x, y) {
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
        this.enemy.setScale(0.2);
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

