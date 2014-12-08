Enemy = function(game) {

    this.game = game;
    this.sprite = null;
    this.hitPoints = 100;
    this.count = 0;
    this.bulletTime = 0;
    this.mvLeft = true;
    this.aiTime = 0;
    this.flag = false;
    this.lastHitTime = 0;
    this.shooting = false;
    this.gameWinner = null;

};

Enemy.prototype = {

    preload: function() {

        game.load.spritesheet('enemy', 'src/assets/sprites/enemySpritesheet.png', 28, 58, 20);
        game.load.image('enemyBullet', 'src/assets/sprites/enemyBullet.png');
        game.load.audio('enemyShoot', 'src/assets/audio/enemyShoot.wav');

    },

    create: function() {

        // Create a group for the bullets
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'enemyBullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        // Add enemy sprite
        this.sprite = game.add.sprite(900, 392, 'enemy');
        this.sprite.animations.add('enemyWalking', [0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
        this.sprite.animations.add('enemyShooting', [15,16,17,18,19]);

        this.healthbarBg = game.add.sprite(this.sprite.x, this.sprite.y-20, 'healthbarBg');
        this.healthbar = game.add.sprite(this.sprite.x, this.sprite.y-20, 'healthbar');

        this.healthbarWidth = this.healthbar.width;
        this.healthbar.cropEnabled = true;

        game.physics.arcade.enable(this.sprite);

        this.shootSound = game.add.audio('enemyShoot');
        this.hurtSound = game.add.audio('hurt');

        this.shootSound.volume = 0.3;
        this.hurtSound.volume = 0.3;

        this.sprite.body.collideWorldBounds = true;

        this.timeCheck = game.time.now;
    },

    update: function() {

        // Controlled by AI
        if (this.gameWinner == null) {
            this.ai();

            this.healthbar.x = this.sprite.x;
            this.healthbarBg.x = this.sprite.x;
            this.healthbar.width = (this.hitPoints / 100) * this.healthbarWidth;
        }

    },

    moveLeft: function() {

        if (!this.sprite.alive && !this.mvLeft && this.shooting) {
            return;
        }
        this.sprite.body.velocity.x -=250;
        this.playAnimation('enemyWalking');

    },

    moveRight: function() {

        if (!this.sprite.alive && this.shooting) {
            return;
        }
        this.sprite.body.velocity.x +=250;
        this.playAnimation('enemyWalking');

    },

    ai: function() {

        this.sprite.body.velocity.x = 0;

        if (game.time.now - this.lastHitTime < 500) {
            this.moveRight();
        } else if (game.time.now - this.lastHitTime > 2000 && this.lastHitTime!=0 && this.sprite.x - player.sprite.x > 200) {
            this.moveLeft();
        } else {
            if (!bt2.sprite.alive) {

                if (!this.flag){
                    this.resetTime();
                    this.flag = true;
                    this.shooting = false;
                }

                if (game.time.now - this.timeCheck > 500 && !this.shooting) {
                    this.moveLeft();
                }
                if (game.time.now - this.timeCheck > 1500) {
                    this.shoot();
                }
                if (game.time.now - this.timeCheck > 1500 && !this.shooting) {
                    this.moveRight();
                }

            } else {

                if (game.time.now - this.timeCheck > 2000 && !this.shooting) {
                    this.moveLeft();
                }
                if (game.time.now - this.timeCheck > 3000) {
                    this.shoot();
                }
                if (game.time.now - this.timeCheck > 3000 && !this.shooting) {
                    this.moveRight();
                }
            }
        }

    },

    shoot: function() {

        this.shooting = true;
        this.playAnimation('enemyShooting');

        if (game.time.now > this.bulletTime) {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet) {
                this.bullet.reset(this.sprite.x + this.sprite.width/2, this.sprite.y + this.sprite.height/2);
                this.bullet.body.velocity.x = -400;
                this.bulletTime = game.time.now + 200;

                // Play shoot sound
                this.shootSound.play();
            }
        }

    },

    resetTime: function() {

        this.timeCheck = game.time.now;

    },


    die: function() {

        this.sprite.kill();
        this.healthbarBg.kill();
        this.healthbar.kill();

    },

    stopAnimation: function(animation) {

        this.sprite.animations.stop(animation, true);

    },

    playAnimation: function(animation) {

        this.sprite.animations.play(animation, 24, true);

    },

    gameOver: function(winner) {

        this.gameWinner = winner;

    },

};
