var mainState = {

    create: function() {
        // Set up physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        player = new Player(game);
        player.create();
    },

    update: function() {
        player.update();
    },

};
