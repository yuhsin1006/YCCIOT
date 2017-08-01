
/* ----------------------------------------------+
 * FILE NAME - upnp.js                           +
 * ----------------------------------------------+
 * Creator : Yu-Hsin Chung                       +
 * ----------------------------------------------+
 * Description : Setup the portmapping to        +
 *               implement NAT-Traversal         +
 * ---------------------------------------------*/

var natpmp = require('nat-pmp');

// create a "client" instance connecting to your local gateway
let ip = '192.168.0.1'
var client = natpmp.connect(ip);

// explicitly ask for the current external IP address
client.externalIp(function (err, info) {
  if (err) throw err;
  console.log('Current external IP address: %s', info.ip.join('.'));
});

/*******************************************NOTICE******************************************************************** */
//It may cause BIG ERROR when
//other client's ip address is the same with yours
//means your portMapping are the same

// setup a new port mapping for communicate with mobile
client.portMapping({ private: 3000, public: 3000, ttl: 3600 }, function (err, info) {
  if (err) throw err;
  console.log(info);
  // {
  //   type: 'tcp',
  //   epoch: 8922109,
  //   private: 22,
  //   public: 2222,
  //   ...
  // }
});

// setup a new port mapping for broadcasting the livestreaming
client.portMapping({ private: 9000, public: 9000, ttl: 3600 }, function (err, info) {
  if (err) throw err;
  console.log(info);
  // {
  //   type: 'tcp',
  //   epoch: 8922109,
  //   private: 22,
  //   public: 2222,
  //   ...
  // }
});

/*******************************************NOTICE******************************************************************** */