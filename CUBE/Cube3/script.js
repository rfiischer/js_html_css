//Creates Canvas
var canvas = document.createElement("CANVAS");
canvas.id = "canvas";
canvas.height = (screen.height*0.7).toString();
canvas.width = (screen.width).toString();

//Sets the cube side, canvas context, and some global variables
var l = 100;
var interr;
var interr2;
var ctx = canvas.getContext("2d");
var color = [0,0,0];
var grd = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
var cond = true;
var moved = false;
/*Gradients*/
grd.addColorStop(0, "black")
grd.addColorStop(1, "#ffffff")

//Creates the cube and the camera
var shape = new Cube(l);
var camera = new space();
camera.xOrientation = 1;
camera.yOrientation = -1;
camera.xDisplacement = canvas.width/2;
camera.yDisplacement = canvas.height/2;

//Declares stuff that can't be declared before the body loads
document.body.onload = function () {
	//Append the canvas to main
	document.getElementById("main").insertBefore(canvas, document.getElementById("form"));

	//Declares buttons and ranges
	rShapeButton = document.getElementById("rShapeButton");
	ebutt = document.getElementById("ebutt");
	sbutt = document.getElementById("sbutt");
	thick = document.getElementById("THICK");
	sens = document.getElementById("sens");
	bButton = document.getElementById("buildButton");
	dButton = document.getElementById("drawButton");
	erasebutton = document.getElementById("erasebutton");
	
	//Sets the sensitivity range
	sens.max = "500";
	sens.min = "1";
	sens.step = "1";
	sens.defaultValue = "50";
	
	//Sets line thickness range
	thick.max = "20";
	thick.min = "1";
	thick.step = "1";
	thick.defaultValue = "1";
	
	//Sets the centre coordinates
	xRange = document.getElementById("xC");
	xRange.max = "300";
	xRange.min = "-300";
	xRange.step = "1";
	xRange.defaultValue = "0";
	yRange = document.getElementById("yC");
	yRange.max = "300";
	yRange.min = "-300";
	yRange.step = "1";
	yRange.defaultValue = "0";
	zRange = document.getElementById("zC");
	zRange.max = "300";
	zRange.min = "-300";
	zRange.step = "1";
	zRange.defaultValue = "0";
	
	//Sets the colour ranges
	rRange = document.getElementById("R");
	rRange.max = "255"
	rRange.min = "0";
	rRange.step = "1";
	rRange.defaultValue = "0";
	gRange = document.getElementById("G");
	gRange.max = "255";
	gRange.min = "0";
	gRange.step = "1";
	gRange.defaultValue = "0";
	bRange = document.getElementById("B");
	bRange.max = "255";
	bRange.min = "0";
	bRange.step = "1";
	bRange.defaultValue = "0";
    
	//If it isn't supposed to leave trail, clears the rectangle and drawEdges the shape modified.
	reset = function (shape) {
		if(document.getElementById("sbutt").checked){ctx.clearRect(0,0,canvas.width, canvas.height)}
		drawE(shape);
	};
	
	//What happens to ranges on click
	rRange.onclick = function () {
		reset(shape);
	};
	gRange.onclick = function () {
		reset(shape);
	};
	bRange.onclick = function () {
		reset(shape);
	};
	thick.onclick = function () {
		reset(shape);
	};
	
	//Update range values.
	rRange.onmousedown = function () {
		interr2 = true;
	};

	rRange.onmousemove = function () {
		if (interr2){
			reset(shape);
		}
	};

	rRange.onmouseup = function () {
		interr2 = false;
	};
	
	//Update range values.
	thick.onmousedown = function () {
		interr2 = true;
	};

	thick.onmousemove = function () {
		if (interr2){
			reset(shape);
		}
	};

	thick.onmouseup = function () {
		interr2 = false;
	};
	
	//Update range values.
	gRange.onmousedown = function () {
		interr2 = true;
	};

	gRange.onmousemove = function () {
		if (interr2){
			reset(shape);
		}
	};

	gRange.onmouseup = function () {
		interr2 = false;
	};
	
	//Update range values.
	bRange.onmousedown = function () {
		interr2 = true;
	};

	bRange.onmousemove = function () {
		if (interr2){
			reset(shape);
		}
	};

	bRange.onmouseup = function () {
		interr2 = false;
	};
	
	//Changes colour mode
	ebutt.onclick = function () {
		reset(shape);
	};
	
	//Erases the board
	initialColor = erasebutton.style.backgroundColor;

	erasebutton.onmouseover = function () {
		erasebutton.style.backgroundColor = "#0CC9E8";
		erasebutton.style.cursor = "pointer";
	};

	erasebutton.onmouseout = function () {
		erasebutton.style.backgroundColor = initialColor;
	};
	
	erasebutton.onclick = function () {
		ctx.clearRect(0,0,canvas.width, canvas.height);
		drawE(shape);
	};
	
	//Resets the Cube
	initialColor = rShapeButton.style.backgroundColor;

	rShapeButton.onmouseover = function () {
		rShapeButton.style.backgroundColor = "#0CC9E8";
		rShapeButton.style.cursor = "pointer";
	};

	rShapeButton.onmouseout = function () {
		rShapeButton.style.backgroundColor = initialColor;
	};
	
	//Update faces
	document.getElementById("face").onclick = function (){
		reset(shape);
	};
	
	//Update edges
	document.getElementById("edge").onclick = function (){
		reset(shape);
	};
	
	//Updates "rastro"
	document.getElementById("sbutt").onclick = function (){
		reset(shape);
	};
	
	//Draw, build and reset things
	dButton.onclick = function (){
		if(moved){
			shape = buildShape;
			cond = false;
		};
	};
	bButton.onclick = function () {
		buildShape = new object();
	};
	rShapeButton.onclick = function () {
		moved = false;
		shape = new Cube(l);
		buildShape = new object();
		cond = true;
		ctx.clearRect(0,0,canvas.width, canvas.height);
		reset(shape);
	};
	
	
	//Colour
	drawE = function (shape){
		if(ebutt.checked){
			var color = "#" + verify(parseInt((rRange.value)).toString(16), 2) + verify(parseInt((gRange.value)).toString(16),2) + verify(parseInt((bRange.value)).toString(16),2);
			if(document.getElementById("face").checked){
				camera.drawFaces(shape, grd);
			}
			if(document.getElementById("edge").checked){
				camera.drawEdges(shape, "round", THICK.value, color);
			}
		} else {
			if(document.getElementById("face").checked){
				camera.drawFaces(shape, grd);
			}
			if(document.getElementById("edge").checked){
				camera.drawEdges(shape, "round", THICK.value, "black");
			}
		}
	}
	
	
	drawE(shape);
};

