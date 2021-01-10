// Add some header info
// For TM template code

// Video
let video;
let classifier;
let label = "waiting...";

const urlWeather = "https://www.meteosuisse.admin.ch/home.html?tab=overview",
  urlInfo = "https://news.google.com/topstories?hl=fr&gl=FR&ceid=FR:fr",
  strWindowFeatures = "location,resizable,scrollbars,status"

let windowWeather,
    windowInfo


// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PNOLqVVXZ/' + 'model.json')
}


function setup() {
  createCanvas(650, 460);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify!
function classifyVideo() {

  classifier.classify(video, gotResults);

}

function draw() {
  background(0);


  push();
  translate(width, 0);
  scale(-1, 1);
  // Draw the video
  image(video, 0, 0);
  pop();

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

}


// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  classifyVideo();

  label = results[0].label

  /*
  actualités
  météo
  fermé
  */

  if (label === "actualités" && windowInfo === undefined) {

    windowInfo = window.open(urlInfo, "_blank", strWindowFeatures)

  } else if (label === "météo" && windowWeather === undefined) {

    windowWeather = window.open(urlWeather, "_blank", strWindowFeatures)

  } else if (label === "fermé") {

    if (windowWeather !== undefined) windowWeather.close()
    if (windowInfo !== undefined) windowInfo.close()

    windowWeather = undefined
    windowInfo = undefined
  }

}

function keyPressed() {
  document.querySelector("#firstframe").style.display = "block";
  if (key == "s") {
    document.querySelector("#firstframe").src = urlWeather
    
  }
  else if (key == "g") {
    document.querySelector("#firstframe").src = urlInfo
  }
}
