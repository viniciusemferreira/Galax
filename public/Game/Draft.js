var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('space', 'assets/bg/nebula.jpg');
    game.load.image('bullet', 'assets/bullets/laser.png');
    game.load.image('ship', 'assets/ships/ship.png');

}

var sprite;
var cursors;
var space;

var bullet;
var bullets;
var bulletTime = 0;

function create() {

    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    //  We need arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    space = game.add.tileSprite(0, 0, 800, 600, 'space');
    space.fixedToCamera = true;
    game.world.setBounds(0, 0, 4000, 4000);

    //  Our ships bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);

    //  Our player ship
    sprite = game.add.sprite(300, 300, 'ship');
    sprite.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.drag.set(100);
    sprite.body.maxVelocity.set(200);

    //  Game input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    game.camera.deadzone = new Phaser.Rectangle(200, 200, 200, 200);

}

function update() {

    game.world.bounds.centerOn(sprite.x, sprite.y);
    game.camera.setBoundsToWorld();

    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(sprite.rotation, 200, sprite.body.acceleration);
    } else if (cursors.down.isDown) {
        game.physics.arcade.accelerationFromRotation(sprite.rotation, -120, sprite.body.acceleration);
    } else {
        sprite.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }
    else
    {
        sprite.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }

    space.tilePosition.x = -game.camera.x;
    space.tilePosition.y = -game.camera.y;

}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = sprite.rotation;
            game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 280;
        }
    }

}

function render() {
}
