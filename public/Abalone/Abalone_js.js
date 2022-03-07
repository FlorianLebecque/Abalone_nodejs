let container = document.querySelector('#gamearea')

var PI = Math.PI;

let hex     = [];  //tableau d'hexagone
let sel_hex = [];

//taille du tableau
let max_tab_i = 9;
let max_tab_j = 9;

//taille la plus grande entre la hauteur et la largeur de l'écran
let max_len;

//tableau des score, un pour le joueur 1 et l'autre pour le joueur 2
let score = [0,0];

//constante
let  theta = PI/3;  //60°

//Tour du joueur,
let cur_teamPlay = 1;

//hexagone (sur la gauche) permet de visualiser le tour du joueur
let team_H;

//Button hexagonal pour recommencer une parti
let BtNouveau;
let BtStart;
let BtMenu;
let BtAbout; 

//etat dans lequel se trouve le jeux  
//let state = 1;   //0 menu  1 jeu   2 fin du jeu  3 about



function setup() {
  //size(1680,1050);
  var canvas = createCanvas(container.clientWidth, container.clientWidth*(9/16), P2D);
  canvas.parent('gamearea')
  smooth(8);
  frameRate(60);
  //fullScreen();

  //surface.setSize(1920,1080);

  //max_len egale au plus grand coté de l'écran
  if (height <= width) {
    max_len = height;
  } else {
    max_len = width;
  }

  //créé le tableau d'hexagone
  hex = [];
  //initialise le tableau;
  hex = ini_hex(hex);

  let l   = sqrt(max_len * max_len / ( 162 * ( 1 - cos( 2 * PI/3))));  //longueur du coté de l'hexagone
  let lo  = sqrt(2*l*l-2*l*l*cos(2*PI/3));  //longueur d'un des triangles inscrit dans l'hexagone
  let ny  = lo * cos(PI/3); 

  team_H  = new hexagone(2 * ny, height/2 - ny, l);
  team_H.team = 1;

}


//variable global pour degrader lorsque le souris est sur un hexagone
let deg = 2;
let sense = 1;

//boucle d'affichage
function draw() {
  stroke(235, 245, 247);
  background(255, 255, 255);
  //permet de faire un dégrader clignotant
  deg += sense * 0.1;
  if ((deg > 3)||(deg < 1)) {
    sense = -1 * sense;
  }
  switch(state) {
    case -1:
      Wait();
      break;
    case 1:  
      Game();
      break;
    case 2:  
      endGame();
      break;
  }
}

//au click de la souris
function mousePressed() {
  if(your_turn == cur_teamPlay){
    if (mouseButton == LEFT) {
      if(state == 1){
        Selection_hexagone();
      }
    } else if (mouseButton == RIGHT) {
      if (sel_hex.length > 0) {
        dep_hex();
      }
    }
  }
}

function Game() {
  //affiche les hexagones et test si la souris est dedans
  for (let i = 0; i<max_tab_i; i++) {
    let maxj = - abs(i-4)+9;
    for (let j = 0; j < maxj; j++) {
      hex[i][j].is_hover = hex[i][j].hovering();
      hex[i][j].show();
    }
  }


  //hexagone indicateur du tour
  team_H.team = cur_teamPlay;
  team_H.show();

  fill(58, 58, 58,255);
  textAlign(LEFT);
  textSize(max_len * 0.05);
  text("SCORE", 7 * width/8, (height/2) - (max_len * 0.05));
  textSize(max_len * 0.03);
  text(player_1 + " : " + score[0], 7 * width/8, (height/2));
  text(player_2 + " : " + score[1], 7 * width/8, (height/2) + (max_len * 0.03));
}

function endGame() {
  fill(58, 58, 58, 255); 


  let tSize = round(max_len * 0.05);
  textSize(tSize);
  textAlign(LEFT);
  text("Le score : ", width * 0.2, height * 0.35, width * 0.6, height * 0.1);

  tSize = round(max_len * 0.03);
  textSize(tSize);
  text("joueur 1 : " + score[0], width * 0.2, height * 0.41, width * 0.6, height * 0.1);
  text("joueur 2 : " + score[1], width * 0.2, height * 0.45, width * 0.6, height * 0.1);

  tSize = round(max_len * 0.08);
  textSize(tSize);
  textAlign(CENTER);
  text("VICTOIRE", width/2, height/2);

  if (score[0]>score[1]) {
    text("Jouer 1", width/2, 2 * height/3);
  } else {
    text("jouer 2", width/2, 2 * height/3);
  }

}

function Wait() {
  fill(58, 58, 58, 255); 

  let tSize = round(max_len * 0.05);
  textSize(tSize);
  textAlign(LEFT);
  text("Waiting for player two", width * 0.2, height * 0.35, width * 0.6, height * 0.1);

}

function ResetLevel() {
  score[0] = 0;
  score[1] = 0;
  cur_teamPlay = 1;
  for (let i = 0; i<max_tab_i; i++) {  //pour chaque ligne;
    let maxj = - abs(i - 4) + 9;
    for (let j = 0; j < maxj; j++) {
      hex[i][j].team = 0;
      //position des billes blanche;
      if ((i < 2)||((i == 2)&&((j > 1)&&(j < 5)))) {
        hex[i][j].team = 1;
      }
      //position des billes noir;
      if (((i > 6))||((i == 6)&&((j > 1)&&(j < 5)))) {
        hex[i][j].team = 2;
      }
    }
  }
}