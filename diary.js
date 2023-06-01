let markov, data1, data2;
 // Arrays for text, the generated text gets loaded in here when clicked
line1 = ["The Chronicles of Bulsavia..."];  
line2 = [];
pg_num = 0;

function drawText() {
  push();
  // Background of diary on table;
  
  image(diary_bck, 0,0,width,height);
  if(!spell_bck.isPlaying()) spell_bck.play();
  
  translate(width/2,height/2);
  text(pg_num, width*0.3, height*0.4);
  textFont('times', 16);
  textAlign(LEFT);

  // Create a markov model
  markov = new RiMarkov(4);
  // load text into the model from the text files
  markov.loadText(data1.join(' '));
  markov.loadText(data2.join(' '));
  // Create a block of text, joined over a ' ' in the text into a concatenated string
  text(line1.join(' '), -width/3-10, -height/3, width*0.3, height*0.7);
  text(line2.join(' '), 0, -height/3, width*0.3, height*0.7);
  pop();
  
  // Generates a new group of text to display on every click
  if(mouseIsPressed) {
    line1 = markov.generateTokens(round(random(50, 250)));
    line2 = markov.generateTokens(round(random(50, 250)));
    pg_num = int(random(500))*2;
    if(!page_turn.isPlaying()) page_turn.play();
  }
  
  // Exit scene -> retun to main scene
  push();
  translate(0.97*width, 0.04*height);
  fill("red");
  rect(-15,-15,30);
  strokeWeight(3);
  stroke(255);
  line(-10,-10, 10,10);
  line(-10,10,10,-10);
  if(dist(0.97*width, 0.04*height, mouseX,mouseY)<100 && mouseIsPressed) {
    spell_bck.stop();
    scene = 4;
  }
  pop();
}
