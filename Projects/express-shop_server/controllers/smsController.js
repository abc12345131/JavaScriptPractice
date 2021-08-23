
const { randomCode, sendCode } = require('../utils/sms_utils')

//send SMS verification code
router.get('/smscode', function (req, res, next) {

    const phone = req.query.phone;
    //generate 6 digits random number
    const code = randomCode(6);
    //send code
    console.log(`Send SMS verification code to ${phone}: ${code}`);
    sendCode(phone, code, function (success) {
        if (success) {
            users[phone] = code
            console.log('Save SMS verification code: ', phone, code)
            res.send({"code": 0})
        } else {
            res.send({"code": 1, msg: 'Falied to send SMS verification code!'})
        }
    })
})