const protect = async (req, res, next) => {
    const user = req.cookies.user_id

    if(!user) {
        return res.status(401).json({status: 'fail', message: 'Unauthorized'})
    }

    next()
}

module.exports = protect 