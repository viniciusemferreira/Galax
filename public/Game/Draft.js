var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('space', 'assets/bg/nebula.jpg');
    game.load.image('bullet', 'assets/bullets/laser.png');
    game.load.image('ship', 'assets/ships/ship2.png');
    game.load.image('planetsprite', 'assets/planets/Ellipse.svg');
    game.load.json('ships', 'assets/ships/ships.json');

}

var playership;
var planet;
var cursors;
var space;

var bullet;
var bullets;
var bulletTime = 0;

function create() {

    var shipsJSON = game.cache.getJSON('ships');

    console.log(shipsJSON.airwing.acceleration);

    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    //  We need arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    space = game.add.tileSprite(0, 0, 800, 600, 'space');
    space.fixedToCamera = true;
    game.world.setBounds(0, 0, 10000, 10000);

    //  Our ships bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);

    //  Our player ship
    playership = game.add.sprite(5000, 5000, 'ship');
    game.physics.enable(playership, Phaser.Physics.ARCADE);
    playership.body.drag.set(100);
    playership.body.collideWorldBounds = true;
    playership.body.bounce.set(.3);
    playership.body.maxVelocity.set(300);
    playership.body.maxAngular = 200;
    playership.body.angularDrag = 500;
    playership.anchor.set(0.5);

    //  and its physics settings


    generatePlanets(100);
    planet = createWorld(6000, 4500, 'planetsprite');
    game.physics.arcade.enable([playership, planet], Phaser.Physics.ARCADE);
    planet.body.immovable = true;

    planet.body.setCircle(424);

    //  Game input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    game.camera.follow(playership, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    game.camera.deadzone = new Phaser.Rectangle(200, 200, 200, 200);

    console.log(playership.x);
    console.log(playership.y);
}

function update() {

    //game.world.bounds.centerOn(playership.x, playership.y);
    game.camera.setBoundsToWorld();
    game.physics.arcade.collide(playership, planet);

    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(playership.rotation, 500, playership.body.acceleration);
    } else if (cursors.down.isDown) {
        game.physics.arcade.accelerationFromRotation(playership.rotation, -120, playership.body.acceleration);
    } else {
        playership.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        playership.body.angularAcceleration -= 100;
    }
    else if (cursors.right.isDown)
    {
        playership.body.angularAcceleration += 100;
    }
    else
    {
        playership.body.angularAcceleration = 0;
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
            bullet.reset(playership.body.x + 16, playership.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = playership.rotation;
            game.physics.arcade.velocityFromRotation(playership.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 280;
        }
    }

}

function createWorld(x, y, sprite){
    return game.add.sprite(x, y, sprite);
}

function generatePlanets(number){
    var x;
    var y;

    for (var i = 0; i < number; i++){
        x = Math.floor((Math.random() * 10000) + 1);
        y = Math.floor((Math.random() * 10000) + 1);
        game.add.sprite(x, y, 'planetsprite');
    }
}

function render() {
    game.debug.bodyInfo(playership, 32, 32);
   // game.debug.body(planet);
}
