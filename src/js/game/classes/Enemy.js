Enemy = function(game) {

    this.game = game;
    this.sprite = null;
    this.hitPoints = 100;
    this.count = 0;
    this.timeCheck = game.time.now;

};

Enemy.prototype = {

    preload: function() {

        game.load.image('enemy', 'src/assets/sprites/enemy.png');

    },

    create: function() {

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

        //this.sprite.body.velocity.x = 0;

        // Will be controlled by AI
        if (game.time.now - this.timeCheck > 2000) {
            this.ai();
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

    ai: function() {

        this.sprite.body.velocity.x = 0;

        // Move bot to just past it's first tower
        if (this.count < 90) {
            this.moveLeft();
            this.count++;
        }

    },

};
