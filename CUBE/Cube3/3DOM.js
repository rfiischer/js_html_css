//DOM 3D
function object() {
    this.edges = new edges();
    this.vertexes = new vertexes();
    this.faces = new faces();
};

/*VERTEX*/
function vertexes() {};
vertexes.prototype = [];

vertexes.prototype.add = function () {
	if(typeof arguments[0] === "number"){
		this.push(new vertex(arguments[0], arguments[1], arguments[2]));
		return this[this.length - 1];
	} else {
		var arr = [];
		var toBePushed;
		var length = arguments[1].length;
		for(var i = 0; i < length; i++){
			if(!arguments[0]){
				toBePushed = this.add(arguments[1][i].x, arguments[1][i].y, arguments[1][i].z);
				arr.push(toBePushed);
			} else {
				this.push(arguments[1][i]);
				arr.push(arguments[1][i]);
			};
		};
		return arr;
	};
};
vertexes.prototype.rotate = function (a, b, c, xCenter, yCenter, zCenter) {
	for(var i = 0; i < this.length; i++){
		var temp = this[i];
		this[i] = pRotate(temp, xCenter, yCenter, zCenter, a, b, c);
	};
	return this;
};
vertexes.prototype.translate = function (dX, dY, dZ) {
	for(var i = 0; i < this.length; i++){
		var temp = this[i];
		this[i] = pTranslate(temp, dX, dY, dZ);
	};
	return this;
};

function vertex(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};

/*EDGE*/
function edges() {};
edges.prototype = [];

edges.prototype.add = function () {
	if(vertex.prototype.isPrototypeOf(arguments[1][0])){
		var t = arguments[0];
		this.push(new edge(t, arguments[1]));
		return this[this.length - 1];
	} else {
		var arr = [];
		var toBePushed;
		var t = arguments[0];
		var length = arguments[1].length;
		for(var i = 0; i < length; i++){
			if(t){
				this.push(arguments[1][i]);
				arr.push(arguments[1][i]);
			} else {
				toBePushed = this.add(t, [arguments[1][i][0], arguments[1][i][1]]);
				arr.push(toBePushed);
			};
		};
		return arr;
	};
};
edges.prototype.rotate = function (a, b, c, xCenter, yCenter, zCenter) {
	for(var i = 0; i < this.length; i++){
		this[i].rotate(a, b, c, xCenter, yCenter, zCenter);
	};
	return this;
};
edges.prototype.translate = function (dX, dY, dZ) {
	for(var i = 0; i < this.length; i++){
		this[i].translate(dX, dY, dZ);
	};
	return this;
};

function edge(t ,vertexes) {
	var first;
	var second;
	
	if ((vertexes[0].x < vertexes[1].x)||(vertexes[0].y < vertexes[1].y)||(vertexes[0].z < vertexes[1].z)) {
		first = vertexes[0];
		second = vertexes[1];
	} else if ((vertexes[1].x < vertexes[0].x)||(vertexes[1].y < vertexes[0].y)||(vertexes[1].z < vertexes[0].z)){
		first = vertexes[1];
		second = vertexes[0];
	} else {
		first = vertexes[0];
		second = vertexes[1];
	}
	if(t){
		this.push(first);
		this.push(second);
	} else {
		this.add(first.x, first.y, first.z);
		this.add(second.x, second.y, second.z);
	};
};
edge.prototype = new vertexes();

/*FACE*/

function faces() {};
faces.prototype = [];


