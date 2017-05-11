
'use strict'

require('timers');
var natUpnp = require('nat-upnp');
var client = natUpnp.createClient();


// keep request the router to make sure the mapping is alive
function portMapping (ttl) {
    var config = {
        public: 6666,
        private: 3000,
        ttl: ttl
    };

    setTimeout(client.portMapping(config , function (err) {
        // Will be called once finished
        if (err) {
            console.log(err);
            console.log('[Warning: UPnP port mapping failed]\n');
        } else {
            console.log('Request for port mapping valids for ' + ttl + ' seconds');
        }
    }), (ttl-1) * 1000);
}

portMapping(86400);