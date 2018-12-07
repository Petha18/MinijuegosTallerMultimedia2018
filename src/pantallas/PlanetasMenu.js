var botonVolver;
var xInicial, xFinal;
var PlanetasMenu = function() {};
var bloquearClick = true;
var estado = "1";

PlanetasMenu.prototype = {

    init: function() { estado = "1"; },
    create: function() {
        this.rectangles = [];
        this.musicaMenu = game.add.audio('MenuMusica');
        this.musicaMenu.loop = true;
        this.musicaMenu.stop();
        if (sone) {
            this.musicaMenu.play();
        }

        this.clickk = game.add.audio('clickk');

        this.FondoInicio = game.add.sprite(0, 0, 'fondoPlanetaCiudad');
        this.FondoInicio2 = game.add.sprite(window.innerWidth, 0, 'fondoPlanetaParque');
        this.FondoInicio3 = game.add.sprite(window.innerWidth * 2, 0, 'fondoPlanetaPlaya');
        this.FondoInicio4 = game.add.sprite(window.innerWidth * 3, 0, 'fondoPlanetaManglar');
        this.FondoInicio.width = window.innerWidth;
        this.FondoInicio.height = window.innerHeight;

        this.FondoInicio2.width = window.innerWidth;
        this.FondoInicio2.height = window.innerHeight;

        this.FondoInicio3.width = window.innerWidth;
        this.FondoInicio3.height = window.innerHeight;

        this.FondoInicio4.width = window.innerWidth;
        this.FondoInicio4.height = window.innerHeight;

        var PrimerPlaneta = (window.innerWidth / 2) - 130;

        this.rectangles.push(game.add.button(planetas(1), this.game.world.centerY - 150, 'mundo1', clickMundo01, this));
        this.rectangles.push(game.add.button(planetas(2) + window.innerWidth / 2 + 10, this.game.world.centerY - 130, 'mundo2', clickMundo02, this));
        this.rectangles.push(game.add.button(planetas(3) + window.innerWidth, this.game.world.centerY - 100, 'mundo3', clickMundo03, this));
        this.rectangles.push(game.add.button(planetas(4) + window.innerWidth + window.innerWidth / 2, this.game.world.centerY - 135, 'mundo4', clickMundo04, this));

        this.game.world.setBounds(0, 0, window.innerWidth * 4, this.game.height);

        this.dragging = false;
        this.game.input.onDown.add(this.beginMove, this);
        this.game.input.onUp.add(this.endMove, this);
        this.game.input.addMoveCallback(this.moveCamera, this);

        botonVolver = game.add.button(20, window.innerHeight - 80, 'volverPrincipalPlanetas', volverMenuPrincipalClick, this, 0);
        botonVolver.fixedToCamera = true;
    },
    update: function() {

    },
    beginMove: function() {
        this.startX = this.game.input.x;
        this.xInicial = this.game.input.x;
        this.dragging = true;
    },
    endMove: function() {
        this.dragging = false;
        this.xFinal = this.game.input.x;
        calcularMov(this.xInicial, this.xFinal);
    },
    moveCamera: function(pointer, x, y) {
        if (this.dragging) {
            var delta = x - this.startX;
            this.game.camera.x -= delta;
            this.startX = x;

        }
    },
    render: function() {
        for (var i = 0; i < this.rectangles.length; i++) {
            var rectangle = this.rectangles[i];
            this.game.debug.geom(rectangle.sprite, rectangle.tint);
        }
    },


};

function calcularMov(i, j) {
    var bool = true;
    if (i > j && this.estado == "1") //Corre derecha
    {
        bool = true;
        this.game.camera.x = window.innerWidth + 10;
        this.estado = "2";
        return 0;
    }

    if (i > j && this.estado == "2") {
        bool = true;
        this.game.camera.x = window.innerWidth * 2;
        this.estado = "3";
        return 0;
    }

    if (i < j && this.estado == "2") {
        bool = false;
        this.game.camera.x = 0;
        this.estado = "1";
        return 0;
    }

    if (i > j && this.estado == "3") {
        bool = true;
        this.game.camera.x = window.innerWidth * 3;
        this.estado = "4";
        return 0;
    }

    if (i < j && this.estado == "3") {
        bool = false;
        this.game.camera.x = window.innerWidth + 10;
        this.estado = "2";
        return 0;
    }
    if (i < j && this.estado == "4") //Corre derecha
    {
        bool = false;
        this.game.camera.x = window.innerWidth * 2;
        this.estado = "3";
        return 0;
    }
}

function planetas(i) {
    return (window.innerWidth * i / 2) - 130;
}

function volverMenuPrincipalClick() {
    this.clickk.play();
    game.state.start("MenuPrincipal");
    bloquearClick = true;
    this.musicaMenu.stop();
}

function clickMundo01() {
    if (this.xInicial == this.xFinal) {
        // game.state.start("GamePlayCiudad");
        game.state.start("gameplayCiudad");
        this.musicaMenu.stop();
    }
}

function clickMundo02() {
    if (this.xInicial == this.xFinal) {
        game.state.start("GamePlayParque");
        this.musicaMenu.stop();
    }
}

function clickMundo03() {
    if (this.xInicial == this.xFinal) {
        game.state.start("GamePlayPlaya");
        game.state.start("gameplayPlaya");
        this.musicaMenu.stop();
    }

}

function clickMundo04() {
    if (this.xInicial == this.xFinal) {
        game.state.start("GamePlayManglar");
        game.state.start('inicio');
        this.musicaMenu.stop();
    }
}

//Phaser.Utils.mixinPrototype(MenuPrincipal.prototype);