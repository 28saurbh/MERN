const bcrypt = require('bcrypt')
const authData = require('../models/User');
const { error, success } = require("../utils/responseWrapper");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signupController = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        //email or password not found
        if (!email || !password || !name) {
            // res.status(400).send("All fields are required");
            return res.send(error(400, "All fields are required"));
        }

        //already user find
        const oldUser = await authData.findOne({ email });
        if (oldUser) {
            // res.status(409).send('user already exits');
            return res.send(error(409, "user already exits"))
        }

        //hash password create
        const hashPassword = await bcrypt.hash(password, 10);

        //user created
        const user = await authData.create({
            name,
            email,
            password: hashPassword,
        });

        // const newUser = await User.findById(user._id)

        // res.status(201).send(newUser.email);
        return res.send(success(201, "user created successfully"));
    }
    catch (e) {
        return res.send(error(500, e.message))
    }
}

const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;

        //email or password not found
        if (!email || !password) {
            // res.status(400).send("All fields are required");
            res.send(error(400, "All fields are required"))
            return;
        }

        //find user
        const user = await User.findOne({ email }).select('+password');

        //if user not found
        if (!user) {
            // res.status(404).send('User not found');
            res.send(error(404, "User not found"))
            return;
        }

        //match password if user found
        const matched = await bcrypt.compare(password, user.password);

        //if password not matched
        if (!matched) {
            // res.status(404).send('Incorrect password')
            res.send(error(404, "Incorrect password"))
            return;
        }

        const accessToken = generateAccessToken({
            _id: user._id
        });

        const refreshToken = generateRefreshToken({
            _id: user._id
        });

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
        });

        return res.send(success(200, { accessToken }));
    }
    catch (e) {
        return res.send(error(500, e.message))
    }
}

const logoutController = async (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
        })
        return res.send(success(200, 'user logged out'))
    } catch (e) {
        return res.send(error(500, e.message));
    }
}

const refreshController = (req, res) => {
    const cookies = req.cookies;

    //refresh token not found
    if (!cookies.jwt) {
        // return res.status(401).send("Refresh token in cookie is required");
        return res.send(error(401, "Refresh token in cookie is required"));
    }

    const refreshToken = cookies.jwt;

    console.log('refressh', refreshToken);

    try {
        const decode = jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN_SECRET_KEY);
        const _id = decode._id;
        const accessToken = generateAccessToken({ _id });
        // return res.status(201).json({ accessToken })
        return res.send(success(201, { accessToken }));

    } catch (e) {
        
        return res.send(error(401, "invalid refresh token"));
    }
}

const generateRefreshToken = (data) => {
    try {

        const token = jwt.sign(data, process.env.REFRESH_ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: "1y",
        });
        // console.log(token)
        return token;
    }
    catch (e) {
        // console.log(e);
        return
    }
}

const generateAccessToken = (data) => {
    try {

        const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: "1d",
        });
        // console.log(token)
        return token;
    }
    catch (e) {
        // console.log(e);
        return
    }
}

module.exports = {
    signupController,
    loginController,
    refreshController,
    logoutController
}