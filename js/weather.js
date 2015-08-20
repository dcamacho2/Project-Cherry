var city;
var currentWeather;
var lowWeather;
var highWeather;

function displayInfo(c) {
	document.getElementById('city').innerHTML = '<p>' + c + '<p/>';
}

function getWeatherInfo(info, unit){
	var request = new XMLHttpRequest();
	var method = 'GET';
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + info + '&units=' + unit;
	var async = true;

	request.open(method, url, async);
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var data = JSON.parse(request.responseText);
			currentWeather = data.main.temp;
			lowWeather = data.main.temp_max;
			highWeather = data.main.temp_min;
			console.log(currentWeather);
			console.log(lowWeather);
			console.log(highWeather);
		}
	};
	request.send();
};

function getCityInfo(latitude,longitude){
	var request = new XMLHttpRequest();
	var method = 'GET';
	var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
	var async = true;

	request.open(method, url, async);
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var data = JSON.parse(request.responseText);
			var address = data.results[0].formatted_address;
			address = address.split(',');
			city = address[1];
			getWeatherInfo(city, 'imperial');
			displayInfo(city);
			console.log(address[1])
		}
	};
	request.send();
};

function geoSuccess (position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	getCityInfo(latitude, longitude);
	console.log(latitude, longitude);
}

function geoError() {
	console.log('Something got fucked up!')
}

if ("geolocation" in navigator) { //check if browser is supports geolocation
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
} else {
	console.log('will not work');
}