var  httpRequest = new XMLHttpRequest();
var url =  "http://www.brainyquote.com/link/quotebr.js";
var response;
var quote;
var author;

function HTMLinjection(quote, author) {
	document.getElementById('quote').innerHTML = "<h1>" + quote + "</h1>";
	document.getElementById('author').innerHTML = "<h4>-" + author + "</h4>";
}

function parsingShit(response){
	response = response.split('\n'); //splits the response into an array of strings for easier manipulation
	//here we strip the string of all the HTML syntax. It removes all elemts enclosed in (< >) the brackets. The g in the end applies the regex to the whole string, in other words it makes the selection global
	quote = response[2].replace(/<(?:.|\n)*?>/g, '');
	author = response[3].replace(/<(?:.|\n)*?>/g, '');

	var myregex = /"(.*)"/;
	var quoteArray = myregex.exec(quote);
	var authorArray = myregex.exec(author);
	if (quoteArray !== null && authorArray!== null) {
	    quote = quoteArray[1];
	    author = authorArray[1];
	    HTMLinjection(quote, author);
	}
}

function handler() { //could have been done with jquery, but I wanted to try doing it with vanilla javascript
	if (httpRequest.readyState == XMLHttpRequest.DONE) {
		if (httpRequest.status === 200){
			response = httpRequest.responseText;
			parsingShit(response);
			// console.log(quote);
			// console.log(author);
		} else if (httpRequest === 400){
			document.getElementById('error').innerText = "Something got fucked up!";
		} else {
			document.getElementById('error').innerText = "Some wierd shit went down...";
		}
	}
}

function callOtherDomain() {//could have been done with jquery, but I wanted to try doing it with vanilla javascript
  if(httpRequest) {
    httpRequest.open('GET', url, true);
    httpRequest.onreadystatechange = handler;
    httpRequest.send();
  }
}

callOtherDomain();
