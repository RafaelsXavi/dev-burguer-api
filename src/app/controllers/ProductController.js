import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {

    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean()

        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            console.log(err);
            return response.status(400).json({ error: err.errors });
        }


        const { name, price, category_id, offer } = request.body
        const file = request.files.find(f => f.fieldname === 'file');
        if (!file) {
            return response.status(400).json({ error: 'File is required' });
        }
        const { filename } = file;


        const newProduct = await Product.create({
            name,
            price,
            category_id,
            path: filename,
            offer,
        });

        return response.status(201).json(newProduct);

    }

    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),

        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            console.log(err);
            return response.status(400).json({ error: err.errors });
        }


        const { name, price, category_id, offer } = request.body;
        const { id } = request.params;

        let path;
        const file = request.files.find(f => f.fieldname === 'file');
        if (file) {
            path = file.filename;
        }



       await Product.update({
            name,
            price,
            category_id,
            path,
            offer,
        }, {
            where: { id, },
        });

        return response.status(201).json({ message: 'Product updated successfully' });

    }

    async index(_request, response) {

        const products = await Product.findAll(
            {
                include: {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                }
            }
        );



        return response.status(201).json(products);
    }
}
export default new ProductController();
