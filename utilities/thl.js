
/* -------------------------------------------------------------+
 * FILE NAME - thl.js                                           +
 * -------------------------------------------------------------+
 * Creator : Yu-Hsin Chung                                      +
 * -------------------------------------------------------------+
 * Description : Receive every changes to Brightness, IO switch +
 *               or Mode from mobile and printout               +
 * ------------------------------------------------------------*/

//set the initial value to null
	let Temperature = 'null';
    let Humidity  = 'null';
    let Lightness = 'null';

//if received new value of Temperature, reset the value
function setTemperature(T){
	Temperature = T; 
	console.log("Temperature: " + T);
}

//if received new value of Humidity, reset the value
function setHumidity(H){
	Humidity = H; 
	console.log("Humidity: " + H);
}

//if received new value of Lightness, reset the value
function setLightness(L){
	Lightness = L; 
	console.log("Lightness: " + L);
}

//get the value of Temperature from other file
function getTemperature(){
	return Temperature; 
}

//get the value of Humidity from other file
function getHumidity(){
	return Humidity; 
}

//get the value of Lightness from other file
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
