var jwt = require('jsonwebtoken');
const User = require('../models/User');
const { error } = require('../utils/responseWrapper');


module.exports = requireuser = async (req, res, next) => {

    try {

        if (
            !req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer")
        ) {
            // return res.send("Authorization token not found");
            return res.send(error(401, "Authorization token not found"))
        }

        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

        req._id = decode._id;

        const user = await User.findById(req._id);
        if(!user) {
            return res.send(error(404, 'User not found'));
        }

        // console.log(token, decode._id)
        next();
        
    } catch (e) {
        console.log(e)
        return res.send(error(401, "access token not found"));
    }
}