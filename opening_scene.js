texts = ["It is finally my clockout time. (Yawn) Time to get some rest..! I will see u tomorrow, Mr. Cattie.", "Good bye, Mistress.", "Do NOT touch ANYthing in there, ESPECIALLY leave Ms Fishie alone! Do complete the painting rather than just looking in the mirror. And, steer clear from my diary and books.", "Aah!! I forgot it's a full moon! Collect the magical mushrooms. And do deal with the bothersome ghosts for me.", "Yes, mistress! I shall take care of everything. Rest assured.", "HAHAHA\nFinally today I will eat that stupid fish! Yum"];
idx = -1;  // Index to keep track of diaglogue texts

// Points to draw haunted castle
haunted_pts=[
{x: -154.5, y: 23},
{x: -88.5, y: 159}, 
{x: 46.5, y: 159}, 
{x: 144.5, y: 55},
{x: 171.5, y: 61}, //imp
{x: 150.5, y: -23}, //imp
{x:72.5, y:-17}, //imp
{x:81.5, y:1},
{x: 61.5, y: 23},
{x: 80.5, y: -79},
{x: 93.5, y: -79}, //imp
{x: 36.5, y: -159}, //imp
{x: -14.5, y: -80}, //imp
{x: 5.5, y: -80},
{x: 11.5, y: -15},
{x: -105.5, y: -119}, //imp
{x: -187.5, y: 21}]; //imp

// Points to draw witch's broom that she flies on
broom_pts = [
  {x: -0.06*600, y: -0.193*500},
  {x: -0.024*600, y: -0.11*500},
  {x: -0.0016*600, y: 0.07*500},
  {x: -0.008*600, y: 0.09*500},
  {x: -0.003*600, y: 0.11*500},
  {x: -0.023*600, y: 0.14*500},
  {x: -0.014*600, y: 0.2*500},
  {x: 0.019*600, y: 0.21*500},
  {x: 0.059*600, y: 0.2*500},
  {x: 0.057*600, y: 0.14*500},
  {x: 0.024*600, y: 0.11*500},
  {x: 0.023*600, y: 0.08*500},
  {x: 0.008*600, y: 0.07*500},
  {x: -0.008*600, y: -0.11*500},
  {x: -0.046*600, y: -0.22*500}];
fly = false;
var witch = {};

// Sky and grass gradient colors
bck_c1 = "#001740";
bck_c2 = "#328DD2";
grass_c1 = "#192710";
grass_c2 = "#3c4723";

//Moon location, star and ghost variable/array
var moon = {};
var stars = [];
var ghosts = [];

// Mushroom locations array
mush_arr = [{x: 0.39, y: 0.87, tint:"#84fbfe"},
             {x: 0.65, y:0.82, tint: "#6c35ee"},
             {x: 0.5, y: 0.93, tint: "#148fcd"},
             {x: 0.93, y: 0.85, tint: "#ffba61"},
             {x: 0.6, y: 0.89, tint: "#e65bfa"},
             {x: 0.45, y: 0.8, tint: "#1cfa1e"}];

cat_flat_face = true; // Innocent face in front of witch

