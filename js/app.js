// Enemies our player must avoid
var Enemy = function (x, y, speed = 1) {
    //set the position and speed of every bug instance
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for the enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // We should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x += 101 * this.speed * dt;

    //colllision detection
    if (this.x + 70 >= playerX && this.x <= playerX + 95 && this.y === playerY + 15) {
        player.reset();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The player class
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//update the position of our player to use it in our collision detection code
var playerX;
var playerY;
Player.prototype.update = function (dt) {
    playerX = this.x;
    playerY = this.y;
};

// Draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//a method that responds to user input and move the player accordingly
Player.prototype.handleInput = function (pressedKey) {
    if (pressedKey === 'up' && this.y > -45) {
        this.y -= 83;
        if (this.y === -35) {
            setTimeout(() => {
                this.reset();
                ctx.clearRect(0, 0, 1000, 1000);
            }, 200);
        }
    } else if (pressedKey === 'down' && this.y < 380) {
        this.y += 83;
    } else if (pressedKey === 'right' && this.x < 404) {
        this.x += 101;
    } else if (pressedKey === 'left' && this.x > 0) {
        this.x -= 101;
    }
    this.update();
};

//a method that reset the player to its initial position
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 380;
};

//an array with differen horizontal values for the bugs
var columns = [-101, -202, -303, -404, -505, -606];
var bugX;

//an array with different vertical values for the bugs 
var rows = [63, 146, 229];
var bugY;

var bugSpeed;

//instantiating bugs with different speed and position, then pushing them into the allEnemies array
setInterval(function () {
    bugX = columns[Math.floor(Math.random() * 6)];
    bugY = rows[Math.floor(Math.random() * 3)];
    bugSpeed = Math.floor(Math.random() * 10);
    allEnemies.push(new Enemy(bugX, bugY, bugSpeed));
}, 500);

// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-202, 229, 7), new Enemy(101, 63, 3), new Enemy(0, 146)];

// Place the player object in a variable called player
var player = new Player(202, 380);

// This listens for key presses and sends the keys to our Player.handleInput() method
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
