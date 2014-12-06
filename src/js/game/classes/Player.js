Player = function(game) {

    this.game = game;
    this.sprite = null;
    this.healthbar = null;
    this.hitPoints = 100;
    this.mvRight = true;
    this.bulletTime = 0;

};

Player.prototype = {

    preload: function() {

        game.load.image('player', 'src/assets/sprites/player.png');
        game.load.image('healthbar', 'src/assets/sprites/healthbar.png');
        game.load.image('healthbarBg', 'src/assets/sprites/healthbarBg.png');
        game.load.image('playerBullet', 'src/assets/sprites/playerBullet.png');

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

        // Add player sprite
        this.sprite = game.add.sprite(100, 392, 'player');

        // Add health bar
        this.healthbarBg = game.add.sprite(this.sprite.x, this.sprite.y-20, 'healthbarBg');
        this.healthbar = game.add.sprite(this.sprite.x, this.sprite.y-20, 'healthbar');

        this.healthbarWidth = this.healthbar.width;
        this.healthbar.cropEnabled = true;

        game.physics.arcade.enable(this.sprite);

        //this.sprite.body.gravity.y = 20;
        this.sprite.body.collideWorldBounds = true;

    },

    update: function() {

        this.sprite.body.velocity.x = 0;

        // Input
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.moveLeft();
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && this.mvRight) {
            this.moveRight();
        }

        if (game.input.activePointer.isDown) {
            this.shoot();
        }

        this.healthbar.x = this.sprite.x;
        this.healthbarBg.x = this.sprite.x;
        this.healthbar.width = (this.hitPoints / 100) * this.healthbarWidth;

    },

    moveLeft: function() {

        if (!this.sprite.alive) {
            return;
        }
        this.sprite.body.velocity.x -=250;

    },

    moveRight: function() {

        if (!this.sprite.alive) {
            return;
        }
        this.sprite.body.velocity.x +=250;

    },

    shoot: function() {

        if (game.time.now > this.bulletTime) {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet) {
                this.bullet.reset(this.sprite.x + this.sprite.width/2, this.sprite.y + this.sprite.height/2);
                this.bullet.body.velocity.x = 400;
                this.bulletTime = game.time.now + 200;
            }
        }

    },


    die: function() {
        this.sprite.kill();
        this.healthbarBg.kill();
        this.healthbar.kill();
    },

};
