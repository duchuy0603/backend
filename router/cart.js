import express from 'express';
import { create, list, cartData, read, remove,removeAll } from '../controllers/cart';

// import { userById } from "../controllers/user.js";
const router = express.Router();

router.get('/cart', list);
router.get('/cart/:cateid', read);
router.post('/cart', create)
 router.delete('/cart/:cateid', remove)
 router.delete('/cart', removeAll)
//update
// router.put('/categories/:cateid/:userId',requireSignin,isAuth,isAdmin, update)

router.param('cateid', cartData)
// router.param('userId', userById)

module.exports = router;


