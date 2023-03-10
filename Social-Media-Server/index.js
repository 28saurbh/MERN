const express = require('express')
const DbConnect = require('./DbConfig')
const dotenv = require("dotenv");
const morgan = require('morgan')
const authRouter = require('./routes/authRoutes')
const postRouter = require('./routes/postRoute')
const userRouter = require('./routes/userRouter')
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");
const cloudinary = require('cloudinary').v2;

// env.config();
dotenv.config("./.env");

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json({limit: '10mb'}));
app.use(morgan('common'))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    // origin: "https://2c23-2401-4900-55a5-86d0-91d2-ec7c-6ce-8592.in.ngrok.io",
}))
DbConnect();

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/user', userRouter)



app.listen(process.env.PORT, () => {
    console.log("App running...", process.env.PORT)
})