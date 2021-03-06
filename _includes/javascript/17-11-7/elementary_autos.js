
/*
Copyright 2017 Nathan Epstein
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

var xhttp = new XMLHttpRequest();

var img  = document.getElementById('map');


var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");

var text1 = "Controls:";
var text2 = "Click on the map to the right to select an automation";
var text3 = "Arrow keys to move around map";
var text4 = "Spacebar to execute automation";

ctx.font = '22px arial';

ctx.fillText(text1, 10, 40);
ctx.fillText(text2, 10, 80);
ctx.fillText(text3, 10, 120);
ctx.fillText(text4, 10, 160);

//var canvas2 = document.getElementById("myCanvas2");
//var ctx2    = canvas2.getContext("2d");

//var canvas3 = document.getElementById("myCanvas3");
//var ctx3    = canvas3.getContext("2d");

var startRule  = 30
var startState = "None" 

//console.log("wtf");
					
var cw = canvas.width;
var ch = canvas.height - 100;
var numCells = cw/8;
var cellSize = cw/numCells;

//var cw2 = canvas2.width;
//var numCells2 = 256;
//var cellSize2 = cw2/numCells2;

var retX = 0;
var retY = 0;

var highlightArray = new Array(8).fill(0);

//img.onload = function(){
if( rule != -1){
        retX = rule % 256;
        retY = Math.floor(rule/256);
        drawReticule(retX, retY);
	
}
//	else{
//        ctx2.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas2.width, canvas2.height);
//	}
//}

var startArray = new Array(numCells).fill(0);

if (startState != 'None'){ 

    startArray = b64toBitArray(startState).slice()

}
else{

    startArray[numCells/2] = 1
   //for (var i = 0; i < numCells; i++){
    
      //startArray[i] = Math.floor((Math.random() * 2));
            
   //}
}

function post(path, params) {
    method =  "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

function mod(n, m) {
        return ((n % m) + m) % m;
}

function BitArraytob64(bitArray){

    var bytes = new Uint8Array(bitArray.length / 8)
    for(var i = 0; i < bitArray.length; i++){
        bytes[Math.floor(i/8)] += bitArray[i] * Math.pow(2,i%8);
    }

    var str = String.fromCharCode.apply(null, bytes);

    return window.btoa(encodeURL(str)); 

}

function b64toBitArray(b64string){

    outArray = new Array(128).fill(0);   // hardcoding this to 128 makes it work, maybe try to figure out something better later

    buffer = _base64ToArrayBuffer(b64string);
    for(i = 0; i < buffer.byteLength; i++){
        bitArray = get8BitArray(buffer[i]);
            for(j = 0; j < 8; j++){
                outArray[i*8+j] = bitArray[j];                      
            }
        }

    return outArray

}

function _base64ToArrayBuffer(base64_1) {
    base64 = decodeUrl(base64_1);
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

function encodeURL(str){
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}

function decodeUrl(str){
    str = (str + '===').slice(0, str.length + (str.length % 4));
    return str.replace(/-/g, '+').replace(/_/g, '/');
}

function setPix(x, y, r, g, b, neigh){

    if(highlightArray[neigh] == 1){

        var xPix = x * cellSize;
        var yPix = y * cellSize;

        ctx.fillStyle = '#f00';
        ctx.fillRect(xPix, yPix, cellSize, cellSize);

        var xPix = (x * cellSize) + 2;
        var yPix = (y * cellSize) + 2;

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.fillRect(xPix, yPix, cellSize-4, cellSize-4);


    }
    else{

        var xPix = x * cellSize;
        var yPix = y * cellSize;

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.fillRect(xPix, yPix, cellSize, cellSize);
    }

}


function setPix2(x, y, r, g, b){

    var xPix = x * cellSize2;
    var yPix = y * cellSize2;

    //console.log(cellSize2);
	
    //console.log(xPix);
    //console.log(yPix);
	

    ctx2.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
    ctx2.fillRect(xPix, yPix, cellSize2, cellSize2);

}

function drawReticule(x, y){

    // nope not anymore

    //ctx2.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
    /*                    0, 0, canvas2.width, canvas2.height); // destination rectangle

    //ctx2.fillStyle = 'rgb('+255+',' +0+ ','+0+')';
	
    setPix2(x, y, 255, 0, 0, 0);
	
	setPix2(mod(x + 2, 256), y, 256, 0, 0);
	setPix2(mod(x + 3, 256), y, 256, 0, 0);
	setPix2(mod(x + 4, 256), y, 256, 0, 0);

	setPix2(mod(x - 2, 256), y, 256, 0, 0);
	setPix2(mod(x - 3, 256), y, 256, 0, 0);
	setPix2(mod(x - 4, 256), y, 256, 0, 0);	

	setPix2(x, mod(y + 2, 256), 256, 0, 0);
	setPix2(x, mod(y + 3, 256), 256, 0, 0);
	setPix2(x, mod(y + 4, 256), 256, 0, 0);
	
	setPix2(x, mod(y - 2, 256), 256, 0, 0);
	setPix2(x, mod(y - 3, 256), 256, 0, 0);
	setPix2(x, mod(y - 4, 256), 256, 0, 0);
	*/
}

