let song, analyser;
let playButton, pauseButton;

function preload() {
  song = loadSound('assets/individual work music.mp3');
}

// Base Configuration Class
//configuration class that defines the basic parameters shared by all patterns
class PatternConfig {
  static shared = {
    numCircles: 50,      
    smallCircleSize: 5,   
    numBorderCircles: 25, 
    borderCircleSizes: {
      outer: 30,         
      middle: 20,         
      inner: 10          
    },
    mainCircleSize: 280,  
    borderSize: 350      
  };
}

// Base Circular Pattern Class
class CircularPattern {
  constructor(x, y, scale = 1) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.config = PatternConfig.shared;
  }
  drawBorderDecoration() {
    stroke(0);
    strokeWeight(5 * this.scale);
    noFill();
    circle(this.x, this.y, this.config.borderSize * this.scale);
    const radius = 175 * this.scale;
    const sizes = this.config.borderCircleSizes;
    
    this.drawCircleRing(radius, this.config.numBorderCircles, sizes.outer, color(252, 101, 13));
    this.drawCircleRing(radius, this.config.numBorderCircles, sizes.middle, color(0));
    this.drawCircleRing(radius, this.config.numBorderCircles, sizes.inner, color(255));
  }
  drawCircleRing(radius, count, size, fillColor) {
    fill(fillColor);
    noStroke();
    for (let i = 0; i < count; i++) {
      const angle = TWO_PI / count * i;
      const x = this.x + radius * cos(angle);
      const y = this.y + radius * sin(angle);
      circle(x, y, size * this.scale);
    }
  }
  drawRadialLines(innerRadius, outerRadius, count, strokeColor, weight = 2) {
    noFill();
    stroke(strokeColor);
    strokeWeight(weight * this.scale);
    
    for (let i = 0; i < count; i++) {
      const angle = TWO_PI / count * i;
      const x1 = this.x + innerRadius * cos(angle);
      const y1 = this.y + innerRadius * sin(angle);
      const x2 = this.x + outerRadius * cos(angle);
      const y2 = this.y + outerRadius * sin(angle);
      line(x1, y1, x2, y2);
    }
  }
  drawConcentricCircle(diameter, fillColor, strokeColor = null, strokeWeight = 0) {
    fill(fillColor);
    if (strokeColor) {
      stroke(strokeColor);
      this.setStrokeWeight(strokeWeight);
    } else {
      noStroke();
    }
    circle(this.x, this.y, diameter * this.scale);
  }
  setStrokeWeight(weight) {
    strokeWeight(weight * this.scale);
  }
  drawConcentricRings(radii, circleSize, color) {
    fill(color);
    noStroke();
    radii.forEach(radius => {
      this.drawCircleRing(radius * this.scale, this.config.numCircles, circleSize * this.scale, color);
    });
  }
}

