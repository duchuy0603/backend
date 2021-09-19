import express from 'express';
import { isAdmin, isAuth, requireSignin } from "../controllers/auth.js";
import { userById } from "../controllers/user.js";
import Product from '../models/product'
import { create, list, productData, read, remove,removeAll,paginatedResults, update, photo } from '../controllers/product';
const router = express.Router()


//list sp
router.get('/products', list)

// 
router.get('/news/:page', (req, res, next) => {
    let perPage = 8; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.params.page || 1; 
  
    Product
      .find() // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, products) => {
        Product.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return next(err);
           res.send(products) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
          //  res.render('product/index_product', {
          //   products, // sản phẩm trên một page
          //   current: page, // page hiện tại
          //   pages: Math.ceil(count / perPage) // tổng số các page
          // });
        });
      });
  });
 
//xoa
// add sp
router.post('/products/:userId', requireSignin,isAuth,isAdmin, create)
 router.delete('/products/:productId/:userId',requireSignin,isAuth,isAdmin, remove)
 router.delete('/products/:userId',requireSignin,isAdmin,isAuth, removeAll)
//update
router.put('/products/:productId/:userId',requireSignin,isAdmin,isAuth, update)
//chi tiet'
router.get('/products/:productId', read)
router.param('productId', productData)
router.param('pageId', paginatedResults)
router.param('userId', userById)
//doc anh
router.get('/products/photo/:productId', photo)
module.exports = router;



// router.post('/products/:userId',requireSignin,isAuth,isAdmin, create)
// router.delete('/products/:productId/:userId',requireSignin,isAuth,isAdmin, remove)
// //update
// router.put('/products/:productId/:userId',requireSignin,isAuth,isAdmin, update)
// //chi tiet'