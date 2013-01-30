var Game = Game || {};

(function(Game) {

  var Bow = {
    create: function() {
      var bow = Object.create(Game.BaseControllable, this);
      bow.el = document.createElement('div');
      bow.el.className = 'bow';
      return bow;
    }
  };

  Game.Bow = Bow;

})(Game);