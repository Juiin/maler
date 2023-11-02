var socket = io();
//Debug
socket.on("evalAnswer",function(data){
    console.log(data);
});
//Signing in///////////////////////////////////////////////////
var signIn = document.getElementById("signIn");
var lobby = document.getElementById("lobby");
var username = document.getElementById("username");
var signInButton = document.getElementById("signInButton"); 




var myUsername = "";       
signInButton.onclick = function(){
    if(username.value.length > 10){
        alert("Max Username Length is 10.");
        return;
    }
    if(typeof(username.value.includes) === "function"){
        if(username.value.includes("yyy") || username.value.includes("YYY")){
            alert("Abgelehnt!");
            return;
        }
    }

    if(username.value !== ""){
            socket.emit("signIn",{username:username.value});
            myUsername = username.value;
    }
    else alert("Please enter a Username!");
};
//Sign In with Enter
username.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
            signInButton.click();
    }
});

//Listen to Response
socket.on("signInResponse",function(data){
        if(data.success){
                signIn.style.display = "none";
                lobby.style.display = "inline-block";
        } else
                alert("Username already in use!");
});

//Chat////////////////////////////////////////////////////////
var chatText = document.getElementById("chatText");
var chatInput = document.getElementById("chatInput");
var chatForm = document.getElementById("chatForm");
var chatUser = document.getElementById("chatUser");
var chatUserIngameRed = document.getElementById("chatUserIngameRed");
var chatUserIngameBlue = document.getElementById("chatUserIngameBlue");
var chatTextIngame = document.getElementById("chatTextIngame");
var chatFormIngame = document.getElementById("chatFormIngame");
var chatInputIngame = document.getElementById("chatInputIngame");

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

socket.on("addToChat",function(data){
    if(lobby.style.display === "none"){
        chatTextIngame.innerHTML += "<div>" + data + "</div>";
        chatTextIngame.scrollTop = chatTextIngame.scrollHeight;
    }else{
        chatText.innerHTML += "<div>" + data + "</div>";
        chatText.scrollTop = chatText.scrollHeight;
    }
});

chatForm.onsubmit = function(e){
    e.preventDefault();
    if(chatInput.value[0] === "/")
            socket.emit("evalServer",chatInput.value.slice(1));
    else if(chatInput.value !== "")
            socket.emit("chatToEveryone",chatInput.value);
    chatInput.value = "";
};
chatFormIngame.onsubmit = function(e){
    e.preventDefault();
    if(chatInputIngame.value[0] === "/")
            socket.emit("evalServer",chatInputIngame.value.slice(1));
    else if(chatInputIngame.value !== "")
            socket.emit("chatToEveryone",chatInputIngame.value);
    chatInputIngame.value = "";
}

//User Chat
socket.on("addToUserChat",function(data){
    chatUser.innerHTML += "<div>" + data + "</div>";
});

socket.on("addToUserChatIngame",function(data,team,playerScore){
    if(team === "red"){
        chatUserIngameRed.innerHTML += "<div >" + data + "</div>";
    }else if(team === "blue"){
        
        if(playerScore > 0){
            chatUserIngameBlue.innerHTML += "<div >" + data + " " + playerScore + "</div>";
        }else{
            chatUserIngameBlue.innerHTML += "<div >" + data + "</div>";
        }
    }else{
        chatUserIngameBlue.innerHTML += "<div style='color:yellow' >" + data + "</div>";
    }
});

socket.on("clearUserChat",function(){
    chatUser.innerHTML = "";
});

socket.on("clearUserChatIngame",function(scoreArray,teams){
    if(teams){
        chatUserIngameRed.innerHTML = "<div>" + scoreArray[1] + "</div>";
        chatUserIngameBlue.innerHTML = "<div>" + scoreArray[0] + "</div>";
    }else{
        chatUserIngameRed.innerHTML = "";
        chatUserIngameBlue.innerHTML = "";
    }
    
});

//ROOM LIST
var roomList = document.getElementById("roomList");
var currentRoom = document.getElementById("currentRoom");
var createRoomButton = document.getElementById("createRoomButton");
var startGameButton = document.getElementById("startGameButton");
var leaveRoomButton = document.getElementById("leaveRoomButton");
var leaveGameButton = document.getElementById("leaveGameButton");
var customWordList = document.getElementById("customWordList");
var customWordListString = document.getElementById("customWordListString");

