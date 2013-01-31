var Game = Game || {};

(function(Game) {

  var Bow = {
    create: function() {
      var bow = _.extend({}, Game.BaseControllable, this);
      bow.el = document.createElement('div');
      bow.el.className = 'bow';
      return bow;
    },

    getCenterX: function() {
      return parseInt(this.el.style.left) + this.el.clientWidth / 2 - 10;
    }
  };

  Game.Bow = Bow;

})(Game);