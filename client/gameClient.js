var canvas = document.getElementById("myCanvas");
var info = document.getElementById("info");
var ctx = $('canvas')[0].getContext("2d");
var drawWidthSelect = document.getElementById("drawWidthSelect");
var toolSelect = document.getElementById("toolSelect");
var readyButton = document.getElementById("readyScreen");
var wordOptionOne = document.getElementById("wordOptionOne");
var wordOptionTwo = document.getElementById("wordOptionTwo");
var wordOptionThree = document.getElementById("wordOptionThree");
var gameMode = "";
var roundStartSound = new sound("client/snd/roundStart.wav");
var wordCorrectSound = new sound("client/snd/wordCorrect.wav");
var wordNotGuessedSound = new sound("client/snd/wordNotGuessed.wav");

var currentDrawer = "";
var drawTool = "brush";
var readyScreen = false;
var drawColor = "black";
var drawWidth = 3;
ctx.lineWidth = drawWidth;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

canvas.addEventListener('wheel', function(event)
{
	 if (event.deltaY < 0)
	 {
		drawWidthSelect.selectedIndex = Math.max(drawWidthSelect.selectedIndex-1, 0);
	 }else if (event.deltaY > 0)
	 {
		drawWidthSelect.selectedIndex = Math.min(drawWidthSelect.selectedIndex+1, 5);
	 }
});

var draw = function(data) {
    if(data.drawTool === "brush"){
        ctx.strokeStyle = data.color; 
        ctx.fillStyle = data.color; 
        ctx.lineWidth = data.drawWidth;
    }else if(data.drawTool === "eraser"){
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 15;
    }
    
    if (data.type === "dragstart") {
        ctx.beginPath();
        ctx.moveTo(data.x,data.y);
    } else if (data.type === "drag") {
        ctx.lineTo(data.x,data.y);
        ctx.stroke();
    } else if (data.type === "dragend"){
        ctx.stroke();
        ctx.closePath();
    } else if(data.type === "click"){
        ctx.beginPath();
        ctx.arc(data.x,data.y,data.drawWidth/2,0,2*Math.PI);
        ctx.fill();
    }
};
 
var clearCanvasServ = function(){
    socket.emit("clearCanvas");
};

socket.on("clearCanvas", function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}); 

$(function() {
    
    $('#myCanvas').on('drag dragstart dragend click', function(e) {
        offset = $(this).offset();
        data = {
            x: (e.clientX - offset.left),
            y: (e.clientY - offset.top),
            type: e.handleObj.type,
            color: drawColor,
            drawWidth: drawWidthSelect.options[drawWidthSelect.selectedIndex].value,
            drawTool: toolSelect.options[toolSelect.selectedIndex].value
        };
        if((currentDrawer === myUsername || gameMode === "freestyle") && !readyScreen){
            draw(data); // Draw yourself.
            socket.emit('drawClick', data) // Broadcast draw.
        }
        
    });
});

socket.on('drawClick', function(data){
    draw(data);
}); 

socket.on("refreshCurrentGameMode", function(refreshedGameMode){
    gameMode = refreshedGameMode;
})
socket.on("refreshInfo",function(message,time){
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    var printMinutes,printSeconds;
    if(minutes < 10){
        printMinutes = "0" + minutes;
    }else{
        printMinutes = minutes;
    }
    if(seconds < 10){
        printSeconds = "0" + seconds;
    }else{
        printSeconds = seconds;
    }
    info.innerHTML = message + "<span style='margin-right:8px;float:right;'>" + printMinutes + ":" + printSeconds + "</span>";
});

socket.on("refreshGeneralInfo",function(drawer,state,wordOptionsArray){
    currentDrawer = drawer;
    if(state === "readying" && currentDrawer === myUsername){
        /*ctx.fillStyle = "orange";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("Click to Start Drawing",canvas.width/2,canvas.height/2);
        readyButton.style.display = "block"*/
		readyScreen = true;
		wordOptionOne.style.display = "block";
		wordOptionTwo.style.display = "block";
		wordOptionThree.style.display = "block";
		
		wordOptionOne.innerHTML = wordOptionsArray[0].toLowerCase();
		wordOptionTwo.innerHTML = wordOptionsArray[1].toLowerCase();
		wordOptionThree.innerHTML = wordOptionsArray[2].toLowerCase();
    }
});

socket.on("wordCorrectSound", function(){
	wordCorrectSound.play();
});

socket.on("roundStartSound", function(){
	roundStartSound.play();
});

socket.on("wordNotGuessedSound", function(){
	wordNotGuessedSound.play();
});

/*
$('#myCanvas').on('mousedown', function() {
    if(readyScreen){
        socket.emit("startRound");
        readyScreen = false;
        clearCanvasServ();
    }
})*/

var selectColor = function(color, selectedColorElement){
    drawColor = color;
	document.getElementById("blackColor").classList.remove("colorSelectSelected");
	document.getElementById("greyColor").classList.remove("colorSelectSelected");
	document.getElementById("blueColor").classList.remove("colorSelectSelected");
	document.getElementById("lightblueColor").classList.remove("colorSelectSelected");
	document.getElementById("redColor").classList.remove("colorSelectSelected");
	document.getElementById("yellowColor").classList.remove("colorSelectSelected");
	document.getElementById("greenColor").classList.remove("colorSelectSelected");
	document.getElementById("brownColor").classList.remove("colorSelectSelected");
	document.getElementById("purpleColor").classList.remove("colorSelectSelected");
	document.getElementById("orangeColor").classList.remove("colorSelectSelected");
	
	selectedColorElement.classList.add("colorSelectSelected");
};

wordOptionOne.onclick = function(){
     selectWordOption(0);
}
wordOptionTwo.onclick = function(){
     selectWordOption(1);
}
wordOptionThree.onclick = function(){
     selectWordOption(2);
}

var selectWordOption = function(chosenWordID){
	socket.emit("startRound", chosenWordID);
	readyScreen = false;
	wordOptionOne.style.display = "none";
	wordOptionTwo.style.display = "none";
	wordOptionThree.style.display = "none";
	clearCanvasServ();
}