// "R", "Y", "M"
let state = "R";


var sketch = function(p) {

  p.video;
  p.poseNet;
  p.pose;
  p.skeleton;
  p.brain;
  p.poseLabel = "R";



  //p.label = "waiting...";

  p.urlWeather = "https://www.meteosuisse.admin.ch/home.html?tab=overview",
  p.urlInfo = "https://news.google.com/topstories?hl=fr&gl=FR&ceid=FR:fr",
  p.strWindowFeatures = "location,resizable,scrollbars,status"

  p.windowWeather,
  p.windowInfo


  p.setup = function()  {
     // Set the p5Instance so that ml5 knows which instance to use
    //ml5.p5Utils.setP5Instance(p);

    p.cnv = p.createCanvas(320, 240); // 320 , 240
    p.cnv.position(p.windowWidth - 320, p.windowHeight - 240);
    // Create the video
    video = p.createCapture(p.VIDEO);
    video.size(p.width, p.height);
    video.hide();
    p.poseNet = ml5.poseNet(video, p.modelLoaded);
    p.poseNet.on('pose', p.gotPoses);

    p.options = {
        inputs : 34,
        outputs : 5,
        task : 'classification',
        debug : true
    }

    p.brain = ml5.neuralNetwork(p.options);
    p.modelInfo = {
        model: 'models/model.json',
        metadata: 'models/model_meta.json',
        weights: 'models/model.weights.bin'
    };

    p.brain.load(p.modelInfo, p.brainLoaded);

  };

    p.brainLoaded = function() {
    console.log('pose classification ready!');
    p.classifyPose();
  };

p.classifyPose = function() {
  console.log(p.pose);
    if (p.pose) {
     p.inputs = [];
      for (let i = 0; i < p.pose.keypoints.length; i++) {
        p.x = p.pose.keypoints[i].position.x;
        p.y = p.pose.keypoints[i].position.y;
        p.inputs.push(p.x);
        p.inputs.push(p.y);
        }
      p.brain.classify(p.inputs, gotResults);
    } else {
        setTimeout(p.classifyPose, 1500);
    }
  };

  gotResults = function(error, results) {
    if (error) {
      console.log(error);
    return }
      try{

    
    if (results[0].confidence > 0.75) {
        p.poseLabel = results[0].label.toUpperCase();
      }
      console.log(results[0].confidence);
      //p.classifyPose();
    } catch(e) {
      console.log("appelle Gordan")
    }
    //p.classifyPose();
  };


  p.gotPoses = function(poses) {
    if (poses.length > 0) {
        p.pose = poses[0].pose;
        p.skeleton = poses[0].skeleton;
    }
  };


  p.modelLoaded = function() {
    console.log('poseNet ready');
  };








  p.draw = function() {

    p.background(0);
    p.push();
    p.translate(p.width, 0);
    p.scale(-1, 1);
    // Draw the video
    p.image(video, 0, 0);

    if (p.pose) {
        for (let i = 0; i < p.skeleton.length; i++) {
            p.a = p.skeleton[i][0];
            p.b = p.skeleton[i][1];
            p.strokeWeight(2);
            p.stroke(0);

            p.line(p.a.position.x, p.a.position.y, p.b.position.x, p.b.position.y);
        }
        for (let i = 0; i < p.pose.keypoints.length; i++) {
            p.x = p.pose.keypoints[i].position.x;
            p.y = p.pose.keypoints[i].position.y;
            p.fill(0);
            p.stroke(255);
            p.ellipse(p.x, p.y, 16, 16);
        }
      }
      p.pop();

    // STEP 4: Draw the label
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(255);
    p.text(p.poseLabel, p.width / 2, p.height - 16);

    if( state === "R" ) {
        document.querySelector("#firstframe").style.display = "block";
    }
    else if( state === "M") {
        document.querySelector("#firstframe").src = p.urlWeather
    }

    // p.label = results[0].label;

};
}

    /*
    actualités
    météo
    fermé
    */

    // if (p.label === "actualités" && p.windowInfo === undefined) {

    //   p.windowInfo = p.window.open(p.urlInfo, "_blank", strWindowFeatures)

    // } else if (p.label === "météo" && p.windowWeather === undefined) {

    //   p.windowWeather = p.window.open(p.urlWeather, "_blank", strWindowFeatures)

    // } else if (p.label === "fermé") {

    //   if (p.windowWeather !== undefined) p.windowWeather.close()
    //   if (p.windowInfo !== undefined) p.windowInfo.close()

    //   p.windowWeather = undefined
    //   p.windowInfo = undefined
    // }



//   p.keyPressed = () => {
//     document.querySelector("#firstframe").style.display = "block";
//     if (p.key == "s") {
//       document.querySelector("#firstframe").src = p.urlWeather

//     }
//     else if (p.key == "g") {
//       document.querySelector("#firstframe").src = p.urlInfo
//     }
//   }


var myp5 = new p5(sketch);
console.log(sketch);
