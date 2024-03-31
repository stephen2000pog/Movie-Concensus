const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async (req, res, next) => {
    //verify auth
    const {authorization} = req.headers
    if (!authorization) {
        console.log("no token authorization")
        return res.status(401).json({ error: 'Authorization token required' })
    }
    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, "secretwordfortestingpuposesforthetokeninm5151")
        console.log(_id)
        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not verified' })
    }

}

module.exports = requireAuth