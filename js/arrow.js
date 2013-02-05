var Game = Game || {};

(function(Game) {

  var Arrow = {
    create: function() {
      var arrow = Object.create(this);
      arrow.el = document.createElement('div');
      arrow.el.className = 'arrow';
      arrow.reset();
      return arrow;
    },

    START_Y: -96,
    VELOCITY: 10,
    x: 0,
    y: 0,

    update: function() {
      this.setY(this.y + this.VELOCITY);
    },

    setX: function(val) {
      this.x = val;
      this.el.style.left = this.x + 'px';
    },

    setY: function(val) {
      this.y = val;
      this.el.style.bottom = this.y + 'px';
    },

    reset: function() {
      this.setY(this.START_Y);
    },

    getBoundingBox: function() {
      var height  = this.el.clientHeight,
          // Don't allow the entire arrow to pass for a hit. Just the tip, baby.
          yOffset = 160;

      return {
        // using bitwise | for rounding - fastest across most browsers
        topLeft: {
          x: this.x | 0,
          y: 600 - height - this.y | 0
        },
        bottomRight: {
          x: (this.x + this.el.clientWidth)  | 0,
          y: 600 - this.y - yOffset
        }
      }
    }
  };

  Game.Arrow = Arrow;

})(Game);