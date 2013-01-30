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
    velocity: 10,
    delay: 0,
    points: 0,

    init: function() {
      this.x = -50;
      this.createRope();
      this.createPoints();
    },

    update: function() {
      this.x += this.velocity;
      this.el.style.left = this.x + 'px';
    },

    MIN_ROPE_HEIGHT: 100,
    MAX_ROPE_HEIGHT: 300,

    createRope: function() {
      var ropeEl = this.el.getElementsByClassName('rope')[0],
          ropeLength = Math.random() * this.MAX_ROPE_HEIGHT | 0;
      if (ropeLength < this.MIN_ROPE_HEIGHT) ropeLength === this.MIN_ROPE_HEIGHT;
      ropeEl.style.height = ropeLength + 'px';
    },

    MAX_POINTS: 20,

    createPoints: function() {
      var bubbleEl = this.el.getElementsByClassName('bubble')[0],
          score = Math.ceil( Math.random() * this.MAX_POINTS );
      bubbleEl.innerHTML = score;
    },

    reset: function() {
      this.init();
    }
  };

  Game.Dangler = Dangler;

})(Game);