trans = false; // User can view color of liquid if true - activated after clicking on the cauldron
// Mixing process variables
mix_tr = 0.5, mix_x = 0, mix_y = 0;
mixing = false;

liquid_clr = {r: 220, g: 120, b: 100};

let cauldron_x, cauldron_y;

let sp=0; //spacing between books

function draw_potion_room() {
  push();
  if(!spell_bck.isPlaying()) spell_bck.play();
  background(220);
  
  fill(53,49,46);
  quad(-width*0.2,height,
       width*0.1, height*0.65,
       width*0.9, height*0.65,
       width+width*0.2,height);
  stroke(0);
  strokeWeight(0.5)
  line(width*0.1,height*0.65,width*0.2,0);
  line(width*0.9,height*0.65,width*0.8,0);
  
  //Window
  draw_window();
  
  // Book shelf
  push();
  bs_x = width*0.3;
  bs_y = height*0.55;
  translate(bs_x, bs_y);
  scale(0.8);
  draw_book_shelf();
  pop(); 

  draw_magical_orbs(width*0.08, height*0.75);
  draw_spider(width*0.95)
  
  for (const cndl of candles) {
    cndl.draw_cndl();
    fill(0,0,0,100);
    noStroke();
    ellipse(cndl.x, cndl.y+height*0.5, 20, 10);
  }

  // Cauldron
  push();
  cauldron_x = width*0.8;
  cauldron_y = height*0.6;
  translate(cauldron_x, cauldron_y);
  draw_cauldron();
  pop();
  cat_x = mouseX;
  if(mouseX>cauldron_x-180) cat_x = cauldron_x-180;
  scoot = [cat_x, max(mouseY, height*0.7)]
  cattie();
  
  // Mix em up
  push();
  translate(0.9*width, 0.04*height);
  fill(0);
  rect(-15,-15,40,30);
  strokeWeight(3);
  fill(255);
  textSize(20);
  textAlign(CENTER,CENTER);
  text("MIX", 5,0);
  if(dist(0.9*width-10, 0.04*height, mouseX,mouseY)<100 && mouseIsPressed) {
    mixing = !mixing;
    if(mixing) if(!boil_sound.isPlaying()) boil_sound.play();
    if(!mixing) boil_sound.stop();
  }
  pop();
  pop();
}


function draw_book_shelf(){
  push();
  fill(0,0,0,100);
  noStroke();
  ellipse(0,height*0.25-height*0.09,width*0.5,30)
  rectMode(CENTER);
  fill("#482b1b");
  rect(0, -height*0.09, width*0.4, height*0.5);
  if(height*0.3>80) draw_shelf(0);
  if(height*0.2>80) {
    pumpkin(-width*0.1, -height*0.3);
    draw_shelf(-height*0.3);
    draw_skull(width*0.1, -height*0.3)
  }
  push();
  scale(0.7+height/1000);
  if(width*0.2>100){
    sp = width*0.2/6;
    draw_book(-80-sp, 0, "#5b1d0a", "#bc8f5d");
    draw_book(80+sp, 0, "#4d402d", "#b56e3e");
  }
  draw_book(0, 0, "rgba(120,89,38,1)");
  draw_spell_book(0-40, 0);
  draw_diary(0+40+sp, 0);
  pop();
  pop();
}

function draw_shelf(ht){
  push();
  stroke("#c1895b");
  strokeWeight(20);
  //shelf
  line(-width*0.2, ht+height*0.09, width*0.2, ht+height*0.09);
  pop();
  
}

function draw_spell_book(book_x, book_y) {
  push();
  translate(book_x, book_y);
  textAlign(CENTER,CENTER);
  stroke(201,157,123);
  if(dist(mouseX, mouseY, book_x+bs_x, book_y+bs_y)<150){
    translate(0,10*sin(frameCount/20));
    scale(1.5);
    fill(255,0,0,50);
    noStroke();
    ellipse(0,0,180);
    fill("beige");
    rect(-35, 0, 70,80,5);
    rect(35, 0, 70,80,5);
    fill(0);
    text("Click to", -35,-7);
    text("learn spells", -35,7);
    stroke("red");
    noFill();
    ellipse(35,0,30);
    if(mouseIsPressed) {
      scene = 6;
      boil_sound.stop();
      spell_bck.stop();
      cat_giggle.stop();
      cattie_yes = false;
      cattie_eyes_star = false;
    }
    cattie_yes = true;
    cattie_eyes_star = true;
    if(!cat_giggle.isPlaying()) cat_giggle.play();
  }
  else{
    cattie_yes = false;
    cattie_eyes_star = false;
    cat_giggle.stop();
    fill("#86471c");
    rotate(PI*0.1)
    rect(0,0,30,80,5,5,0,0);
    fill(255,220,160);
    text("S",0,-32);
    text("P",0,-18);
    text("E",0,-6.5);
    text("L",0,6.5);
    text("L",0,18);
    text("S",0,32);
  }
  pop();
  
}

