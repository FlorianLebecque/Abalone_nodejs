class hexaBtn extends hexagone {

  contructor(x_, y_, l_) {
    this.x = _x;  //position x
    this.y = _y;  //position y
    //position du centre
    this.len = _l;//longeur de l'hexagone régulier
    
    this.is_hover = false;
    this.clicked  = false;
    this.team     = 0;

    this.backColor    = color(255, 255, 255, 255);
    this.borderColor  = color(100, 100, 100, 255);
    this.hoverColor   = color(200, 200, 200, 255);
    this.textColor    = color(0, 0, 0, 255);

    this.borderSize = 1;
    this.textHeight =12;

    this.text = "";
  }

  show() {
    //dessine l'hexagone
    if (this.is_hover) {
      fill(200, 200, 200, 255);
    } else {
      fill(255, 255, 255, 255);
    }
    stroke(100, 100, 100, 255);

    let lx = this.x;
    let ly = this.y;
    beginShape();   
    for (let i=0; i < 6; i++) {
      let nx = this.len * cos(theta*i);
      let ny = this.len * sin(theta*i);

      lx = lx + nx;
      ly = ly + ny;

      vertex(lx, ly);
    }
    endShape(CLOSE);
    //text
    fill(0,0,0,255);
    textAlign(CENTER);
    textSize(this.textHeight);
    text(this.text, this.x+this.len/2, this.y+this.len*sin(theta)+(this.textHeight/4));
  }
}
