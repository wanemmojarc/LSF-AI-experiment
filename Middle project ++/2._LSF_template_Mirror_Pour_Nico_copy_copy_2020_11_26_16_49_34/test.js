var sketch = function(p) {

  p.video;
  p.classifier;
  p.label = "waiting...";
  
  p.urlWeather = "https://www.meteosuisse.admin.ch/home.html?tab=overview",
  p.urlInfo = "https://news.google.com/topstories?hl=fr&gl=FR&ceid=FR:fr",
  p.strWindowFeatures = "location,resizable,scrollbars,status"
  
  p.windowWeather,
  p.windowInfo
  

  p.preload = function () {
    p.classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PNOLqVVXZ/' + 'model.json')
  }

  p.setup = function()  {
     // Set the p5Instance so that ml5 knows which instance to use
    ml5.p5Utils.setP5Instance(p);

    p.createCanvas(320, 240);
    // Create the video
    video = p.createCapture(p.VIDEO);
    video.size(p.width, p.height);
    video.hide();
  
    // STEP 2: Start classifying
    p.classifyVideo();
  };

  p.classifyVideo = function() {
    p.classifier.classify(video, p.gotResults);
  }

  p.draw = function() {
    p.background(0);


    p.push();
    p.translate(p.width, 0);
    p.scale(-1, 1);
    // Draw the video
    p.image(video, 0, 0);
    p.pop();

    // STEP 4: Draw the label
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(255);
    p.text(p.label, p.width / 2, p.height - 16);
    };
 
  p.gotResults = function(error, results) {
      // Something went wrong!
    if (error) {
      console.error(error);
      p.return;
    }

    p.label = results[0].label;
    p.classifyVideo();

    p.label = results[0].label;

    /*
    actualités
    météo
    fermé
    */

    if (p.label === "actualités" && p.windowInfo === undefined) {

      p.windowInfo = p.window.open(p.urlInfo, "_blank", strWindowFeatures)

    } else if (p.label === "météo" && p.windowWeather === undefined) {

      p.windowWeather = p.window.open(p.urlWeather, "_blank", strWindowFeatures)

    } else if (p.label === "fermé") {

      if (p.windowWeather !== undefined) p.windowWeather.close()
      if (p.windowInfo !== undefined) p.windowInfo.close()

      p.windowWeather = undefined
      p.windowInfo = undefined
    }

  }

  p.keyPressed = () => {
    document.querySelector("#firstframe").style.display = "block";
    if (p.key == "s") {
      document.querySelector("#firstframe").src = p.urlWeather
      
    }
    else if (p.key == "g") {
      document.querySelector("#firstframe").src = p.urlInfo
    }
  }
}

var myp5 = new p5(sketch);