function draw_book(book_x, book_y, clr, clr2=0) {
  push();
  translate(book_x, book_y);
  stroke(0)
  fill(clr);
  rect(0,0,30,80,5,5,0,0);
  stroke(clr2);
  strokeWeight(5);
  line(-10, -20, 10, -20);
  line(-10, 20, 10, 20);
  pop();
}

function draw_diary(diary_x, diary_y) {
  push();
  translate(diary_x, diary_y);
  textAlign(CENTER,CENTER);
  stroke(201,157,123);
  if(dist(mouseX, mouseY, diary_x+bs_x, diary_y+bs_y)<150){
    translate(0,10*sin(frameCount/20));
    scale(1.5);
    fill(255,0,0,50);
    noStroke();
    ellipse(0,0,180);
    fill("beige");
    rect(-35, 0, 70,80,5);
    rect(35, 0, 70,80,5);
    fill(0);
    noStroke();
    text("Click to", -35,-14);
    text("read", -35,0);
    text("Chronicles!", -35,14);
    if(mouseIsPressed) {
      scene = 5;
      boil_sound.stop();
      spell_bck.stop();
      cat_giggle.stop();
      cattie_yes = false;
      cattie_eyes_star = false;
    }
    cattie_yes = true;
    cattie_eyes_star = true;
    if(!cat_giggle.isPlaying()) cat_giggle.play();
    
  }
  else{
    cattie_yes = false;
    cattie_eyes_star = false;
    stroke("#86471c")
    fill(245,200,136);
    rect(0,0,30,80,5,5,0,0);
    stroke(50,85,95);
    fill(26,60,82);
    text("D",0,-32);
    text("I",0,-16);
    text("A",0,0);
    text("R",0,16);
    text("Y",0,32);
  }
  pop();
}

function draw_cauldron() {
  push();
  scale(1+height/2000);
  //Main body
  // Enlarge on mouse being near, on click make the inner liquid visible
  if(dist(mouseX, mouseY, cauldron_x, cauldron_y+50) <100 || trans) {
    fill(liquid_clr.r, liquid_clr.g, liquid_clr.b);
    if(dist(mouseX, mouseY, cauldron_x, cauldron_y+50) <100) scale(1.25);
    if(mouseIsPressed) if(!trans) trans = true;
    else trans = false;
  }
  else {
    if(!trans) fill(40);
  }
  
  stroke(70);
  strokeWeight(3);
  arc(0,50,180,120,-QUARTER_PI, PI + QUARTER_PI, CHORD);
  strokeWeight(10);
  fill(liquid_clr.r , liquid_clr.g, liquid_clr.b);
  ellipse(0,0,150,30);
  
  if(trans){
    //show bubbles from tank sketch
  }
  else{
    push();
    strokeWeight(1);
    fill(255,255,255,60);
    stroke(255);
    if(sin(frameCount/4)>0) {
      if(!mixing) ellipse(0,5,20,5);
      if(mixing){
        if(mix_tr<0) ellipse(22,0,10,5);
        else ellipse(-28,-5,15,5);
      }
      else{
        ellipse(22,0,10,5);
        ellipse(-28,-5,15,5);
      }
    }
    else {
      if(!mixing) ellipse(0,-5,5,3);
      if(mixing){
        if(mix_tr<0) ellipse(18,-3,20,5);
        else ellipse(-30,0,10,5);
      }
      else{
        ellipse(18,-3,20,5);
        ellipse(-30,0,10,5);
      }
    }
    pop();
  }
  
  // Mix liquid
  if(mixing) mix();
  
  pop();
  
  //Fire to keep the liquid boiling
  fire();
}

function fire(){
  push();
  noStroke();
  translate(0,150+height/2000);
  if(dist(mouseX, mouseY, cauldron_x, cauldron_y+50) <100) translate(0,50);
  flame(45,0, false, 100, "rgba(225,200,0,0.7)");
  flame(-40,0, true, 150, "rgba(250,200,100,0.8)");
  flame(-10,0, false, 50, "rgba(255,70,0,0.6)");
  flame(5,0, true, 200, "rgba(255,125,0,0.6)");
  flame(20,0, false, 230, "rgba(255,180,50,0.6)");
  flame(-15,0, true, 250, "rgba(255,180,30,0.6)");
  flame(-25,0, false, 30, "rgba(255,130,30,0.6)");
  flame(30,0, true, 130, "rgba(240,180,0,0.6)");
  flame(-45,0, false, 80, "rgba(225,0,0,0.4)");
  flame(45,0, true,180, "rgba(255,30,30,0.4)");
  pop();
}

