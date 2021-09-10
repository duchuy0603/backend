import Cart from '../models/cart';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

// export const create=(req, res) =>{
//     //truy van them san pham
//     const product=new Product(req.body);
//     product.save((err,data)=>{
//         if(err){
//             res.status(400).json({
//                 error:"add product failed"
//             })
//         }
//         res.json(data);
//     })
// }

export const create = (req, res) => {
    let from = new formidable.IncomingForm();
    from.keepExtensions = true;
    from.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "error update cart"
            })

        }
        const { name,  price } = fields
        if (!name ||  !price) {
            return res.status(400).json({
                error: "bạn cần nhập đầy đủ các trường"
            })
        }
        let cart = new Cart(fields);
        if (files.photo) {

            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "ban nen up anh duoi 1mb"
                })
            }
            cart.photo.data = fs.readFileSync(files.photo.path);
            cart.photo.contentType = files.photo.path;
        }
        cart.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "k them dc san pham"
                })
            }
            res.json(data);

        })

    });

}

export const remove = (req, res) => {
    let cart = req.cart;
    cart.remove((err, deleteproduct) => {
        if (err) {
            return res.status(400).json({
                message: "k xoa dc san pham"
            })
        }
        res.json(
            {
                deleteproduct,
                message: "xoa sp thanh cong"
            });
    })

}
export const cartData = (req, res, next, id) => {
    Cart.findById(id).exec((err, cart) => {
        if (err || !cart) {
            res.status(400).json({
                message: "k tim thay san pham"
            })
        }
        req.cart = cart;
        next();
    })
}
export const read = (req, res) => {
    res.json(req.cart);
}
export const list = (req, res) => {
   
    Cart.find((err, data) => {
        if (err) {
            error: "k tim thay san pham"
        } else {
            res.json( data );
        }
    })

}

// router.get("/products/photo/:productId", photo)
export const photo = (req, res, next) => {
    if (req.cart.photo.data) {
        res.set("Content-Type", req.cart.photo.contentType);
        return res.send(req.cart.photo.data);
    }
    next();
}
