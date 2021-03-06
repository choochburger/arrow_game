var Game = Game || {};

(function(Game) {

  var Bucket = {
    create: function() {
      var bucket = _.extend({}, Game.BaseControllable, this);
      bucket.el = document.createElement('div');
      bucket.el.className = 'bucket';
      return bucket;
    }
  };

  Game.Bucket = Bucket;

})(Game);