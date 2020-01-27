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

var text = 'Ура вы победили! Список результатов:';

function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight) {
  var words = text.split(" ");
  var countWords = words.length;
  var line = "";
  for (var n = 0; n < countWords; n++) {
    var testLine = line + words[n] + " ";
    var testWidth = context.measureText(testLine).width;
    if (testWidth > maxWidth) {
      context.fillText(line, marginLeft, marginTop);
      line = words[n] + " ";
      marginTop += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, marginLeft, marginTop);
}

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandom = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var setRectColor = function(ctx, player) {
  if (player === 'Вы') {
    ctx.fillStyle = 'red';
  } else {
    ctx.fillStyle = 'hsl(240, ' + getRandom(80) + '%, 50%)';
  }
};

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

  ctx.font = '16px PT Mono';
  ctx.textBaseLine = 'hanging';
  ctx.fillStyle = 'black';

  wrapText(ctx, text, CLOUD_X + TEXT_MARGIN, CLOUD_Y + TEXT_MARGIN, TEXT_WIDTH, FONT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < times.length; i++) {
    var difference = BAR_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime);

    if (names.length < times.length) {
      names.push('Гость');
    }

    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - TEXT_MARGIN_BOTTOM);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, BAR_Y + difference - TEXT_MARGIN_BOTTOM);
    setRectColor(ctx, names[i]);
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, BAR_Y + difference, BAR_WIDTH, BAR_HEIGHT - difference);
    ctx.fillStyle = 'black';
  }
};
