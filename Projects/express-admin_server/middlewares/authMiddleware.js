const protect = (req, res, next) => {
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