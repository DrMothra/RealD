/**
 * Created by atg on 20/02/2015.
 */
//Creates and renders a number of bars
//Colours
var DARK_GREEN = '#646432', YELLOW = '#ffff0d', WHITE = '#ffffff', RED = '#ff0000', ORANGE = '#e7772b', BLUE = '#22bdeb',
    DARK_BLUE = '#11484b';
var barManager = (function() {
    //Default values
    var canvasList = [];
    var offColour = DARK_BLUE;
    var onColour = BLUE;
    var numDivisions = 14;
    var numBarsPerDivision = 12;
    var totalNumberBars = numDivisions * numBarsPerDivision;
    var numLevels = 11;
    var interGap = 20;
    var lineLength = 70;
    var lineWidth = 5;
    var barAngleDeg = 1.667;
    var startRot = -40;
    var radius = 384;
    var radOffset = 50;
    var textLabels = [];
    var textXOffset = 10;

    function degreesToRads(degrees) {
        return Math.PI/180 * degrees;
    }

    return {
        createBars: function(element) {
            //Create canvas
            if(!element) {
                displayError("No element for canvas!");
                return false;
            }
            var c = document.getElementById(element);
            if(!c) {
                displayError("Canvas element not found!");
                return false;
            }
            var ctx = c.getContext("2d");
            ctx.strokeStyle = offColour;
            ctx.lineWidth = lineWidth;
            //Text styles
            ctx.fontFamily = '12px "eurostileregular"';
            //ctx.fontFamily = '12px bold "Arial"';
            //ctx.font = '12px Times';
            ctx.fillStyle = WHITE;
            var canvasItem = {};
            canvasItem.element = element;
            canvasItem.width = c.width;
            canvasItem.height = c.height;
            radius = (c.height/2);
            canvasItem.ctx = ctx;
            canvasItem.xStart = 0;
            canvasItem.yStart = -c.height;
            canvasItem.interGap = interGap;
            //canvasItem.numBars = numberBars;
            canvasItem.barLength = lineLength;
            canvasItem.barWidth = lineWidth;
            canvasList.push(canvasItem);

            return true;
        },

        setTextDescription: function(text) {
            textLabels = text;
        },

        drawBars: function(barNumber, data) {
            if(barNumber >= canvasList.length) {
                displayError("Invalid canvas number");
                return;
            }

            //level *= 10;

            var i;
            var dataValue;
            var canvas = canvasList[barNumber];
            var ctx = canvas.ctx;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();

            ctx.translate(canvas.width/2, radius);
            ctx.rotate(degreesToRads(startRot));

            //Draw main ticks separately
            var textDescriptor = 2;
            var barNumber = 0;
            //Draw excitement first
            ctx.strokeStyle = ORANGE;
            ctx.beginPath();
            ctx.moveTo(canvas.xStart, -radius);
            ctx.lineTo(canvas.xStart, -radius + canvas.barLength + (canvas.barLength *0.2));
            //ctx.stroke();
            ctx.arc(canvas.xStart, -radius + canvas.barLength + (canvas.barLength *0.2), 5,0, Math.PI*2, false);
            ctx.stroke();
            ctx.save();
            ctx.rotate(degreesToRads(barAngleDeg*3.5));
            ctx.fillText(textLabels[textDescriptor], canvas.xStart-20, -radius + canvas.barLength + (canvas.barLength *0.2));
            ctx.restore();
            ++textDescriptor;
            ctx.closePath();
            ctx.rotate(degreesToRads(barAngleDeg));
            numLevels = 47;
            dataValue = data[2]*numLevels;
            for(var bar=0; bar<numLevels; ++bar) {
                ctx.strokeStyle = offColour;
                if(dataValue >= bar) {
                    ctx.strokeStyle = onColour;
                }
                ctx.beginPath();
                ctx.moveTo(canvas.xStart, -radius);
                ctx.lineTo(canvas.xStart, -radius + canvas.barLength);
                ctx.stroke();
                ctx.closePath();
                ctx.rotate(degreesToRads(barAngleDeg));
            }

            numLevels = 11;
            for(i=0; i<numDivisions; ++i) {
                if(barNumber%12 === 0) {
                    ++barNumber;
                    ctx.strokeStyle = ORANGE;
                    ctx.beginPath();
                    ctx.moveTo(canvas.xStart, -radius);
                    ctx.lineTo(canvas.xStart, -radius + canvas.barLength + (canvas.barLength *0.2));
                    //ctx.stroke();
                    ctx.arc(canvas.xStart, -radius + canvas.barLength + (canvas.barLength *0.2), 5,0, Math.PI*2, false);
                    ctx.stroke();
                    //Draw text separately
                    if(textLabels[textDescriptor].length >= 4) {
                        //Exception for "Excitement"
                        if(textLabels[textDescriptor].indexOf("EXCITE") >= 0) {
                            continue;
                        }
                        ctx.save();
                        ctx.rotate(degreesToRads(barAngleDeg*3.5));
                        ctx.fillText(textLabels[textDescriptor], canvas.xStart-20, -radius + canvas.barLength + (canvas.barLength *0.2));
                        ctx.restore();
                    } else {
                        ctx.fillText(textLabels[textDescriptor], canvas.xStart + textXOffset, -radius + canvas.barLength + (canvas.barLength *0.2));
                    }
                    ++textDescriptor;
                    ctx.closePath();
                    ctx.rotate(degreesToRads(barAngleDeg));
                }
                dataValue = data[i+3]*numLevels;
                for(var bar=0; bar<numLevels; ++bar) {
                    ctx.strokeStyle = offColour;
                    if(dataValue >= bar) {
                        ctx.strokeStyle = onColour;
                    }
                    ctx.beginPath();
                    ctx.moveTo(canvas.xStart, -radius);
                    ctx.lineTo(canvas.xStart, -radius + canvas.barLength);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.rotate(degreesToRads(barAngleDeg));
                }
                barNumber += numLevels;
            }

            ctx.restore();
        },

        resizeBars: function(element, canvasNum) {
            /*
            if(!element) {
                displayError("No element for canvas!");
                return false;
            }
            var c = document.getElementById(element);
            if(!c) {
                displayError("Canvas element not found!");
                return false;
            }
            */
            var c = canvasList[canvasNum];
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            //DEBUG
            //console.log('Resize width =', c.width);
            //console.log('Resize height =', c.height);
            radius = c.height/2;
        }

    };
})();

function displayError(msg) {
    alert(msg);
}
