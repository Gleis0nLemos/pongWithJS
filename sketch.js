//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio  = diametro/2;

//Velocidades da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimento = 10;
let altura = 90;

//Variáveis do bot
let botXRaquete = 585;
let botYRaquete = 150;
let velocidadeBot;

let colisao = false;
let botErrar = 0;

//Placar
let meusPontos = 0;
let pontosBot = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound('trilha.mp3')
  ponto = loadSound('ponto.mp3')
  raquetada = loadSound('raquetada.mp3')
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  moveBolinha();
  colisaoBorda();
  raquete(xRaquete, yRaquete);
  moveRaquete();
  //colisaoRaquete();
  colideRaquete(xRaquete, yRaquete);
  raquete(botXRaquete, botYRaquete);
  moveBotRaquete();
  colideRaquete(botXRaquete, botYRaquete);
  placar();
  pontos();
  //multiplayer();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function moveBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBorda(){ 
  if ( xBolinha + raio > width || 
      xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if ( yBolinha + raio > height || 
      yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function raquete( x, y ){
  rect(x, y, comprimento, altura)
}


function moveRaquete(){
  if (keyIsDown(UP_ARROW)){
      yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
      yRaquete += 10;
  }
}

function moveBotRaquete(){
  velocidadeBot = yBolinha - botYRaquete - comprimento/2 - botErrar;
  botYRaquete += velocidadeBot;  
  
  if (pontosBot> meusPontos){
    botErrar = 100;
  }
  if(pontosBot < meusPontos && botErrar > 50){
    botErrar -= 3;
  }
}

function multiplayer(){
  if (keyIsDown(87)){
      botYRaquete -= 10;
  }
  if (keyIsDown(83)){
      botYRaquete += 10;
  }
}

//function colisaoRaquete(){
//  if ( xBolinha - raio < xRaquete + comprimento 
//      && yBolinha - raio < yRaquete + altura 
//      && yBolinha + raio > yRaquete){
//    velocidadeXBolinha *= -1;
//  }
//}

function colideRaquete(x, y){
  colisao = collideRectCircle(x, y, comprimento, altura, xBolinha, yBolinha, raio);
  if ( colisao ){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255,140,0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosBot, 450, 26);
}

function pontos(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play()
  }
  if (xBolinha < 10){
    pontosBot += 1;
    ponto.play()
  }
}


function bolinhaNaoFicaPresa(){
  if (xBolinha - raio < 0){
    xBolinha = 23
  }
  if (xBolinha + raio > 600){
    xBolinha = 577
  }  
}
