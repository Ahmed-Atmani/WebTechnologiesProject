
var isDragging = false;
var color = "#0000FF"; // set the initial drawing color to blue

var canvas = null;
var context = null;

// this function will be called as soon as the document is done loading and the DOM is complete
$( document ).ready(function() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    // tell the canvas which function to call when the mouse is pressed/moved/released
	$('#custom-message-canvas').mousedown(handleMouseDown);
	$('#custom-message-canvas').mousemove(handleMouseMove);
	$('#custom-message-canvas').mouseup(handleMouseUp);

	// clear canvas when 'clear' button is pressed
	$('#clear-button').click(clearCanvas);
	});

function clearCanvas()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(newcolor)
{
	color = newcolor;
}

function handleMouseDown(event)
{
    alert("test");
	var mouseX = event.pageX - this.offsetLeft;
	var mouseY = event.pageY - this.offsetTop;
	isDragging = true;
	context.beginPath();
    context.moveTo(mouseX, mouseY);
}

function handleMouseMove(event)
{
	if(isDragging){
		var mouseX = event.pageX - this.offsetLeft;
		var mouseY = event.pageY - this.offsetTop;
		context.lineTo(mouseX, mouseY);
		context.strokeStyle = color;
		context.stroke();
	}
}

function handleMouseUp(event)
{
	isDragging = false;	
}

function handleLoad(event)
{
	var reader = new FileReader();
    reader.onload = function(e){
        var img = new Image();
        img.onload = function(){
            context.drawImage(img,0,0);
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function handleInvert()
{	
	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    context.putImageData(imageData, 0, 0);
}
