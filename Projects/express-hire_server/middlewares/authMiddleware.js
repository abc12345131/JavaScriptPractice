const protect = async (req, res, next) => {
    const userId = req.cookies.user_id

    if(!userId) {
        return res.status(401).json({status: 'fail', message: 'Unauthorized'})
    }

    next()
}

module.exports = protect 