var mainState = {

    create: function() {

        this.gameWinner = null;

        // Set background colour
        game.stage.backgroundColor = '#3399FF';

        this.background = game.add.tileSprite(0, 0, 1000, 560, 'bg');

        this.cloud1 = game.add.tileSprite(800, 100, 305, 101, 'cloud1');
        this.cloud2 = game.add.tileSprite(400, 40, 272, 70, 'cloud2');

        // Set up physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create Towers
        bt1.create();
        bt2.create();
        rt1.create();
        rt2.create();

        // Create player
        player.create();

        // Create an enemy
        enemy.create();

        // Enable cloud physics
        game.physics.arcade.enable(this.cloud1);
        game.physics.arcade.enable(this.cloud2);

        // Add cloud velocity
        this.cloud1.body.velocity.x = -40;
        this.cloud2.body.velocity.x = -40;

        // Game music
        this.song = game.add.audio('song');
        this.song.play('', 0, 1, true);

        enemy.started = true;

    },

    update: function() {
        player.update();
        player.mvRight = true;
        game.physics.arcade.collide(player.sprite, enemy.sprite, this.playerCollidesWithEnemy);

        // Add player with red tower collisions
        game.physics.arcade.collide(player.sprite, rt1.sprite, this.playerCollidesWithTower);
        game.physics.arcade.collide(player.sprite, rt2.sprite, this.playerCollidesWithTower);

        // Add enemy with blue tower collisions
        game.physics.arcade.collide(enemy.sprite, bt1.sprite, this.enemyCollidesWithTower);
        game.physics.arcade.collide(enemy.sprite, bt2.sprite, this.enemyCollidesWithTower);

        // Bullet hit enemy
        game.physics.arcade.overlap(player.bullets, enemy.sprite, this.bulletHitEnemy);

        // Bullet hit player
        game.physics.arcade.overlap(enemy.bullets, player.sprite, this.bulletHitPlayer);

        // Bullet hit red towers
        game.physics.arcade.overlap(player.bullets, rt1.sprite, this.bulletHitEnemyTower);
        game.physics.arcade.overlap(player.bullets, rt2.sprite, this.bulletHitEnemyTower);

        // Bullet hit blue towers
        game.physics.arcade.overlap(enemy.bullets, bt1.sprite, this.bulletHitPlayerTower);
        game.physics.arcade.overlap(enemy.bullets, bt2.sprite, this.bulletHitPlayerTower);

        enemy.update();
        bt1.update();
        bt2.update();
        rt1.update();
        rt2.update();

        this.clouds();

        if (!bt1.sprite.alive || !player.sprite.alive) {
            this.gameWinner = "Red";
            this.gameOver();
        }
        if (!rt2.sprite.alive || !enemy.sprite.alive) {
            this.gameWinner = "Blue";
            this.gameOver();
        }

        if (this.gameWinner != null && game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            this.restartGame();
        }

    },


    clouds: function() {


        if (this.cloud1.x < -this.cloud1.width) {
            this.cloud1.x = this.randomNumber(1010, 2000);
            this.cloud1.y = this.randomNumber(40, 150);
        }

        if (this.cloud2.x < -this.cloud2.width) {
            this.cloud2.x = this.randomNumber(1010, 2000);
            this.cloud2.y = this.randomNumber(40, 150);
        }

    },

    randomNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    playerCollidesWithEnemy: function() {

        // disable movement right
        player.mvRight = false;

    },

    playerCollidesWithTower: function() {

        // disable movement right
        player.mvRight = false;
    },

    enemyCollidesWithTower: function() {

        // disable movement left
        enemy.mvLeft = false;
    },

    bulletHitEnemy: function() {

        player.bullets.getFirstAlive().kill();

        if (enemy.hitPoints > 0) {
            enemy.hitPoints -= 2;
            enemy.hurtSound.play();
            enemy.lastHitTime = game.time.now;
        } else {
            // Kill enemy
            enemy.die();
        }
    },

    bulletHitPlayer: function() {

        enemy.bullets.getFirstAlive().kill();

        if (player.hitPoints > 0) {
            player.hitPoints -= 2;
            player.hurtSound.play();
        } else {
            // Kill enemy
            player.die();
        }
    },

    bulletHitEnemyTower: function() {

        player.bullets.getFirstAlive().kill();
        var tower = null;

        if (rt1.sprite.alive) {
            tower = rt1;
        } else {
            tower = rt2;
        }

        if (tower.hitPoints > 0) {
            tower.hitPoints -= 2;
        } else {
            // Kill tower
            tower.die();
        }

    },

    bulletHitPlayerTower: function() {

        enemy.bullets.getFirstAlive().kill();
        var tower = null;

        if (bt2.sprite.alive) {
            tower = bt2;
        } else {
            tower = bt1;
        }

        if (tower.hitPoints > 0) {
            tower.hitPoints -= 2;
        } else {
            // Kill tower
            tower.die();
        }

    },

    gameOver: function() {

        if (this.gameWinner == "Blue") {
            gameOverText = game.add.text(game.width/2, game.height/2 - 200, "Game Over. You Won!", { font: "30px Arial", fill: "#000000" });
        } else {
            gameOverText = game.add.text(game.width/2, game.height/2 - 200, "Game Over. You Lost!", { font: "30px Arial", fill: "#000000" });
        }

        // Score text
        scoreText = game.add.text(game.width/2, game.height/2 - 100, "Press 'R' to restart the game", { font: "20px Arial", fill: "#000000" });
        scoreText.anchor.setTo(0.5, 0.5);

        gameOverText.anchor.setTo(0.5, 0.5);

        // Stop enemy animations and movement
        enemy.gameOver(this.gameWinner);
        enemy.sprite.animations.stop();
        enemy.sprite.body.immovable = true;
        enemy.sprite.body.velocity.x = 0;

        // Stop player animations and movement
        player.gameOver(this.gameWinner);
        player.sprite.animations.stop();
        player.sprite.body.immovable = true;
        player.sprite.body.velocity.x = 0;

        this.song.stop();

    },

    restartGame: function() {

        // Set background colour
        game.stage.backgroundColor = '#0D0D0D';

        // Preload all game assets
        player = new Player(game);

        enemy = new Enemy(game, this.gameWinner);

        bt1 = new Tower(game, 'blue', 1);

        bt2 = new Tower(game, 'blue', 2);

        rt1 = new Tower(game, 'red', 1);

        rt2 = new Tower(game, 'red', 2);

        game.state.start('menu');

    },

};