//Rotates the shape and draws it
canvas.onmousedown = function (event) {
	last_position = {};
	interr = true;
	canvas.style.cursor = "pointer";
};

canvas.onmousemove = function (event) {
	var t;
	if (interr) {
    //check to make sure there is data to compare against
	if(event.altKey){
		t = true;
	}
    if ((typeof(last_position.x) != 'undefined')&&(!t)) {
        //get the change from last position to this position
        var deltaX = last_position.x - event.clientX,
            deltaY = last_position.y - event.clientY;
		if(dButton.checked){
			if(cond){
				shape.vertexes.rotate(0, sens.value*Math.PI*deltaY/10000, sens.value*Math.PI*deltaX/10000, parseInt(xRange.value), parseInt(yRange.value), parseInt(zRange.value));
				reset(shape);
			} else {
				shape.vertexes.rotate(0, sens.value*Math.PI*deltaY/10000, sens.value*Math.PI*deltaX/10000, parseInt(xRange.value), parseInt(yRange.value), parseInt(zRange.value));
				shape.edges.rotate(0, sens.value*Math.PI*deltaY/10000, sens.value*Math.PI*deltaX/10000, parseInt(xRange.value), parseInt(yRange.value), parseInt(zRange.value));
				shape.faces.rotate(0, sens.value*Math.PI*deltaY/10000, sens.value*Math.PI*deltaX/10000, parseInt(xRange.value), parseInt(yRange.value), parseInt(zRange.value));
				reset(shape);
			};
		} else {
			if(cond){
				buildShape.vertexes.add(false, shape.vertexes.rotate(0, sens.value*Math.PI*deltaY/10000, sens.value*Math.PI*deltaX/10000, parseInt(xRange.value), parseInt(yRange.value), parseInt(zRange.value)));
				buildShape.edges.add(false, shape.edges);
				buildShape.faces.add(false, shape.faces);
				reset(buildShape);
			} else {
				buildShape.vertexes.add(false, shape.vertexes.rotate(0, sens.value*Math.PI*deltaY/10000, sens.value*Math.PI*deltaX/10000, parseInt(xRange.value), parseInt(yRange.value), parseInt(zRange.value)));
				buildShape.edges.add(false, shape.edges.rotate(0, sens.value*Math.PI*deltaY/10000, sens.value*Math.PI*deltaX/10000, parseInt(xRange.value), parseInt(yRange.value), parseInt(zRange.value)));
				buildShape.faces.add(false, shape.faces.rotate(0, sens.value*Math.PI*deltaY/10000, sens.value*Math.PI*deltaX/10000, parseInt(xRange.value), parseInt(yRange.value), parseInt(zRange.value)));
				reset(buildShape);
			};
		};
		moved = true;
    };
    if ((typeof(last_position.x) != 'undefined')&&(t)){
		var deltaX = last_position.x - event.clientX,
            deltaY = last_position.y - event.clientY;
		camera.xDisplacement += -deltaX;
		camera.yDisplacement += -deltaY;
		reset(shape);
	};
    //set the new last position to the current for next time
    last_position = {
        x : event.clientX,
        y : event.clientY
		
    };
	t = false;
    };
};

canvas.onmouseup = function () {
	interr = false;
	canvas.style.cursor = "default";
};

canvas.onmouseleave = function () {
	interr = false;
}

