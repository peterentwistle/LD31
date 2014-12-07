Enemy = function(game) {

    this.game = game;
    this.sprite = null;
    this.hitPoints = 100;
    this.count = 0;
    this.timeCheck = game.time.now;
    this.bulletTime = 0;
    this.mvLeft = true;
    this.aiTime = 0;
    this.flag = false;
    this.lastHitTime = 0;

};

Enemy.prototype = {

    preload: function() {

        game.load.image('enemy', 'src/assets/sprites/enemy.png');
        game.load.image('enemyBullet', 'src/assets/sprites/enemyBullet.png');

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

        this.healthbarBg = game.add.sprite(this.sprite.x, this.sprite.y-20, 'healthbarBg');
        this.healthbar = game.add.sprite(this.sprite.x, this.sprite.y-20, 'healthbar');

        this.healthbarWidth = this.healthbar.width;
        this.healthbar.cropEnabled = true;

        game.physics.arcade.enable(this.sprite);

        //this.sprite.body.gravity.y = 20;
        this.sprite.body.collideWorldBounds = true;

    },

    update: function() {

        // Controlled by AI
        this.ai();

        this.healthbar.x = this.sprite.x;
        this.healthbarBg.x = this.sprite.x;
        this.healthbar.width = (this.hitPoints / 100) * this.healthbarWidth;

    },

    moveLeft: function() {

        if (!this.sprite.alive && !this.mvLeft) {
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

    ai: function() {

        this.sprite.body.velocity.x = 0;

        if (game.time.now - this.lastHitTime < 500) {
            this.moveRight();
        } else if (game.time.now - this.lastHitTime > 2000 && this.lastHitTime!=0) {
            this.moveLeft();
        } else {
            if (!bt2.sprite.alive) {

                if (!this.flag){
                    this.resetTime();
                    this.flag = true;
                }

                if (game.time.now - this.timeCheck > 500) {
                    this.moveLeft();
                }
                if (game.time.now - this.timeCheck > 1500) {
                    this.shoot();
                }
                if (game.time.now - this.timeCheck > 1500) {
                    this.moveRight();
                }

            } else {

                if (game.time.now - this.timeCheck > 2000) {
                    this.moveLeft();
                }
                if (game.time.now - this.timeCheck > 3000) {
                    this.shoot();
                }
                if (game.time.now - this.timeCheck > 3000) {
                    this.moveRight();
                }
            }

        }
    },

    shoot: function() {

        if (game.time.now > this.bulletTime) {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet) {
                this.bullet.reset(this.sprite.x + this.sprite.width/2, this.sprite.y + this.sprite.height/2);
                this.bullet.body.velocity.x = -400;
                this.bulletTime = game.time.now + 200;
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

};
