// Variables for how cat/ghost react
cattie_eyes_star = false;
cattie_eyes_heart_1 = false;
cattie_eyes_heart = false;
cat_wow = false;
ghost_yes = false;
ghost_no = false;
cattie_yes = false;
cattie_no = false;
cat_flat_face = false; // Innocent face in front of witch in 1st scene

// Move cat acc to the location in this array
scoot = [];
lit_lnt = [true, true]; // If lanterns are lit or not
scene = -1;  // Scene number we are on
// Height of spider, if it falls boolean, velocity of fall
let spider_ht, spider_fall = false, spider_vel=5;
// Magical orb array and id of orb to display
let orb = [], orb_curr = 0;
var candles = []; // List of candle objects


function preload(){
  // Images
  // Main scene
  bck = loadImage("assets/andres-siimon-BL9op_atKxg-unsplash_DOWN.jpg");
  skull = loadImage("assets/skull_intermediate.png");
  spider = loadImage("assets/scaled_julian-schultz-TWmblnGmmbM-unsplash-removebg-preview.png");
  orb[0] = loadImage("assets/orb1.png");
  orb[1] = loadImage("assets/orb2.png");
  orb[2] = loadImage("assets/orb3.png");
  // Fish Tank scene
  tank_decor = loadImage("assets/imageedit_1_7164949182.png");
  //Opening scene
  tree = loadImage("assets/giuseppe-famiani-ZqeswDxhOM8-unsplash-removebg-preview.png");
  graves = loadImage("assets/imageedit_1_8432164414.png");
  mushrooms = loadImage("assets/mushroom.png");
  // Mirror scene
  border = loadImage('assets/imageedit_11_3366426810.png');
  //Diary/books
  diary_bck = loadImage("assets/mike-tinnion-3ym6i13Y9LU-unsplash_cleanup.jpg");
  // Potion room
  candle_img = loadImage("assets/imageedit_40_2835372739.png");
  
  //Sounds
  //Fish tank
  tank_bck_music = loadSound('assets/622091_bainmack_orchestral-song-short17__mp3cut.net_.mp3');
  cat_scream = loadSound("assets/415209__inspectorj__cat-screaming-a.wav");
  water_splash = loadSound("assets/421184_inspectorj_water-pouring-a__mp3cut.net_.mp3");
  victory_sound = loadSound("assets/624878__sonically-sound__old-video-game-4.wav");
  //Paint 
  page_turn = loadSound("assets/63318_flag2_page-turn-please-turn-over-pto-paper-turn-over__mp3cut.net_.wav");
  paint_bck_music = loadSound("assets/645440__audiomirage__on-your-way-out.mp3");
  // Main
  main_bck_music = loadSound("assets/180547__setuniman__music-box-loop-0y84mb.mp3");
  no_sound = loadSound("assets/329521__sirbedlam__low-calm-voice-no.wav");
  heartbeat = loadSound("assets/485076__inspectorj__heartbeat-regular-single-01-01-loop.wav");
  //Opening
  opening_bck_music = loadSound("assets/bck.mp3"); 
  forest_spooky = loadSound("assets/493720__marchon11__ambience-spooky-forest.mp3");
  cat_yes = loadSound("assets/meow_yes.wav");
  cat_meek = loadSound("assets/meow_meek.wav");
  cat_giggle = loadSound("assets/giggle.mp3");
  laser = loadSound("assets/612875_sonically-sound_laser-machine-gun__mp3cut.net_.mp3");
  
  // Mirror
  mirror_bck_music = loadSound("assets/649796__timouse__piano-loop-23.mp3");
  // load the text for Diary/books
  data1 = loadStrings('assets/stoker_drac.txt');
  data2 = loadStrings('assets/shelly_frank.txt');
  //Spells in spell book
  spell_table = loadTable('assets/spell_names.csv', 'csv', 'header');
  spell_bck = loadSound("assets/240623_karma-ron_pad-vintageflick-dark-soul.mp3");
  wand = loadSound("assets/221683_timbre_another-magic-wand-spell-tinkle.mp3");

  boil_sound = loadSound("assets/240963__rivernile7__sauce-boiling.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //Fish tank
  fish_x = width/2;
  oldPos = {x:width/2,y:height/8};
  newPos = oldPos;
  for (i = 0; i < 6; i++) {
    bubbles[i] = new Bubble(random(width/2-(width/4*3-70)/2, width/2+(width/4*3-70)/2), 
                            random(height/2, height*0.875), random(15,25), random(1, 3));
  }
  // Set height of spider
  spider_ht = height*0.17;
  
  //Opening scene
  if(scene == -1){
    for (var i = 0; i < 180; i++) {
      stars[i] = new Star();
    }
    for (var i = 0; i < 5; i++) {
      ghosts.push(new Ghost());
    }
    moon = {x: 0.84*width, y:0.23*height};
    witch = {x: 0.33*width, y: 0.7*height-50};
  }
  
  //Mirror scene
    video = createCapture(VIDEO);
    video.hide();
    const poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
  
  // Spell book scene
  if(scene == 6) {
    spell_setup();
    draw_spell();
  }

  for(let i=0; i<10; i++){
    candles.push(new(Candle));
  }
}

function gotPoses(poses) {
  if(scene == 3){
  //Order: nose,eye,ear,shoulder,elbow,wrist,hip,knee,ankle
  if (poses.length > 0) {
    nX = poses[0].pose.keypoints[0].position.x+(width-video.width)/2;
    nY = poses[0].pose.keypoints[0].position.y+(height-video.height)/2;
    rlX = poses[0].pose.keypoints[3].position.x+(width-video.width)/2;
    rlY = poses[0].pose.keypoints[3].position.y+(height-video.height)/2;
    rrX = poses[0].pose.keypoints[4].position.x+(width-video.width)/2;
    rrY = poses[0].pose.keypoints[4].position.y+(height-video.height)/2;
    
    // Smoothen transition between old and new position
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    earlX = lerp(earlX, rlX, 0.5);
    earlY = lerp(earlY, rlY, 0.5);
    earrX = lerp(earrX, rrX, 0.5);
    earrY = lerp(earrY, rrY, 0.5);
  }
  }
}

function modelReady() {}

function draw(){
  push();
  if(scene == -1) draw_opening_scene();
  else if(scene == 0) draw_main();
  else if(scene == 1) paint();
  else if(scene == 2) draw_fish_tank();
  else if(scene == 3) cat_face_on_user();
  else if(scene == 4) draw_potion_room();
  else if(scene == 5) drawText();
  else if(scene == 6) draw_spell();
  pop();
}

function draw_main() {
  if(!main_bck_music.isPlaying()) main_bck_music.play();
  background(192,183,179);
  imageMode(CENTER);
  image(bck, width/2, height/4*1.5, width*0.6, height/5*4);
  
  // Draw doors to different scene numbers
  draw_doors(5, 6, -1);
  
  // Brown ground
  fill(53,49,46);
  quad(0-width*0.2,height,
       width*0.2, height*0.775,
       width*0.8, height*0.775,
       width+width*0.2,height);
  
  // Draw the lanters on either side
  lantern(0.2*width-width/8, 0.15*height, 0);
  lantern(0.8*width+width/8, 0.15*height, 1);
  
  // Carpet
  draw_carpet();
  
  // Skull
  draw_skull(width*0.05, height*0.9);
  
  //Table
  draw_table();
  
  // Mirror
  draw_mirror();
  
  //Fishtank
  draw_main_sc_fish_tank();
  
  // Magical Orb
  draw_magical_orbs(0.595*width, 0.45*height);
  
  // Painting pad
  draw_painting_pad();

  // Spider
  draw_spider(width*0.75);
   
  // Change location of cat on the ground as per the mouse location such that it remains on ground
  scoot = [mouseX, mouseY-60];  // Array of cattie's position
  // Left and right extemes
  if(scoot[1]<0.75*height &&  scoot[0]>=0.85*width){
    scoot[1] = 0.75*height;
  }
  // Mid right door
  if(scoot[0]>0.77*width && scoot[0]<0.85*width) {
    if(scoot[1]<0.7*height) scoot[1] = 0.7*height;
  }
  //In between region
  if(scoot[1]<0.73*height && !( scoot[0]>0.77*width)){
    scoot[1] = 0.73*height;}
  // Right and left extemes
  if(scoot[0]<0.116*width){scoot[0] = 0.116*width}
  if(scoot[0]>0.94*width){scoot[0] = 0.94*width}

  // Draw the main characters - ghost,cat,pumpkin
  ghost(0.23*width, 0.2*height);
  if(mouseX>0.754*width && mouseY<0.957*height) {
    cattie();
    pumpkin(width*0.86,height*0.87);}
  else{
    pumpkin(width*0.86,height*0.87);
    cattie();
  }
  
  
  // If both lamps are turned off then everything become dark and colorless
  if(!lit_lnt[0] && !lit_lnt[1])filter(GRAY);

}

function draw_doors(rt_mid_sc, rt_sc, lf_sc){
  push();
  noStroke();
  //Right mid door
  fill(80,64,47);
  arc(width*0.85, height*0.95, width/14, height*1.05, PI, TWO_PI - QUARTER_PI, OPEN);
  fill(53,34,3);
  arc(width*0.853, height*0.95, width*0.06, height, PI, TWO_PI - QUARTER_PI, OPEN);
  //Right most
  fill(80,64,47);
  arc(width*0.958, height*0.965, width/12, height*1.15, PI, TWO_PI - QUARTER_PI, OPEN);
  fill(53,34,3);
  arc(width*0.961, height*0.965, width*0.07, height*1.1, PI, TWO_PI - QUARTER_PI, OPEN);
  //Left door door
  fill(80,64,47);
  arc(width*0.0883, height*0.95, width/10, height*1.2, PI, TWO_PI - QUARTER_PI, OPEN);
  fill(53,34,3);
  arc(width*0.083, height*0.95, width*0.08, height*1.15, PI, TWO_PI - QUARTER_PI, OPEN);
  
  // Arrows and room transition
  door_to_next_scene(rt_mid_sc, rt_sc, lf_sc);
  pop();
}

function door_to_next_scene(rt_mid_sc, rt_sc, lf_sc){
  push();
  //Right mid door
  if(mouseX>0.81*width && mouseX<0.88*width && mouseY<0.77*height && mouseY>0.42*height){
    fill(255);
    translate(0.856*width+2*sin(frameCount/10), height*0.6);
    scale(width/500);
    triangle(7,0,-7,10,-7,-10);
    stroke(255);
    strokeWeight(5);
    line(-7,0,-20,-2);
    cattie_yes = true;
    if(mouseIsPressed){
      main_bck_music.stop();
      scene = rt_mid_sc;
    }
  }
  //Right most
  else if(mouseX>0.91*width && mouseX<width && mouseY<0.83*height && mouseY>0.36*height){
    fill(255);
    translate(0.968*width+2*sin(frameCount/10), height*0.57);
    scale(width/500);
    triangle(7,0,-7,10,-7,-10);
    stroke(255);
    strokeWeight(5);
    line(-7,0,-20,-2);
    cattie_yes = true;
    if(mouseIsPressed){
      main_bck_music.stop();
      scene = rt_sc;
    }
  }
  //Left door door
  else if(mouseX>0.038*width && mouseX<0.13*width && mouseY<0.86*height && mouseY>0.35*height){
    fill(255);
    translate(0.077*width+2*sin(frameCount/10), height*0.56);
    scale(width/500);
    triangle(-7,0,7,10,7,-10);
    stroke(255);
    strokeWeight(5);
    line(7,0,20,2);
    cattie_yes = true;
    ghost_yes = true;
    if(mouseIsPressed){
      main_bck_music.stop();
      scene = lf_sc;
    }
  }
  else {
    cattie_yes = false;
    ghost_yes = false;
  }
  pop();
}

function draw_carpet(){
  push();
  noStroke();
  fill(183,173,156);
  ellipse(width*0.5, height*0.88, 300,30);
  fill(98,74,55);
  ellipse(width*0.5, height*0.875, 250,23);
  fill(123,45,40);
  ellipse(width*0.5, height*0.873, 180,18);
  fill(133,122,104);
  ellipse(width*0.5, height*0.869, 100,10);
  pop();
}

function draw_skull(x,y){
  push();
  imageMode(CENTER);
  translate(x,y);
  scale(0.2+width/1500);
  image(skull,0,0);
  fill(0);
  ellipse(1,-10,23,23);
  ellipse(-25,-13,19,19);
  fill("red")
  ellipse(1,-10,6);
  ellipse(-25,-13,5);
  pop();
}

function draw_spider(x){
  push();
  stroke(255);
  imageMode(CENTER);
  // If user as cat touches it once then make spider fall
  if(dist(mouseX, mouseY, x, spider_ht)<20 && mouseIsPressed){
    spider_fall = true;
  }
  // Make it bounce up and down if not fallen
  if(!spider_fall){
    // Freeze and scale up if cat is looking / cursor on spider -> indicating interaction
    if(dist(mouseX, mouseY, x, spider_ht) <30){
      fill(50,50,50,80);
      stroke(50,50,50);
      ellipse(x,spider_ht,100); // Highlight
      stroke(255);
      line(x,0, x,spider_ht);
      translate(x, spider_ht);
      scale(1.5);
    }
    else {
      line(x,0, 
      x, spider_ht+35*sin(frameCount/30));
    translate(x, spider_ht+35*sin(frameCount/30));
    }
    scale(0.2+width/3000);
    image(spider,0,0);
  }

  // Make it fall by increasing it's height till it is on the ground
  else{
    if(spider_ht<height*0.8) {
      spider_ht = spider_ht+spider_vel;
      spider_vel += 0.5; // Simulating gravity in it's fall by increasing velocity
    }
    translate(x, spider_ht);
    scale(0.2+width/3000);
    image(spider,0,0);
  }
  pop();
}

function draw_mirror(){
  push();
  translate(width*0.5, height*0.2);
  scale(0.9);
  if(mouseX>0.35*width && mouseX<0.65*width && mouseY<0.35*height && mouseY>0.05*height){
    scale(1.25);
    cattie_eyes_heart_1 = true;
    if(mouseIsPressed) {
      main_bck_music.stop();
      scene = 3;
    }
  }
  else {
    cattie_eyes_heart_1 = false;
  }
  fill(175,241,255);
  stroke(252,176,83);
  strokeWeight(20);
  rectMode(CENTER);
  rect(0,0, width*0.3, height*0.3);
  stroke(248,203,144);
  strokeWeight(5);
  rect(0,0, width*0.3, height*0.3);
  stroke(207,245,255);
  strokeWeight(20);
  line(-0.136*width, -0.038*height,
      -0.05*width, -0.13*height);
  line(0.058*width, -0.127*height, -0.136*width, 0.085*height);
  line(0.14*width, 0, 0.013*width, 0.132*height);
  pop();
}

function draw_table(){
  push();
  fill(0,0,0,100);
  //Shadow
  noStroke();
  ellipse(width/2, height*0.8, width*0.6,height*0.05);
  //Legs
  fill(126,97,87);
  stroke(92,72,72);
  strokeWeight(10);
  line(0.26*width, 0.64*height, 0.26*width, 0.81*height);
  line(0.74*width, 0.64*height, 0.74*width, 0.81*height);
  line(0.34*width, 0.64*height, 0.34*width, 0.776*height);
  line(0.66*width, 0.64*height, 0.66*width, 0.776*height);
  //Table top
  strokeWeight(3);
  quad(width*0.2,height*0.64,
       width*0.3, height*0.58,
       width*0.7, height*0.58,
       width*0.8,height*0.64);
  pop();
}

function draw_main_sc_fish_tank(){
  push();
  rectMode(CENTER);
  translate(0.42*width,0.5*height);
  //If in viscinity, scale up
  if(mouseX>0.3*width && mouseX<0.5*width&& mouseY>0.42*height && mouseY<0.6*height) {
    scale(1.25);
    cattie_eyes_star = true;
    ghost_no = true;
    if(!no_sound.isPlaying()) no_sound.play();
    if(mouseIsPressed){
      main_bck_music.stop();
      scene = 2;
    }
  }
  else {
    cattie_eyes_star = false;
    ghost_no = false;
    no_sound.stop();
  }
  //Shadow
  fill(0,0,0,100);
  noStroke();
  ellipse(0,0.1*height,
          width*0.266,height*0.04);
  //Water
  strokeWeight(3);
  stroke(240,255,255);
  fill(151,239,255,150);
  rect(0, 0.025*height, 0.2*width,0.13*height);
  // Fish
  if(!caught){
    noStroke();
    fill(248,100,31);
    ellipse(20*sin(frameCount/100), 0, 25,15);
    triangle(20*sin(frameCount/100)+10, 0,
             20*sin(frameCount/100)+20, -7,
             20*sin(frameCount/100)+20, 7);
    fill(0);
    ellipse(20*sin(frameCount/100)-5, 0,3);
  }
  //Tank
  fill(120,200,255,80);
  stroke(5,33,128);
  strokeWeight(3);
  rect(0,0, 0.2*width, 0.18*height);
  fill(41,38,28);
  rect(0,0.09*height, 0.22*width,0.01*height);
  rect(0,-0.09*height, 0.22*width,0.01*height);
  pop();
}

function draw_magical_orbs(x, y){
  push();
  translate(x,y);
  fill(0,0,0,100);
  noStroke();
  //Shadow of orb changes acc to size of current
  if(frameCount%400<100) ellipse(0,0.15*height,50,10);
  else if(frameCount%400<200) ellipse(0,0.15*height,40,10);
  else if(frameCount%400<300) ellipse(0,0.15*height,30,10);
  else ellipse(0,0.15*height,40,10);
  
  if(dist(mouseX,mouseY, 0.595*width, 0.45*height)<35){
    cat_wow = true;
  }
  else{
    cat_wow = false;
    // When cat does not see, orb oscillates normally else freezes
    translate(0,sin(frameCount/20)*5);
  }
  // Orbs change in time as if magical
  rotate(millis()/1000);
  scale(0.2+width/4000);
  if(frameCount%400<100) orb_curr = 0;
  else if(frameCount%400<200) orb_curr = 1;
  else if(frameCount%400<300) orb_curr = 2;
  else orb_curr = 1;
  image(orb[orb_curr],0,0);
  
  pop();
}

function draw_painting_pad(){
  push();
  strokeWeight(3);
  fill(254,254,242);
  translate(0.68*width, 0.605*height);
  if(dist(mouseX, mouseY, 0.68*width, 0.61*height)<0.08*width){
    scale(1.5);
    cattie_eyes_heart = true;
    if(mouseIsPressed) {
      main_bck_music.stop();
      scene = 1;
    }
  }
  else {
    cattie_eyes_heart = false;
  }
  quad(0.02*width, -0.02*height, 
       0.04*width, 0.02*height, 
       -0.04*width, 0.02*height, 
       -0.02*width, -0.02*height);
  rectMode(CENTER);
  strokeWeight(5);
  line(-0.04*width,0.027*height,0.04*width,0.027*height);
  noStroke();
  fill(150,160,120);
  ellipse(-5,1,9,6);
  fill(170,120,140);
  ellipse(5,5,10,6);
  fill(0);
  textSize(8);
  textAlign(CENTER);
  textStyle(BOLDITALIC);
  textFont('times');
  text("DRAW", 0,-0.005*height);
  pop();
}

function cattie() {
  // Draws the black cat our main character
  push();
  push();
  translate(scoot[0], scoot[1]);
  scale(width/1500+0.5);
  noStroke();
  x = 0;
  y = 0;
  
  //Shadow
  fill(0,0,0,80);
  ellipse(x,y+57,70,20);
  
  // Body
  fill(0);
  rectMode(CENTER);
  rect(x,y+40,
       50+sin(frameCount/20),40-sin(frameCount/20),10);
  fill(58,68,60,255);
  ellipse(x,y+45,20+sin(frameCount/20),20)
  // Scarf
  fill(225,0,0,200);
  rect(x,y+30,55+sin(frameCount/20),10,5);
  rect(x+12, y+36, 8,20,2);
  
  push();
  // Saying no
  if(cattie_no) translate(0+1.5*sin(frameCount/10),0);
  // Saying yes
  if(cattie_yes) translate(0,1.2*sin(frameCount/10));
  
  // Ears
  fill(0);
  triangle(x-15, y-27, x-31, y-18, 
           x-34+1.5*sin(frameCount/20), y-39);
  triangle(x+15, y-27, x+31, y-18, 
           x+34-1.5*sin(frameCount/20), y-39);
  // Inner ears
  fill(255,192,203);
  noStroke();
  triangle(x-28, y-22, x-21, y-26, 
           x-29+sin(frameCount/20), y-33);
  triangle(x+28, y-22, x+21, y-26, 
           x+29-sin(frameCount/20), y-33);
  pop();
  
  // Head
  fill(0);
  ellipse(x,y,80,60);
  // Saying no
  if(cattie_no) translate(0+1.5*sin(frameCount/10),0);
  // Saying yes
  if(cattie_yes) translate(0,2*sin(frameCount/10));
  
  // Mouth
  if(cat_wow){
    fill(255,192,203);
    noStroke();
    rect(x,y+16, 7,14,3);
  }
  else if(cat_flat_face){
    stroke(255,192,203);
    strokeWeight(2);
    line(x-6,y+16, x, y+12.5);
    line(x+6,y+16, x, y+12.5);
    //ellipse(x,y+16,12,7);
  }
  else {
    stroke(255,192,203);
    strokeWeight(2);
    noFill();
    arc(x-4,y+16, 7,5, 0, PI);
    arc(x+4,y+16, 7,5, 0, PI);
    line(x, y+12.5, x, y+15.5);
  }
  
  // Whiskers
  stroke(0);
  line(x-34, y+4, x-53, y-2);
  line(x+34, y+4, x+53, y-2);
  line(x+32, y+10, x+50, y+19);
  line(x-32, y+10, x-50, y+19);
  line(x+34, y+7, x+54, y+8);
  line(x-34, y+7, x-54, y+8);
  
  //Tail
  fill(0);
  noStroke();
  //Draw tail on left if right facing else right
  if(mouseX>width/2) tail_dir = 1;
  else tail_dir = -1;
  beginShape();
  vertex(x-(23+sin(frameCount/20))*tail_dir,y+55)
  bezierVertex(x-35*tail_dir, y+60, 
               x-(57+2*sin(frameCount/20))*tail_dir, y+40, 
               x-(47+5*sin(frameCount/20))*tail_dir, y+30+4*sin(frameCount/20));
  bezierVertex(x-(42+2*sin(frameCount/20))*tail_dir, y+45, 
               x-(27+4*sin(frameCount/20))*tail_dir, y+30, 
               x-(23+sin(frameCount/20))*tail_dir, y+50);
  endShape();
  
  // Eyes
  if(cattie_eyes_star){
    fill("yellow");
    push();
    translate(x-19,y-2);
    scale(0.4)
    beginShape();
    vertex(-10, 10);
    vertex(0, 35);
    vertex(10, 10);
    vertex(35, 0);
    vertex(10, -8);
    vertex(0, -35);
    vertex(-10, -8);
    vertex(-35, 0);
    endShape();
    pop();
    push();
    translate(x+19,y-2);
    scale(0.4)
    beginShape();
    vertex(-10, 10);
    vertex(0, 35);
    vertex(10, 10);
    vertex(35, 0);
    vertex(10, -8);
    vertex(0, -35);
    vertex(-10, -8);
    vertex(-35, 0);
    endShape();
    pop();
  }
  else if(cattie_eyes_heart || cattie_eyes_heart_1){
    if(!heartbeat.isPlaying()) heartbeat.play();
    fill("red");
    push();
    translate(x-19,y-7);
    scale(0.4);
    beginShape();
    vertex(x, y);
    bezierVertex(x-20, y-20, x-40, y+13, x, y+40);
    bezierVertex(x+40, y+13, x+20, y-20, x, y);
    endShape(CLOSE);
    pop();
    push();
    translate(x+19,y-7);
    scale(0.4);
    beginShape();
    vertex(x, y);
    bezierVertex(x-20, y-20, x-40, y+13, x, y+40);
    bezierVertex(x+40, y+13, x+20, y-20, x, y);
    endShape(CLOSE);
    pop();
  }
  else{
    heartbeat.stop();
    noStroke();
    fill(220);
    ellipse(x-19,y-2,25,27);
    ellipse(x+19,y-2,25,27);
    //Eyes follow mouse
    push();
    translate(map(mouseX,0,width,-7,7),
              map(mouseY,0,height,-5,3));
    fill(0);
    ellipse(x-19,y-2,10,15);
    ellipse(x+19,y-2,10,15);
    translate(map(mouseX,0,width,-2.5,2.5),0);
    fill(255);
    ellipse(x-19,y-2,3);
    ellipse(x+19,y-2,3);
    pop();
  }
  // Blush
  fill(225,0,0,180);
  ellipse(x-28, y+13,8,5);
  ellipse(x+28, y+13,8,5);
  pop();  
  pop();
}

function pumpkin(x,y){
  // Draws the Halloween themed pumpkin
  push();
  translate(x, y);
  // Scale up if within viscinity
  //if(dist(mouseX,mouseY,x,y)<50) scale(1.25);
  scale(width/1500+0.5);
  //Shadow
  fill(0,0,0,100);
  noStroke();
  ellipse(0,30,70,20);
  //Stem
  stroke("olive");
  strokeWeight(5);
  line(-1,-33,4,-45);
  //Main
  strokeWeight(2);
  fill(221,86,20);
  stroke(250,121,8);
  ellipse(-20,0,30,53);
  ellipse(20,0,30,53);
  ellipse(-12,0,30,60);
  ellipse(12,0,30,60);
  ellipse(0,0,30,65);
  //Features
  noStroke();
  fill(0);
  ellipse(-14,0,13);
  ellipse(14,0,13);
  noFill();
  stroke(0);
  strokeWeight(2);
  //arc(x-14,y-10,7,5,PI,0);
  line(-20,-12, -13, -10);
  line(20,-12, 13, -10);
  noStroke();
  //Eyes follow mouse
  push();
  translate(map(mouseX,0,width,-3,3),
            map(mouseY,0,height,-3,3));
  fill(253,205,11)
  ellipse(-14,0,4);
  ellipse(14,0,4);
  pop();
  fill(0);
  arc(0,7,15,15,0,PI);
  fill(250,0,0);
  arc(0,13.5,5,5,PI,0);
  pop();
}

function ghost(x,y) {
  push();
  // Our shy ghost hovers around aimlessly
  noStroke();
  fill("white");
  const ghostWidth = 75;
  const ghostHeight = 100;
  const numPoints = 8;
  const spacing = ghostWidth/numPoints;
  //translate(0+5*sin(frameCount/20),0);
  //translate(0,0+10*sin(frameCount/80));
  x += 5*sin(frameCount/20);
  y += 10*sin(frameCount/80);
  if(dist(mouseX,mouseY,x,mouseY)>50){
    //If nearby, the shy ghost hides
    rectMode(CENTER);
    rect(x, y+ghostHeight/4, ghostWidth, ghostHeight/2);
    ellipse(x, y, ghostWidth, ghostHeight);
    const triHeight = 10;
    const rectHeight = ghostHeight/2;
    beginShape();
      curveVertex(x-ghostWidth/2, y+rectHeight);
      for (let i = 0; i <= numPoints; i++) {
        point(x-ghostWidth/2 + i*spacing, y+rectHeight+triHeight*(i%2));
        noStroke();
        curveVertex(x-ghostWidth/2 + i*spacing, y+rectHeight+triHeight*(i%2));
      }
      curveVertex(x-ghostWidth/2 + numPoints*spacing, y+rectHeight+triHeight*(numPoints%2));
  }
  endShape();
  // Saying no
  if(ghost_no) {
    translate(0+7*sin(frameCount/5),0);
    stroke("black");
    strokeWeight(3);
    noFill();
    ellipse(x-15,y-18, 15, 15);
    ellipse(x+15,y-18, 15, 15);
    fill("pink");
    noStroke();
    rect(x, y+20, 13, 30,3);
  }
  // Saying yes
  if(ghost_yes) {
    translate(0,10*sin(frameCount/10));
  }
  if(!ghost_no){
    fill("black");
    ellipse(x-15,y-18, 10, 10);
    ellipse(x+15,y-18, 10, 10);
    noFill();
    stroke("black");
    strokeWeight(3);
    arc(x, y, 10, 10, 0, -PI);
    noStroke();
    fill("pink")
    ellipse(x-19,y-8, 10, 5);
    ellipse(x+19,y-8, 10, 5);
  }
  pop();
}

function lantern(x,y, id){
  push();
  if(dist(mouseX,mouseY,x,y)<50 && lit_lnt[id]){
    fill(246,201,50,20);
    stroke(246,201,50)
    ellipse(x,y,200);
  }
  if(dist(mouseX,mouseY,x,y)<50 && mouseIsPressed){
    if(lit_lnt[id]) lit_lnt[id] = false;
    else lit_lnt[id] = true;
  }
  push();
  translate(x,y);
  noStroke();
  fill(246,201,50,60);
  if(lit_lnt[id]) ellipse(0,0,100);
  if(lit_lnt[id]) fill(254,134,58); else fill(80);
  stroke(100);
  strokeWeight(3);
  quad(-0.025*600, -0.015*500,
       0.025*600, -0.015*500,
       0.017*600, 0.035*500,
       -0.017*600, 0.035*500);
  line(-0.006*600,-0.015*500, -0.004*600, 0.035*500);

  fill(140);
  stroke(100);
  strokeWeight(1);
  quad(-0.013*600, -0.051*600,
       0.013*600, -0.051*600,
       0.044*600, -0.015*600,
       -0.044*600, -0.015*600);
  triangle(0.025*600, 0.035*500,
       -0.025*600, 0.035*500,
       0, 0.055*500);
  fill(100);
  ellipse(0,0.06*500, 0.01*600);
  ellipse(0,-0.07*500, 0.02*500);
  pop();
  pop();
}

function mouseClicked(){
  //Main scene ->
  //if(scene == 0 || scene == -1) print(mouseX/width, mouseY/height);
  
  //Fish Tank scene ->
  //Que: Water splash sound with paw movement
  if(scene==2) {
    water_splash.play();
  newPos = {x:mouseX, y:mouseY};
  if(newPos.x<width*0.125+30) newPos.x = width*0.125+30;
  if(newPos.x>width*0.875-30) newPos.x = width*0.875-30;
  if(newPos.y>height*0.875-30) newPos.y = height*0.875-30;
  }
  
  //Opening scene
  if(scene == -1) {
    if(idx <= texts.length){
      if(!opening_bck_music.isPlaying()) opening_bck_music.play();
      idx += 1;
    }
  }
}

function mouseReleased(){
  // Cat painting scene ->
  if(scene == 1){
    // Add paw mark where the mouse is on art canvas
    if(mouseX<width*0.85-20 && mouseX>width*0.15+20 && mouseY<height*0.867-20 && mouseY>height*0.067+20){
      if(dist(mouseX,mouseY, 
              0.816*width,0.8*height)
         >=0.05*width){
        paw_print.push({ 
          x: mouseX, 
          y: mouseY, 
          d: random(0.7,1.4), 
          rot: random(0,360),
          clr: [random(0,200), random(0,200), random(0,200), random(150,200)]});
      }
    }
  }
  if(scene == 6){
    if (dist(mouseX,mouseY, 0,15)<30){
      animate = !animate;
    }
    else if (dist(mouseX,mouseY, 50,15)<30){
      draw_circles = !draw_circles;
    }
    else {
      // A new spell to master is displayed
      spell_setup();
      pg_num = int(random(500))*2;
      if(!page_turn.isPlaying()) page_turn.play();
    }
  }
}

function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}