faces.prototype.add = function () {
	if(vertex.prototype.isPrototypeOf(arguments[1][0])){
		var t = arguments[0];
		this.push(new face(t, arguments[1]));
		return this[this.length - 1];
	} else {
		var arr = [];
		var args = [];
		var toBePushed;
		var t = arguments[0];
		var length = arguments[1].length;
		for(var i = 0; i < length; i++){
			if(t){
				this.push(arguments[1][i]);
				arr.push(arguments[1][i]);
			} else {
				var leng = arguments[1][i].length;
				for(var s = 0; s < leng; s++){
					args.push(arguments[1][i][s]);
				};
				toBePushed = this.add(t, args);
				arr.push(toBePushed);
			};
		};
		return arr;
	};
};
faces.prototype.rotate = function (a, b, c, xCenter, yCenter, zCenter) {
	for(var i = 0; i < this.length; i++){
		this[i].rotate(a, b, c, xCenter, yCenter, zCenter);
	};
	return this;
};
faces.prototype.translate = function (dX, dY, dZ) {
	for(var i = 0; i < this.length; i++){
		this[i].translate(dX, dY, dZ);
	};
	return this;
};

function face(cond, vertexes) {
	var d = [];
	var t = [];
	for(var i = 0; i < vertexes.length; i++){
		t[i] = [vertexes[i], true, i];
	}
	if (vertexes.length != 0){t[0][1] = false; if(cond){this.push(t[0][0])} else {this.add(t[0][0].x, t[0][0].y, t[0][0].z);};}
	for(var i = 0, counter = 1; ((vertexes.length != 0)&&(counter < vertexes.length)); ) {
		for(var j = 1; ((j < vertexes.length)); j++){
			d[j-1] = [Math.sqrt((vertexes[i].x - vertexes[j].x)*(vertexes[i].x - vertexes[j].x)
			+(vertexes[i].y - vertexes[j].y)*(vertexes[i].y - vertexes[j].y)
			+(vertexes[i].z - vertexes[j].z)*(vertexes[i].z - vertexes[j].z)), t[j]];
		}
		d.sort(function(a, b){return a[0] - b[0]});
		for(var k = 0; k < d.length; k++){
			if (d[k][1][1]) {
				if(cond){
					this.push(d[k][1][0]);
				} else {
					this.add(d[k][1][0].x, d[k][1][0].y, d[k][1][0].z);
				};
				d[k][1][1] = false;
				i = d[k][1][2];
				counter++;
				break;
			};
		};
	};
};
face.prototype = new vertexes();

//Shapes

/*CUBE*/
function Cube(l){
	var cube = new object();
	var v = [];
	
	v[2] = cube.vertexes.add(l,l,l);
	v[3] = cube.vertexes.add(l,-l,l);
	v[0] = cube.vertexes.add(-l,l,l);
	v[1] = cube.vertexes.add(-l,-l,l);
	v[6] = cube.vertexes.add(l,l,-l);
	v[7] = cube.vertexes.add(l,-l,-l);
	v[4] = cube.vertexes.add(-l,l,-l);
	v[5] = cube.vertexes.add(-l,-l,-l);
	
	cube.edges.add(true, [ v[0], v[1]]);
	cube.edges.add(true, [ v[1], v[3]]);
	cube.edges.add(true, [ v[3], v[2]]);
	cube.edges.add(true, [v[2], v[0]]);
	cube.edges.add(true, [v[0], v[4]]);
	cube.edges.add(true, [v[1], v[5]]);
	cube.edges.add(true, [v[6], v[2]]);
	cube.edges.add(true, [v[3], v[7]]);
	cube.edges.add(true, [v[4], v[5]]);
	cube.edges.add(true, [v[5], v[7]]);
	cube.edges.add(true, [v[7], v[6]]);
	cube.edges.add(true, [v[6], v[4]]);
	
	cube.faces.add(true, [v[4], v[5], v[7], v[6]]);
	cube.faces.add(true, [v[0], v[1], v[3], v[2]]);
	cube.faces.add(true, [v[1], v[3], v[7], v[5]]);
	cube.faces.add(true, [v[4], v[0], v[2], v[6]]);
	cube.faces.add(true, [v[6], v[2], v[3], v[7]]);
	cube.faces.add(true, [v[0], v[1], v[5], v[4]]);
	
	return cube;
};

