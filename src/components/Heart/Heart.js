export default class Hearts {
    constructor(scene, totalHearts, mainCharacter) {
        this.scene = scene;
        this.totalHearts = totalHearts;
        this.mainCharacter = mainCharacter; // Store the reference to the MainCharacter instance
        this.hearts = [];

        for (let i = 0; i < totalHearts; i++) {
            const heart = scene.add.image(20 + i * 30, 20, 'heart').setOrigin(0, 0).setScale(0.05);
            this.hearts.push(heart);
        }
    }

    loseHeart() {
        if (this.hearts.length > 0) {
            const lostHeart = this.hearts.pop();
            lostHeart.setActive(false).setVisible(false);

            // Decrease mainCharacter's lives
            this.mainCharacter.lives--;

            // Check if all lives are gone (game over condition)
            if (this.mainCharacter.lives <= 0) {
                this.scene.pause();
                console.log('Game over!');
            }

            console.log(`Remaining Hearts: ${this.hearts.length}`);
        }
    }
}
