function toggleNav () {
	var w = document.getElementById("sideNav").style.width;
	console.log(w);
	if ( "60vw" === w ) {
		console.log('1');
	    document.getElementById("sideNav").style.width = "0";
	} else {
		console.log('2');
		document.getElementById("sideNav").style.width = "60vw";
	}
}