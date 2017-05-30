var util = require('util');

var bleno = require('../node_modules/bleno/index.js');
let ls = require('../utilities/lightset.js');
let thl = require('../utilities/thl.js');

var BlenoPrimaryService = bleno.PrimaryService;
var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

console.log('bleno');

let temp;

/*write characteristic arduino 101 send data to raspberry pi*/
var WriteOnlyCharacteristic = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff4',
    properties: ['write', 'writeWithoutResponse']
  });
};

util.inherits(WriteOnlyCharacteristic, BlenoCharacteristic);

WriteOnlyCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {              
  //01:Temperature, 02:Humidity, 03:Lightness, 04:control //30:turn on the light 34:increase brightness 36:decrease brightness
 // console.log('WriteOnlyCharacteristic write request: ' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  temp = data.toString('hex');
 // console.log(temp);
  let len = temp.length;
  let i,which;
  let info = '';

  for(i=0;i<len-2;i++){
    if(i%2==1){
      info = info + temp.charAt(i);
    }
  }
  which = temp.charAt(len-1);

//  console.log('//// ' + which + ' ' + info);

  if(which == 1){
    thl.setTemperature(info);
  }
  if(which == 2){
    thl.setHumidity(info);
  }
  if(which == 3){
    thl.setLightness(info);
  }
  if(which == 4){
      let IO = ls.getIO();
      let B = ls.getBrightness();
      if(info == 0){
           if(IO == 0){
              ls.setIO(1);
              console.log( "The switch is on"); 
          } 
           else{
              ls.setIO(0);
              console.log( "The switch is off"); 
          }
      }
      if(info == 4){
          ls.setBrightness(B+10);
          console.log( "Brightness : " + B+10); 
      }
      if(info == 6){
          ls.setBrightness(B-10);
          console.log( "Brightness : " + B-10); 
      }
  }
  if(which == 5){
          let Mode = ls.getMode();
          
      if(info == 1){
           ls.setMode(1);
           console.log( "Mode : 1 "); 
      }
      if(info == 2){
           ls.setMode(2);
            console.log( "Mode : 2 ");  
      }
      if(info == 3){
          ls.setMode(3);
          console.log( "Mode : 3 " );  
      }
      if(info == 5){
          ls.setMode(4);
          console.log( "Mode : 4 " ); 
      }

  }

  callback(this.RESULT_SUCCESS);
};

/*Notify characteristic raspberry pi send data to arduino 101*/
var NotifyOnlyCharacteristic = function() {
  NotifyOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff5',
    properties: ['notify']
  });
};

util.inherits(NotifyOnlyCharacteristic, BlenoCharacteristic);


NotifyOnlyCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('NotifyOnlyCharacteristic subscribe');

  this.counter = 0;
  this.changeInterval = setInterval(function() {
    var data = new Buffer(4);
    data.writeUInt32LE(this.counter, 0);

    console.log('NotifyOnlyCharacteristic update value: ' + this.counter);
    updateValueCallback(data);
    this.counter++;
  }.bind(this), 5000);
};

NotifyOnlyCharacteristic.prototype.onUnsubscribe = function() {
  console.log('NotifyOnlyCharacteristic unsubscribe');

  if (this.changeInterval) {
    clearInterval(this.changeInterval);
    this.changeInterval = null;
  }
};

NotifyOnlyCharacteristic.prototype.onNotify = function() {
  console.log('NotifyOnlyCharacteristic on notify');
};


function SampleService() {
  SampleService.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff0',
    characteristics: [
      new WriteOnlyCharacteristic(),
      new NotifyOnlyCharacteristic(),
    ]
  });
}


util.inherits(SampleService, BlenoPrimaryService);

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state + ', address = ' + bleno.address);

  if (state === 'poweredOn') {
    bleno.startAdvertising('test', ['fffffffffffffffffffffffffffffff0']);
  } else {
    bleno.stopAdvertising();
  }
});

// Linux only events /////////////////
bleno.on('accept', function(clientAddress) {
  console.log('on -> accept, client: ' + clientAddress);

  bleno.updateRssi();
});

bleno.on('rssiUpdate', function(rssi) {
  console.log('on -> rssiUpdate: ' + rssi);
});
//////////////////////////////////////

bleno.on('mtuChange', function(mtu) {
  console.log('on -> mtuChange: ' + mtu);
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new SampleService()
    ]);
  }
});

bleno.on('advertisingStop', function() {
  console.log('on -> advertisingStop');
});

bleno.on('servicesSet', function(error) {
  console.log('on -> servicesSet: ' + (error ? 'error ' + error : 'success'));
});
