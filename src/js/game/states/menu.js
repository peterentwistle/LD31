var menuState = {

    create: function() {

        var fontStyle = {font: "45px Arial", fill: "#ffffff"};
        var fontStyle2 = {font: "30px Arial", fill: "#ffffff"};
        var fontStyle3 = {font: "20px Arial", fill: "#ffffff"};
        var fontStyle4 = {font: "15px Arial", fill: "#ffffff"};
        var x = game.world.width/2, y = game.world.height/2;

        // Add text and center on screen
        var gameNameText = this.game.add.text(x, 100, "Entire Game on One Screen", fontStyle);
        gameNameText.anchor.setTo(0.5, 0.5);

        var startText = this.game.add.text(x, y, "Press left mouse button to start", fontStyle2);
        startText.anchor.setTo(0.5, 0.5);

        var controlText = this.game.add.text(x, y + 50, "Controls: 'A' Left, 'D' Right, 'Left mouse button' to shoot and 'R' to restart.", fontStyle3);
        controlText.anchor.setTo(0.5, 0.5);

        var developerText = this.game.add.text(x, y + 250, "Game by Peter Entwistle", fontStyle4);
        developerText.anchor.setTo(0.5, 0.5);

    },

    update: function() {

        if (game.input.activePointer.isDown) {
            this.start();
        }

    },

    start: function() {

        this.game.state.start('main');

    },
};
