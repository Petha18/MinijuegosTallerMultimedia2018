var botonJugar, botonSalir, botonCreditos, botonConfig, escalarAncho, escalarAlto, posicionY, botonesX, botonJugarY, botonSalirY, botonConfigY;
var tamanioBotonesH, tamanioBotonesW;
var MenuPrincipal = function() {};

MenuPrincipal.prototype = {

    init: function() {
        this.titleText = game.make.text(game.world.centerX, 100, "ITM GAMES", {
            font: 'bold 35pt TheMinion',
            fill: '#fff',
            align: 'center'
        });
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    },
    create: function() {
        this.clickk = game.add.audio('clickk');
        this.musicaMenu = game.add.audio('MenuMusica');
        this.musicaMenu.loop = true;
        this.musicaMenu.stop();

        if (window.innerWidth < 630) {
            //Mobile
            escalarAncho = window.innerWidth;
            escalarAlto = window.innerHeight;
            posicionY = 0;
            tamanioBotonesJugarSalir = 0.65;
        } else {
            //Tablet
            escalarAncho = window.innerWidth;
            escalarAlto = window.innerHeight + 110;
            posicionY = -50;
            tamanioBotonesJugarSalir = 1;
        }
        this.FondoInicio = game.add.sprite(0, 0, 'menu-principal-bg');
        this.FondoInicio.width = window.innerWidth;
        this.FondoInicio.height = window.innerHeight;

        botonesX = window.innerWidth / 2 - 95;
        if (window.innerHeight > 590) {
            botonJugarY = window.innerHeight / 2 + 60;
            botonSalirY = window.innerHeight / 2 + 145;
            botonConfigY = window.innerHeight - 125;

            if (window.innerWidth > 750) {
                botonesX = window.innerWidth / 2 - 140;
                botonJugarY = window.innerHeight / 2 + 45;
                botonSalirY = window.innerHeight / 2 + 170;
                botonConfigY = window.innerHeight - 125;
            }
        } else {
            if (window.innerHeight > 540) {
                botonJugarY = window.innerHeight / 2;
                botonSalirY = window.innerHeight / 2 + 75;
                botonConfigY = window.innerHeight - 110;
            } else {
                botonJugarY = window.innerHeight / 2;
                botonSalirY = window.innerHeight / 2 + 70;
                botonConfigY = window.innerHeight - 85;
            }
        }
        botonJugar = game.add.button(botonesX, botonJugarY, 'botonJugarC', clickJugar, this);
        botonSalir = game.add.button(botonesX, botonSalirY, 'botonSalir', clickSalir, this);
        botonJugar.scale.setTo(tamanioBotonesJugarSalir, tamanioBotonesJugarSalir);
        botonSalir.scale.setTo(tamanioBotonesJugarSalir, tamanioBotonesJugarSalir);

        this.audioA = game.add.button(20, botonConfigY, 'botonConfiguracion', menuConfigClick, this);
        this.audioA.visible = true;
        this.audioM = game.add.button(20, botonConfigY, 'botonConfiguracion2', menuConfigClick, this);
        this.audioM.visible = false;

        if (sone) {
            this.musicaMenu.play();
        } else {
            this.audioA.visible = false;
            this.audioM.visible = true;
            console.log("object");
        }
    },
};

function clickJugar() {
    this.clickk.play();
    game.state.start("PlanetasMenu");
    this.musicaMenu.stop();
}

function clickSalir() {
    this.clickk.play();
    if (confirm("Deseas salir?")) {
        game.destroy();
        window.close();
    }
}

function menuConfigClick() {
    this.clickk.play();
    if (sone) {
        this.audioA.visible = false;
        this.audioM.visible = true;
        sone = false;
        this.musicaMenu.stop();
    } else {
        this.audioA.visible = true;
        this.audioM.visible = false;
        sone = true;
        this.musicaMenu.play();
    }
}

//Phaser.Utils.mixinPrototype(MenuPrincipal.prototype);