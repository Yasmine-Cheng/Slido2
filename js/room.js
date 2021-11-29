
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
var _name="Visitor";
var _pic="img/user.png";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log('已經登入');
        // console.log(user.email);
        uid=user.uid;
        call_data_out()
        document.getElementById('beenTo').innerHTML="";
    } else {
    // No user is signed in.
        console.log('還沒登入');
        console.log(uid);
    }
});
var list_been=[];
function call_data_out(){
    db.collection("user").onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(doc) {
            if (doc.doc.id==uid) {
                _name=doc.doc.data().name;
                _pic=doc.doc.data().pic;
                var xx=document.createElement('div');
                var yy=document.createElement('img');
                var zz=document.createElement('span');
                yy.src=_pic;
                zz.innerHTML=_name;
                xx.append(yy);
                xx.append(zz);
                document.getElementById('beenTo').append(xx);
                db.collection("user").doc(uid).collection("beento").onSnapshot(function(querySnapshot) {
                    querySnapshot.docChanges().forEach(function(doc) {
                        // console.log(doc.doc.data().name);
                        var divTo=document.createElement('div');
                        var room_name=doc.doc.data().name;
                        divTo.innerHTML=room_name;
                        list_been.push(room_name);
                        console.log(list_been);
                        divTo.setAttribute("onclick", "jump(this)");
                        document.getElementById('beenTo').append(divTo);
                    });
                });
            }
        });
    });
    
}

//連結參數處理
var enter_rooms_no;
function begin(){
    var x=location.href;
    var xx=new URL(x);
    var y= xx.search.toString();
    enter_rooms_no=y;
    var z=decodeURI(y);
    if (y=='') {
        console.log('nothing');
        document.getElementById('msg').disabled=true;
    }
    else{
        zz=z.split('=')[1];
        console.log(zz);
        document.getElementById('location').innerHTML=zz;
        snapdata(zz);
        enter_rooms_no=zz;
        document.title = zz+"-Slido2";
    }
}

function jump(rr){
    var loc=rr.innerHTML;
    var href="room.html?room="+loc;
    var new_href=encodeURI(href);
    location.href=new_href;
}

$(document).ready(function(){
    // var ww=$('.main-right').outerWidth();
	$('#button').click(function(){
	  $('.main-right').toggleClass('none');
	  $('.main-left').toggleClass('wid70');
      // console.log(ww);
      // if (document.getElementById('goTop').style.right==(String(ww+30)+'px')) {
      //   document.getElementById('goTop').style.right='30px';
      // }
      // else{
      //   document.getElementById('goTop').style.right=String(ww+30)+'px';
      // }
	});
});
var tempD;
//snap msg
function snapdata(x) {
    var countnum=1;
    db.collection("rooms").doc(x).collection("messages").onSnapshot(function(querySnapshot) {
        if (x==document.getElementById('location').innerHTML) {
            querySnapshot.docChanges().forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                // console.log(countnum);
                var div1=document.createElement('div');
				div1.classList.add('a_msg');
				div1.id='B'+countnum;
				var span=document.createElement('span');
				span.classList.add('msg_time');
				var date=new Date(Number(doc.doc.data().sendTime));
				span.innerHTML=deal(date);
                var DMY=deal2(date);
                if (DMY==tempD) {

                }
                else{
                    var divDMY=document.createElement('div');
                    divDMY.classList.add('DMY');
                    divDMY.innerHTML=DMY;
                    document.getElementById('fath').append(divDMY);
                    tempD=DMY;
                }
				var div2=document.createElement('div');
				div2.classList.add('a_msg_1');
				var img=document.createElement('img');
				if (doc.doc.data().pic!=undefined) {
                    img.src=doc.doc.data().pic;
                }
                else{
                    img.src="img/user.png";
                }
				var div3=document.createElement('div');
				div3.innerHTML=doc.doc.data().user;
				var div4=document.createElement('div');
				div4.classList.add('msg-content');
				div4.innerHTML=doc.doc.data().message;
				div2.append(img);
				div2.append(div3)
				div1.append(span);
				div1.append(div2);
				div1.append(div4);
				document.getElementById('fath').append(div1);
                countnum+=1;
            });
        }
        else{
            return false;
        }
    });
}

function storedata() {
    if (enter_rooms_no=='') {
        alert('請先選擇房間');
        return false;
    }

    var d=new Date().getTime();
    var dt=String(d);
    var messageRef = db.doc('/rooms/'+enter_rooms_no+'/messages/'+dt);
    // var messageRef = db.collection('rooms').doc('roomA').collection('messages').doc(x); 功用同上
    var beento= db.doc('/user/'+uid+'/beento/'+enter_rooms_no);
    var user=_name;
    var pic=_pic;
    var textarea=document.getElementById('msg').value;
    if (textarea.trim()=="") {
        return alert('內容不可為空!!!');
    }else{
        messageRef.set({
            'user': user,
            'message':textarea,
            'sendTime':dt,
            'pic': pic
        })
        .then(function() {
            console.log("Document has been written");
            scrollToBottom();
        })
        .catch(function() {
            console.error("Error adding document");
        });
        document.getElementById('msg').value="";
        if (uid!=undefined) {
            var boo;
            for (var i = list_been.length - 1; i >= 0; i--) {
                if (list_been[i]==enter_rooms_no) {
                    boo=true;
                    break
                }
            }
            if (boo===true) {
                console.log('已經存在了');
            }
            else{
                beento.set({
                    'name':enter_rooms_no
                })
                .then(function() {
                    console.log("room_name has been written");
                })
                .catch(function() {
                    console.error("Error adding document");
                });
            }    
        }
    }

}

//Enter send
window.addEventListener('keydown',function(e){
    if (e.keyCode==13) {
        storedata();
    }
})

function scrollToBottom(){
    var elem = document.getElementById('fath');
    // console.log(elem.scrollHeight);
    elem.scrollTop = elem.scrollHeight;
    document.getElementById('fath').scrollTo(0, elem.scrollHeight);
};