//處理時間
function deal(date){
	var h=date.getHours();
	var min=date.getMinutes();
	if (h<10) {
		h="0"+h;
	}
	if (min<10) {
		min="0"+min;
	}
	return h+':'+min;
}
function deal2(date){
	var a=date.getFullYear();
	var b=date.getMonth()+1;
	if (b<10){
		b="0"+b;
	}
	var c=date.getDate();
	if (c<10){
		c="0"+c;
	}
	var abc=b+'/'+c+'/'+a;
	// console.log(abc);
	return abc;
}