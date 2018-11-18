/*Ejemplo de jugabilidad en minijuego Memoria*/

var clickUno = 0, clickDos = 0;
var puntosGanar = 0;
var timeUp=0;
var tapar = 1;
var click1=0;
var click2=0;
var cartaClickeada1Tipo;
var cartaClickeada1nombre;
//Arreglos
var posiciones = {
    
    posXPosY: [
        {x:window.innerWidth/3,y:window.innerHeight/2.5},
        {x:window.innerWidth/3,y:window.innerHeight/1.5},
       { x:window.innerWidth/1.5,y: window.innerHeight/1.5},
       {x:window.innerWidth/1.5, y:window.innerHeight/2.5}
       
        
    ],
    
 }

var GamePlayPlaya = function() {};

GamePlayPlaya.prototype = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        // this.flagFirstMouseDown = false;
        // this.endGame=false;
    },
    preload: function() {
        game.load.image('background', 'assets/img/playa/images/fondo.png');
        game.load.spritesheet('cuadros', 'assets/img/playa/images/cuadros.png', 184, 299);
    },
    create: function() {
        var fondo = game.add.sprite(0, 0, 'background');
        fondo.width = window.innerWidth;
        fondo.height = window.innerHeight;
        this.cartas = game.add.group();
        this.cartas.inputEnableChildren = true;
   var numero=0;
   var indices={};
   var tipo=[0,0,1,1];
    do{
        this.posicionCarta = Math.floor(Math.random() * (4 - 0)) + 0;
        // console.log(this.posicionCarta);
        if(posiciones.posXPosY[numero]!=null && tipo[this.posicionCarta]!=null){
            // console.log("x: "+posiciones.posXPosY[this.posicionCarta].x+" y: "+posiciones.posXPosY[this.posicionCarta].y);
            this.carta = this.cartas.create(posiciones.posXPosY[numero].x, posiciones.posXPosY[numero].y, 'cuadros');
            this.carta.anchor.setTo(0.5);
            this.carta.frame = 2;
            this.carta.encontrada = false;
            this.carta.inputEnabled = true;
            this.carta.name="carta"+numero;
            this.carta.scale.setTo(0.5);
            // if(tipo[this.posicionCarta]!=null){
            this.carta.tipo = tipo[this.posicionCarta];
            tipo[this.posicionCarta]=null;
            numero++;
            // }
        }
    }while(numero<4);

    this.cartas.onChildInputDown.add(function onDown(sprite) {
        // console.log(sprite.tipo);
        // console.log(sprite.name);
        sprite.loadTexture('cuadros', sprite.tipo, false);
                if(click1==0 && click2==0 && sprite.encontrada==false){
                    
                    click1=1;
                    console.log("primer Click: "+click1+"segundo Click: "+click2);
                    cartaClickeada1 = sprite.tipo;
                    cartaClickeada1nombre=sprite.name;
                //    console.log( this.cartas);
                }
               else if(click1==1 && sprite.encontrada==false){
                   click2=1;
                   console.log("primer Click: "+click1+" segundo Click: "+click2);
                // console.log(this.volteada1.frame+" "+this.volteada2.frame);
                if(cartaClickeada1 == sprite.tipo && sprite.encontrada==false){
                    this.increaseScore();
                    for(var i=0; i<this.cartas.length;i++){
                        if(this.cartas.children[i].name == cartaClickeada1nombre){
                            this.cartas.children[i].encontrada =true;
                            
                        }
                       }
                  
                    sprite.encontrada=true;
                    click1=0;
                    click2=0;
                 
                }
                else{
                    this.pierdeTiempo();
                    game.time.events.add(Phaser.Timer.SECOND/4,function(){
                        if(click1==1 && click2 == 1 &&  sprite.encontrada==false){
                            for(var i=0; i<this.cartas.length;i++){
                                if(this.cartas.children[i].name == cartaClickeada1nombre){
                                    this.cartas.children[i].frame =2;
                                    
                                }
                               }
                               sprite.frame=2;
                                    click1=0;
                                    click2=0;
                        }

                    }, this);

                  
                }
               }

    }, this);

    this.currentScore = 0;
    this.scoreText = game.add.text(window.innerWidth/2.5, 61, '0');
    
  this.pintarPuntos=  game.add.text(window.innerWidth/11.5, 60, 'Puntos: ');
   this.pintarTiempo= game.add.text(window.innerWidth/2.6, window.innerHeight-70, 'Tiempo: ');
       this.totalTime = 30;
        this.timerText = game.add.text(window.innerWidth/1.35, window.innerHeight -70, this.totalTime+'');
        this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND,function(){
            console.log("timer");
            this.totalTime--;
            this.timerText.text = this.totalTime+'';
            if(this.totalTime<=0){
                this.timerText.visible=false;
                this.pintarTiempo.visible=false;
                this.pintarPuntos.visible=false;
                this.scoreText.visible=false;
                 this.showFinalMessage('Nivel \n Perdido')
                 game.time.events.remove(this.timerGameOver);
                 this.cartas.kill();
               
                //  this.endGame = true;
            }
        }, this);
    
},

   

    //     this.totalTime = 30;
    //     this.timerText = game.add.text(window.innerWidth/1.55, window.innerHeight -70, this.totalTime+'');
    //     this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND,function(){
    //         console.log("timer");
    //         this.totalTime--;
    //         this.timerText.text = this.totalTime+'';
    //         if(this.totalTime<=0){
    //              this.showFinalMessage('Nivel \n Perdido')
    //              game.time.events.remove(this.timerGameOver);
    //              this.endGame = true;
    //         }
    //     }, this);
    // },

    //Buscar una forma de hacerlo dentro de la funcion "ComprobarPares"
    // cambiarColor:function(){
    //    // cuadroAzul.frame = 0;
    // },
    // cambiarColor2:function(){
    //    // this.cuadroAzul.frame = 0;
    // },
    // cambiarColor3:function(){
    //    // cuadroRojo.frame = 1;
    // },
    // cambiarColor4:function(){
    //    // this.cuadroRojo.frame = 1;
    // },
    //Buscar una forma de hacerlo dentro de la funcion "ComprobarPares"

    // comprobarPares:function(){ // Conprueba si la pareja de basureros es correcta 
    //     if(clickUno == 0 && clickDos == 0){
    //         clickUno = 1;
    //         if (tapar==1){
    //             this.tapartodo();
    //         }
    //         return;
    //     }
    //     if(clickUno == 1 && clickDos == 0){
    //         clickDos=1;
    //     }
    //     if(clickUno == 0 && clickDos == 1){
    //         clickUno=1;
    //     }
    //     if(clickUno == 1 && clickDos == 1){
    //         this.increaseScore();
    //         this.cuadroAzul.inputEnabled = false;
    //         cuadroAzul.inputEnabled = false;
    //     }else{
    //         this.pierdeTiempo();
    //         this.reset();
    //     }
    // },

    // comprobarParesRojos:function(){ //comprueba la pareja de las botellas
    //     if(clickUno == 0 && clickDos == 0){
    //         clickUno = 2;
    //         if(tapar==1){
    //             this.tapartodo();
    //         }
    //         return;
    //     }
    //     if(clickUno == 2 && clickDos == 0){
    //         clickDos=2;
    //     }
    //     if(clickUno == 0 && clickDos == 2){
    //         clickUno=2;
    //     }
    //     if(clickUno == 2 && clickDos == 2){
    //         this.increaseScore();
    //       //  this.cuadroRojo.inputEnabled = false;
    //       //  cuadroRojo.inputEnabled = false;
    //     }else{
    //         this.pierdeTiempo();
    //         this.reset(); 
    //     }
    // },

    // reset:function(){
    //     clickUno = 0;
    //     clickDos = 0;
    // },

    // tapartodo:function(){
    //  /*   this.cuadroAzul.frame = 2;
    //     cuadroAzul.frame = 2;
    //     this.cuadroRojo.frame = 2;
    //     cuadroRojo.frame = 2;*/
    // },

    pierdeTiempo:function(){
        console.log("Pierde tiempo");
        this.totalTime-=10;
        this.timerText.text = this.totalTime+'';
    
    },

    increaseScore:function(){
        this.currentScore+=10;
        this.scoreText.text = this.currentScore;
        // tapar=2;
        // this.reset();
        
        this.puntosGanar=this.currentScore;

        if(this.puntosGanar==20){
            this.showFinalMessage('Nivel \n completado')
            game.time.events.remove(this.timerGameOver);
            this.timerText.visible=false;
                this.pintarTiempo.visible=false;
                this.pintarPuntos.visible=false;
                this.scoreText.visible=false;
            // this.endGame=true;
        }
    },

    showFinalMessage:function(msg){
        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0,0,game.width, game.height);
        
        var bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;
        
        var style = {
            font: 'bold 60pt Arial',
            fill: '#FFFFFF',
            align: 'center'
          }
        
        this.textFieldFinalMsg = game.add.text(game.width/2, game.height/2, msg, style);
        this.textFieldFinalMsg.anchor.setTo(0.5);
        this.textFieldFinalMsg.scale.setTo(0.6);
    },
    
    update: function() {
    /*    cuadroAzul.scale.setTo(0.5,0.5);
        this.cuadroAzul.scale.setTo(0.5,0.5);
        cuadroRojo.scale.setTo(0.5,0.5);
        this.cuadroRojo.scale.setTo(0.5,0.5);*/
    }
}

//var game = new Phaser.Game(500, 800, Phaser.CANVAS);
    
game.state.add("gameplayPlaya", GamePlayPlaya);
//game.state.start("gameplay");