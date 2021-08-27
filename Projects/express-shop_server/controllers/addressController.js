
const ajax = require('../api/ajax')
const {GOOGLE_API_KEY} = require('../config/config')

//get address
exports.readAddress = (req, res, next) => {

    const {latitude, longitude} = req.query
    const apiUrl= `https://maps.google.com/maps/api/geocode/json?language=EN&latlng=${latitude},${longitude}&sensor=false&key=${GOOGLE_API_KEY}`
    ajax(apiUrl) 
        .then(data => {
            res.send({status: 0, data})
        })
        .catch(error => {
            console.error('Get address exception', error)
            res.send({status: 1, msg: 'Get address exception, please try again!'})
        })
}
  