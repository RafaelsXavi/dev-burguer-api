import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {

    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number().positive(),
            category_id: Yup.number(),
            offer: Yup.boolean(),

        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            console.log(err);
            return response.status(400).json({ error: "Validation fails", messages: err.errors });
        }


        const { name, price, category_id, offer } = request.body

        let path;
        if (request.file) {
            const { filename } = request.file;
            path = filename;
        }



        const updateProduct = await Product.update({
            name,
            price,
            category_id,
            path,
            offer,

        },
        {where: { id: request.params.id }
        });

        return response.status(201).json(updateProduct);

    }

    async index(_request, response) {

        const products = await Product.findAll(
            {
                include: {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name', 'price'],
                }
            }
        );



        return response.status(201).json(products);
    }
}
export default new ProductController();
