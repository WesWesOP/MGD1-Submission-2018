 class aSprite
 {
 constructor(x, y, imageSRC)
 {
 this.zindex = 0;
 this.x = x;
 this.y = y;
 this.vx = 0;
 this.vy = 0;
 this.sImage = new Image();
 this.sImage.src = imageSRC;
 }
 // Getter
 get xPos()
 {
 return this.x;
 }

 get yPos(){
 return this.y;
 }

 // Setter
 set xPos(newX)
 {
 this.x = newX;
 }

 set yPos(newY)
 {
 this.y = newY;
 }

 // Method
 render()
 {
 canvasContext.drawImage(this.sImage,this.x, this.y);
 }

 Background()
{
    canvasContext.save();
    canvasContext.drawImage(this.sImage,0 ,0);
    canvasContext.restore();
}

 update(elapsed)
 {
 this.xPos += this.vx * elapsed;
 this.yPos += this.vy * elapsed;
 }

// Method
 sPos(newX,newY)
 {
 this.x = newX;
 this.y = newY;
 }

 // Method
 sVel(newX, newY)
 {
 this.vx = newX;
 this.vy = newY;
 }

 //Static Method
 static distance(a, b)
 {
 const dx = a.x - b.x;
 const dy = a.y - b.y;

 return Math.hypot(dx, dy);
 }

 }

 //Enemy Class--------------------------------------------------------------------
 class Enemy extends aSprite
 {
 constructor(x, y, imageSRC, sx, sy)
 {
 super(x, y, imageSRC);
 this.sx = sx;
 this.sy = sy;
 this.vx = 0; //* 400 - 200;
 this.vy = Math.random() * (250 - 50) + 50;
 }

 render()
 {
 canvasContext.beginPath();
 canvasContext.drawImage(this.sImage, this.x, this.y, this.sx, this.sy);
 canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
 canvasContext.closePath();
 }


 update(elapsed)
 {
 //this.vy = 150;
 if(this.y > canvas.height)
 {
    this.y = 0;
 this.vy = Math.random() * (250 - 50) + 50;
 }
    super.update(elapsed);
    this.sVel(this.vx, this.vy);
 }

 }

 //Rocket Class--------------------------------------------------------------------
 class Rocket extends aSprite
 {
 constructor(x, y, imageSRC, sx, sy)
 {
 super(x, y, imageSRC);
 this.sx = sx;
 this.sy = sy;
 this.speed = 15;
 }

 render()
 {
 canvasContext.drawImage(this.sImage, this.x, this.y, this.sx, this.sy);
 }

 update(elapsed)
 {
 if (lastPt != null)
 {
 var dir = 1;
 var disSquared = Math.pow(this.x - (lastPt.x - this.sx * 0.5), 2);
 if (this.x > lastPt.x-this.sx*0.5) dir = -1;
 this.x += dir * this.speed * elapsed * ((disSquared / (this.speed* this.speed)));
 if (disSquared < 15) this.x = lastPt.x - this.sx * 0.5;
 }
 }
 }



 //Global variables
 var canvas;
 var canvasContext;
 var gravity = 1000;
 var score = 0;
 var timer;
 var mainMenu;
 var gameScreen;
 var endMenu;

 var gEnemy;
 var gEnemy2;
 var gEnemy3;
 var gEnemy4;
 var gEnemy5;

 var gRocket;

 var lastPt = null;

 var soundMgr;

 function resizeCanvas()
 {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
 }

 function load() //The load function executes when the game is started.
 {
  canvas = document.getElementById('gameCanvas'); //gets the canvas element id from the html file
  canvasContext = canvas.getContext('2d');
  init(); //executes the init() function
  timer = 60;
  mainMenu = true;
  endMenu = false;
  gameScreen = false;
}

