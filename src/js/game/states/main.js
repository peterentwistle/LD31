var mainState = {

    create: function() {
        // Set up physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create Towers
        bt1.create();
        bt2.create();
        rt1.create();
        rt2.create();

        // Create player
        player.create();

        // Create a test enemy
        enemy.create();

    },

    update: function() {
        player.update();
        player.mvRight = true;
        game.physics.arcade.collide(player.sprite, enemy.sprite, this.playerCollidesWithEnemy);

        // Add player with red tower collision
        game.physics.arcade.collide(player.sprite, rt1.sprite, this.playerCollidesWithTower);
        game.physics.arcade.collide(player.sprite, rt2.sprite, this.playerCollidesWithTower);

        // Bullet hit enemy
        game.physics.arcade.overlap(player.bullets, enemy.sprite, this.bulletHitEnemy);

        // Bullet hit player
        game.physics.arcade.overlap(enemy.bullets, player.sprite, this.bulletHitPlayer);

        enemy.update();
    },

    playerCollidesWithEnemy: function() {

        // disable movement right
        player.mvRight = false;

    },

    playerCollidesWithTower: function() {

        player.mvRight = false;
    },

    bulletHitEnemy: function() {

        player.bullets.getFirstAlive().kill();

        if (enemy.hitPoints > 0) {
            enemy.hitPoints -= 2;
        } else {
            // Kill enemy
            enemy.die();
        }
    },

    bulletHitPlayer: function() {

        enemy.bullets.getFirstAlive().kill();

        if (player.hitPoints > 0) {
            player.hitPoints -= 2;
        } else {
            // Kill enemy
            player.die();
        }
    }

};
