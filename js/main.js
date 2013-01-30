(function(window) {

  window.Game = {
    init: function() {
      this.bow = Game.Bow.create();
      this.bucket = Game.Bucket.create();

      _.bindAll(this);

      this.appendEls('game', [this.bow, this.bucket]);
      this.bindKeys();

      document.getElementById('start-btn')
              .addEventListener('click', this.onStartClick);
    },

    containerEl: null,

    appendEls: function(containerId, children) {
      this.containerEl = document.getElementById(containerId);

      for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        this.containerEl.appendChild(child.el);
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
      var keyStatuses = this.keyStatuses;

      document.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
          case 37: keyStatuses.bowLeft     = true; break;
          case 39: keyStatuses.bowRight    = true; break;
          case 65: keyStatuses.bucketLeft  = true; break;
          case 68: keyStatuses.bucketRight = true; break;
        }
      });

      document.addEventListener('keyup', function(e) {
        switch(e.keyCode) {
          case 37: keyStatuses.bowLeft     = false; break;
          case 39: keyStatuses.bowRight    = false; break;
          case 65: keyStatuses.bucketLeft  = false; break;
          case 68: keyStatuses.bucketRight = false; break;
        }
      });
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

      this.onUpdate();
    },

    // Main Game Loop
    onUpdate: function() {
      this.checkKeys();
      this.updateDanglers();
      requestAnimationFrame(this.onUpdate);
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
    }
  };

})(window);