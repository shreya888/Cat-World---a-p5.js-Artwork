let yoff = 1.0; // 2nd dimension of perlin noise
var bubbles = [];
caught = false;
tr = 1;
let fish_x, fish_y=0;

function draw_fish_tank() {
  // Play music
  if(!tank_bck_music.isPlaying())tank_bck_music.play();
  // Background
  imageMode(CENTER);
  image(bck, width/2, height/2, width, height);
  //Table
  push();
  strokeWeight(3);
  stroke(92,72,72);
  fill(126,97,87);
  quad(width/10*0.5, height/3*2,width/10*9.5,height/3*2, width+70,height, -70,height);
  pop();
  
  // Tank
  push();
  //Shadow
  fill(0,0,0,100);
  noStroke();
  ellipse(width/2,height*0.895, width*1.05,height*0.36);
  
  //Bottom
  stroke(41,38,28);
  strokeWeight(5);
  rectMode(CENTER);
  fill(51,45,38);
  rect(width/2,height*0.94,width*0.865,height*0.05,1);
  quad(0.14*width, 0.79*height, 
       0.07*width, 0.91*height,
       0.93*width, 0.91*height,
       0.86*width, 0.79*height);
  
  //Main
  fill(120,200,255,80);
  stroke(5,33,128);
  strokeWeight(2);
  rect(width/2,height/2-20,width/4*3-70,height/4*3-70);
  line(width/2+(width/4*3-70)/2, 
       height/2+(height/4*3-70)/2-20,
       width/2+(width/4*3)/2, 
       height*0.875);
  line(width/2-(width/4*3-70)/2, 
       height/2+(height/4*3-70)/2-20,
       width/2-(width/4*3)/2, 
       height*0.875);
  line(width/2+(width/4*3-70)/2, 
       height/2-(height/4*3-70)/2-20,
       width/2+(width/4*3)/2, 
       height/2-(height/4*3)/2);
  line(width/2-(width/4*3-70)/2, 
       height/2-(height/4*3-70)/2-20,
       width/2-(width/4*3)/2, 
       height/2-(height/4*3)/2);
  image(tank_decor, width/2, height/2+(height/4*3+35)/4, width/4*3, height/3);
  fill(151,239,255,50);
  rect(width/2,height/2,width/4*3,height/4*3);
  
  // Add movable objects
  paw();
  if(!caught) fish();
  bubbling();
  wave();
  
  stroke(5,33,128);
  noFill();
  strokeWeight(5);
  rect(width/2,height/2,width/4*3,height/4*3);
  pop();
  
  // Exit scene -> retun to main scene
  push();
  translate(0.97*width, 0.04*height);
  fill("red")
  rect(-15,-15,30);
  strokeWeight(3);
  stroke(255);
  line(-10,-10, 10,10);
  line(-10,10,10,-10);
  if(dist(0.97*width, 0.04*height, mouseX,mouseY)<100 && mouseIsPressed) {
    tank_bck_music.stop();
    scene = 0;
  }
  pop();
}

function paw() {
  push();
  oldPos.x = lerp(oldPos.x, newPos.x, 0.5);
  oldPos.y = lerp(oldPos.y, newPos.y, 0.5);
  strokeWeight(50);
  stroke(50,50,50);
  line(width/2,-50,oldPos.x, oldPos.y);

  fill("pink");
  noStroke();
  ellipse(oldPos.x, oldPos.y-20,30);
  ellipse(oldPos.x, oldPos.y+5,10);
  ellipse(oldPos.x+15, oldPos.y,10);
  ellipse(oldPos.x-15, oldPos.y,10);
  if(dist(fish_x,fish_y,oldPos.x,oldPos.y)<80 && !caught){
    if(!cat_scream.isPlaying()) cat_scream.play();
  }
  pop();
}

// Defining bubbles
let Bubble = function(x, y, diameter, speed) {
  this.x = x;
  this.y = y;
  this.diameter = diameter;
  this.speed = speed;
}

Bubble.prototype.draw = function() {
  strokeWeight(2);
  stroke('white');
  noFill();
  circle(this.x, this.y, this.diameter);
  arc(this.x, this.y, this.diameter - (0.2 * this.diameter), this.diameter - (0.2 * this.diameter), 3, 4)
}

function bubbling(){
    for (i = 0; i < bubbles.length; i++) {
    bubbles[i].draw();
    if (bubbles[i].y < height*0.3125) {
      bubbles[i].y = random(height/2, height*0.875);
      bubbles[i].x = random(width*0.125+35, width*0.875-35);
      bubbles[i].diameter = random(15, 25);
      bubbles[i].speed = random(1, 3);
    } else {
      bubbles[i].y -= bubbles[i].speed / 2;
    }
  }
}

function fish() {
  push();
  fish_y = height*0.6+5*sin(frameCount/10);
  if(dist(oldPos.x,oldPos.y,
          fish_x,fish_y)>30){
    // Move in x direction and wobble in y
    if (fish_x<width/4 || fish_x>width/4*3) tr = -tr;
    fish_x += tr;
    
    // Main body
    fill(248,100,31);
    noStroke();
    ellipse(fish_x-8,fish_y, 65, 30);
    //Eye
    stroke(0);
    fill(0);
    if(tr<0) ellipse(fish_x-25,fish_y-3,5);
    else ellipse(fish_x+10,fish_y-3,5);
    //Smile
    noFill();
    if(tr<0) arc(fish_x-35,fish_y+3,8,5,TWO_PI,PI);
    else arc(fish_x+20,fish_y+3,8,5,TWO_PI,PI);
    //Tail and fins
    noStroke();
    fill(248,100,31);
    if(tr<0) triangle(fish_x+17,fish_y, fish_x+40+sin(frameCount/2),fish_y+20, fish_x+40+sin(frameCount/2),fish_y-20);
    else triangle(fish_x-32,fish_y, 
                  fish_x-55-sin(frameCount/2),fish_y+20, 
                  fish_x-55-sin(frameCount/2),fish_y-20);
    fill(248,100,31,200);
    if(tr<0){
      triangle(fish_x-15,fish_y-13, 
               fish_x+10+sin(frameCount/3),fish_y-30, 
               fish_x+7,fish_y-10);
      triangle(fish_x-15,fish_y+13,
               fish_x+10+sin(frameCount/3),fish_y+30,
               fish_x+7,fish_y+10);
    }
    else{
      triangle(fish_x,fish_y-13, 
               fish_x-25+sin(frameCount/3),fish_y-30, 
               fish_x-22,fish_y-10);
      triangle(fish_x,fish_y+13, 
               fish_x-25+sin(frameCount/3),fish_y+30, 
               fish_x-22,fish_y+10);
    }
  }
  else{
    caught = true; // Don't draw if caught
    // Que: Victory sound once
    victory_sound.play();
  }
  pop();
}

function wave(){
  push();
  fill(3,152,245,100);
  beginShape();
  stroke(240,255,255);
  strokeWeight(5);
  let xoff = yoff; // 1D Noise
  // Iterate over horizontal pixels
  for (let x = width*0.125; 
       x <= width*0.875; x += 5) {
    //Calculate a y value according to noise, map to 1D Noise
    let y = map(noise(xoff), 0, 1, height*0.3125,height*0.3125+20)
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.25;
  }
  vertex(width*0.875, height*0.3125+10);
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width*0.875, height*0.875);
  vertex(width*0.125, height*0.875);
  endShape(CLOSE);
  pop();
}

