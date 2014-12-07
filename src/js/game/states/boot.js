var bootState = {

    preload: function() {

        // Preload loading bar assets (same as healthbar)
        game.load.image('healthbar', 'src/assets/sprites/healthbar.png');
        game.load.image('healthbarBg', 'src/assets/sprites/healthbarBg.png');

    },

    create: function() {

        // Start load state
        game.state.start('load');
        
    },
};
