import express from 'express';
import { create, list, commentdata, read, remove, update,photo } from '../controllers/comment';
import { isAdmin, isAuth, requireSignin } from "../controllers/auth.js";
import { userById } from "../controllers/user.js";
const router = express.Router();

router.get('/comment', list);
router.get('/comment/:comid', read);
router.post('/comment',create)
 router.delete('/comment/:comid/:userId',requireSignin,isAuth,isAdmin, remove)
//update
router.put('/comment/:comid/:userId',requireSignin,isAuth,isAdmin, update)

router.param('comid', commentdata)
router.param('userId', userById)

module.exports = router;


