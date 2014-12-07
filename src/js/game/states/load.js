var loadState = {

    preload: function() {

        game.load.image('bg', 'src/assets/sprites/bg.png');
        game.load.image('cloud1', 'src/assets/sprites/cloud1.png');
        game.load.image('cloud2', 'src/assets/sprites/cloud2.png');

        // Set background colour
        game.stage.backgroundColor = '#3399FF';

        // Preload all game assets
        player = new Player(game);
        player.preload();

        enemy = new Enemy(game);
        enemy.preload();

        bt1 = new Tower(game, 'blue', 1);
        bt1.preload();

        bt2 = new Tower(game, 'blue', 2);
        bt2.preload();

        rt1 = new Tower(game, 'red', 1);
        rt1.preload();

        rt2 = new Tower(game, 'red', 2);
        rt2.preload();

        game.load.image('test', 'src/assets/sprites/test.png');
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
