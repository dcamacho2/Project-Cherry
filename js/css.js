window.onload = function() {
	var background = chrome.extension.getURL('img/background.png');
	document.body.style.background = "url(" + background + ")";
	console.log(document.body.style);
}