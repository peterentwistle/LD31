// Initialise Phaser
var game = new Phaser.Game(1000, 560, Phaser.CANVAS, 'game');

// Define game states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('main', mainState);

// Start the boot state
game.state.start('boot');
