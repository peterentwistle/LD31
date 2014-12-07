var mainState = {

    create: function() {

        this.background = game.add.tileSprite(0, 0, 1000, 560, 'bg');

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

};
