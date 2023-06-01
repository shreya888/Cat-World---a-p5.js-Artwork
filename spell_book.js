pg_num = 0;
radii = [];  // Radius of each new circle, more circles make the spell shape more complex
speeds = [];  // How fast to draw the spell
angle = 0;  // Used to calculate the shape of spell and the red guiding dot's position
animate = true;  // Animating the process of making a spell or pause and not draw currently, controlled by stop/play button
draw_circles = false;  // Guiding circles on how the spell is created, controlled by "?" button
let spell = {};  // Spell position

function spell_setup(){
  spell = {
    x: width*0.67,
    y: height/2};
    
  push();
  ellipseMode(RADIUS);
  radii = [];
  speeds = [];
  pathvariable = 0;
  angle = 0;
  a = random(100,120); //size of spell
  for (let i = 1; i <= max(pg_num/2%6,2); i++){ // number of times to move in new direction
    radii.push(a/2**(i-1));
  }
  a = random(1,3)*random([-1,1]);
  for (let i = 1; i <= radii.length; i++){
    speeds.push(a*2**i*random([-1,1]));
  }  
  pop();
}

function draw_spell(){
  push();
  ellipseMode(RADIUS);
  //Background of diary on table;
  image(diary_bck, 0,0,width,height);
  
  if(!spell_bck.isPlaying()) spell_bck.play();
  
  clr = 0 // Spell tracing color; black
  
  noFill();
  stroke(clr);
  strokeWeight(2);
  
  if(draw_circles) circles();
  
  // Draw the spell
  if (angle >= 2*PI/speeds[0] && speeds[0] > 0){
    pathvariable = 2*PI/speeds[0];
  } else if (angle*speeds[0] <= -2*PI && speeds[0] < 0){
    pathvariable = -2*PI/speeds[0];
  } else {
    pathvariable = angle;
  }
  if(angle%(2*PI/speeds[0]) > -0.1 && angle%(2*PI/speeds[0]) < 0.1){
    wand.play();
  } 
  
  path(pathvariable);
  fill(255,0,0,180);
  noStroke();
  ellipse(spell.x+function_(radii.length,angle),spell.y-function_2(radii.length,angle),10);
  
  strokeWeight(5);
  stroke(clr);
  fill(255);
  rect(0,0,30,30);
  rect(40,0,30,30);
  
  if (animate === true){
    angle += 0.01;
    //pause button
    line(10,10,10,20);
    line(20,10,20,20);
  }
  else{
    fill(clr);
    triangle(10,10,10,20,20,15); // play button
  }
  strokeWeight(1);
  fill(clr);
  stroke(clr);
  textSize(27);
  textAlign(CENTER, CENTER);
  text("?",55,17);
  textFont('times', 16);
  text(pg_num, width*0.3, height*0.9);
  textFont('times', 20);
  incantation = spell_table.getString(pg_num/2 % spell_table.getRowCount(), 0);
  type = spell_table.getString(pg_num/2 % spell_table.getRowCount(), 1);
  effect = spell_table.getString(pg_num/2 % spell_table.getRowCount(), 2);
  text(incantation+" "+type, width*0.166666667-10, height*0.4, width*0.3, height*0.1);
  noStroke();
  rectMode(CENTER);
  textFont('times', 12);
  text("Difficulty Level: "+(pg_num/2%6+1), width*0.3, height*0.55, width*0.3, height*0.6);
  text("Effects: "+effect, width*0.3, height*0.65, width*0.3, height*0.7);
  
  // Exit scene -> retun to main scene
  push();
  translate(0.97*width, 0.04*height);
  fill("red");
  rect(0,0,30);
  strokeWeight(3);
  stroke(255);
  line(-10,-10, 10,10);
  line(-10,10,10,-10);
  if(dist(0.97*width, 0.04*height, mouseX,mouseY)<100 && mouseIsPressed) {
    spell_bck.stop();
    wand.stop();
    scene = 4;
  }
  pop();
  pop();
}

// Function to visualize how the final shape gets created as a concatenation of different circles
function circles(){
  strokeWeight(0.5);
  for (let i = 0; i <= radii.length-1; i++){
    stroke(clr,100);
    ellipse(spell.x+function_(i,angle),spell.y-function_2(i,angle),radii[i],radii[i]);
    line(spell.x+function_(i,angle),spell.y-function_2(i,angle),spell.x+function_(i+1,angle),spell.y-function_2(i+1,angle));
  }
}

// Below 2 helper functions are used to determine the shape of the spell based on angle as sin(r), cos(r) gives coordinates of point on circle
function function_(a,b){
  var c = 0;
  for (let i = 1; i <= a; i++){
    c += radii[i-1]*Math.cos(b*speeds[i-1])/2;
  }
  return c;
}

function function_2(a,b){
  var c = 0;
  for (let i = 1; i <= a; i++){
    c += radii[i-1]*Math.sin(b*speeds[i-1])/2;
  }
  return c;
}

function path(b){
  for (let i = 0; i <= b; i += 0.003){
    noStroke();
    fill(clr)
    ellipse(spell.x+function_(radii.length,i),spell.y-function_2(radii.length,i),2);
  }
}