function draw_opening_scene(){
  // Make the background a gradient
  for(let y=0; y<height*0.8; y++){
    n = map(y,0,height*0.8,0,1);
    let newc = lerpColor(color(bck_c1), color(bck_c2), n);
    stroke(newc);
    line(0,y,width, y);
  }
  for(let y=height*0.8; y<height; y++){
    n = map(y,height*0.8,height,0,1);
    let newc = lerpColor(color(grass_c1), color(grass_c2), n);
    stroke(newc);
    line(0,y,width, y);
  }
  
  //Add stars in sky
  for (var i = 0; i < stars.length; i++) {
	 stars[i].draw();
  }
  
  noStroke();
  //Add moon
  push();
  fill("#FEFCD7");
  circle(moon.x, moon.y, 130);
  craterX=[-45, -12, -35, -26, 26, 33, 0, -20, 25, 48];
  craterY=[10, 24, 38, -30, -38, 11, 3, -53, 41, -17];
  r=[15,25,8,20,16,15,12,8,20, 5];
  for(let i=0; i<craterX.length; i++){
    fill("#e8c488");
    stroke("#fbe6ac");
    strokeWeight(2)
    ellipse(moon.x+craterX[i],moon.y+craterY[i],r[i]);
  }
  pop();
  
  // Add dialogue to witch and cat conversation
  push();
  
  //Draw witch and cat and their dialogue
  if(idx <= texts.length) {
    // Stop drawing witch once flown away n out of canvas
    push();
    if(witch.x > -100) {
      scale(0.8+height/5000);
      draw_witch();
    }
    pop();
    
    scoot = [0.7*width, 0.7*height];
    cattie();
    draw_dialogues();
  }
  else {  // Play only the spooky animal sound after witch leaves
    opening_bck_music.setVolume(0,1); // Fade out the sound
    if(opening_bck_music.volume==0) opening_bck_music.stop();
    
    if(!forest_spooky.isPlaying()) forest_spooky.play();
    cattie_yes = false;
    
    //Boundary wall
    stroke(0);
    strokeWeight(4);
    line(0.34*width, 0.74*height, width, 0.74*height);
    for(let i=0.34*width; i<width; i+=(width-0.34*width)/30){
      line(i, 0.72*height, i, 0.8*height);
    }
    //Add magical mushrooms
    for(let i=0; i<mush_arr.length; i++){
      push();
      tint(mush_arr[i].tint);
      translate(mush_arr[i].x*width, mush_arr[i].y*height);
      scale(0.15);
      // Collect if nearby
      if(dist(mouseX,mouseY,mush_arr[i].x*width, mush_arr[i].y*height) < 100){
        scale(2);
        translate(0,-height+40*sin(frameCount/10));
        fill(241,237,149,70);
        stroke(241,237,149);
        strokeWeight(2);
        ellipse(mushrooms.width/2, mushrooms.height/2, mushrooms.height*1.25);
        if(mouseIsPressed) mush_arr.splice(i, 1);
      }
      image(mushrooms, 0,0);
      pop();
    }
    
    //Add ghosts in graveyard after the conversations ends
    graveyard();
    
    //Path to castle
    noStroke();
    push();
    stroke("#482801");
    strokeWeight(2);
    fill("#5b4026");
    arr = [[0.798, 0.817],
           [0.76, 0.835],
           [0.81, 0.86],
           [0.73, 0.88],
           [0.79, 0.917],
           [0.71, 0.94],
           [0.77, 0.98],
           [0.67, 1]];
    for(let i=0; i<arr.length; i++){
      ellipse(width*arr[i][0],height*arr[i][1],40,15);
    }
    pop();

    
    //Add haunted castle clicking which leads to the main scene
    draw_haunted_castle();
    
    scoot = [max(mouseX, width*0.4), max(mouseY, height*0.75)];  // Array of cattie's position; grounded to Earth
    if(mouseX<width*0.4) cattie_eyes_star = true;
    else cattie_eyes_star = false;
    cattie();
  }
  pop();
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height*0.8);
    this.size = random(0.2, 1.8);
  }

  draw() {
    this.t += 0.05;
    var scale = this.size;
    stroke(255);
    fill(255);
    circle(this.x, this.y, scale);
  }
}

function graveyard(){
  // Graveyard with tree, graves and ghosts
  push();
  translate(width/6, height*0.9)
  scale(0.4+height/1000);
  imageMode(CENTER);
  image(tree, width*0.132,height*0.035-tree.height*0.5);
  image(graves, 0,height*0.01, width/3, height/4);
  pop();
  for (const ghost of ghosts) {
    ghost.moveAndDraw();
  }
}

function draw_haunted_castle(){
  push();
  translate(0.8*width, height*0.8-159*(0.5+width/5000));
  if(dist(mouseX,mouseY,width*0.83, height*0.8-159*(0.5+width/5000))<200){
    scale(1.25);
    fill(241,237,149,70);
    stroke(241,237,149);
    strokeWeight(2);
    ellipse(0,0,300+height*0.055)
    if(mouseIsPressed){
      forest_spooky.stop();
      opening_bck_music.stop();
      scene = 0; // Change scene to main
    }
  }
  fill(0);
  strokeWeight(5);
  stroke(0);
  scale(0.5+width/5000);
  haunted_castle();
  windows_n_door();
  pop();
}

class Ghost {
  constructor() {
    this.tail = [];
    this.tailLength = 30;

    // Give this ghost a random size and starting position
    this.ghostSize = random(30, 70);
    this.ghostX = random(width/3);
    this.ghostY = random(height);

    // These variables are used to make the ghosts follow different paths
    this.wiggliness = random(2,7);
    this.floatiness = random(1.5,3.5);
    
    // Give this ghost a random gray color
    this.clr = random(180,250);
  }

