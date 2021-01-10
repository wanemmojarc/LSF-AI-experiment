var sketch2 = function(m) {

  m.r;
  m.rotation = 0;
  
  m.angle1 = [];
  m.angle2 = [];
  
  m.spec;
  m.specX = [];
  m.specY = [];
  m.specXDisplay = [];
  m.specYDisplay = [];
  
  m.preload = function () {
    m.spec = m.loadImage('logo2.png');
  };
  
  m.setup = function () {
    m.createCanvas(400, 400);
    m.r= m.width/2 -50;
    
    for(let i = 0; i < 256; i++) {
      m.angle1.push(m.random(m.TWO_PI));
      m.angle2.push(m.random(m.TWO_PI));
    }
    
    m.spec.resize(m.width, m.height);
    
    m.spec.loadPixels();
    for(let i = 0; i < m.spec.pixels.length; i+=4) {
      if(m.spec.pixels[i] > 254) {
        m.specX.push((i/4) % m.spec.width);
        m.specY.push((i/4) / m.spec.width);
      }
    }
    for(let i = 0; i < 750; i++) {
      index = m.floor(m.random(m.specX.length));
      m.specXDisplay.push(m.specX[index]);
      m.specYDisplay.push(m.specY[index]);
    }
  };
  
  m.draw = function() {		
    m.background(0);
    
    m.push();
    m.translate(m.width/2, m.height/2);
    m.rotate(m.rotation);
  
       //Desenhar linhas e texto
      m.strokeWeight(m.r/100);
      for(let i = 0; i < m.angle1.length; i++) {
        stroke(255-i*(0.05*i));
        line(cos(m.angle1[i])*m.r, sin(m.angle1[i])*m.r, cos(m.angle2[i])*m.r, sin(m.angle2[i])*m.r);
      }
      m.pop();
    
    //image(spec, 0, 0); 
    m.strokeWeight(m.r/25);
    for(let i = 0; i < m.specXDisplay.length; i++) {
      m.specColor = map(i, 0, m.specXDisplay.length, 1, 0);
      m.stroke((1-(m.specColor*m.specColor))*255, (1-(m.specColor*m.specColor))*255, (1-(m.specColor*m.specColor))*255, 255);
       // stroke(random(0,255), random(0,100), random(0,255), 255);
       m.point(m.specXDisplay[i], m.specYDisplay[i]);
    }
    
    //Atualizar
    m.angle1.push(random(TWO_PI)); m.angle1.shift();
    m.angle2.push(random(TWO_PI)); m.angle2.shift();
    
    for(let i = 0; i < 6; i++) {
      m.index = floor(random(m.specX.length));
      m.specXDisplay.push(m.specX[m.index]); m.specXDisplay.shift();
      m.specYDisplay.push(m.specY[m.index]); m.specYDisplay.shift();
    }
    
    m.rotation += (TWO_PI/360)/15;
  };


};



var myp5_2 = new p5(sketch2);

//Pour le logo, voir exporter sous svg sur photoshop, 
//et le mettre comme svg dans la page, et juste apporter de petites modifs avec js ?

console.log(sketch2);