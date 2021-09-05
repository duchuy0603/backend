import express from 'express';
import { create, list, catedata, read, remove, update } from '../controllers/category';
import { isAdmin, isAuth, requireSignin } from "../controllers/auth.js";
import { userById } from "../controllers/user.js";
const router = express.Router();

router.get('/categories', list);
router.get('/categories/:cateid', read);
router.post('/categories/:userId', requireSignin, isAuth, isAdmin, create)
 router.delete('/categories/:cateid/:userId',requireSignin,isAuth,isAdmin, remove)
//update
router.put('/categories/:cateid/:userId',requireSignin,isAuth,isAdmin, update)

router.param('cateid', catedata)
router.param('userId', userById)

module.exports = router;


