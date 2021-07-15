//const { verify } = require('../utils/jsonwebtoken')
//const { JWT_SECRET } = require('../config/config')

const protect = async (req, res, next) => {
    //use jsonwebtoken
    // let token = req.headers['authorization']
    // token = token? token.split('Bearer ')[1]:null
    // if(!token) {
    //     return res.status(401).json({status: 'fail', message: 'Unauthorized'})
    // }

    // try {
    //     const decodedToken = await verify(token, JWT_SECRET)
    //     next()
    // } catch {
    //     return res.status(401).json({status: 'fail', message: 'Unauthorized'})
    // }

    //use cookie
    const user = req.cookies.user_key

    //use session
    //const {user} = req.session

    if(!user) {
        return res.status(401).json({status: 'fail', message: 'Unauthorized'})
    }

    next()
}

module.exports = protect 