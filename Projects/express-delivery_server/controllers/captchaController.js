
const svgCaptcha = require('svg-captcha')

//get one-time captcha
exports.readCaptcha = (req, res, next) => {
    const captcha = svgCaptcha.create({
        ignoreChars: '0o1l',
        noise: 2,
        color: true
    });
    req.session.captcha = captcha.text.toLowerCase();
    console.log(req.session.captcha)
    res.type('svg');
    res.send(captcha.data)
}