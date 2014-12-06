var loadState = {

    preload: function() {


        // Set background colour
        game.stage.backgroundColor = '#3399FF';

        // Preload all game assets

        game.load.image('test', 'src/assets/sprites/test.png');
        game.load.image('player', 'src/assets/sprites/player.png');
    },

    create: function() {
        // Animate the preload bar

        //Add test image
        //this.test = this.game.add.sprite(100, 300, 'test');
        this.startMenu();
    },

    startMenu: function() {
        // Will start game menu
        // starts main for now
        this.game.state.start('main');
    },
};
