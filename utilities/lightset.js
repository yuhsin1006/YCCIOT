
/* ---------------------------------------------+
 * FILE NAME - lightset.js                      +
 * ---------------------------------------------+
 * Creator : Yu-Hsin Chung                      +
 * ---------------------------------------------+
 * Description : Modify lightsettings           +
 *               read/write file                +
 * ---------------------------------------------*/

let fs= require('fs');
let raspi = require('raspi');
let pwm = require('raspi-pwm');
let led = new pwm.PWM('P1-12');
let one = new pwm.PWM('P1-33');

	let Brightness ;
    let IO ;
    let Mode ;

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
			if(Mode == 1){
				led.write(Brightness/100);
				one.write(0);
			}
			if(Mode == 2){
				led.write(0);
				one.write(Brightness/100);
			}
			if(Mode == 3){
				led.write(Brightness/100);
				one.write(Brightness/100);
			}
			if(Mode == 4){
				led.write(0.2);
				one.write(0.8);
			}
	}
	else{
		led.write(0);
		one.write(0);
	}
	},200);
}

function setBrightness(B){
	Brightness = B; 
	if(IO == 1){
			if(Mode == 1){
				led.write(Brightness/100);
				one.write(0);
			}
			if(Mode == 2){
				led.write(0);
				one.write(Brightness/100);
			}
			if(Mode == 3){
				led.write(Brightness/100);
				one.write(Brightness/100);
			}
			if(Mode == 4){
				led.write(0.2);
				one.write(0.8);
			}
	}
	else{
		led.write(0);
		one.write(0);
	}
	write();
}

function setIO(I){
	IO = I; 
	if(IO == 1){
			if(Mode == 1){
				led.write(Brightness/100);
				one.write(0);
			}
			if(Mode == 2){
				led.write(0);
				one.write(Brightness/100);
			}
			if(Mode == 3){
				led.write(Brightness/100);
				one.write(Brightness/100);
			}
			if(Mode == 4){
				led.write(0.2);
				one.write(0.8);
			}
	}
	else{
		led.write(0);
		one.write(0);
	}
	write();
}

function setMode(M){
	Mode = M; 
	if(M == 1){
		led.write(Brightness/100);
		one.write(0);
	}
	if(M == 2){
		led.write(0);
		one.write(Brightness/100);
	}
	if(M == 3){
		led.write(Brightness/100);
		one.write(Brightness/100);
	}
	if(M == 4){
		led.write(0.2);
		one.write(0.8);
	}
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
