//Phaser.GameObjects.Group
export default class Hearts {
    constructor(scene, totalHearts) {
        this.scene = scene;
        this.totalHearts = totalHearts;
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
        }
    }
}
