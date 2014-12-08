Player = function(game) {

    this.game = game;
    this.sprite = null;
    this.healthbar = null;
    this.hitPoints = 100;
    this.mvRight = true;
    this.bulletTime = 0;
    this.shootingDisabled = false;
    this.gameWinner = null;

};

Player.prototype = {

    preload: function() {

        game.load.spritesheet('player', 'src/assets/sprites/playerSpritesheet.png', 28, 58, 20);
        game.load.image('playerBullet', 'src/assets/sprites/playerBullet.png');
        game.load.audio('shoot', 'src/assets/audio/shoot.wav');

    },

    create: function() {

        // Create a group for the bullets
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'playerBullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        // Add player spritesheet
        this.sprite = game.add.sprite(100, 392, 'player');

        // Add player animations
        this.sprite.animations.add('playerWalking', [0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
        this.sprite.animations.add('playerShooting', [15,16,17,18,19]);

        // Add health bar
        this.healthbarBg = game.add.sprite(this.sprite.x, this.sprite.y-20, 'healthbarBg');
        this.healthbar = game.add.sprite(this.sprite.x, this.sprite.y-20, 'healthbar');

        this.healthbarWidth = this.healthbar.width;
        this.healthbar.cropEnabled = true;

        game.physics.arcade.enable(this.sprite);

        this.shootSound = game.add.audio('shoot');
        this.hurtSound = game.add.audio('hurt');

        this.shootSound.volume = 0.3;
        this.hurtSound.volume = 0.3;

        //this.sprite.body.gravity.y = 20;
        this.sprite.body.collideWorldBounds = true;

    },

    update: function() {

        this.sprite.body.velocity.x = 0;
        if (this.gameWinner == null) {
            // Input
            if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.moveLeft();
                this.sprite.animations.play('playerWalking', 24, true);
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.moveRight();
                this.sprite.animations.play('playerWalking', 24, true);
            } else if (game.input.activePointer.isDown) {
                this.shoot();
                this.sprite.animations.play('playerShooting', 24, true);
            } else {
                this.sprite.animations.stop();
            }

            this.healthbar.x = this.sprite.x;
            this.healthbarBg.x = this.sprite.x;
            this.healthbar.width = (this.hitPoints / 100) * this.healthbarWidth;
        }

    },

    moveLeft: function() {

        if (!this.sprite.alive) {
            return;
        }
        this.sprite.body.velocity.x -=250;

    },

    moveRight: function() {

        if (!this.sprite.alive && !this.mvRight) {
            return;
        }
        this.sprite.body.velocity.x +=250;

    },

    shoot: function() {

        if (game.time.now > this.bulletTime && !this.shootingDisabled) {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet) {
                this.bullet.reset(this.sprite.x + this.sprite.width/2, this.sprite.y + this.sprite.height/2);
                this.bullet.body.velocity.x = 400;
                this.bulletTime = game.time.now + 200;

                // Play shoot sound
                this.shootSound.play();
            } else {
                this.sprite.animations.stop();
            }
        }

    },

    die: function() {

        this.shootingDisabled = true;
        this.sprite.kill();
        this.healthbarBg.kill();
        this.healthbar.kill();

    },


    gameOver: function(winner) {

        this.gameWinner = winner;

    },
};
