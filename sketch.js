var ironman, ironmancollided;
var bg, backgroundImg;
var stoneImg, bricksGroup;
var diaImg, diaGroup;
var score=0;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironman= loadImage("images/iron.png");
  stoneImg= loadImage("images/stone.png");
  diaImg = loadImage("images/diamond.png");
}

function setup() {
  createCanvas(1000, 600);
  
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale=2;

  iron = createSprite(200,505,20,50);
  iron.addImage(ironman);
  iron.scale =0.3;
  iron.setCollider("rectangle",0,0,200,500);
  //iron.debug=true;

  ground = createSprite(200,585,2000,10); 
  ground.visible = false; 

  bricksGroup= new Group();
  diaGroup= new Group();
}

function draw() {

  bg.velocityY=4;

  if (bg.y > 600){
    bg.y=bg.width/4;
  }

  if (iron.y< 50){
    iron.y=50;
  }
  
  if(iron.x<50){
    iron.x=50;
  }

  if (iron.x > 900){
    iron.x = 900;
  }
  
  if(keyDown("up") ) {
    iron.y -= 20;
  }
  if(keyDown("down") ) {
    iron.y +=20;
  }
  if(keyDown("left") ) {
    iron.x -= 20;
  }
  if(keyDown("right") ) {
    iron.x += 20;
  }

  generateBricks();
  for(var i = 0 ; i< (bricksGroup).length ;i++){
    var temp = (bricksGroup).get(i) ;
    
    if (temp.isTouching(iron)) {
       iron.collide(temp);
      }
        
    }

  generateDia();
  for(var i = 0 ; i< (diaGroup).length ;i++){
    var temp = (diaGroup).get(i) ;
    
    if (temp.isTouching(iron)) {
      //coinSound.play();
      score= score + 999999999999999999999;
      temp.destroy();
      temp=null;
      }
        
    }

  //iron.velocityY = iron.velocityY + 0.5;
  iron.collide(ground);

  
  drawSprites();
  textSize(20);
  fill("white")
  text("Diamonds Collected: "+ score, 500,50);
   
}


  function generateBricks() {
    if (frameCount % 70 === 0) {
      var brick = createSprite(600,0,40,10);
      brick.x = random(100,900);
      //brick.y= random(100,300)
      brick.addImage(stoneImg);
      brick.scale = 0.5;
      brick.velocityY = 5;
      brick.lifetime =250;
      bricksGroup.add(brick);
    }
  }

  function generateDia() {
    if (frameCount % 50 === 0) {
      var dia = createSprite(600,0,40,10);
      dia.addImage(diaImg);
      dia.x = Math.round(random(20,1000));
      dia.scale = 0.5;
      dia.velocityY = 3;
      dia.lifetime = 1200;
      diaGroup.add(dia);
    }
  }