function drawbit(x, y, bit){

    y = y + 668

    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, 16, 16);
    if (bit == 1){
        ctx.fillStyle = '#fff';
        ctx.fillRect(x+2, y+2, 12, 12);
	}
}

function drawbitRed(x, y, bit){

    y = y + 668

    ctx.fillStyle = '#f00';
    ctx.fillRect(x, y, 16, 16);
    if (bit == 1){
        ctx.fillStyle = '#fff';
    }
    else {
        ctx.fillStyle = '#000';
    }
    ctx.fillRect(x+2, y+2, 12, 12);
}

function drawUnderLine(x, y){

    y = y + 668

    ctx.fillStyle = '#000';
    ctx.fillRect(x, y+14, 16, 2);
}

function drawArrow(x, y){

    y = y + 668

    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+8, y+10);
    ctx.lineTo(x+9, y+10);
    ctx.lineTo(x+16, y);
    ctx.fill();

}

function drawSet(x,y, num, write, highlight){

    array = get3BitArray(num);
	
	//drawbit(x+6, y, array[3]);
    drawbit(x + 23, y, array[2]);
    //drawUnderLine(x+40, y);
    drawbit(x + 40, y, array[1]);
    drawbit(x + 57, y, array[0]);
    drawArrow(x+40, y+19);
    if (highlight == 0){
	   drawbit(x+40, y + 35, write);
    }
    else {
        drawbitRed(x+40, y + 35, write);
    }

}
function drawStarts(x, y, bitarray, highlightArrayL = highlightArray){

    //ctx3.fillStyle = '#000';
	//ctx3.fillRect(x-2, y-7, 802, 65);
    //ctx3.fillStyle = '#fff';
	//ctx3.fillRect(x+1, y-4, 796, 59);

	x = x + 35
	
    drawSet( x+0, y+25, 7 ,bitarray[7],  highlightArrayL[7]);
    drawSet(x+70,y+25,6, bitarray[6],   highlightArrayL[6]);
    drawSet(x+140,y+25,5, bitarray[5],   highlightArrayL[5]);
    drawSet(x+210,y+25,4, bitarray[4],   highlightArrayL[4]);
    
	drawSet(x+280,y+25,3, bitarray[3],  highlightArrayL[3]);
    drawSet(x+350,y+25,2, bitarray[2],  highlightArrayL[2]);
    drawSet(x+420,y+25,1, bitarray[1],  highlightArrayL[1]);
    drawSet(x+490,y+25,0, bitarray[0],  highlightArrayL[0]);
	
	
    //ctx3.fillStyle = '#000';
	//ctx3.fillRect(x-2, y+69, 802, 65);
    //ctx3.fillStyle = '#fff';
	//ctx3.fillRect(x+1, y+72, 796, 59);
    
    /* not anymore
	
    drawSet(x+800,y+25,8, bitarray[8],  highlightArrayL[8]);
    drawSet(x+900,y+25,9, bitarray[9],  highlightArrayL[9]);
    drawSet(x+1000,y+25,10, bitarray[10],  highlightArrayL[10]);
    drawSet(x+1100,y+25,11, bitarray[11],  highlightArrayL[11]);
	
    drawSet(x+1200,y+25,12, bitarray[12],  highlightArrayL[12]);
    drawSet(x+1300,y+25,13, bitarray[13],  highlightArrayL[13]);
    drawSet(x+1400,y+25,14, bitarray[14],  highlightArrayL[14]);
    drawSet(x+1500,y+25,15, bitarray[15],  highlightArrayL[15]);
    */
}



function drawBackground(){

    ctx2.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                        0, 0, canvas2.width, canvas2.height); // destination rectangle

	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
	
}