function flame(x,y, flip, rand, clr){
  push();
  translate(x,y);
  scale(1+height/5000);
  if(dist(mouseX, mouseY, cauldron_x, cauldron_y+50) <100) scale(1.25);
  
  v1 = [-10+sin((frameCount+rand)/5)*5, -0.15*400+sin((frameCount+rand)/7)*5];
  c1 = [-0.075*400, -0.14*400];
  c2 = [-0.1*400, -0.04*400+sin((frameCount+rand)/2)*10];
  
  v2 = [0, 0];
  c3 = [0.05*400, -0.08*400];
  c4 = [-0.075*400+sin((frameCount+rand)/2)*5, -0.06*400+sin((frameCount+rand)/2)*5];
  
  if(flip){
    v1 = [-v1[0], v1[1]];
    c1 = [-c1[0], c1[1]];
    c2 = [-c2[0], c2[1]];
    c3 = [-c3[0], c3[1]];
    c4 = [-c4[0], c4[1]];
  }
  fill(clr);
  beginShape();
  vertex(v1[0], v1[1]);
  //noFill();
  bezierVertex(c1[0], c1[1], c2[0], c2[1], v2[0], v2[1]);
  bezierVertex(c3[0], c3[1], c4[0], c4[1], v1[0], v1[1]);
  endShape();
  pop();
}

class Candle{
  constructor(){
    this.x = random(width*0.05,width*0.95);
    this.y = random(height*0.17, height*0.4);
    this.rand = random(1);
    this.off = false;
  }
  draw_cndl(){
    push();
    imageMode(CENTER);
    translate(this.x,this.y);
    fill(251,218,81,50);
    strokeWeight(5)
    stroke(240,169,5);
    scale(0.1+height/5000);
    translate(sin(frameCount*this.rand/40)*20, -candle_img.height*0.4+sin(frameCount*this.rand/20)*20);
    if(dist(mouseX, mouseY, this.x,this.y)<candle_img.height*0.2){
      ellipse(0,-candle_img.height*0.2, candle_img.height*2);
      if(mouseIsPressed){
        if(this.off) this.off = false;
        else this.off = true;
      }
    }
    noStroke();
    if(!this.off){
      fill(240,169,5);
      triangle(-candle_img.width*0.5, -candle_img.height*0.5, candle_img.width*0.5, -candle_img.height*0.5, 0-sin(frameCount*this.rand/10)*5, -candle_img.height-sin(frameCount*this.rand/3)*7);
      fill(251,218,81);
      triangle(-candle_img.width*0.35, -candle_img.height*0.5, candle_img.width*0.35, -candle_img.height*0.5, 0-sin(frameCount*this.rand/5)*5, -candle_img.height*0.9-sin(frameCount*this.rand/3)*7);
      fill(230,230,255);
      triangle(-candle_img.width*0.2, -candle_img.height*0.5, candle_img.width*0.2, -candle_img.height*0.5, 0-sin(frameCount*this.rand/10)*5, -candle_img.height*0.8-sin(frameCount*this.rand/3)*7);
    }
    
    image(candle_img, 0,0);
    pop();
  }
}

function mix(){
  push();
  if(mix_x>25 || mix_x<-25) mix_tr=-mix_tr;
  else mix_tr=mix_tr;
  mix_x+=mix_tr;
  noFill();
  strokeWeight(2);
  stroke(255,255,255,180)
  if(mix_tr>0){
    arc(mix_x,mix_y,80,21,-PI/3-0.3, PI*2+PI-PI/6+0.3);
    arc(mix_x,mix_y,60,14,-PI/3-0.2,PI*2+PI-PI/6+0.2);
    arc(mix_x,mix_y,40,7,-PI/3,PI*2+PI-PI/6);
  }
  else{    
    arc(mix_x,mix_y,80,21, -PI/6-0.3+PI/3,-PI/3*2+0.3);
    arc(mix_x,mix_y,60,14, -PI/6-0.2+PI/3,-PI/3*2+0.2);
    arc(mix_x,mix_y,40,7, -PI/6+PI/3,-PI/3*2);
  }
  strokeWeight(10);
  stroke(88,58,36);
  line(mix_x+12*mix_tr,mix_y-3, mix_x-40*mix_tr, mix_y-100);
  strokeWeight(8);
  stroke(133,76,35);
  line(mix_x+12*mix_tr,mix_y-2, mix_x-40*mix_tr, mix_y-100);
  
  pop();
}

function draw_window(){
  push();
  // Sky gradient colors
  wind_c2 = "#001740";
  wind_c1 = "#328DD2";
  //Window loaction
  wind_x = width*0.65;
  wind_y = height*0.3;
  translate(wind_x, wind_y);
  if(dist(mouseX,mouseY, wind_x, wind_y) < 100) {
    scale(1.25);
    if(mouseIsPressed) {
      boil_sound.stop();
      spell_bck.stop();
      scene = 0;
    }
  }
  
  // Make the background a gradient
  for(let y=height*0.477; y>height*0.127; y-=10){
    n = map(y,height*0.477,height*0.127,1,0);
    let newc = lerpColor(color(wind_c1), color(wind_c2), n);
    fill(newc);
    noStroke();
    ellipse(0,0,y*0.8);
  }
  noFill();
  stroke("#615144");
  strokeWeight(10);
  ellipse(0,0,height*0.477*0.8);
  stroke("#96857f");
  strokeWeight(2);
  ellipse(wind_x, wind_y,height*0.477*0.8);
  pop();
}
