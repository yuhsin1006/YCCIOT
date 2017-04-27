//Receive every changes to Brightness, IO switch or Mode from mobile
//and printout
let fs= require('fs');
let raspi = require('raspi');
let pwm = require('raspi-pwm');
let led = new pwm.PWM('P1-12');

	let Brightness ;
    let IO ;
    let Mode ;

let pin = 12;

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

	setTimeout(function(){
		if(IO == 1){
			led.write(Brightness/100);
		}
		else{
			led.write(0);
		}
	},200);
}

function setBrightness(B){
	Brightness = B; 
	if(IO == 1){
		led.write(Brightness/100);
	}
	write();
}

function setIO(I){
	IO = I; 
	if(IO == 1){
		led.write(Brightness/100);
	}
	else{
		led.write(0);
	}
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