function reset() //the reset function serves the purpose to set the game back to the game screen from the end screen
{

  gEnemy = new Enemy(canvas.width * 0.5, canvas.height * -1, 'Enemy.png' ,25, 25); //draws all the enemies
  gEnemy2 = new Enemy(canvas.width * 0.8, canvas.height * -0.95, 'Enemy.png' ,25, 25);
  gEnemy3 = new Enemy(canvas.width * 0.3, canvas.height * -0.10, 'Enemy.png' ,25, 25);
  gEnemy4 = new Enemy(canvas.width * 0.1, canvas.height * -0.15, 'Enemy.png' ,25, 25);
  gEnemy5 = new Enemy(canvas.width * 0.6, canvas.height * 1, 'Enemy.png' ,25, 25);


  gRocket = new Rocket(0, canvas.height - 65, 'PixelRocket.png', 30, 60); //draws the rocket


  bkgdImage = new aSprite(0, 0,"PixelBackground.png"); //draws the background image

    timer = 60; //sets the timer again
    mainMenu = false;
    endMenu = false;
    gameScreen = true;
}

 function init()
 {

 if (canvas.getContext) {
 //Set Event Listeners for window, mouse and touch

  window.addEventListener('resize', resizeCanvas, false);
  window.addEventListener('orientationchange', resizeCanvas, false);

  canvas.addEventListener("touchstart", touchDown, false);
  canvas.addEventListener("touchmove", touchXY, true);
  canvas.addEventListener("touchend", touchUp, false);
  document.body.addEventListener("touchcancel", touchUp, false);

  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mousemove", mouseDown, false);

  resizeCanvas();

  gEnemy = new Enemy(canvas.width * 0.5, canvas.height * -1, 'Enemy.png' ,30, 30);
  gEnemy2 = new Enemy(canvas.width * 0.8, canvas.height * -0.95, 'Enemy.png' ,30, 30);
  gEnemy3 = new Enemy(canvas.width * 0.3, canvas.height * -0.10, 'Enemy.png' ,30, 30);
  gEnemy4 = new Enemy(canvas.width * 0.1, canvas.height * -0.15, 'Enemy.png' ,30, 30);
  gEnemy5 = new Enemy(canvas.width * 0.6, canvas.height * 1, 'Enemy.png' ,30, 30);


  gRocket = new Rocket(0, canvas.height - 65, 'PixelRocket.png', 30, 60);

  if (soundMgr != null) soundMgr.playMusic(0); //Play main music

  bkgdImage = new aSprite(0, 0,"PixelBackground.png");

  startTimeMS = Date.now();

  gameLoop(); //executes the game loop
 }
 }

 function gameLoop() // the gameLoop function holds all the different states of the game i.e the different menus currently present
 {
  var elapsed = (Date.now() - startTimeMS)/1000;

  if (mainMenu)
  {
    bkgdImage.Background();
    Text('Avoid the enemies by moving around', '20px Arial', 20, 260, 'white');
    Text('Pixels', '50px Arial', 110, 200, 'green');
    Text('Tap the screen to play', '30px Arial', 35, 430, 'black');
    document.addEventListener('click', startSwap);
    document.addEventListener('touchstart', startSwap);
  }

   if (gameScreen)
   {
    update(elapsed);
    render(elapsed);
    collisionDetection();
   }

   if(endMenu)
   {
     bkgdImage.Background();
     Text('Game Over', '50px Arial', 70, 200, 'red');
     Text('Tap to replay', '40px Arial', 80, 400, 'blue');
     Text('Score: ' + Math.floor(score), '30px Arial', 130, 300, 'white');
     gameScreen = false;
     document.addEventListener('click', endSwap);
     document.addEventListener('touchstart', endSwap);
   }

  startTimeMS = Date.now();
  requestAnimationFrame(gameLoop);
 }


 function render(elapsed) // this function renders all the images and text in the game screen
 {
  canvasContext.clearRect(0,0,canvas.width, canvas.height);
  bkgdImage.Background();
  Text('Score: ' + Math.floor(score), '30px Arial', 0, 50, 'white');

  gEnemy.render();
  gEnemy2.render();
  gEnemy3.render();
  gEnemy4.render();
  gEnemy5.render();
  gRocket.render();
 }

 function update(elapsed) // update function is responsible for updating the movement of the enemies and the space ship
 {
  gEnemy.update(elapsed);
  gEnemy2.update(elapsed);
  gEnemy3.update(elapsed);
  gEnemy4.update(elapsed);
  gEnemy5.update(elapsed);
  gRocket.update(elapsed);

  score += 1/timer;
 }


 function Text(txt, fnt, x, y, c) // a function that allows the addition of text where needed
 {
 canvasContext.fillStyle = c;
 canvasContext.font = fnt;
 canvasContext.fillText(txt, x, y)
 }

 function endSwap () // endSwap function allows the user to restart the game on click or on touch when located in the end screen
 {
    endScreen = false;
    gameScreen = true;
    document.removeEventListener('click', endSwap);
    document.removeEventListener('touchstart', endSwap);
    reset();
    score = 0;
 }

 function startSwap() // startSwap function allows the user to start the game when located in the Start menu via click ot touch
 {
    startScreen = false;
    gameScreen = true;
    document.removeEventListener('click', startSwap);
    document.removeEventListener('touchstart', startSwap);
 }

 function collisionDetection() // the function handles the collision detection for each enemy regarding the players position
 {
     if (gRocket.x < gEnemy.x + gEnemy.sx &&
         gRocket.x + gRocket.sx > gEnemy.x &&
         gRocket.y < gEnemy.y + gEnemy.sy &&
         gRocket.y + gRocket.sy > gEnemy.y)

         {
            if(soundMgr != null) soundMgr.playSound(0);
            endMenu = true;
            //console.log("Collision 1");
         }

     if (gRocket.x < gEnemy2.x + gEnemy2.sx &&
         gRocket.x + gRocket.sx > gEnemy2.x &&
         gRocket.y < gEnemy2.y + gEnemy2.sy &&
         gRocket.y + gRocket.sy > gEnemy2.y)

         {
            if(soundMgr != null) soundMgr.playSound(0);
            endMenu = true;
            //console.log("Collision 2");
         }

     if (gRocket.x < gEnemy3.x + gEnemy3.sx &&
         gRocket.x + gRocket.sx > gEnemy3.x &&
         gRocket.y < gEnemy3.y + gEnemy3.sy &&
         gRocket.y + gRocket.sy > gEnemy3.y)

         {
            if(soundMgr != null) soundMgr.playSound(0);
            endMenu = true;
            //console.log("Collision 3");
         }

     if (gRocket.x < gEnemy4.x + gEnemy4.sx &&
         gRocket.x + gRocket.sx > gEnemy4.x &&
         gRocket.y < gEnemy4.y + gEnemy4.sy &&
         gRocket.y + gRocket.sy > gEnemy4.y)

         {
            if(soundMgr != null) soundMgr.playSound(0);
            endMenu = true;
             //console.log("Collision 4");
         }

     if (gRocket.x < gEnemy5.x + gEnemy5.sx &&
         gRocket.x + gRocket.sx > gEnemy5.x &&
         gRocket.y < gEnemy5.y + gEnemy5.sy &&
         gRocket.y + gRocket.sy > gEnemy5.y)

         {
            if(soundMgr != null) soundMgr.playSound(0);
            endMenu = true;
            //console.log("Collision 5");
         }

 }

 //touch events-----------------------------------------------------------------
 function touchUp(evt)
 {
 evt.preventDefault();
 // Terminate touch path
 lastPt=null;
 }

 function touchDown(evt)
 {
 evt.preventDefault();
 if(gameOverScreenScreen)
 {
 return;
 }
 touchXY(evt);
 }

 function touchXY(evt)
 {
 evt.preventDefault();
 lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
 }

 function mouseDown(evt)
 {
 evt.preventDefault();
 lastPt = { x: evt.pageX, y: evt.pageY };
 }