  moveAndDraw() {
    noStroke();
    // Move the ghost left and right (this.clr makes it a bit random)
    this.ghostX += cos((this.clr + frameCount) /20) * this.wiggliness;
    // Move the ghost up.
    this.ghostY -=this.floatiness;
    // If this ghost goes off the top, start it back at the bottom
    if (this.ghostY < -this.ghostSize-height/4) {
      this.ghostSize = random(30,70);
      this.ghostY = random(height) + this.ghostSize;
      this.ghostX = random(width/3);
      this.clr = random(180,255);
      this.wiggliness = random(2,7);
      this.floatiness = random(1.5,3.5);
    }

    // Add a point to the beginning of the array.
    this.tail.unshift({x: this.ghostX, y: this.ghostY});
    // If the array is too big, remove the last point.
    if (this.tail.length > this.tailLength) {
      this.tail.pop();
    }


    // Loop over the tail and draw the points.
    for (let index = 0; index < this.tail.length; index++) {
      const tailPoint = this.tail[index];

      // Tail gets smaller and more transparent.
      const pointSize = this.ghostSize * (this.tail.length - index) / this.tail.length;
      const pointAlpha = 255 * (this.tail.length - index) / this.tail.length;

      fill(this.clr, this.clr, this.clr, pointAlpha);
      ellipse(tailPoint.x, tailPoint.y, pointSize*1.2);
      if(dist(mouseX,mouseY,tailPoint.x, tailPoint.y)<pointSize*1.5){
        // Laser eye effect -> kill ghosts
        fill(255,0,0,50);
        stroke(255,0,0);
        ellipse(tailPoint.x, tailPoint.y,50);
        line(scoot[0], scoot[1], tailPoint.x, tailPoint.y);
        if(!laser.isPlaying()) laser.play();
        
        this.ghostY = height;
      }
    }

    // Different ghost faces
    push();
    fill(32);
    if(this.clr%10<3){
      ellipse(this.ghostX - this.ghostSize * .2,
              this.ghostY - this.ghostSize * .1,
              this.ghostSize * .2);
      ellipse(this.ghostX + this.ghostSize * .2,
              this.ghostY - this.ghostSize * .1,
              this.ghostSize * .2);
      ellipse(this.ghostX,
              this.ghostY + this.ghostSize * .3,
              this.ghostSize * .23, this.ghostSize * .3);
    }
    else{
      if(this.clr%10<6){
        noFill();
        stroke(32);
        strokeWeight(3);
        arc(this.ghostX - this.ghostSize * .3,
            this.ghostY,
            this.ghostSize * .3, this.ghostSize * .25, PI,TWO_PI);
        arc(this.ghostX + this.ghostSize * .3,
            this.ghostY,
            this.ghostSize * .3, this.ghostSize * .25, PI,TWO_PI);
        noStroke();
        fill(32);
        arc(this.ghostX,
            this.ghostY + this.ghostSize * .2,
            this.ghostSize * .35, this.ghostSize * .4, TWO_PI,PI);
      }
      else{
        stroke(32);
        strokeWeight(3);
        line(this.ghostX - this.ghostSize * .2,
             this.ghostY,
             this.ghostX - this.ghostSize * .4,
             this.ghostY - this.ghostSize * .2);
        line(this.ghostX + this.ghostSize * .2,
             this.ghostY,
             this.ghostX + this.ghostSize * .4,
             this.ghostY - this.ghostSize * .2);
        line(this.ghostX - this.ghostSize * .2,
             this.ghostY - this.ghostSize * .2,
             this.ghostX - this.ghostSize * .4,
             this.ghostY);
        line(this.ghostX + this.ghostSize * .2,
             this.ghostY - this.ghostSize * .2,
             this.ghostX + this.ghostSize * .4,
             this.ghostY);
        
        noFill();
        arc(this.ghostX,
            this.ghostY + this.ghostSize * .4,
            this.ghostSize * .3, this.ghostSize * .4, PI,TWO_PI);
      }
    }
    pop();
  }
}

