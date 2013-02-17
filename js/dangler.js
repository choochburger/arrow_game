var Game = Game || {};

(function(Game) {

  var Dangler = {
    create: function() {
      var dangler = Object.create(this);
      dangler.el = document.createElement('div');
      dangler.el.className = 'dangler';
      dangler.el.innerHTML = this.createInnerHtml();
      dangler.init();
      return dangler;
    },

    x: 0,
    y: 0,
    velocityX: 10,
    velocityY: 0,
    delay: 0,
    points: 0,
    isDropping: false,

    init: function() {
      this.x = -50;
      this.createRope();
      this.createPoints();
      this.hitEl = this.el.getElementsByClassName('bubble')[0];
    },

    createInnerHtml: function() {
      var html  = '<div class="rope"></div>';
          html += '<div class="bubble">';
          html += '  <div class="points"></div>';
          html += '</div>';
      return html;
    },

    update: function() {
      this.x += this.velocityX;
      this.y += this.velocityY;
      this.el.style.left = this.x + 'px';
      this.el.style.top  = this.y + 'px';

      // Taper off velocityX when item is dropping
      if (this.isDropping && this.velocityX > 0) this.velocityX -= 1;
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
      var bubbleEl = this.el.getElementsByClassName('points')[0],
          score = Math.ceil( Math.random() * this.MAX_POINTS );
      bubbleEl.innerHTML = score;
    },

    reset: function() {
      this.init();
    },

    getBoundingBox: function() {
      var height = this.el.clientHeight + this.hitEl.clientHeight,
          width  = 50;

      return {
        // using bitwise | for rounding - fastest across most browsers
        topLeft: {
          x: this.x - width | 0,
          y: (height - this.hitEl.clientHeight) | 0
        },
        bottomRight: {
          x: (this.x + this.el.clientWidth + width)  | 0,
          y: height
        }
      }
    },

    drop: function() {
      var rope = this.el.getElementsByClassName('rope')[0];
      rope.style.visibility = 'hidden';

      this.isDropping = true;
      this.velocityY = 10;
    }

  };

  Game.Dangler = Dangler;

})(Game);