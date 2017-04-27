//Receive every changes to Brightness, IO switch or Mode from mobile
//and printout
let fs= require('fs');
var gpio = require('pi-gpio');


	let Brightness ;
    let IO ;
    let Mode ;
let pin = 11;

function readlightSetting(){

fs.readFile(__dirname + '/lightControl.txt', 'utf-8', function(err, data){
     //若有錯誤就列印訊息
     if (err) {
          console.error(err);
     } else {

          //將檔案內容輸入
        //  console.log(data);
          let temp = JSON.parse(data);
		  
          console.log("Brightness : " + temp.Brightness);
		  console.log("IO : " + temp.IO);
		  console.log("Mode : " + temp.Mode);

		  Brightness = temp.Brightness;
		  IO = temp.IO;
		  Mode = temp.Mode;
     }

});

}

function initialLight(){

	gpio.open(pin, "output", function(err) {
		gpio.write(pin, IO, function() {
	        
	    });
	});

}


function writeHigh(pin){
	console.log(pin + " high");
	gpio.open(pin, "output", function(err) {
	    gpio.write(pin, 1, function() {
	        gpio.close(pin);
	    });
	});
}

function writeLow(pin){
	console.log(pin + " low");
		gpio.open(pin, "output", function(err) {
	    gpio.write(pin, 0, function() {
	        gpio.close(pin);
	    });
	});
}


function setBrightness(B){
	Brightness = B; 
	write();
}

function setIO(I){
	IO = I; 
	write();
}

function setMode(M){
	Mode = M; 
	write();
}


function getBrightness(){
	return Brightness; 
}

function getIO(){
	return IO; 
}

function getMode(){
	return Mode; 
}


function write() { 

    let data = {
      	Brightness : Brightness,
	  	IO : IO,
	  	Mode : Mode
    } //要寫入檔案的內容
	let str = JSON.stringify(data);

	fs.writeFile(__dirname +'/lightControl.txt',str,function(error){ //把資料寫入檔案
    	if(error){ //如果有錯誤，把訊息顯示並離開程式
        	console.log('檔案寫入錯誤');
    	}
	});

};

module.exports = {
	readlightSetting: readlightSetting,
	initialLight: initialLight,
	getBrightness: getBrightness,
	getIO: getIO,
	getMode: getMode,
	setBrightness: setBrightness,
	setIO: setIO,
	setMode: setMode
};
