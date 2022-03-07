//objet droite
class droite { // droite d'équation y = mx+p
  constructor(m_, p_) {
    this.m = m_;
    this.p = p_;

    this.verti = false;
    this.value = 0;
  }

  get(x) {
    if (this.verti) {  //si verticale
      return this.value;
    }
    return this.m*x+this.p;
  }
}
//vecteur a 2 dimension
class vector2D {

  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
  }

  getLen() {
    return sqrt(this.x * this.x + this.y * this.y);
  }
  get_dir() {
    if (this.x == 0) {
      return 999;
    }
    return this.y / this.x;
  }
}

//crée un vecteur a partir de deux point
function CreateVector2D(x1, y1, x2, y2) {
  return new vector2D(x2 - x1, y2 - y1);
}

function getCosAngle(a, b) {
  return (a.x * b.x + a.y * b.y)/(a.getLen() * b.getLen());
}

//crée une droite a partir de deux point
function CreateDroite(x1, y1, x2, y2) {
  let m=(y2-y1)/(x2-x1);
  let p = -m * x1 + y1;

  if (x2 - x1==0) {  //si verticale
    let d = new droite(m, p);
    d.verti = true;
    d.value = x1;
    return d;
  }

  return new droite(m, p);
}

//test si la souris est dans un triangle
function Collision_triangle(x1, y1, x2, y2, x3, y3) {
  let len = sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));  //longueur d'un coté
  let P = 3 * len;
  let A = round(sqrt(P/2*(P/2-len)*(P/2-len)*(P/2-len)));//A  = l'aire du triangle

  let l1 = len;
  let l2 = sqrt((x1-mouseX)*(x1-mouseX)+(y1-mouseY)*(y1-mouseY));  //distance entre l'origine et la souris

  //premier sous triangle
  let l3 = sqrt((x2-mouseX)*(x2-mouseX)+(y2-mouseY)*(y2-mouseY));  //distance entre le deuxieme point et la souris
  let p = (l1+l2+l3)/2;
  let A1 = round(sqrt(p*(p-l1)*(p-l2)*(p-l3)));

  //deuxieme sous triangle
  l3 = sqrt((x3-mouseX)*(x3-mouseX)+(y3-mouseY)*(y3-mouseY));  //distance entre le deuxieme point et la souris
  p = (l1+l2+l3)/2;
  let A2 = round(sqrt(p*(p-l1)*(p-l2)*(p-l3)));

  //troisieme sous triangle
  l2 = sqrt((x2-mouseX)*(x2-mouseX)+(y2-mouseY)*(y2-mouseY));  //distance entre le deuxieme point et la souris 
  l3 = sqrt((x3-mouseX)*(x3-mouseX)+(y3-mouseY)*(y3-mouseY));  //distance entre le deuxieme point et la souris
  p = (l1+l2+l3)/2;
  let A3 = round(sqrt(p*(p-l1)*(p-l2)*(p-l3)));

  if ((A1+A2+A3>A-5)&&(A1+A2+A3<A+5)) {
    return true;
  }

  return false;
}

//test si la distance entre 2 points est inférieur ou égale à la longueur d'une triangle inscrit dans un hexagone
function test_dist( sx, sy, cx, cy) {
  let dist = round(sqrt((sx-cx)*(sx-cx)+(sy-cy)*(sy-cy)));

  let l = sqrt(max_len*max_len/(162*(1-cos(2*PI/3))));  
  let lo = round(sqrt(2*l*l-2*l*l*cos(2*PI/3)));  //coté d'un triangle inscrit a un hexagone

  return (dist<=lo);
}
