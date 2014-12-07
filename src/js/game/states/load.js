var loadState = {

    preload: function() {

        //  Set up the preloading bar
        this.preloadOuter = this.add.sprite(game.width/2 - 100, game.height/2 + 100, 'healthbarBg');
        this.preloadBar = this.add.sprite(game.width/2 - 100, game.height/2 + 100, 'healthbar');

        this.preloadOuter.scale.x = 2.5;
        this.preloadOuter.scale.y = 2.5;
        this.preloadBar.scale.x = 2.5;
        this.preloadBar.scale.y = 2.5;

        this.load.setPreloadSprite(this.preloadBar);

        // Add loading text
        var fontStyle = {font: "45px Arial", fill: "#ffffff"};
        var x = game.world.width/2, y = game.world.height/2;
        var loadingText = this.game.add.text(x, 100, "Loading...", fontStyle);
        loadingText.anchor.setTo(0.5, 0.5);

        game.load.image('bg', 'src/assets/sprites/bg.png');
        game.load.image('cloud1', 'src/assets/sprites/cloud1.png');
        game.load.image('cloud2', 'src/assets/sprites/cloud2.png');

        // Set background colour
        game.stage.backgroundColor = '#0D0D0D';

        // Preload all game assets
        player = new Player(game);
        player.preload();

        enemy = new Enemy(game, this.gameWinner);
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
        var tween = game.add.tween(this.preloadBar).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMenu, this);

    },

    startMenu: function() {
        // Start game menu
        this.game.state.start('menu');
    },
};
