import Category from '../models/categories';
import formidable from 'formidable';

import _ from 'lodash';

export const create = (req, res) => {
    let from = new formidable.IncomingForm();
    from.keepExtensions = true;
    from.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "error update category"
            })
        }
        const { name } = fields
        if (!name) {
            return res.status(400).json({
                error: "bạn cần nhập đầy đủ các trường"
            })
        }
        let category = new Category(fields)
        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "k them dc  danh muc"
                })
            }
            res.json(data);
        })
    });
}
export const catedata = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                message: "k tim thay id"
            })
        }
        req.category = category;
        next();
    })
}
export const list = (req, res) => {
    Category.find((err, category) => {
        if (err) {
            error: "error"
        } else {
            res.json(category );
        }
    })
}
export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                message: "k xoa dc danh muc"
            })
        } else {
            res.json({ category, message: "xoa sp thanh cong" });
        }

    })
}
export const read = (req, res) => {
    console.log(req.category)
    res.json(req.category);
}
export const update = (req, res) => {
    let from = new formidable.IncomingForm();
    from.keepExtensions = true;
    from.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "k sua dc danh muc"
            })
        }
        const { name } = fields
        if (!name) {
            return res.status(400).json({
                error: "bạn cần nhập đầy đủ các trường"
            })
        }
        // let product = new Product(fields);
        let category = req.category;
        category = _.assignIn(category, fields);

        category.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "k sua dc danh muc"
                })
            }
            res.json(data);

        })

    });

}
