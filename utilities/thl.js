//Receive every changes to Brightness, IO switch or Mode from mobile
//and printout

	let Temperature = 'null';
    let Humidity  = 'null';
    let Lightness = 'null';

function setTemperature(T){
	Temperature = T; 
}

function setHumidity(H){
	Humidity = H; 
}

function setLightness(L){
	Lightness = L; 
}

function getTemperature(){
	return Temperature; 
}

function getHumidity(){
	return Humidity; 
}

function getLightness(){
	return Lightness; 
}

module.exports = {
	getTemperature: getTemperature,
	getHumidity: getHumidity,
	getLightness: getLightness,
	setTemperature: setTemperature,
	setHumidity: setHumidity,
	setLightness: setLightness
};
