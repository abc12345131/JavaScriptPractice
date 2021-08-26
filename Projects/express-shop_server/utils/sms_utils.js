const { 
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
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
            messagingServiceSid: 'MG6b83b0f82164d686f7d5bc57b8abe64b', 
            body: `Your BW Delivery verification code is ${code}`,
            to: phone
        })
        .then(message => console.log(message.sid))
        .then(callback(true))
        .done()

}
exports.sendCode = sendCode;