class PurplePattern extends CircularPattern {
  draw() {
    this.drawConcentricCircle(280, color(232,179,174));
    this.drawConcentricCircle(140, color(166,199,198), color(247, 20, 73), 4);
    this.drawConcentricCircle(70, color(222,118,146), color(200, 200, 50));
    this.drawRadialLines(35 * this.scale, 70 * this.scale, 25, color(250, 144, 82));
    
    const innerCircles = [
      { size: 40, fill: [113,164,192], stroke: [72, 135, 100] },
      { size: 30, fill: [207,178,168], stroke: [240, 84, 84] },
      { size: 25, fill: [218,71,137], stroke: [54, 49, 49] },
      { size: 22, fill: [221,178,174], stroke: [240, 84, 84] },
      { size: 15, fill: [243,233,171], stroke: [112, 194, 58] },
      { size: 5, fill: [255], stroke: [255] }
    ];
    innerCircles.forEach(({ size, fill, stroke }) => {
      this.drawConcentricCircle(size, color(...fill), color(...stroke));
    });
    
    this.drawBorderDecoration();
    this.drawConcentricRings([130, 120, 110, 100, 90, 80], 5, color(255, 0, 0));
  }
}
// Second pattern
class OrangePattern extends CircularPattern {
  draw() {
    // Main circle-purple
    this.drawConcentricCircle(280, color(191,148,173));
    
    // Green circle
    this.drawConcentricCircle(150, color(164,180,176));
    
    // Radial lines
    this.drawRadialLines(75 * this.scale, 140 * this.scale, 50, color(255, 0, 0), 3);
    
    // Internal dot group
    this.drawDotMatrix();
    
    // Inner circle
    const innerCircles = [
      { size: 80, fill: [217,221,92] },
      { size: 68, fill: [243,176,35] },
      { size: 40, fill: [176,173,182] },
      { size: 18, fill: [190,164,185] }
    ];
    innerCircles.forEach(({ size, fill }) => {
      this.drawConcentricCircle(size, color(...fill));
    });
    
    // Border decoration
    this.drawBorderDecoration();
  }
  drawDotMatrix() {
    fill(255, 0, 0);
    noStroke();
    const numCirclesRadial = 6;
    const numCirclesPerLayer = 24;
    const dotRadius = 4 * this.scale;
    const maxRadius = 70 * this.scale;
    //The outer loop controls the number of dots
    //a total of 6 layers from inside to outside
    for (let r = 1; r <= numCirclesRadial; r++) {
      const distance = (r / numCirclesRadial) * maxRadius;
      for (let i = 0; i < numCirclesPerLayer; i++) {
        const angle = TWO_PI / numCirclesPerLayer * i;
        const x = this.x + cos(angle) * distance;
        const y = this.y + sin(angle) * distance;
        circle(x, y, dotRadius * 2);
      }
    }
  }
}
// third pattern
class OrangeCirclePattern extends CircularPattern {
  draw() {
    // main circle
    this.drawConcentricCircle(280, color(113,187,204));
    this.drawConcentricCircle(150, color(122,175,205), color(238,232,58), 6);
    this.drawConcentricCircle(70, color(163,181,119), color(190,238,58), 6);
    this.drawConcentricRings([135, 125, 115, 105, 95, 85], 5, color(254,233,126));
    this.drawConcentricRings([57,154,207], 5, color(255));
    this.drawConcentricCircle(40, color(243,236,150));
    this.drawConcentricCircle(20, color(182,186,233));
    this.drawConcentricCircle(8, color(200,173,234));
    // border deco
    this.drawBorderDecoration();
  }
}
// forth pattern
class GreenPattern extends CircularPattern {
  draw() {
    this.drawConcentricCircle(280, color(207,170,99));
    this.drawRadialLines(75 * this.scale, 140 * this.scale, 50, color(255, 0, 0), 1.7);
    this.drawConcentricCircle(150, color(157,186,154));
    this.drawDotMatrix(color(180,180,238));
    const innerCircles = [
      { size: 80, fill: [128,193,183] },
      { size: 68, fill: [209,234,243] },
      { size: 40, fill: [228,145,142] },
      { size: 18, fill: [208,159,165] },
    ];
    innerCircles.forEach(({ size, fill }) => {
      this.drawConcentricCircle(size, color(...fill));
    });
    
    // border decoration
    this.drawBorderDecoration();
  }
  drawDotMatrix(dotColor) {
    fill(dotColor);
    noStroke();
    const numCirclesRadial = 6;
    const numCirclesPerLayer = 24;
    const dotRadius = 4 * this.scale;
    const maxRadius = 70 * this.scale;
    for (let r = 1; r <= numCirclesRadial; r++) {
      const distance = (r / numCirclesRadial) * maxRadius;
      for (let i = 0; i < numCirclesPerLayer; i++) {
        const angle = TWO_PI / numCirclesPerLayer * i;
        const x = this.x + cos(angle) * distance;
        const y = this.y + sin(angle) * distance;
        circle(x, y, dotRadius * 2);
      }
    }
  }
}
// The fifth pattern: white theme
class WhitePattern extends CircularPattern {
  draw() {
    let radius = 140;
    // main circle
    this.drawConcentricCircle(radius * 2, color(241,146,84));
    
    // Descending circle series
    const circles = [
      { size: 140, fill: [249,239,143] },
      { size: 130, fill: [255,198,147] },
      { size: 120, fill: [247,235,136] },
      { size: 110, fill: [153,179,193] },
      { size: 100, fill: [213,207,201] },
      { size: 90, fill: [220,199,200] },
      { size: 80, fill: [240,229,150] },
      { size: 70, fill: [250,196,106] },
      { size: 60, fill: [223,199,61] },
      { size: 50, fill: [248,175,140] },
      { size: 40, fill: [227,196,198] },
      { size: 30, fill: [253,225,128] },
      { size: 20, fill: [217,171,103] }
    ];
    // Iterate over each circle object in the circles array
    circles.forEach(({ size, fill }) => {
      // Extract 'size' and 'fill' properties from the circle object 
      // 'size' represents the size of the concentric circle 
      // 'fill' is an array representing color values, e.g., [r, g, b] 
      // Call the 'drawConcentricCircle' method to draw the circle 
      // Convert the 'fill' array to color values using the 'color' function
      this.drawConcentricCircle(size, color(...fill));
    });
    
    // Border decoration
    this.drawBorderDecoration();
    
    // Green ring
    this.drawConcentricRings([130, 120, 110, 100, 90, 80], 7, color(30, 142, 41));
  }
}
// Sixth pattern: yellow-orange theme
// Define a new class named YellowOrangePattern that extends the CircularPattern class
class YellowOrangePattern extends CircularPattern {
  // Override the draw method to define the specific pattern to be drawn
  draw() {
    // Main circle
    this.drawConcentricCircle(280, color(132,123,167));
    
    // Pink Circle Series
    this.drawConcentricCircle(140, color(180,153,192));
    this.drawConcentricCircle(130, color(174,192,193));
    
    // Descending circle series
    const recursiveCircles = [
    // Define an array of circle objects, each with a size
    // and fill color for recursive drawing of concentric circles
      { size: 120, fill: [209,204,129] },
      { size: 110, fill: [188,199,183] },
      { size: 100, fill: [185,174,151] },
      { size: 90, fill: [161,166,162] },
      { size: 80, fill: [157,151,186] },
      { size: 70, fill: [220,214,128] },
      { size: 60, fill: [168,166,194] },
      { size: 50, fill: [173,219,255] },
      { size: 40, fill: [242,235,189] },
      { size: 30, fill: [184,167,162] },
      { size: 20, fill: [190,164,194] },
      { size: 10, fill: [209,202,122] },
    ];
    // Iterate over each circle object in the recursiveCircles array
    recursiveCircles.forEach(({ size, fill }) => {
    // Call the 'drawConcentricCircle' method to draw each concentric circle 
    // Convert the 'fill' array to a color value and pass it along with 'size'
      this.drawConcentricCircle(size, color(...fill));
    });
    
    this.drawBorderDecoration();
    
    // Purple circle
    this.drawConcentricRings([130, 120, 110, 100, 90, 80], 5, color(152, 109, 185));
  }
}


