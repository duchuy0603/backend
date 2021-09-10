import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './router/product';
import categoriesRouter from './router/category';
import authen from './router/auth';
import cartrouter from './router/cart'
import expressValidator from 'express-validator';
const cors = require("cors");

const app = express();
dotenv.config();
app.use(express.json());
app.use(expressValidator());
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
//config
//connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

}).then(() => {
    console.log("database da ket noi");
});
mongoose.connection.on('error', err => {
    console.log(`database connect failed,${err.message}`)
})
//router
app.use(morgan('dev'));
const port = process.env.PORT || 8000;

app.use('/api', productRouter);
app.use('/api', categoriesRouter);
app.use('/api', cartrouter);
// app.use('/api', userRouter);
app.use('/api', authen);


app.listen(port, () => {
    console.log(`server is runing on port:${port}`)
})