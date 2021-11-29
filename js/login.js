//初始化 firebase
var firebaseConfig = {
    apiKey: "AIzaSyBPhv7Fidjm5BUsLrpzVzYh3jYffFaV7go",
    authDomain: "chat-da340.firebaseapp.com",
    databaseURL: "https://chat-da340.firebaseio.com",
    projectId: "chat-da340",
    storageBucket: "chat-da340.appspot.com",
    messagingSenderId: "44974045198",
    appId: "1:44974045198:web:fead791b44eaf72a5c245f",
    measurementId: "G-2TVPW1RMTZ"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var uid;

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    	// User is signed in.
    	console.log('已經登入');
    	// console.log(user.email);
    	// console.log(user.emailVerified);
    	hidemodal();
    	document.getElementById('top-area').style.display="none";
    	document.getElementById('bot-area').style.display="block";
    	document.getElementById('UserPic1').style.display="inline";
    	document.getElementById('UserPic2').style.display="none";
    	call_data_out();
    	uid=user.uid;
	} else {
	// No user is signed in.
		console.log('還沒登入');
		document.getElementById('top-area').style.display="block";
		document.getElementById('bot-area').style.display="none";

		document.getElementById('UserName1').innerHTML="No Name";
		document.getElementById('UserPic1').src="img/user.png";
		document.getElementById('storename').value=document.getElementById('UserName1').innerHTML;
		document.getElementById('changeimg').src=document.getElementById('UserPic1').src;
	}
});

function login() {
	var email=document.getElementById('log-email').value;
	var pwd=document.getElementById('log-pwd').value;
	if (email!="" && pwd!=""){
		firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
			alert('Email or Password error');
			console.log(errorCode);
			console.log(errorMessage);
		});
	}else{
		alert("Email or Password can't be null");
	}
	// document.getElementById('log-email').value="";
	document.getElementById('log-pwd').value="";
}

function signup(){
	var email=document.getElementById('SignEmail').value;
	var pwd1=document.getElementById('SignPwd1').value;
	var pwd2=document.getElementById('SignPwd2').value;
	if (email!="" && pwd1!=""&&pwd2!=""){
		if (pwd1.length>=6) {
			if (pwd1==pwd2) {
				firebase.auth().createUserWithEmailAndPassword(email, pwd1).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					// ...
					alert('電子郵件已經註冊過');
				});
			}
			else{
				alert('密碼需要一致');
			}
		}
		else{
			alert('密碼最少6碼');
		}
		
	}else{
		alert("電子郵件或密碼不得為空");
	}
}

function hidemodal(){
	$("#SignUpForm").modal("hide");
	$("#Profile").modal("hide");
	document.getElementById('SignEmail').value="";
	document.getElementById('SignPwd1').value="";
	document.getElementById('SignPwd2').value="";
}

function signout(){
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
	});
}

function call_data_out(){
	db.collection("user").onSnapshot(function(querySnapshot) {

			querySnapshot.docChanges().forEach(function(doc) {
                // console.log(doc.doc.id);
                if (doc.doc.id==uid) {
                	if (doc.doc.data().name!=undefined) {
                        document.getElementById('UserName1').innerHTML=doc.doc.data().name;
                		document.getElementById('storename').value=document.getElementById('UserName1').innerHTML;
                    }
                    else{
                        document.getElementById('UserName1').innerHTML="No Name";
                		document.getElementById('storename').value=document.getElementById('UserName1').innerHTML;
                    }
                	if (doc.doc.data().pic!=undefined) {
                        document.getElementById('UserPic1').src=doc.doc.data().pic;
                        document.getElementById('changeimg').src=document.getElementById('UserPic1').src;
                    }
                    else{
                        document.getElementById('UserPic1').src="img/user.png";
                        document.getElementById('changeimg').src=document.getElementById('UserPic1').src;
                    }
                }
            });
	});
}

function storeall(){
	var name=document.getElementById('storename').value;
	var pic=document.getElementById('changeimg').src;
	var goal=db.doc('/user/'+uid);
	goal.set({
		'name':name,
		'pic': pic
	}).then(function(){
		// alert('儲存成功');
		document.getElementById('UserName1').innerHTML=name;
		document.getElementById('UserPic1').src=pic;
		hidemodal();
	}).catch(function(){

	});
}


var storage = firebase.storage();
var put_img=document.getElementById('storeimg');
var localfile;
var cloudpos;
put_img.addEventListener('change', function(e) {
	// console.log('change')
	localfile=e;
	put_pic();
	// document.getElementById('userpic-btn').addEventListener('click', put_pic);
});
function put_pic(){
	document.getElementById('outbar1').classList.toggle('opacity0');
	document.getElementById('duringupload').classList.toggle('progress-bar99');
	//檔案
	var file=localfile.target.files[0];
	//設定firebase上傳細節
	var storageRef = firebase.storage().ref('userpic/'+file.name);
	//執行！
 	storageRef.put(file).then(function(){
 		// console.log("success");
 		cloudpos="https://firebasestorage.googleapis.com/v0/b/chat-da340.appspot.com/o/userpic%2F"+file.name+"?alt=media&token=9d9f49eb-61e4-45f6-b060-b4f3f10ea94c";
 		// console.log(cloudpos);
		document.getElementById('storeimg').value="";
		document.getElementById('changeimg').src=cloudpos;
		document.getElementById('outbar1').classList.toggle('opacity0');
		document.getElementById('duringupload').classList.toggle('progress-bar99');
 	});
 	// document.getElementById('userpic-btn').removeEventListener('click',put_pic);
}

function removeModal(){
	document.getElementById('top-area').style.display="none";
    document.getElementById('bot-area').style.display="block";
    document.getElementById('UserName1').innerHTML="Visitor";
    document.getElementById('UserPic2').style.display="inline";
    document.getElementById('UserPic1').style.display="none";
}

function quit(){
	document.getElementById('top-area').style.display="block";
    document.getElementById('bot-area').style.display="none";
}
