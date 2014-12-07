Tower = function(game, team, towerNumber) {

    this.game = game;
    this.team = team;
    this.towerNumber = towerNumber;
    this.sprite = null;
    this.hitPoints = 100;

};

Tower.prototype = {

    preload: function() {

        game.load.image('tower', 'src/assets/sprites/tower.png');

    },

    create: function() {

        var a = 0;

        if (this.team=='blue' && this.towerNumber == 1) {
            a = (game.width/5) - 25;
        } else if (this.team=='blue' && this.towerNumber == 2) {
            a = game.width/5 * 2 - 25;
        } else if (this.team=='red' && this.towerNumber == 1) {
            a = game.width/5 * 3 - 25;
        } else if (this.team=='red' && this.towerNumber == 2) {
            a = game.width/5 * 4 - 25;
        }

        // Add tower sprite
        this.sprite = game.add.sprite(a, 350, 'tower');

        game.physics.arcade.enable(this.sprite);

        this.sprite.body.immovable = true;

        this.sprite.body.collideWorldBounds = true;

    },

    update: function() {

    },

    die: function() {

        this.sprite.kill();
        //this.healthbarBg.kill();
        //this.healthbar.kill();

    },

};