function getBitArray(num){

    var bitArray = new Object();
	
    //console.log(num);
	
    for (var i = 0; i < 16; ++i) {
        bitArray[i] = num % 2;
		//console.log(i + ":" + bitArray[i]);
		num = Math.floor(num/2);
	}

    return bitArray; 
}

function get4BitArray(num){

    var bitArray = new Object();
	
    //console.log(num);
	
    for (var i = 0; i < 4; ++i) {
        bitArray[i] = num % 2;
		//console.log(i + ":" + bitArray[i]);
		num = Math.floor(num/2);
	}

    return bitArray; 
}

function get3BitArray(num){

    var bitArray = new Object();
	
    //console.log(num);
	
    for (var i = 0; i < 3; ++i) {
        bitArray[i] = num % 2;
		//console.log(i + ":" + bitArray[i]);
		num = Math.floor(num/2);
	}

    return bitArray; 
}

function get8BitArray(num){

    var bitArray = new Object();
	
    //console.log(num);
	
    for (var i = 0; i < 8; ++i) {
        bitArray[i] = num % 2;
		//console.log(i + ":" + bitArray[i]);
		num = Math.floor(num/2);
	}
	
	console.log(bitArray)

    return bitArray; 
}

function get6BitArray(num){

    var bitArray = new Object();
	
    //console.log(num);
	
    for (var i = 0; i < 6; ++i) {
        bitArray[i] = num % 2;
		//console.log(i + ":" + bitArray[i]);
		num = Math.floor(num/2);
	}

    return bitArray; 
}

/// expand with color, background etc.
function drawTextBG(ctx, txt, font, x, y) {

    y = y + 658

    /// lets save current state as we make a lot of changes        
    ctx.save();

    /// set font
    ctx.font = font;

    /// draw text from top - makes life easier at the moment
    ctx.textBaseline = 'top';

    /// color for background
    ctx.fillStyle = '#fff';

    /// get width of text
    var width = ctx.measureText(txt).width;

    /// draw background rect assuming height of font
    ctx.fillRect(x-3, y-3, width+6, parseInt(font, 10)+6);
	
    /// text color
    ctx.fillStyle = '#000';

    /// draw text on top
    ctx.fillText(txt, x, y);

    /// restore original state
    ctx.restore();
}

function showRules(ctx, bitArray, x, y)  {

    y = y + 668

    for (var i = 0; i < 15; i++){
	
        if(bitArray[i] == 1){
            ctx.drawImage(imageList1[i], x+(50*i), y);
		}
		else{
            ctx.drawImage(imageList0[i], x+(50*i), y);
		}
	
	
	}

}

function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}


function drawAuto(rule, redraw = false){

    console.log(rule);

    var frame1 = new Array(numCells).fill(0);
    var frame2 = new Array(numCells).fill(0);
    var Nframe1 = new Array(numCells).fill(-1);
    var Nframe2 = new Array(numCells).fill(0);

    var id = ctx.getImageData(0, 0, 1, 1);
 
    ctx.clearRect(0, 0, cw, ch);

//var rule = 2942;

    var bitArray = get8BitArray(rule);
	

    frame1[Math.floor(numCells/2)] = 1;

    if(redraw){

        for (var i = 0; i < numCells; i++){
	
	        frame1[i] = Math.floor((Math.random() * 2));
            
	    }
        startArray = frame1.slice(); 
	}
    else{
        frame1 = startArray.slice();;
	}
    var height = 0;

    while (height < (ch/cellSize )){

		for (var i = 0; i < numCells; ++i) {

			val = frame1[i];
    
			if(val == 0){
				setPix(i, height, 100, 100, 100, Nframe1[i]);
			}
			else{
				setPix(i, height, 255, 242, 0, Nframe1[i]);
			}

			l  = frame1[mod(i - 1, numCells)];
			m  = frame1[mod(i    , numCells)];
			r  = frame1[mod(i + 1, numCells)];
		
			var neighborhood =  l * 4 + m * 2 + r
	
			frame2[i] = bitArray[neighborhood];
	        Nframe2[i] = neighborhood;
	    
		}
	
		height++;

		for (var i = 0; i < numCells; ++i) {

			val = frame2[i];
			if(val == 0){
				setPix(i, height, 100, 100, 100, Nframe2[i]);
			}
			else{
				setPix(i, height,  255, 242, 0, Nframe2[i]);
			}

			l  = frame2[mod(i - 1, numCells)];
			m  = frame2[mod(i    , numCells)];
			r  = frame2[mod(i + 1, numCells)];
		
			var neighborhood2 =  l * 4 + m * 2 + r
	 
			frame1[i] = bitArray[neighborhood2];
            Nframe1[i] = neighborhood2;

		}
	
		height++;
	}
	
    //drawTextBG(ctx3, 'Rule' + rule.toString() + '         ', '32px arial', 40, 30 );
    //showRules(ctx, rule, 0,0);
	//drawStarts(160, 0, bitArray);
}

