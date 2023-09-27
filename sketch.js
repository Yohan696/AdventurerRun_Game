//introducing the variables 
var adventurer, adventurer_walking, adventrhit_img, ground, ground_running, score, ground_inv, rand_clouds, cloud, cloud_running, restartsp, restartImg, adventstop_img;
var obstacle, obst1, obst2, obst3, obst4, obst5, obst6, obst7, obst8, obst, randst, clouds_grp, obstacle_grp, gameoverImage, gameover;
var adventurer_jump, adventurer_die, adventurer_chkpoint, adventrhit_img, Rom_Guard, Rom_Guardmov, coins, coin_grp; 
var rs5coinImage, rs10coinImage, rs20coinImage, goldcoinImage, totcoin, Rom_Guardstop;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

//preloading the graphics of adventurer for running animation 
function preload(){
adventurer_walking = loadAnimation("ad01.png", "ad02.png", "ad03.png", "ad04.png", "ad05.png", "ad06.png", "ad07.png", "ad08.png", "ad09.png", "ad10.png", "ad11.png", "ad12.png", "ad13.png", "ad14.png", "ad15.png", "ad16.png", "ad17.png", "ad18.png", "ad19.png", "ad20.png", "ad21.png", "ad22.png", "ad23.png", "ad24.png", "ad25.png");
 adventstop_img = loadImage ("ad11stop.png"); 
 ground_running = loadImage ("desert2fin.png");
 adventrhit_img = loadImage("boom.png");
 adventurer_die = loadSound ("die.mp3");
 adventurer_jump = loadSound ("jump.mp3");
 adventurer_chkpoint = loadSound ("checkpoint.mp3");

  cloud1 = loadImage ("Large-cloud1.png");
  cloud2 = loadImage ("Large-cloud2.png");
  cloud3 = loadImage ("Large-cloud3.png");
  obst1 = loadImage ("Stone1-rmbg.png");
  obst2 = loadImage ("Stone2-rmbg.png");
  obst3 = loadImage ("Stone3-rmbg.png");
  obst4 = loadImage ("Stone4-rmbg.png");
  obst5 = loadImage ("Stone5-rmbg.png");
  obst6 = loadImage ("Stone6-rmbg.png");
  obst7 = loadImage ("Stone7-rmbg.png");
  obst8 = loadImage ("Stone8-rmbg.png");
  Rom_Guardmov = loadAnimation("grd36.png", "grd37.png", "grd38.png", "grd39.png", "grd40.png", "grd41.png", "grd42.png", "grd43.png", "grd44.png", "grd45.png", "grd46.png");
  Rom_Guardstop = loadAnimation ("grd39.png");
  gameoverImage = loadImage ("gameOver.png");
  restartImg = loadImage ("restart.png");

  rs5coinImage = loadImage("5rupcoin.png");
  rs10coinImage = loadImage("10rupcoin.png") ;
  rs20coinImage = loadImage("20rupcoin.png");
  goldcoinImage = loadImage("goldCoin.png");
  coincoll_Snd = loadSound("coincollect.mp3");

}

//creating the canvas, adventurer and ground sprites for the setup
function setup() {

  //creating the canvas where adventurer runs
  createCanvas(windowWidth, windowHeight);
   //initialising the score as 0 
  score = 0;
  totcoin = 0;
  
  ground_inv = createSprite (width/2, 300, width*10, 20);
 
   //creating the ground sprite
  ground = createSprite(width/2,20,width*10,30);
  ground.addImage ("GROUNDMOVING", ground_running);
  ground.scale = 2.2;
  ground_inv.visible = false; 
  //create adventurer sprite
    adventurer = createSprite(70, 80, 80, 40);
 
    //adventurer animation 
    adventurer.addAnimation ("ADVTR_MOVING", adventurer_walking);
    adventurer.addAnimation ("ADVTR_STOPPED", adventstop_img);
    //resizing the adventurer to the canvas
    adventurer.scale = 0.5;

    Rom_Guard = createSprite (windowWidth-80, 265, 50, 20);
    Rom_Guard.addAnimation ("Roman_Guardmoving", Rom_Guardmov);
    Rom_Guard.addAnimation ("Roman_Guardstop", Rom_Guardstop);  
    Rom_Guard.scale = 0.45;
    Rom_Guard.velocityX = -15;
    Rom_Guard.lifetime = 700; 

    obstacle_grp = createGroup();
    clouds_grp = createGroup(); 
    coin_grp = createGroup(); 

    gameover = createSprite (width/2,120, 200, 55);
    gameover.addImage (gameoverImage);
    adventurer.setCollider ("circle", 0, 0, 100);
    restartsp = createSprite (width/2,180, 200, 55);
  restartsp.addImage (restartImg);
  restartsp.scale = 0.25;
    }