class PatternManager {
  constructor() {
    this.patterns = [];
    this.patternClasses = [
      PurplePattern,
      OrangePattern,
      OrangeCirclePattern,
      GreenPattern,
      WhitePattern,
      YellowOrangePattern,
      
    ];
    
    this.minPatterns = 20;
    this.maxAttempts = 100;
  }
  //Check if the patterns overlap
  checkOverlap(x, y, size) {
    for (let pattern of this.patterns) {
      const dx = x - pattern.x;
      const dy = y - pattern.y;
      const distance = sqrt(dx * dx + dy * dy);
      const minDistance = (size + pattern.size) / 2;
      
      if (distance < minDistance) {
        return true;
      }
    }
    return false;
  }

  getRandomPosition() {
    const minSize = min(windowWidth, windowHeight) * 0.15;
    const maxSize = min(windowWidth, windowHeight) * 0.25;
    const size = random(minSize, maxSize);
    
    const margin = size / 2;
    const x = random(margin, windowWidth - margin);
    const y = random(margin, windowHeight - margin);
    
    return { x, y, size };
  }

  createPatterns() {
    this.patterns = [];
    const maxPatterns = 30;
    let attemptsCount = 0;
    const maxTotalAttempts = 1000;
    
    while (this.patterns.length < maxPatterns && attemptsCount < maxTotalAttempts) {
      const { x, y, size } = this.getRandomPosition();
      
      if (!this.checkOverlap(x, y, size)) {
        const PatternClass = random(this.patternClasses);
        const scale = size / 350;
        const pattern = new PatternClass(x, y, scale);
        pattern.size = size;
        
        this.patterns.push(pattern);
      }
      
      attemptsCount++;
    }
    
    console.log(`Created ${this.patterns.length} patterns after ${attemptsCount} attempts`);
  }

  draw() {
    this.patterns.sort((a, b) => b.size - a.size);
    this.patterns.forEach(pattern => pattern.draw());
  }

  getPatternCount() {
    return this.patterns.length;
  }
}

function createMusicControls() {
  //Creating a Play Button
  playButton = createButton('Play');
  playButton.position(20, 20);
  playButton.mousePressed(() => {
    if (song && !song.isPlaying()) {
      song.play();
    }
  });
  playButton.class('control-button');
  
  //Creating a Pause Button
  pauseButton = createButton('Pause');
  pauseButton.position(80, 20);
  pauseButton.mousePressed(() => {
    if (song && song.isPlaying()) {
      song.pause();
    }
  });
  pauseButton.class('control-button');
  
  // Add button styles
  //. represents a class selector
  //which is used to select elements with the specified class
  //.control-button will match elements with class="control-button"
  let styles = `
    .control-button {
      padding: 8px 16px;
      margin: 5px;
      background-color: rgba(255, 255, 255, 0.8);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
  
  `;
  
  let styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

let patternManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  patternManager = new PatternManager();
  patternManager.createPatterns();
  
  //Add music control buttons
  createMusicControls();
  
  //Initialize the audio analyzer
  analyser = new p5.FFT();
  if (song) {
    analyser.setInput(song);
  }
}

function draw() {
  background(232,198,198,255);
  
  patternManager.draw(); //Draw all patterns
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  patternManager.createPatterns();
  
  //Reposition buttons
  playButton.position(20, 20);
  pauseButton.position(80, 20);
}

