/**
 * Created by DrTone on 03/03/2015.
 */
//Create and manage all canvases

var canvasManager = (function() {

    var canvasList = [];
    var canvas;
    var currentWidth = 130;
    var currentHeight = 100;
    var posStyle = 'fixed';

    return {
        setCanvasSize: function(width, height) {
            currentWidth = width;
            currentHeight = height;
        },

        getCanvasWidth: function() {
            return currentWidth;
        },

        getCanvasHeight: function () {
            return currentHeight
        },

        createCanvas: function(id, top, left, rotate) {
            canvas = document.createElement('canvas');
            canvas.style.transform = 'rotate(' + rotate + 'deg)';
            canvas.style.webkitTransform = 'rotate(' + rotate + 'deg)';
            canvas.style.mozTransform = 'rotate(' + rotate + 'deg)';
            canvas.style.msTransform = 'rotate(' + rotate + 'deg)';
            canvas.id = id;
            canvas.width = currentWidth;
            canvas.height = currentHeight;
            canvas.style.position = posStyle;
            canvas.style.top = top + '%';
            canvas.style.left = left + '%';
            document.body.appendChild(canvas);
            canvasList.push(canvas);
        },

        drawCanvas: function(number, top, left) {
            canvas = canvasList[number];
            canvas.style.top = top + '%';
            canvas.style.left = left + '%';
        }
    }
})();