function draw(){

  //creating background
  background("light blue");
  drawSprites();  
  //giving a title to the game
   textSize(40);
  fill("red");
     text("THE ADVENTURER RUNNER GAME!", windowWidth/2-300, 35); 

  //putting the score on top right   
   textSize(16);
   text ("Score : "+ score, width-130, 30); 
  text ("Coins : "+ totcoin, width-130, 55);

   if (gamestate == PLAY) 
   {
    
    if (keyDown ("space") && adventurer.y>= 120 ||(touches.length >0))
    {
      //assigning the Y velocity to the adventurer on pressing space
      adventurer.velocityY = -7;
      adventurer_jump.play();
       touches = [];
     }
   
    //pulling down the adventurer from the jumping height
    adventurer.velocityY = adventurer.velocityY + 0.8;

      // adding the score according to the framecounts covered
      score = score + Math.round(frameCount/100);

    if ((score % 100 === 0) && (score > 0))
    {
      adventurer_chkpoint.play() ; 
    }
    gameover.visible = false;
   restartsp.visible = false;
   
    ground.velocityX = -(1 + 2 * (score/700));
   
    if (ground.x < 630) {
     ground.x = ground.width/2 +600;
    
     //controlling the adventurer with space key to jump on facing the obstacles
          }

    //fixing the adventurer to the ground sprite 
    adventurer.collide (ground_inv);
    if ((coin_grp.isTouching(adventurer)) && gamestate == PLAY)  
    {
      totcoin += 100;
      adventurer_chkpoint.play(); 
      coin_grp[0].destroy(); 

    }

      //calling the functions rand_clouds and obstacle
      rand_clouds();
      coincoll(); 
      obstacle();


       if ((obstacle_grp.isTouching(adventurer)) || (Rom_Guard.isTouching(adventurer))) 
      {
        adventurer_die.play();
       // Rom_Guard.changeAnimation("Roman_Guardstop", Rom_Guardstop); 
        gamestate = END;
        
      }
   }
   else if (gamestate == END) 
   {
    gameover.visible = true;
    restartsp.visible = true; 
   
    ground.velocityX = 0;
    adventurer.velocityY = 0;
    
    adventurer.changeAnimation ("ADVTR_STOPPED", adventstop_img);
    Rom_Guard.changeAnimation("Roman_Guardstop", Rom_Guardstop);
    clouds_grp.setVelocityXEach (0);
    obstacle_grp.setVelocityXEach (0);
    coin_grp.setVelocityXEach (0);
    clouds_grp.setLifetimeEach(-1);
    obstacle_grp.setLifetimeEach(-1);
    coin_grp.setLifetimeEach(-1);
    Rom_Guard.velocityX = 0;
    Rom_Guard.destroy(); 
                                                                                                                                                                                                                                                                                                                                                  
    adventurer.collide (ground_inv);

   
    if (mousePressedOver (restartsp))
    {
      restartgm();
    }
       }
    }

function rand_clouds() 
{
if (frameCount % 75 === 0) 
{
  cloud = createSprite (windowWidth-50, 60, 60, 20);
  cloud.scale = 0.36;
  cloud.velocityX  = -8;
  
  cloud.y = Math.round(random(35,105));

//adjusting the cloud depth
cloud.depth = adventurer.depth;
adventurer.depth = adventurer.depth + 1;
clouds_grp.add(cloud);

var rand = Math.round(random(1,3));

//adding random images to clouds
if (rand == 1) 
{
  cloud.addImage ("1st_Cloud", cloud1);}
  else if (rand == 2) 
  {
    cloud.addImage ("2nd_Cloud", cloud2);}
    else 
     {
      cloud.addImage ("3rd_Cloud", cloud3);} 
    
      cloud.lifetime = 720;
    }
    
  } 
function restartgm ()
{
  //create a function restart 
  gamestate = PLAY;
  gameover.visible = false;
  restartsp.visible = false;
  coinhit = false;
  obstacle_grp.destroyEach();
  clouds_grp.destroyEach();
  coin_grp.destroyEach();
  totcoin = 0;
  score = 0;
  adventurer.changeAnimation ("ADVTR_MOVING", adventurer_walking);
  adventurer_die.stop();
}

function obstacle () 
{
  if (frameCount % 65 === 0) 
  {
  //creating obstacle sprite and group
    obst = createSprite (windowWidth-60, 265, 50, 20);
    obst.scale = 0.45;
    obst.velocityX  = -14;
    obst.lifetime = 700; 
    obstacle_grp.add(obst);

 //generating random obstacles on the screen
 var randst = Math.round(random(1,8));
 
 //adding random images to the obstacles
  switch (randst)
  {
  case 1: obst.addImage ("1st_OBSTACLE", obst1);
          break;
  case 2: obst.addImage ("2nd_OBSTACLE", obst2);
          break;
  case 3: obst.addImage ("3rd_OBSTACLE", obst3);
          break;
  case 4: obst.addImage ("4th_OBSTACLE", obst4);
          break;
  case 5: obst.addImage ("5th_OBSTACLE", obst5);
          break;
  case 6: obst.addImage ("6th_OBSTACLE", obst6);
          break;
  case 7: obst.addImage ("7th_OBSTACLE", obst7);
          break;
  case 8: obst.addImage ("8th_OBSTACLE", obst8);
          break;
  default: break;
        }  
     }
  } 


  function coincoll () 
  {
  if (frameCount % 55 === 0) 
  {
  //creating coins sprite and group
    coins = createSprite (windowWidth-70, 285, 50, 20);
    coins.scale = 0.15;
    coins.velocityX  = -16;
    coins.lifetime = 300; 
    coin_grp.add(coins);

 //generating random coins on the screen
 var randcoin = Math.round(random(1,4));
 
 //adding random images to the obstacles
  switch (randcoin)
  {
  case 1: coins.addImage ("5_rupees", rs5coinImage);
          break;
  case 2: coins.addImage ("10_rupees", rs10coinImage);
          break;
  case 3: coins.addImage ("20_rupees", rs20coinImage);
          coins.scale = 0.1;
          break;
  case 4: coins.addImage ("gold5gm", goldcoinImage);
          coins.scale = 0.1;
          break;
  default: break;
        }        
    }
  } 