function haunted_castle() {
  push();
  beginShape();
  for(i=0; i<haunted_pts.length; i++){
    if([4,5,6,10,11,12,15,16].includes(i)){   
      ellipse(haunted_pts[i].x, haunted_pts[i].y, 5);
      stroke(0);
      if([11,15].includes(i)){   
        line(haunted_pts[i].x, haunted_pts[i].y+5, haunted_pts[i].x, haunted_pts[i].y-25);
        line(haunted_pts[i].x+10, haunted_pts[i].y-15, haunted_pts[i].x-10, haunted_pts[i].y-10);
      }
      if(i==5) {
        line(haunted_pts[i].x, haunted_pts[i].y, haunted_pts[i].x+15, haunted_pts[i].y-20);
        line(haunted_pts[i].x+15, haunted_pts[i].y-5, haunted_pts[i].x-5, haunted_pts[i].y-15);
      }
    }
    vertex(haunted_pts[i].x, haunted_pts[i].y);
  }
  endShape();
  pop();
}

function windows_n_door(){
  // Windows
  fill(241,237,149);
  push();
  rotate(-PI/9);
  rectMode(CENTER);
  rect(-80,-5,50,70);
  ellipse(60,-45,37,40);
  ellipse(65,80,40,35);
  stroke(0);
  line(-74.5,-41,-84.5,29);
  line(-56.5,1,-104.5,-15);
  line(61.5,-67,69.5,-30);
  line(41.5,-40,65.5,-51);
  line(61.5,61,63.5,97);
  line(43.5,78,84.5,78);
  pop();
  // Door
  push();
  arc(-12,153,100,170,PI, TWO_PI);
  fill(0);
  ellipse(-35,130,10);
  pop();
}

function draw_dialogues() {
  push();
  if(!opening_bck_music.isPlaying()) opening_bck_music.play();
  if(!forest_spooky.isPlaying()) forest_spooky.play();
  
  noStroke();
  //Settings for dialogue text
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(8+height*0.01);

  
  //Left speaker aka witch
  translate(width*0.45,height*0.22);
  if(idx==0 || idx==2 || idx==3){
    fill(0);
    rect(0,0,width*0.21,height*0.21,10);
    triangle(-0.06*width, 0.1*height,
             0.01*width, 0.1*height,
             -0.067*width, 0.16*height);
    fill(255);
    rect(0,0,width*0.2,height*0.2,10);
    triangle(-0.05*width, 0.09*height,
             0, 0.1*height,
             -0.057*width, 0.15*height);
    fill(0);
    text(texts[idx], 0,0, width*0.195, height*0.195);
    fill(255,255,0,10);
    noStroke();
    triangle(witch.x-width*0.45,-height*0.32,
             witch.x-150-width*0.5,height*0.68,
             witch.x+200-width*0.5,height*0.68);
  }
  
  if(idx == 5){
    fly=true;
  }
  
  //Right speaker aka cat
  translate(width*0.13,height*0.23);  
  if(idx==1 || idx==4){
    if(idx == 1) if(!cat_yes.isPlaying()) cat_yes.play();
    if(idx == 3) if(!cat_meek.isPlaying()) cat_meek.play();
    fill(0);
    rect(0,0,width*0.21,height*0.21,10);
    triangle(0.06*width, 0.1*height,
             -0.01*width, 0.1*height,
             0.067*width, 0.16*height);
    fill(255);
    rect(0,0,width*0.2,height*0.2,10);
    triangle(0.05*width, 0.09*height,
             0, 0.1*height,
             0.057*width, 0.15*height);
    fill(0);
    text(texts[idx], 0,0, width*0.195, height*0.195);
    fill(255,255,0,10);
    noStroke();
    triangle(scoot[0]-width*0.57,-height*0.55,
             scoot[0]-200-width*0.55,height*0.45,
             scoot[0]+100-width*0.55,height*0.45);
  }
  
  // Thought bubble
  if(idx==texts.length){
    cat_flat_face = false;
    cattie_yes = true;
    cat_meek.stop();
    if(!cat_giggle.isPlaying()) cat_giggle.play();
    fill(255);
    stroke(0);
    strokeWeight(4);
    ellipse(0, 0, width*0.21, height*0.21);
    ellipse(width*0.07, height*0.08, width*0.05, height*0.05);
    ellipse(width*0.09, height*0.1, width*0.02, height*0.02);
    fill(0);
    noStroke();
    text(texts[idx-1], 0,0, width*0.195, height*0.195);
  }
  pop();
}

