//fonction d'initialisation du tableau a deux dimension  d'hexagone
function ini_hex(hexa) {
  frameRate(0);
  //pour que la taille prenne tout l'écran
  let l  = sqrt(max_len*max_len/(162*(1-cos(2*PI/3))));  //longueur du coté de l'hexagone
  let ny = sqrt(2*l*l-2*l*l*cos(2*PI/3))*cos(PI/3); 
  let nx = sqrt(2*l*l-2*l*l*cos(2*PI/3))*sin(PI/3); 

  //position de l'hexagone de dépard
  let alpha = 4*l + (5* ( 2*sqrt(l*l-ny*ny)+l));
  let x = (width-alpha)/2 + sqrt(l*l-ny*ny);  
  let y = 4*ny;  //centrer verticalement

  //initialisation du tableau et calcule des positions des hexagones
  for (let i = 0; i<max_tab_i; i++) {  //pour chaque ligne;
    let maxj = - abs(i-4)+9;

    let lx=x;
    let ly = y+i*2*ny;

    if (i>4) {
      lx = x+(i-4)*nx;
      ly = y+(i+4)*ny;
    }

    hexa[i] = [];

    for (let j = 0; j< maxj; j++) {
      
      hexa[i][j] = new hexagone(lx, ly, l);
      hexa[i][j].i = i;
      hexa[i][j].j = j;

      //position des billes blanche;
      if ((i<2)||((i==2)&&((j>1)&&(j<5)))) {
        hexa[i][j].team = 1;
      }
      //position des billes noir;
      if (((i>6))||((i==6)&&((j>1)&&(j<5)))) {
        hexa[i][j].team = 2;
      }

      lx = lx+nx;
      ly = ly-ny;
    }
  }
  frameRate(30);
  return hexa;
}

//fonction de recherche dans une liste
function inArrayList(List,  hexa) {
  let indice=-1;//retourne -1 si l'hexagone est pas trouver

  for (let i = 0; i < List.length; i++) {
    if (List[i] == hexa) {
      indice = i;
      break;
    }
  }

  return indice;
}

//efface la selection
function emptySelect() {
  for (let k = 0; k < sel_hex.length; k++) {
    sel_hex[k].clicked = false;
  }
  sel_hex = [];
}

