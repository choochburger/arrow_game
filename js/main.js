(function(window) {

  window.Game = {
    init: function() {
      this.bow = Game.Bow.create();
      this.bucket = Game.Bucket.create();
      this.containerEl = document.getElementById('game');

      _.bindAll(this);

      this.appendEls([this.bow.el, this.bucket.el]);
      this.bindKeys();

      document.getElementById('start-btn')
              .addEventListener('click', this.onStartClick);
    },

    containerEl: null,

    appendEls: function(els) {
      for (var i = 0, len = els.length; i < len; i++) {
        var el = els[i];
        this.containerEl.appendChild(el);
      }
    },

    // Boolean key switches allows for simultaneous movement of controllables
    keyStatuses: {
      bowLeft:     false,
      bowRight:    false,
      bucketLeft:  false,
      bucketRight: false
    },

    bindKeys: function() {
      document.addEventListener('keydown', this.onKeydown);
      document.addEventListener('keyup',   this.onKeyup);
    },

    onKeydown: function(e) {
      switch(e.keyCode) {
        // Bow
        case 38: this.fireArrow(); break;
        case 37: this.keyStatuses.bowLeft  = true; break;
        case 39: this.keyStatuses.bowRight = true; break;
        // Bucket
        case 65: this.keyStatuses.bucketLeft  = true; break;
        case 68: this.keyStatuses.bucketRight = true; break;
        // Debug
        case 32: this.togglePaused(); break;
      }
    },

    onKeyup: function(e) {
      switch(e.keyCode) {
        // Bow
        case 37: this.keyStatuses.bowLeft  = false; break;
        case 39: this.keyStatuses.bowRight = false; break;
        // Bucket
        case 65: this.keyStatuses.bucketLeft  = false; break;
        case 68: this.keyStatuses.bucketRight = false; break;
      }
    },

    MAX_DANGLERS: 20,
    danglers: [],

    onStartClick: function(e) {
      var btn = e.currentTarget;
      btn.style.display = 'none';
      this.startLoop();
    },

    startLoop: function() {
      var containerEl = this.containerEl;

      this.containerWidth = parseInt(containerEl.offsetWidth) + 50,
      this.dangler = Game.Dangler.create();
      this.containerEl.appendChild(this.dangler.el);

      this.paused = false;
      this.onUpdate();
    },

    paused: false,

    togglePaused: function() {
      if (!this.paused) {
        this.paused = true;
      } else {
        this.paused = false;
        this.onUpdate();
      }
    },

    // Main Game Loop
    onUpdate: function() {
      this.checkKeys();
      this.updateDanglers();
      this.updateArrows();
      if (!this.paused) {
        requestAnimationFrame(this.onUpdate);
      }
    },

    checkKeys: function() {
      if (this.keyStatuses.bowLeft)  this.bow.moveLeft();
      if (this.keyStatuses.bowRight) this.bow.moveRight();
      if (this.keyStatuses.bucketLeft)  this.bucket.moveLeft();
      if (this.keyStatuses.bucketRight) this.bucket.moveRight();
    },

    updateDanglers: function() {
      var danglerLeft = parseInt(this.dangler.el.style.left);
      this.dangler.update();
      if (danglerLeft > this.containerWidth) this.dangler.reset();
    },

    MAX_ARROWS: 4,
    arrows: [],
    fireArrow: function() {
      var arrow;
      if (this.arrows.length === this.MAX_ARROWS) return;
      arrow = Game.Arrow.create();
      arrow.setX(this.bow.getCenterX());
      this.appendEls([arrow.el]);
      this.arrows.push(arrow);
    },

    updateArrows: function() {
      var arrows = this.arrows;
      for (var i = 0, len = arrows.length; i < len; i++) {
        var arrow = arrows[i];
        arrow.update();
      }
    }
  };

})(window);