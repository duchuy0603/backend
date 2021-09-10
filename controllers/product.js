import Product from '../models/product';
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
                error: "error update product"
            })

        }
        const { name, description, price } = fields
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "bạn cần nhập đầy đủ các trường"
            })
        }
        let product = new Product(fields);
        if (files.photo) {

            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "ban nen up anh duoi 1mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
        }
        product.save((err, data) => {
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
    let product = req.product;
    product.remove((err, deleteproduct) => {
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
export const productData = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                message: "k tim thay san pham"
            })
        }
        req.product = product;
        next();
    })
}
export const read = (req, res) => {
    res.json(req.product);
}
export const list = (req, res) => {
   
    Product.find((err, data) => {
        if (err) {
            error: "k tim thay san pham"
        } else {
            res.json( data );
        }
    })

}
export const update = (req, res) => {
    let from = new formidable.IncomingForm();
    from.keepExtensions = true;
    from.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "k sua dc san pham"
            })
        }
        const { name, description, price } = fields
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "bạn cần nhập đầy đủ các trường"
            })
        }
        // let product = new Product(fields);
        let product = req.product;
        product = _.assignIn(product, fields);
        if (files.photo) {

            if (files.photo.size > 1000000) {
                res.status(400).json({
                    error: "ban nen up anh duoi 1mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
        }
        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "k sua dc san pham"
                })
            }
            res.json(data);

        })

    });

}
// router.get("/products/photo/:productId", photo)
export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}
