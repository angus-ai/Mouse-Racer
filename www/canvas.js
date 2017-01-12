
function Token(pseudo, x, y, fill) {
  this.pseudo = pseudo;
  this.x = x || 5;
  this.y = y || 5;
  this.w = 10;
  this.h = 10;
  this.fill = fill || 'blue';
}

Token.prototype.draw = function(ctx) {
  ctx.fillStyle = this.fill;
  ctx.fillRect(this.x, this.y, this.w, this.h);
}

Token.prototype.contains = function(mx, my) {

  return  (this.x <= mx) && (this.x + this.w >= mx) && (this.y <= my) && (this.y + this.h >= my);
}

function CanvasState(canvas, socket , token){
  this.socket = socket;
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');

  // **** Keep track of state! ****

  this.valid = false;
  this.tokens = [];
  this.myToken = token;
  console.log(this.myToken.pseudo+' '+this.myToken.x+' '+this.myToken.y);
  this.dragging = false;
  this.dragoffx = 0;
  this.dragoffy = 0;

  var myState = this;

  canvas.addEventListener("mousedown",function(e){
    dragging = true;

    if(dragging){
      var canvas = myState.canvas;
      var mx = e.pageX-canvas.offsetLeft;
      var my = e.pageY-canvas.offsetTop;
      var myToken = myState.myToken;

      if (myToken.contains(mx, my)) {
        myState.dragoffx = mx - myToken.x;
        myState.dragoffy = my - myToken.y;
        myState.dragging = true;
        myState.valid = false;
        return;
      }
    };
  },true);

  canvas.addEventListener('mousemove', function(e) {
    if (myState.dragging){
      var x=e.pageX-myState.canvas.offsetLeft - myState.dragoffx;
      var y=e.pageY-myState.canvas.offsetTop - myState.dragoffy;
      if((x<0)||(x>myState.canvas.width)||(y<0)||(y>myState.canvas.height)){myState.dragging=false;}
      myState.myToken.x = x;
      myState.myToken.y = y;
      myState.valid = false;

      //Collisions
      data=myState.canvas.getContext('2d').getImageData(myState.myToken.x,myState.myToken.y,10,10).data;
      for(i=0;i<data.length;i+=4){
        if(data[i]!=0){myState.myToken.x=5;myState.myToken.y=5;myState.dragging=false;}
      }

      //END
      if(data[1]==255&&data[2]==255){
        console.log('bravo');
        socket.emit('endGame');
      }
      else{socket.emit('mouse_track',myState.myToken.x,myState.myToken.y)}
    }

  }, true);

  canvas.addEventListener('mouseup', function(e) {
    myState.dragging = false;
  }, true);

  socket.on('new_rival', function(rival) {
    alert(rival+ ' est connecté');
    var rivToken = new Token(rival,10,10,"blue");
    myState.addToken(rivToken);
  });


  socket.on('rivMove', function(pseudo,x,y) {
    var tokens = myState.tokens;
    for(i=0;i<tokens.length;i++){
      if(tokens[i].pseudo==pseudo){var token=tokens[i]; break;};
    };

    token.x = x;
    token.y = y;
    myState.valid = false;

  }, true);

  socket.on('quit_rival',function(pseudo){
    alert(pseudo+' a quitté la partie');
    var tokens = myState.tokens;
    for(i=0;i<tokens.length;i++){
      if(tokens[i].pseudo==pseudo){myState.tokens.splice(i,i+1);};
    };
  });

  this.interval = 30;
  setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.addToken = function(token) {
  this.tokens.push(token);
  this.valid = false;
}


CanvasState.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

CanvasState.prototype.draw = function() {
  if (!this.valid) {
    var ctx = this.ctx;
    var myToken = this.myToken;
    var tokens = this.tokens;

    this.clear();

    ctx.fillStyle = "rgb(250,0,0)";
    for(i=0;i<7;i++){
      ctx.fillRect (15*((i+1)%2), 20+70*i, 490+15*((i+1)%2), 50);
    }

    ctx.fillStyle = "rgb(0,255,255)"
    ctx.fillRect(this.canvas.width-20,this.canvas.height-20,20,20);

    for(i=0;i<tokens.length;i++){
      tokens[i].draw(ctx);
    };

    myToken.draw(ctx);

    this.valid = true;
  }
}
