$().ready(function () {
    var canvas = $("#quadro")[0];
    var ctx = canvas.getContext("2d");
    var colisao = false;
    var snake = [];
    var oi = 0;
    var alo2 = 0;
    var obj2 = {
        "vx": 0,
        "vy": 0,
        "x": canvas.width / 2,
        "y": canvas.height / 2,
        "l": 15,
        "a": 15,
        "cor": "pink",
    
        desenharObjeto: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.l, this.a);
        }
    }

    function detectaColisao(o1, o2) {
        var top1 = o1.y;
        var top2 = o2.y;
        var esq1 = o1.x;
        var esq2 = o2.x;
        var dir1 = o1.x + o1.l;
        var dir2 = o2.x + o2.l;
        var base1 = o1.y + o1.a;
        var base2 = o2.y + o2.a;
        if (base1 > top2 && dir1 > esq2 && base2 > top1 && dir2 > esq1) {
            colisao = true;
        }
        else {
            colisao = false;
        }
    }

    function desenharTela() {
        apagarTela(); alo2==0;
        //obj.atualiza();
      
        snake.forEach (function() {
        if (alo2 !== 0) {
        snake[alo2].percorreCobra();
        
        
        console.log("oi"); }
        alo2++;
        
        });
    snake[0].atualiza();
        detectaColisao(snake[0], obj2);
        if(colisao==true){
            snake.push(criaItemSnake());
            //alterar parametros
        }

        detectaLimite(snake[0]);

        snake[0].desenharObjeto();
        obj2.desenharObjeto();
        
        requestAnimationFrame(desenharTela);
    }
    function detectaLimite(obj) {
        if (obj.x < 0) {
            obj.x = 0;
            obj.vx = 0;
        }
        if (obj.y < 0) {
            obj.y = 0;
            obj.vy = 0;
        }
        if (obj.x + obj.l > canvas.width) {
            obj.x = canvas.width - obj.l;
            obj.vx = 0;
        }
        if (obj.y + obj.a > canvas.height) {
            obj.y = canvas.height - obj.a;
            obj.vy = 0;
        }
    }
    function apagarTela() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function criaItemSnake() {
        return {
            "vx": 0,
            "vy": 0,
            "x": 50,
            "y": 50,
            "l": 15,
            "a": 15,
            "cor": "blue",
            atualiza: function () {
                this.x += this.vx;
                this.y += this.vy;
            },
            percorreCobra: function() {
               
                      var alo = alo2-1;
                        this.x = snake[alo].x;
                        this.y = snake[alo].y;
                        
                        
                        
                    

                
            },
            desenharObjeto: function () {
                if (colisao) {
                    obj2.x = Math.random() * (canvas.width - obj2.l);
                    obj2.y = Math.random() * (canvas.height - obj2.a);

                }
                else {
                    ctx.fillStyle = this.cor;
                }
                ctx.fillRect(this.x, this.y, this.l, this.a);
            }
        };
    }

    snake.push(criaItemSnake());
    desenharTela();
    $(window).keydown(function (event) {
        if (event.which == 37) { //esquerda
            snake[0].vx = -2;
            snake[0].vy = 0;
        }
        if (event.which == 39) { //direita
            snake[0].vx = 2;
            snake[0].vy = 0;
        }
        if (event.which == 38) { //cima
            snake[0].vy = -2;
            snake[0].vx = 0;
        }
        if (event.which == 40) { //baixo
            snake[0].vy = 2;
            snake[0].vx = 0;
        }
    });
});