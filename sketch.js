var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var view

//var dog

//var start,startImg;


//Game States
//var WAIT=0
var PLAY=0;
var END=1;

var gameState= PLAY;

var coinsnd,hitsnd,bgmusic

function preload(){
  pathImg = loadImage("road1.jfif");
  boyImg = loadImage("dog.png");
  cashImg = loadImage("food.png");
  diamondsImg = loadImage("treats.png");
  jwelleryImg = loadImage("gold.png");
  swordImg = loadImage("alien.png");
  //endImg =loadAnimation("gameOver.png");
  coinsnd = loadSound("coinsnd.wav");
  hitsnd = loadSound("oversnd.wav")
  extrasnd = loadSound("extrasnd.wav")

  view = loadImage("view 4.jpg")

  //dog= loadImage("scoredog.png")

  //startImg = loadImage("startbtn.png")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4+3*treasureCollection/100


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("dogRunning",boyImg);
boy.scale=0.7;


/*start = createSprite(width/2,height+80,20,20)
start.addImage(startImg);
start.scale= 0.8;*/
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  /*if (mousePressedOver(start)) {
    start.visible=false;
    boy.visible=true;
    gameState=PLAY;
  }*/
  
  if(gameState===PLAY){
  background(view);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 350){
    path.y = height/2;
  }
  
createCash();
createDiamonds();
createJwellery();    
createSword();    

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+2;
      coinsnd.play()
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+3;
      coinsnd.play();
      
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 10;
      extrasnd.play();
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        hitsnd.play();
        /*boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;*/
        boy.visible=false;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);

        // swal({
        //   title: "Good job!",
        //   text: "You clicked the button!",
        //   icon: "success",
        //   button: "Aww yiss!",
        // });

        gameOver();
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }

}

function createCash() {
  if (World.frameCount % 90 == 0) {
  var cash = createSprite(Math.round(random(width/2-100, width-400),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.2;
  cash.velocityY = 5;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 120 == 0) {
  var diamonds = createSprite(Math.round(random(width/2-100, width-400),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.2;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 200 == 0) {
  var jwellery = createSprite(Math.round(random(width/2-100, width-300),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.2;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 180 == 0) {
  var sword = createSprite(Math.round(random(width/2-100, width-400),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.3;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

/*function gameOver(){
  swal({
   // imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ3DLjdhLhKPOUQQp2q_6EQKkIs-WdXGms5A&usqp=CAU",
    imageUrl:"https://i.pinimg.com/originals/4e/f8/30/4ef830ac4c1d02d5529e6c8226bf707c.gif",
   imageSize:"150x150",
    title:"good Job!",
    text: `Your Score ${"\n"}${treasureCollection}`, 
    button: "Tap to play again",


  });
}*/

function gameOver(){

if (treasureCollection < 50) {

  swal(
    {
      title: `Try again!!!`,
      text: `Your Score ${"\n"}${treasureCollection}`, 
      imageUrl:"https://i.pinimg.com/originals/e7/38/9f/e7389f4d6c43b745eaf8e4b546960382.gif",

      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );


} 
else if ((treasureCollection > 50) && (treasureCollection < 150)){
  swal(
    {
      title: `good Job!!!`,
      text: `Your Score ${"\n"}${treasureCollection}`, 
      imageUrl:"https://i.pinimg.com/originals/c9/21/a2/c921a266e91e2d15d1b8c03b962043f9.gif",

      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );


}

else if ((treasureCollection > 150 ) && (treasureCollection < 500)) {
  swal(
    {
      title: `Amazing!!!`,
      text: `Your Score ${"\n"}${treasureCollection}`, 
      imageUrl:"https://i.pinimg.com/originals/4e/f8/30/4ef830ac4c1d02d5529e6c8226bf707c.gif",

      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );


}

else {
  swal(
    {
      title: `Excellent Job!!!`,
      text: `Your Score ${"\n"}${treasureCollection}`, 
      imageUrl:"https://i.pinimg.com/originals/66/23/e7/6623e73500f43b8d20aaa35a46465641.gif",

      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

}
}
