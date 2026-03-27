import Category from '../models/Category.js';
import Product from '../models/Product.js';

class ProductController {
  async store(request, response) {
    const { name, price, category_id, offer = false } = request.body;

    const file = request.files?.find((f) => f.fieldname === 'file');
    if (!file) {
      return response.status(400).json({
        error: 'File is required',
        message: 'Please upload a product image',
      });
    }

    const { filename } = file;

    // Verify category exists
    const category = await Category.findByPk(category_id);
    if (!category) {
      return response.status(404).json({
        error: 'Category not found',
        message: 'The specified category does not exist',
      });
    }

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
    const { name, price, category_id, offer } = request.body;
    const { id } = request.params;

    // Verify product exists
    const product = await Product.findByPk(id);
    if (!product) {
      return response.status(404).json({
        error: 'Product not found',
        message: 'The specified product does not exist',
      });
    }

    // Verify category exists if provided
    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        return response.status(404).json({
          error: 'Category not found',
          message: 'The specified category does not exist',
        });
      }
    }

    let path;
    const file = request.files?.find((f) => f.fieldname === 'file');
    if (file) {
      path = file.filename;
    }

    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: { id },
      },
    );

    return response.status(200).json({
      message: 'Product updated successfully',
      product: { id, name, price, category_id, path, offer },
    });
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });

    return response.status(200).json(products);
  }
}

export default new ProductController();