//Transformations

/*Rotates the point*/
var pRotate = function (vert, xCenter, yCenter, zCenter, a, b, c) {
	var x, y, z;
	var translated = pTranslate(vert, xCenter, yCenter, zCenter);
	
	x = translated.x*Math.cos(a)*Math.cos(c) -translated.y*Math.sin(a)*Math.cos(c) -translated.z*Math.cos(b)*Math.sin(c) + translated.x*Math.sin(a)*Math.sin(b)*Math.sin(c) + translated.y*Math.cos(a)*Math.sin(b)*Math.sin(c);
	y = translated.z*Math.sin(b) + translated.x*Math.sin(a)*Math.cos(b) + translated.y*Math.cos(a)*Math.cos(b);
	z = translated.x*Math.cos(a)*Math.sin(c) -translated.y*Math.sin(a)*Math.sin(c) +translated.z*Math.cos(b)*Math.cos(c) - translated.x*Math.sin(a)*Math.sin(b)*Math.cos(c) - translated.y*Math.cos(a)*Math.sin(b)*Math.cos(c);
	
	vert.x = x;
	vert.y = y;
	vert.z = z;
	
	translated = pTranslate(vert, -xCenter, -yCenter, -zCenter);
	
	return translated;
};
/*Translates the point*/
var pTranslate = function (vert, dX, dY, dZ) {
	vert.x += dX;
	vert.y += dY;
	vert.z += dZ;
	
	return vert;	
};

//Drawing functions

/*Space*/
var space = function(){
	this.xOrientation = null;
	this.yOrientation = null;
	this.zOrientation = null;
	this.xDisplacement = null;
	this.yDisplacement = null;
	this.zDisplacement = null;
	this.arroundXrotation = null;
	this.arroundYrotation = null; 
	this.arroundZrotation = null;
	this.focalLength = null;
	this.objects = null;
};
space.prototype.add = function (object) {
	this.push(object);
	return this[this.length - 1];
};

/*DRAW EDGE*/
space.prototype.drawEdges = function (shape, lineCap, thickness, color) {
	ctx.beginPath();
	for(var i = 0; i < shape.edges.length; i++){
		ctx.moveTo(Math.round(this.xOrientation*shape.edges[i][0].x + this.xDisplacement), Math.round(this.yOrientation*shape.edges[i][0].y + this.yDisplacement));
		ctx.lineTo(Math.round(this.xOrientation*shape.edges[i][1].x + this.xDisplacement), Math.round(this.yOrientation*shape.edges[i][1].y + this.yDisplacement));
	};
	style(lineCap, thickness, color);
	ctx.stroke();
};

/*DRAW FACE*/
space.prototype.drawFaces = function (shape, fillStyle) {
	for(var i = 0; i < shape.faces.length; i++){
		ctx.beginPath();
		ctx.moveTo(Math.round(this.xOrientation*shape.faces[i][0].x + this.xDisplacement), Math.round(this.yOrientation*shape.faces[i][0].y + this.yDisplacement));
		for(var j = 1; j < shape.faces[i].length; j++){
			ctx.lineTo(Math.round(this.xOrientation*shape.faces[i][j].x + this.xDisplacement), Math.round(this.yOrientation*shape.faces[i][j].y + this.yDisplacement));
		};
		ctx.closePath();
		ctx.fillStyle = fillStyle;
		ctx.fill();
	};
};
/*STYLE*/
var style = function (lineCap, thickness, color){
	ctx.strokeStyle = color;
	ctx.lineCap = lineCap;
	ctx.lineWidth = thickness;
};

//OTHERS

/*VERIFY*/
var verify = function (color, minimun){
    if (color.length != minimun){
        if (color.length < minimun){
            while(color.length < minimun){
            color = "0" + color;
			return color;
            };
        } else {
            color = color.substring(0, minimun);
			return color;
        };
	} else {
		return color;
	};
};