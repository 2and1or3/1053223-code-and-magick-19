'use strict';

(function () {
  var CLOUD_HEIGHT = 270;
  var CLOUD_WIDTH = 420;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;

  var FONT_HEIGHT = 16;

  var TEXT_WIDTH = 200;
  var TEXT_MARGIN = 30;
  var TEXT_MARGIN_BOTTOM = 10;

  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var BAR_Y = CLOUD_HEIGHT + CLOUD_Y - TEXT_MARGIN_BOTTOM - FONT_HEIGHT * 2 - BAR_HEIGHT;

  var FONT_SET = '16px PT Mono';
  var UNNAMED_USER = 'Гость';
  var CURRENT_PLAYER = 'Вы';

  var text = 'Ура вы победили! Список результатов:';

  var setRectColor = function (ctx, player) {
    ctx.fillStyle = (player === CURRENT_PLAYER) ? 'red' : 'hsl(240, ' + window.util.getRandom(80) + '%, 50%)';
  };

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

    ctx.font = FONT_SET;
    ctx.textBaseLine = 'hanging';
    ctx.fillStyle = 'black';

    window.util.wrapText(ctx, text, CLOUD_X + TEXT_MARGIN, CLOUD_Y + TEXT_MARGIN, TEXT_WIDTH, FONT_HEIGHT);

    var maxTime = window.util.getMaxElement(times);

    for (var i = 0; i < times.length; i++) {
      var difference = BAR_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime);
      var fromLeftEdge = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
      var yAndDifference = BAR_Y + difference;


      if (names.length < times.length) {
        names.push(UNNAMED_USER);
      }

      ctx.fillText(names[i], fromLeftEdge, CLOUD_HEIGHT - TEXT_MARGIN_BOTTOM);
      ctx.fillText(Math.floor(times[i]), fromLeftEdge, yAndDifference - TEXT_MARGIN_BOTTOM);
      setRectColor(ctx, names[i]);
      ctx.fillRect(fromLeftEdge, yAndDifference, BAR_WIDTH, BAR_HEIGHT - difference);
      ctx.fillStyle = 'black';
    }
  };
})();
