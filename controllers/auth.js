import User from '../models/user';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt'; // for authorization check
import { errorHandler } from '../helpers/dbErrorsHandler';
import dotenv from 'dotenv';
dotenv.config();



export const signup = (req, res) => {
    // console.log("request body", req.body);
    const user = new User(req.body);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({ user })
    })
}
export const signin = (req, res) => {
    console.log('hihi')
    // find the user base on email
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        // if user is found make sure email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password not match'
            })
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with  
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json(
            {
                token, user: { _id, email, name, role },messsage:"dang nhap thanh cong"
            }
        )
    })
};
export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout Success'
    })
}
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});
export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}
export const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
      return res.status(400).json({
        err: "ko c?? quy???n truy c???p",
      });
    }
    next();
  };