var Game = Game || {};

(function(Game) {

  var Dangler = {
    create: function() {
      var dangler = Object.create(this);
      dangler.el = document.createElement('div');
      dangler.el.className = 'dangler';
      dangler.el.innerHTML = '<div class="rope"></div><div class="bubble"></div>';
      dangler.init();
      return dangler;
    },

    x: 0,
    velocity: 20,
    delay: 0,

    MIN_ROPE_HEIGHT: 100,
    MAX_ROPE_HEIGHT: 300,

    init: function() {
      var ropeEl = this.el.getElementsByClassName('rope')[0],
          ropeLength = Math.random() * this.MAX_ROPE_HEIGHT | 0 + this.MIN_ROPE_HEIGHT;
      ropeEl.style.height = ropeLength + 'px';
      this.x = -50;
    },

    update: function() {
      this.x += this.velocity;
      this.el.style.left = this.x + 'px';

      // check for out of bounds and then release

      // make sure to have a pool of danglers
    },

    reset: function() {
      this.init();
    }
  };

  Game.Dangler = Dangler;

})(Game);