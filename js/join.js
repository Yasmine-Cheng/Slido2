
//join a room
function JoinRoom(){
	var code=document.getElementById('RoomCode').value;
	if (code.trim()=="") {
		alert("請輸入房間編號");
	}else{
		//OK
        var href="room.html?room="+code;
        var new_href=encodeURI(href);
        location.href=new_href;
	}
}

//Enter join
window.addEventListener('keydown',function(e){
    if (e.keyCode==13) {
        JoinRoom();
    }
})