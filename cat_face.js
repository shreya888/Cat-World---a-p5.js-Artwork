let video;
let poseNet;
outer_ear_pts = [
{x: -179, y: 90},
{x: -216, y: 5},
{x: -224, y: -37},
{x: -225, y: -79},
{x: -221, y: -84},
{x: -213, y: -87},
{x: -206, y: -87},
{x: -145, y: -71},
{x: -93, y: -47},
{x: -69, y: -30}];
inner_ear_pts = [
{x: -113, y: -23},
{x: -149, y: -53},
{x: -191, y: -76},
{x: -208, y: -78},
{x: -216, y: -76},
{x: -219, y: -64},
{x: -214, y: -13},
{x: -196, y: 37},
{x: -180, y: 56},
{x: -170, y: 60},
{x: -143, y: 25},
{x: -104, y: -15}];

let ear_count=2;
let d = 0;

let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;
let earlX = 0;
let earlY = 0;
let earrX = 0;
let earrY = 0;
// Corresponding detected keypoints
let nX = 0;
let nY = 0;
let elX = 0;
let elY = 0;
let erX = 0;
let erY = 0;
let rlX = 0;
let rlY = 0;
let rrX = 0;
let rrY = 0;

function cat_face_on_user() {
  if(!mirror_bck_music.isPlaying()) mirror_bck_music.play();
  imageMode(CENTER);
  image(bck, width/2, height/2, width, height);
  image(video, width/2, height/2);
  push();
  //Whiskers
  push();
  fill(0);
  ellipse(noseX, noseY, d/width*300);
  strokeWeight(d/width*100);
  stroke(0);
  
  translate(noseX, noseY);
  scale(1-video.width/100/d);
  line(-70,0, -115-d/6, -5-d/6);
  line(70,0, 115+d/6, -5-d/6);
  line(-70,20, -120-d/6, 20+d/3);
  line(+70,20, 120+d/6, 20+d/3);
  line(-70,40, -115-d/6, 60+d/2);
  line(70, 40, 115+d/6, 60+d/2);
  pop();
  push();
  translate(earlX-1.3*d,earlY-d*2);
  scale(1.2-video.width/50/d);
  draw_ears();
  pop();
  ear_count=2;
  push();
  translate(earrX+1.3*d,earrY-d*2);
  scale(1.2-video.width/50/d);
  draw_ears();
  pop();
  pop();
  
  // Mirror border
  image(border, width/2, height/2, video.width, video.height+20);
  
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
    mirror_bck_music.stop();
    scene = 0;
  } 
}

function draw_ears() {
  push();
  d = dist(earlX, earlY, earrX, earrY)/3;
  scale(d/width*9);
  beginShape();
  noFill();
  fill(0);
  for(i=0; i<outer_ear_pts.length; i++){
    noStroke();
    if(ear_count==1) vertex(-outer_ear_pts[i].x, outer_ear_pts[i].y);
    else vertex(outer_ear_pts[i].x, outer_ear_pts[i].y);
  }
  endShape();
  beginShape();
  noFill();
  fill("pink");
  for(i=0; i<inner_ear_pts.length; i++){
    noStroke();
    if(ear_count==1) vertex(-inner_ear_pts[i].x, inner_ear_pts[i].y);
    else vertex(inner_ear_pts[i].x, inner_ear_pts[i].y);
  }
  endShape();
  ear_count--;
  pop(); 
}
