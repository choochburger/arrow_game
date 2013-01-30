(function(window) {

  window.Game = {
    init: function() {
      var bow = Game.Bow.create(),
          bucket = Game.Bucket.create();

      this.appendEls('game', [bow, bucket]);
      this.bindKeys(bow, bucket);
    },

    appendEls: function(containerId, children) {
      var containerEl = document.getElementById(containerId);

      for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        containerEl.appendChild(child.el);
      }
    },

    bindKeys: function(bow, bucket) {
      document.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
          case 37: // Left Arrow
            bow.moveLeft.call(bow);
            break;
          case 39: // Right Arrow
            bow.moveRight.call(bow);
            break;
          case 65: // A Key
            bucket.moveLeft.call(bucket);
            break;
          case 68: // D Key
            bucket.moveRight.call(bucket);
            break;
        }
      });
    }
  };

})(window);