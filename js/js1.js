var y=document.body.clientHeight;
var block=document.getElementById('block-B').offsetHeight;
// console.log(block);
function down1() {
	document.documentElement.scrollTop = y;
}

function down2() {
	document.documentElement.scrollTop = y+block;
}

function up1() {
	document.documentElement.scrollTop = 0;
}

function up2() {
	document.documentElement.scrollTop = y;
}

var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
