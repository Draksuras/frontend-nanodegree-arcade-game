var canvasWidth = 505;
var canvasHeight = 606;
var startingLocations = [55, 140, 220];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = 0;

    //Setting initial position below water tile
    this.y = startingLocations[Math.floor(Math.random() * startingLocations.length)];
    
    //Setting initial speed of enemy
    this.speed = Math.floor(Math.random() * 100 + 50);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var playerPosition = player.playerPosition();

    //Range to compensate for floating point comparison
    var epsilon = 50;

    diffX = Math.abs(this.x - playerPosition[0]);
    diffY = Math.abs(this.y - playerPosition[1]);

    this.x += this.speed * dt;

    if(this.x > canvasWidth){

        this.x = -50;
        this.y = startingLocations[Math.floor(Math.random() * startingLocations.length)];
        this.speed = Math.floor(Math.random() * 100 + 50);
    }

    if(diffX <= epsilon && diffY <= epsilon){

        player.setPlayerPosition(canvasWidth*.4, canvasHeight * .65);


    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {


    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    //Setting default character     
    this.sprite = 'images/char-cat-girl.png';

    //Setting position to starting tile
    this.x = canvasWidth *.4;
    this.y = canvasHeight * .65;

    //Initial player score
    this.score = 0;
    

    
};


//Delegating methods to Enemy class
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

//Adding additional methods

//Handles player input using arrow keys
Player.prototype.handleInput = function(key){


    if(key === 'up'){
        if((this.y - 85) > 0){

            this.y -= 85;

        } else if((this.y -85 <= 0)){

            this.setPlayerPosition(canvasWidth * 0.4, canvasHeight * 0.65);
            this.score += 10;
            console.log(this.score);

        }
        

    } else if(key === 'down'){

        if((this.y + 85) < canvasHeight - 150){
            
            this.y += 85;

        }
        


    } else if(key === 'left'){

        if((this.x - 100) > 0){
            
            this.x -= 100;

        }

    } else if(key ==='right'){

        if((this.x + 100) < canvasWidth - 100){

            this.x += 100;

        }

        
    }

};

//Not used, but overwrites Enemy update
Player.prototype.update = function(){};

//Returns player objects position on the canvas in an array
Player.prototype.playerPosition = function(){

    var position = [];

    position.push(this.x);
    position.push(this.y);

    return position;

};

Player.prototype.setPlayerPosition = function(x,y){

    this.x = x;
    this.y = y;

};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //Renders current player score onto canvas

    ctx.font = "20px Arial";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.strokeText("Current Score: " + this.score, 5, 70);
    ctx.fillStyle = "white";
    ctx.fillText("Current Score: " + this.score, 5, 70);


}


// var Item = function(){

//     var gems = ['images/Gem Blue.png','images/Gem Green.png','images/Gem Orange.png'];







// };




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var player = new Player();
var allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
