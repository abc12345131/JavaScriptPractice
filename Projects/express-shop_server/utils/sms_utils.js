const { 
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_SERVICE_ID
} = require('../config/config')

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);



//fixed length random number
function randomCode(length) {
    var chars = ['0','1','2','3','4','5','6','7','8','9'];
    var result = ""; 
    for(var i = 0; i < length ; i ++) {
        var index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}

exports.randomCode = randomCode;

//send verification code
function sendCode(phone, code, callback) {

    client.messages
        .create({
            messagingServiceSid: TWILIO_SERVICE_ID, 
            body: `Your BW Delivery verification code is ${code}`,
            to: phone
        })
        .then(message => console.log(message.sid))
        .then(callback(true))
        .done()

}
exports.sendCode = sendCode;