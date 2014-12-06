Player = function(game) {

    this.game = game;
    this.sprite = null;
    this.hitPoints = 100;
    this.cursors = null;

};

Player.prototype = {

    create: function() {
        // To do: add player sprite
        this.sprite = game.add.sprite(100, 300, 'player');

        game.physics.arcade.enable(this.sprite);

        //this.sprite.body.gravity.y = 20;
        this.sprite.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {

        this.sprite.body.velocity.x = 0;

        // Input
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.moveLeft();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.moveRight();
        }

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

};
