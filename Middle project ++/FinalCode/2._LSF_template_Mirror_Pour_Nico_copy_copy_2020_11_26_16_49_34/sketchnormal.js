// Add some header info
// For TM template code

// Video
let video;
let poseNet;
let pose;
let skeleton;
let brain;
let poseLabel = "R";

const urlWeather = "https://www.meteosuisse.admin.ch/home.html?tab=overview",
  urlInfo = "https://news.google.com/topstories?hl=fr&gl=FR&ceid=FR:fr",
  strWindowFeatures = "location,resizable,scrollbars,status"

let iframeWeather;
let iframeInfo;



function setup() {
  cnv = createCanvas(320, 240);
  cnv.position(windowWidth - 320, windowHeight - 240);
  // Create the video
  video = createCapture(VIDEO);
  video.size(cnv.width, cnv.height)
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs : 34,
    outputs : 5,
    task : 'classification',
    debug : true
}
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'models/model.json',
    metadata: 'models/model_meta.json',
    weights: 'models/model.weights.bin'
  };
  brain.load(modelInfo,brainLoaded);

}

function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}


function gotResult(error, results) {
  
  if (results[0].confidence > 0.5) {
    poseLabel = results[0].label.toUpperCase();
  }
  //console.log(results[0].confidence);
  classifyPose();
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}






function draw() {
 
    push();
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0, video.width, video.height);
  
    if (pose) {
      for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(2);
        stroke(0);
  
        line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(0);
        stroke(255);
        ellipse(x, y, 16, 16);
      }
    }
    pop();
  
    fill(255, 0, 255);
    noStroke();
    textSize(200);
    textAlign(CENTER, CENTER);
    text(poseLabel, width / 2, height / 2);

    labelDetected();

  }


    function labelDetected() {
      document.querySelector("#firstframe").style.display = "block";
    
      if( poseLabel === "R" && iframeWeather === undefined) {
        iframeWeather = document.querySelector("#firstframe").src = urlWeather
        
    }
      else if( poseLabel === "M" && iframeInfo === undefined) {
        //document.querySelector("#firstframe").src = urlWeather

    }
      else if( poseLabel === "Fermé") {

    if (iframeWeather !== undefined) {
      iframeWeather.display = "none";
    }
    iframeWeather = undefined
  }
}




  /*
  actualités
  météo
  fermé
  */

//   if (label === "actualités" && windowInfo === undefined) {

//     windowInfo = window.open(urlInfo, "_blank", strWindowFeatures)

//   } else if (label === "météo" && windowWeather === undefined) {

//     windowWeather = window.open(urlWeather, "_blank", strWindowFeatures)

//   } else if (label === "fermé") {

//     if (windowWeather !== undefined) windowWeather.close()
//     if (windowInfo !== undefined) windowInfo.close()

//     windowWeather = undefined
//     windowInfo = undefined
//   }

// }

// function keyPressed() {
//   document.querySelector("#firstframe").style.display = "block";
//   if (key == "s") {
//     document.querySelector("#firstframe").src = urlWeather
    
//   }
//   else if (key == "g") {
//     document.querySelector("#firstframe").src = urlInfo
//   }
