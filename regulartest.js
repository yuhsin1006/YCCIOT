/*
var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 30 11 * * 1-5',
  onTick: function() {
    
    // * Runs every weekday (Monday through Friday)
    // * at 11:30:00 AM. It does not run on Saturday
    // * or Sunday.
     
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();
*/

/*      TimeSet
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6
*/
var request = require('request-promise-native')
var cron = require('cron');

var cronJob = cron.job("0 * * * * *", function(){
    // perform operation e.g. GET request http.get() etc.
    request.post('http://120.107.172.236:3000/devices/').then(v => {
        console.dir(JSON.parse(v))
    }).catch(e => {
        console.error(e)
    })

    console.info('cron job completed');

}); 
cronJob.start();