var joinRoom = function(data){
    socket.emit("joinRoom", data, "");
};

socket.on("joinRoom",function(data, pw){
    socket.emit("joinRoom",data,pw);
});

socket.on("enterRoomPassword",function(data){
    var pw = window.prompt("Please enter the Password.", "");
    if(pw != null){
        socket.emit("joinRoom", data , pw);
    }
});

socket.on("toggleRoomList",function(data){
    if(data === "default"){
        roomList.style.display = "inline-block";
        createRoomButton.style.display = "inline-block";
        startGameButton.style.display = "none";
        leaveRoomButton.style.display = "none";
    }
    else{
        roomList.style.display = "none";
        createRoomButton.style.display = "none";
        startGameButton.style.display = "inline-block";
        leaveRoomButton.style.display = "inline-block";
    }
});

var ROOM_LIST = [];

socket.on("fillRoomList",function(data){
   ROOM_LIST = data;
   var passwordString = "";
   roomList.innerHTML = ""; 
   for(var i in data){
       if(data[i].isOpen && i != 0){
            if(data[i].password){
                passwordString = " | Private";
            }else{
                passwordString = "";
            }
            roomList.innerHTML += "<div> Name: " + data[i].name + passwordString + " | Players: " + data[i].currentPlayerAmount + "/" + data[i].maxPlayers + " <button type='button' onclick='joinRoom(" +   i  + ")' >Join!</button> <hr> </div>";
        }
   }
   if(roomList.innerHTML == ""){
       roomList.innerHTML = "...no rooms currently open...";
   }
});

socket.on("refreshRoomName",function(data){
    currentRoom.innerHTML = "Current Room: " + data;
});
 
var createRoom = function(){
    var name = document.getElementById("roomNameInput");
    var pw = document.getElementById("roomPasswordInput");
    var select = document.getElementById("gameModeSelect");
    var select2 = document.getElementById("timeToDrawSelect");
	var select3 = document.getElementById("wordListSelect");
	var selectedTimeToDraw = parseInt(select2.options[select2.selectedIndex].value);
    var selectedGameMode = select.options[select.selectedIndex].value;
	var selectedWordList = select3.options[select3.selectedIndex].value;
    socket.emit("checkRoomNames",name.value,pw.value,selectedGameMode,selectedTimeToDraw, selectedWordList, customWordListString.value);
};

socket.on("createRoomFinal",function(data,name,pw,gameMode,selectedTimeToDraw,selectedWordList,customWordList){
    if(data === false){
        alert("Room Name already in use!");
    }else{
        socket.emit("createRoom",name,pw,gameMode,selectedTimeToDraw,selectedWordList,customWordList);
        closeNav();
    }
});

//Create Room Overlay
/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("roomNameInput").value = myUsername + "'s Room";
	if(customWordList.checked){
		customWordListString.style.display = "inline-block";
	}
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
	var wordOptionOne = document.getElementById("wordOptionOne");
	var wordOptionTwo = document.getElementById("wordOptionTwo");
	var wordOptionThree = document.getElementById("wordOptionThree");
	readyScreen = false;
	wordOptionOne.style.display = "none";
	wordOptionTwo.style.display = "none";
	wordOptionThree.style.display = "none";
}

var gameDiv = document.getElementById("gameDiv");

startGameButton.onclick = function(){
    socket.emit("startGame");
};

socket.on("startGame",function(){
    lobby.style.display = "none";
    gameDiv.style.display = "inline-block";
});



leaveRoomButton.onclick = function(){
  joinRoom(0);
};

leaveGameButton.onclick = function(){
    lobby.style.display = "inline-block";
    gameDiv.style.display = "none";
    joinRoom(0);
};

customWordList.onclick = function(){
	customWordListString.style.display = customWordListString.style.display == "none" ? "inline-block" : "none";
};

//GAME


var newGameOnClick = function(){
    socket.emit("newGame");
};

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.volume = 0.1;
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
} 