//Retrouve un hexagone avec les coordonnées
function GetFromXY( x,  y) {

  let lo = hex[0][0].GetLo();
  let ny = lo * cos(PI/3); 
  let nx = lo * sin(PI/3);

  //position du premier hexagone
  let x0 = hex[0][0].x;
  let y0 = hex[0][0].y;

  //droite de séparation du haut et du bas
  let d = CreateDroite(hex[4][0].x, hex[4][0].y, hex[4][1].x, hex[4][1].y);

  let i=0;
  let j=0;

  if (round(d.get(x))>=round(y)) {  //on est en "dessous de la droite" hexagone du haut
    //retrouve la position dans le tableau a deux dimention pour les hexagones du "haut"
    j = round((x-x0)/nx);
    i = round((y-y0+(j*ny))/(2*ny));
  } else {  //on est haut "dessus" de la droite, hexagone du bas
    j = round(-(y-y0-((ny/nx)*(x-x0))-8*ny)/(2*ny));
    i = round((x-x0)/nx+4-j);
  }
  if ((i<=8)&&(i>-1)) {
    let maxJ = - abs(i-4)+9;
    if ((j<maxJ)&&(j>-1)) {
      return hex[i][j];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

//test si on a cliquer sur un hexagone
function Selection_hexagone() {
  for (let i = 0; i<max_tab_i; i++) {
    let maxj = - abs(i-4)+9;
    for (let j = 0; j<maxj; j++) {
      if ((hex[i][j].is_hover)&&(hex[i][j].team==cur_teamPlay)) {//l'hexagone clicker doit faire parti de l'equipe cur_teamPlay

        //hex[i][j] -> hexagone hovered by the mouse

        if (sel_hex.length ==0) {//si aucun sélectionner
          hex[i][j].clicked = true;  //permet le changement de couleur
          sel_hex.push(hex[i][j]);    //ajoute a la liste des séléctionné
        } else {
          if (test_dist(sel_hex[sel_hex.length-1].x, sel_hex[sel_hex.length-1].y, hex[i][j].x, hex[i][j].y)) {  //si l'hexagone est adjacent
            if (inArrayList(sel_hex, hex[i][j])!=-1) {//deselectionne, l'hexagone clicker était déjà sélectionné
              emptySelect();
            } else {
              if (sel_hex.length<2) {// la liste a encore que 1 hexagone
                hex[i][j].clicked = true;//selectionne
                sel_hex.push(hex[i][j]);
              } else if (sel_hex.length<3) {// la liste a deux hexagone, le troisième doit être aligner
                let d = CreateDroite(floor(sel_hex[0].x), floor(sel_hex[0].y), floor(sel_hex[1].x), floor(sel_hex[1].y));  //crée la droite entre les deux premier hexagone
                if (d.verti) {  //si la droite est verticale             
                  if (floor(d.value) == floor(hex[i][j].x)) {//dans la droite
                    hex[i][j].clicked = true;//selectionne
                    sel_hex.push(hex[i][j]);
                  } else {  //pas dans la droite
                    emptySelect();
                  }
                } else if ((floor(hex[i][j].y) <= floor(d.get(hex[i][j].x))+5)&&(floor(hex[i][j].y) >= floor(d.get(hex[i][j].x))-5)) {  //test si le point centrale du troisieme hexagone est sur la droite      
                  hex[i][j].clicked = true;//selectionne
                  sel_hex.push(hex[i][j]);
                } else {//pas sur la droite
                  emptySelect();
                }
              } else {// la liste était pleinne
                emptySelect();
              }
            }
          } else {  //vide la sélection, on a cliquer sur un hexagone trop loin par rapport au dernier selectionner
            emptySelect();
            hex[i][j].clicked = !hex[i][j].clicked;
            sel_hex.push(hex[i][j]);
          }
        }
      } else if ((hex[i][j].is_hover)&&(hex[i][j].team!=cur_teamPlay)) {//on click sur un hexagone qui ne fait pas parti de cur_teamPlay
        emptySelect();
      }
    }
  }
}

function dep_hex() {
  for (let i = 0; i<max_tab_i; i++) {
    let maxj = - abs(i-4)+9;
    for (let j = 0; j<maxj; j++) {
      if (hex[i][j].is_hover) {//retrouver l'hexagone clicker
        //test si l'hexagone clicker est pas trop loin
        if ((sel_hex.length>0)&&(test_dist(sel_hex[(sel_hex.length-1)].x, sel_hex[(sel_hex.length-1)].y, hex[i][j].x, hex[i][j].y))) {  //on refait le test de la taille pour eviter un bug qui arrive si on click trop vite

          //créé un vecteur entre l'origine du dernier hexagone sélectionner et l'hexagone clicker
          let Vdep = CreateVector2D(sel_hex[sel_hex.length-1].x, sel_hex[sel_hex.length-1].y, hex[i][j].x, hex[i][j].y);
          //créé un vecteur entre le premier hexagone sélectionner est le dernier selectionner
          let Vsel = CreateVector2D(sel_hex[0].x, sel_hex[0].y, sel_hex[sel_hex.length-1].x, sel_hex[sel_hex.length-1].y);

          let depHexList = [];//hexagone ou le deplacement aura lieux;
          for (let k = 0; k<sel_hex.length; k++) {
            let Next = GetFromXY(sel_hex[k].x+Vdep.x, sel_hex[k].y+Vdep.y);
            if (Next != null) {  //si l'hexagone est pas en dehors du tableau
              depHexList.push(Next);
            }
          }

          if (sel_hex.length > 1) {  //si plus que 1 hexagone sélectionner  
             if(getCosAngle(Vdep,Vsel)> 0.9){ //deplacement longitudinale (on test la pente des vecteurs) -> Si le cosinus de l'angle entre les deux vecteurs est inférieurs a 0.9, on peut considéré que les vecteurs sont trop divergent et qu'il sagit donc d'un déplacement transversal

              let count = 0;
              let mouvable = true;

              let Next = GetFromXY(sel_hex[sel_hex.length-1].x+Vdep.x, sel_hex[sel_hex.length-1].y+Vdep.y);//on test tout les hexagone dans l'allignement du mouvement
              while ((Next != null)&&(Next.team!=0)) {//si il y a plus d'hexagone ou si l'hexagone est "vide" equipe 0
                count++;//on comple le nombre d'hexagone
                if (Next.team == cur_teamPlay) {//si un des hexagone est de notre equipe on ne peut pas bouger
                  mouvable = false;
                  break;
                }
                Next = GetFromXY(Next.x+Vdep.x, Next.y+Vdep.y);
              }

              if ((mouvable)&&(count<sel_hex.length)) {
                //chaque hexagone selectionner doivent redevenir 0
                for (let k = 0; k <sel_hex.length; k++) {
                  sel_hex[k].team = 0;
                }
                //chaque hexagone dans depHexList doivent devenir cur_teamPlay
                for (let k = 0; k <sel_hex.length; k++) {
                  if ((depHexList[k].team == 0)||(depHexList[k].team == cur_teamPlay)) {//si il y a pas d'hexagone a pousser
                    depHexList[k].team =cur_teamPlay;
                  } else {//si il y a des hexagones a pousser
                    let NextOne = GetFromXY(sel_hex[k].x+Vdep.x, sel_hex[k].y+Vdep.y);
                    let LastOne = sel_hex[k].team;
                    while ((NextOne != null)&&(NextOne.team != 0)) {//pour chaque hexagone dans l'allignement jusque quand il y en ai plus ou qu'il sois vide
                      let temp = NextOne.team;
                      NextOne.team = LastOne;
                      LastOne = temp;
                      NextOne = GetFromXY(NextOne.x+Vdep.x, NextOne.y+Vdep.y);
                    }
                    if ((NextOne != null)&&(NextOne.team == 0)) {//pour le dernier mouvement
                      NextOne.team = - cur_teamPlay + 3;                                             
                    } else {//l hexagone sort du plateau
                      score[cur_teamPlay-1] ++;
                      if (score[cur_teamPlay-1]==6) {  //le score max a été atteint
                        state = 2;
                      }
                    }
                  }
                }
                //change le tour
                cur_teamPlay = - cur_teamPlay + 3;                                                    //team change



                sendGame(hex);


              }

              emptySelect();
            } else {//deplacement transversales

              let mouvable = true;
              for (let k = 0; k<sel_hex.length; k++) {
                let Next = GetFromXY(sel_hex[k].x+Vdep.x, sel_hex[k].y+Vdep.y);
                if (Next != null) {
                  if (Next.team != 0) { //pour un deplacement transversal, il ne peut pas y avoir d'autre hexagone dans le chemin
                    mouvable = false;
                  }
                } else {//on ne peut pas sortir du plateaux
                  mouvable = false;
                }
              }

              if (mouvable) {
                //chaque hexagone selectionner doivent redevenir 0
                for (let k = 0; k <sel_hex.length; k++) {
                  sel_hex[k].team = 0;
                }
                //chaque hexagone dans depHexList doivent devenir cur_teamPlay
                for (let k = 0; k <sel_hex.length; k++) {
                  if ((depHexList[k].team == 0)||(depHexList[k].team == cur_teamPlay)) {//si il y a pas d'hexagone a pousser
                    depHexList[k].team = cur_teamPlay;
                  }
                }
                //change de tour
                cur_teamPlay = - cur_teamPlay + 3;                                                  //team change



                sendGame(hex);


              }
              emptySelect();
            }
          } else {//si il y a que un hexagone

            if (depHexList[0].team ==0) {
              sel_hex[0].team = 0;
              depHexList[0].team = cur_teamPlay;
              cur_teamPlay = - cur_teamPlay + 3;                                                    //team change



              sendGame(hex);

              
            }
            emptySelect();
          }
        }
        break;
      }
    }
  }
}
