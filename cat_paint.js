var paw_print = [];

function paint() {
  if(!paint_bck_music.isPlaying())paint_bck_music.play();
  background(126,97,87);
  
  // Painting notebook
  fill(254,254,242);
  stroke(0);
  strokeWeight(10);
  rect(width*0.15,height*0.067,width*0.7, height*0.8);
  strokeWeight(5);
  quad(0.15*width,0.87*height,
       0.25*width,0.95*height,
       0.75*width,0.95*height,
       0.85*width,0.87*height);
  strokeWeight(20);
  start_x = 0.2*width;
  start_y = 0.06*height;
  end_x = 0.8*width;
  wid = end_x-start_x;
  dis = wid/12;  
  for(let i=0; i<13; i++){
    line(start_x+i*dis,start_y-13, start_x+i*dis,start_y+13)
  }  
  stroke(0);
  strokeWeight(3);
  line(0.24*width,0.889*height,
       0.76*width,0.889*height);
  line(0.29*width,0.905*height,
       0.71*width,0.905*height);
  line(0.35*width,0.92*height,
       0.65*width,0.92*height);
  line(0.4*width,0.935*height,
       0.6*width,0.935*height);
  
  // Paw marks
  noStroke();
  var index = 0;
  while(index < paw_print.length) {
    fill(paw_print[index].clr)
    push();
    translate(paw_print[index].x, paw_print[index].y);
    rotate(paw_print[index].rot/360*TWO_PI);
    scale(paw_print[index].d)
    ellipse(0,0, 24);
    ellipse(18, -13, 12);
    ellipse(6.5, -20, 12);
    ellipse(-6.5, -20, 12);
    ellipse(- 18, -13, 12);
    pop();
    index += 1;
  }
    
  // New page
  fill(208,208,203);
  stroke(0);
  strokeWeight(1);
  if(dist(mouseX,mouseY, 0.816*width,0.8*height)<0.05*width){
    triangle(0.85*width, 0.57*height, 
             0.65*width, 0.6*height,
             0.74*width,0.87*height);
    fill(254,254,242);
    noStroke();
    triangle(0.8455*width, 0.582*height, 
             0.8455*width, 0.858*height,
             0.748*width,0.858*height);
    if(mouseIsPressed){
      if(!page_turn.isPlaying()) page_turn.play();
      fill(208,208,203);
      rect(width*0.15,height*0.067,
           width*0.7, height*0.8);
      
      paw_print = [];
    }
  }
  else{
    fill(208,208,203);
    triangle(0.8455*width, 0.7*height, 
             0.8455*width, 0.858*height, 
             0.75*width, 0.858*height);
  }
  
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
    paint_bck_music.stop();
    scene = 0;
  }
  pop();
}

