import express from 'express';
import { isAdmin, isAuth, requireSignin } from "../controllers/auth.js";
import { userById } from "../controllers/user.js";
import { create, list, productData, read, remove, update, photo } from '../controllers/product';
const router = express.Router()

//list sp
router.get('/products', list)

//xoa
// add sp
router.post('/products/:userId', requireSignin, isAdmin,isAuth, create)
 router.delete('/products/:productId/:userId',requireSignin,isAdmin,isAuth, remove)
//update
router.put('/products/:productId/:userId',requireSignin,isAdmin,isAuth, update)
//chi tiet'
router.get('/products/:productId', read)
router.param('productId', productData)
router.param('userId', userById)
//doc anh
router.get('/products/photo/:productId', photo)
module.exports = router;



// router.post('/products/:userId',requireSignin,isAuth,isAdmin, create)
// router.delete('/products/:productId/:userId',requireSignin,isAuth,isAdmin, remove)
// //update
// router.put('/products/:productId/:userId',requireSignin,isAuth,isAdmin, update)
// //chi tiet'