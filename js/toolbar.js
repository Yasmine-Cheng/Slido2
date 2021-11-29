
// var btn=document.getElementById('goTop');
// document.getElementById('fath').onscroll = function() {scrollFunction()};

// function scrollFunction() {
// 	var ele=document.getElementById('fath');
// 	var winScroll = ele.scrollTop || ele.scrollTop;
// 	if (winScroll > 500) {
// 		btn.style.display = "block";
// 	} else {
// 		btn.style.display = "none";
//   	}
// }
//快速回上
function gotop(){
	document.getElementById('fath').scrollTo({top: 0,left: 0,behavior: 'smooth'});
}

var active;
//call
function call(xx){
	document.getElementById('tool').style.left="0";
	xx.style.display="inline-block";
	active=xx;
}
//quit
function toolquit(){
	document.getElementById('tool').style.left="-101%";
	active.style.display="none";
}
//判斷游標位置
function cursor(textmid){
	var textarea=document.getElementById('msg');
	var cursor=textarea.selectionStart;
	var length=textarea.value.length;
	var texts=textarea.value.slice(0,cursor);
	var texte=textarea.value.slice(cursor,length);
	textarea.value=texts+textmid+texte;
}

//storage 開始
 //……………………………………………………………………..
var storage = firebase.storage();
//做一個簡單的檔案上傳器
 //……………………………………………………………………..
var fileButton1=document.getElementById('fileButton');
var temp;
var temp2;
fileButton1.addEventListener('change', function(e) {
	// console.log('change')
	temp=e;
	// document.getElementById('uploadimg').addEventListener('click', upimg);
	upimg();
});
function upimg(){
	document.getElementById('outbar1').classList.toggle('opacity0');
	document.getElementById('duringimg').classList.toggle('progress-bar99');
	//檔案
	var file=temp.target.files[0];
	//設定firebase上傳細節
	var storageRef = firebase.storage().ref('photo/'+file.name);
	//執行！
 	storageRef.put(file).then(function(){
 		// console.log("success");
 		var testt="https://firebasestorage.googleapis.com/v0/b/chat-da340.appspot.com/o/photo%2F"+file.name+"?alt=media&token=9d9f49eb-61e4-45f6-b060-b4f3f10ea94c";
 		textmid="<img src='"+testt+"''>";
 		cursor(textmid);
		document.getElementById('fileButton').value="";
		document.getElementById('outbar1').classList.toggle('opacity0');
		document.getElementById('duringimg').classList.toggle('progress-bar99');
 	});
 	// document.getElementById('uploadimg').removeEventListener('click',upimg);
}

var fileButton2=document.getElementById('musicFile');
fileButton2.addEventListener('change', function(e) {
	temp2=e;
	// document.getElementById('uploadmusic').addEventListener('click', upmusic);
	upmusic();
});
function upmusic(){
	document.getElementById('outbar2').classList.toggle('opacity0');
	document.getElementById('duringmusic').classList.toggle('progress-bar99');
	//檔案
	var file=temp2.target.files[0];
	//設定firebase上傳細節
	var storageRef = firebase.storage().ref('music/'+file.name);
	//執行！
 	storageRef.put(file).then(function(){
 		// console.log("success");
 		var testt="https://firebasestorage.googleapis.com/v0/b/chat-da340.appspot.com/o/music%2F"+file.name+"?alt=media&token=9d9f49eb-61e4-45f6-b060-b4f3f10ea94c";
 		textmid="<audio controls><source src='"+testt+"'></audio>";
 		cursor(textmid);
		document.getElementById('musicFile').value="";
		document.getElementById('outbar2').classList.toggle('opacity0');
		document.getElementById('duringmusic').classList.toggle('progress-bar99');
 	});
 	// document.getElementById('uploadimg').removeEventListener('click',upmusic);
}

function i(){
	var textmid=document.getElementById('i').value;
	var text="<i>"+textmid+'</i>';
	cursor(text);
	document.getElementById('i').value="";
}
function T(){
	var size=document.getElementById('select_fsize').value;
	var textmid=document.getElementById('T').value;
	var text="<span style='font-size:"+size+"';>"+textmid+"</span>";
	cursor(text);
	document.getElementById('T').value="";
}
function Aa(){
	var color=document.getElementById('insert-color').value;
	var textmid=document.getElementById('Aa').value;
	var size=document.getElementById('select_fsize').value;
	var text="<span style='color:"+color+";font-size:"+size+"'>"+textmid+"</span>";
	cursor(text);
	document.getElementById('Aa').value="";
}
//上下樓
function jumpF(){
	var B=document.getElementsByClassName('a_msg').length;
	var F=document.getElementById('Floor').value;
	if (F<=Number(B)) {
		window.location.href="#B"+F;
		document.getElementById('fath').scrollBy(0, -10);
		document.getElementById('Floor').value="";
	}
	else{
		document.getElementById('Floor').value="";
		alert('超出範圍');
		
	}
}