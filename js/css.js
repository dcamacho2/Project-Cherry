window.onload = function() {
	var background = chrome.extension.getURL('img/noon.png');
	document.body.style.background = "url(" + background + ")";
	console.log(document.body.style);
}