function draw_witch() {
  hair_y = [0,10];
  hair_x = -60;
  fill(255);
  if(fly) {
    // Change witch pos to movement wrt broom
    witch.x = lerp(witch.x, -150, 0.01);
    witch.y = lerp(witch.y, -150, 0.01);
    broom();
  }
  translate(witch.x, witch.y);
  
  
  push();
  //Back hair
  fill(45,44,58);
  noStroke();
  rectMode(CENTER);
  rect(0,0+36,120,100);
  beginShape();
  for(i=0; i<=121; i+=10){
    vertex(hair_x+i, hair_y[i/10%2]+86);
  }
  endShape();
  
  //Body
  push();
  strokeWeight(2);
  //Dress
  stroke(152,132,200);
  fill(0);//237,175,201);
  push();
  translate(0,119)
  if(fly) rotate(PI*0.1);
  quad(-27, 0, -40, 55, 40, 55, 27, 0);
  pop();
  rect(0,100,55,50,15,15,0,0);
  strokeWeight(10);
  line(-28, 123, 28, 123); // belt
  strokeWeight(2);
  
  //Hands
  push();
  rotate(TWO_PI/6*5);
  ellipse(0-108,0+20,60,20);
  fill(244,224,226);
  noStroke();
  arc(0-130,0+20,17,13,TWO_PI+PI/2,PI+PI/2);
  rotate(TWO_PI/3);
  stroke(152,132,200);
  fill(0);//237,175,201);
  ellipse(0+108,0+20,60,20);
  fill(244,224,226);
  noStroke();
  arc(0+130,0+20,17,13,TWO_PI-PI/2,PI-PI/2);
  pop();
  
  //Neck
  strokeWeight(1);
  fill(244,224,226);
  triangle(-12,80,12,80,0,95);
  noStroke();
  rect(0,0+70,24,21);
  
  // Face
  fill(244,224,226);
  arc(0,0, 115, 140, TWO_PI,PI);
  // Hair
  beginShape();
  fill(45,44,58);
  arc(0,0, 125, 100, PI , TWO_PI);
  for(i=0; i<=121; i+=10){
    vertex(hair_x+i, hair_y[i/10%2]);
  }
  endShape();
  pop();
  
  //Hat
  push();
  fill(0);
  stroke(40);
  strokeWeight(3);
  ellipse(0,-30, 145, 35);
  triangle(-40,-30, 40,-30, 42,-119);
  stroke(0);
  line(-40,-30,40,-30);
  strokeWeight(1);
  triangle(43,-121, 41, -105, 64, -105);
  triangle(64,-105, 52, -96, 55, -110);
  pop();
  
  //Eyes
  fill(255);
  ellipse(0-25,0+27,30,35);
  ellipse(0+25,0+27,30,35);
  push();
  translate(map(mouseX,0,width,-5,5),
            map(mouseY,0,height,-4,3));
  fill(57,5,20);
  ellipse(0-25,0+27,20,25);
  ellipse(0+25,0+27,20,25);
  fill(255);
  ellipse(0-22,0+31,5);
  ellipse(0+22,0+31,5);
  ellipse(0-32,0+22,7);
  ellipse(0+32,0+22,7);
  pop();
  //Mouth
  //stroke(0,0,0,100);
  fill(245,154,160);
  arc(0,0+52,20,15+2*sin(frameCount/5),TWO_PI,PI);
  fill(245,154,160,150);
  ellipse(0+34,0+48,15,9);
  ellipse(0-34,0+48,15,9);
  pop();
}

function broom(){
  push();
  translate(witch.x,witch.y);
  beginShape();
  stroke(144,101,2);
  strokeWeight(3);
  fill(201,139,0);
  translate(10,130);
  scale(1.25)
  rotate(-PI*0.4);
  for(i=0; i<broom_pts.length; i++){
    vertex(broom_pts[i].x, broom_pts[i].y);
  }
  endShape();
  arr = [];
  arr.push({x: -0.008*600, y: 0.14*500},
          {x: 0.005*600, y: 0.14*500},
          {x: 0.0176*600, y: 0.14*500},
          {x: 0.03*600, y: 0.14*500},
          {x: 0.04*600, y: 0.14*500});
  strokeWeight(1);
  for (let i = 0; i < 5; i++) {
    line(arr[i].x, arr[i].y, arr[i].x+3, arr[i].y+30);
  }
  pop();
}