function flipBit(retXin, retYin, bit){

        var rule = retXin + (retYin * 256);
        var bitArray = getBitArray(rule);
        
        //console.log("flipping bit")
		//console.log("bit: " + bit.toString() +" rule 1: " + 'Rule' + rule.toString());
		
		rule = rule + (2**(bit) * bitArray[bit] * -1) + (2**(bit) * ((bitArray[bit]+1) %2 ));  // to flip bit, subtract if 1, add if 0

        //console.log("rule2: " + 'Rule' + rule.toString());
		
        bitArray = getBitArray(rule);
		
        retX = rule % 256;
        retY = Math.floor(rule/256);
        drawReticule(retX, retY);
        drawAuto(rule);
	    drawTextBG(ctx, 'Rule ' + rule.toString() + '         ', '32px arial', 40, 30 );

        //var urlString = "/map/bw/" + 'Rule' + rule.toString() + "/" + BitArraytob64(startArray);
        //window.history.pushState( null, null, urlString);
	    drawStarts(160, 0, bitArray);



}

function flipStartBit(bit){

    startArray[bit] = (startArray[bit] + 1) % 2;

}

var canvasLeft = canvas.offsetLeft;
var canvasTop  = canvas.offsetTop;

document.getElementById("myCanvas").addEventListener('click', function(event) {
	
	canvasLeft = canvas.offsetLeft;
	canvasTop  = canvas.offsetTop;
	
    var pixX = event.pageX - canvasLeft;
    var pixY = event.pageY - canvasTop;
	
	var pixX3 = event.pageX - canvasLeft;
	var pixY3 = event.pageY - canvasTop - 668;


    if(pixX >= 0 && pixX < cw && pixY >= 0 && pixY < ch){
		
        if(pixY < cellSize){
		
            var bit = Math.floor(pixX / cellSize);
		
            startArray[bit] = (startArray[bit] + 1) % 2;
		
		}
		
        var position = retX + (retY * 16);
        console.log("click on main canvas")
        drawAuto(position, false);
        //var urlString = "/map/bw/" + position.toString() + "/" + BitArraytob64(startArray);
        //window.history.pushState( null, null, urlString);
	
	}
	
	// drawstarts 160,0
	// drawsets 0-1500 (every 100), 25
	// drawbit  40, 35
	// fillrect 16, 16
	
	// 200 (+0_1500), 60, 16, 16
	
	if(pixY3 >= 60 && pixY3 <= 76){

        pixX3 = pixX3 - 234;
        if((pixX3 % 70) < 16){
		
			if(pixX3/70 > 0){
				flipBit(retX, retY, 7 - Math.floor(pixX3 / 70));
			}
		}
	
	}

    if(pixY3 >= 38 && pixY3 <= 54){

        pixX3 = pixX3 - 234;
		
		console.log(pixX3 / 70)
        if((pixX3 % 70) < 16){
        
			if(pixX3/70 > 0){
				var target = 7 - Math.floor(pixX3 / 70);
				//flipBit(retX, retY, Math.floor(pixX3 / 100));
				var rule = retX + (retY * 16);
				var bitArray = getBitArray(rule);
				highlightArray[target] = ( highlightArray[target] + 1 ) % 2;
				
				console.log(highlightArray)
				
				drawAuto(rule, false);
				//showRules(ctx, rule, 0,0);
				drawTextBG(ctx, 'Rule ' + rule.toString() + '         ', '32px arial', 40, 30 );
				//drawTextBG(ctx, 'try clicking! →', '14px arial', 140, 72 );
				drawStarts(160, 0, bitArray);
			}
        }
    
    }
	
	
}); 

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            retX = mod(retX - 1, 16);
            drawReticule(retX, retY);
            var rule = retX + (retY * 16);
            var bitArray = getBitArray(rule);
			drawAuto(rule, false);
			drawTextBG(ctx, 'Rule ' + rule.toString() + '         ', '32px arial', 40, 30 );
			drawTextBG(ctx, 'try clicking! →', '14px arial', 140, 72 );
            //showRules(ctx, rule, 0,0);
	        drawStarts(160, 0, bitArray);

            //var urlString = "/map/bw/" + 'Rule ' + rule.toString() + "/" + BitArraytob64(startArray);
            //window.history.pushState( null, null, urlString);
            //xhttp.open("GET", "autolog1.asp?rule=" + 'Rule' + rule.toString(), true);
			//xhttp.send();
            break;
        case 38:
            retY = mod(retY - 1, 16);
            drawReticule(retX, retY);
            var rule = retX + (retY * 16);
            var bitArray = getBitArray(rule);
			drawAuto(rule, false);
			drawTextBG(ctx, 'Rule ' + rule.toString() + '         ', '32px arial', 40, 30 );
			drawTextBG(ctx, 'try clicking! →', '14px arial', 140, 72 );
            //showRules(ctx, rule, 0,0);
	        drawStarts(160, 0, bitArray);

            //var urlString = "/map/bw/" + 'Rule ' + rule.toString() + "/" + BitArraytob64(startArray);
            //window.history.pushState( null, null, urlString);
            //xhttp.open("GET", "autolog1.asp?rule=" + 'Rule' + rule.toString(), true);
			//xhttp.send();
            break;
        case 39:
            retX = mod(retX + 1, 16);
            drawReticule(retX, retY);
            var rule = retX + (retY * 16);
            var bitArray = getBitArray(rule);
			drawAuto(rule, false);
			drawTextBG(ctx, 'Rule ' + rule.toString() + '         ', '32px arial', 40, 30 );
			drawTextBG(ctx, 'try clicking! →', '14px arial', 140, 72 );
            //showRules(ctx, rule, 0,0);
	        drawStarts(160, 0, bitArray);

            //var urlString = "/map/bw/" + 'Rule' + rule.toString() + "/" + BitArraytob64(startArray);
            //window.history.pushState( null, null, urlString);
            //xhttp.open("GET", "autolog1.asp?rule=" + 'Rule' + rule.toString(), true);
			//xhttp.send();
            break;
        case 40:
            retY = mod(retY + 1, 16);
            drawReticule(retX, retY);
            var rule = retX + (retY * 16);
            var bitArray = getBitArray(rule);
			drawAuto(rule, false);
			drawTextBG(ctx, 'Rule ' + rule.toString() + '         ', '32px arial', 40, 30 );
			drawTextBG(ctx, 'try clicking! →', '14px arial', 140, 72 );
            //showRules(ctx, rule, 0,0);
	        drawStarts(160, 0, bitArray);

            //var urlString = "/map/bw/" + 'Rule' + rule.toString() + "/" + BitArraytob64(startArray);
            //window.history.pushState( null, null, urlString);
            //xhttp.open("GET", "autolog1.asp?rule=" + 'Rule' + rule.toString(), true);
			//xhttp.send();
            break;
        case 32:
            var rule = retX + (retY * 16);
            var bitArray = getBitArray(rule);
            drawAuto(rule, true);
			drawTextBG(ctx, 'Rule ' + rule.toString() + '         ', '32px arial', 40, 30 );
			drawTextBG(ctx, 'try clicking! →', '14px arial', 140, 72 );
            //showRules(ctx, rule, 0,0);
	        drawStarts(160, 0, bitArray);

            //var urlString = "/map/bw/" + 'Rule' + rule.toString() + "/" + BitArraytob64(startArray);

            //window.history.pushState( null, null, urlString);
            //xhttp.open("GET", "autolog2.asp?rule=" + 'Rule' + rule.toString(), true);
			//xhttp.send();
			
    }
}

console.log(startRule)

//drawBackground();

if(startRule != -1){
            var rule = startRule;
            var bitArray = getBitArray(rule);
			drawAuto(rule);
			drawTextBG(ctx, 'Rule ' + rule.toString() + '         ', '32px arial', 40, 30 );
			drawTextBG(ctx, 'try clicking! →', '14px arial', 140, 72 );
            //showRules(ctx, rule, 0,0);
	        drawStarts(160, 0, bitArray);
            //xhttp.open("GET", "autolog1.asp?rule=" + 'Rule' + rule.toString(), true);
			//xhttp.send();
}

if( rule != -1){
        retX = rule % 256;
        retY = Math.floor(rule/256);
        drawReticule(retX, retY);
}
else{
        ctx2.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas2.width, canvas2.height);
	}
//else {
//    ctx2.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas2.width, canvas2.height);
//}
//drawAuto(11155);
