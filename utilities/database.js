//Receive every changes to Brightness, IO switch or Mode from mobile
//and printout
function Received() { 

	var Brightness;
    var IO;
    var Mode 

	this.setBrightness = function(B) { 
		Brightness = B; 
        console.log('Brightness: ' + Brightness); 
	}; 
    this.setIO = function(I) { 
		IO = I; 
        console.log('IO: ' + IO); 
	}; 
    this.setMode = function(M) { 
		Mode = M; 
        console.log('Mode: ' + Mode); 
	}; 

}; 
module.exports = Received;