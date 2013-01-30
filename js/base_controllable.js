var Game = Game || {};

(function(Game) {

  var BaseControllable = {
    x: 0,
    velocityPx: 50,

    moveLeft: function() {
      this.x -= this.velocityPx;
      this.updatePosition();
    },

    moveRight: function() {
      this.x += this.velocityPx;
      this.updatePosition();
    },

    updatePosition: function() {
      this.el.style.left = this.x + 'px';
    }
  };

  Game.BaseControllable = BaseControllable;

})(Game);