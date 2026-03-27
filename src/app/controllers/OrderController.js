import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../schemas/Order.js';

class OrderController {
  async store(request, response) {
    const { userId, userName } = request;
    const { products } = request.body;

    const productsIds = products.map((product) => product.id);

    const findedProducts = await Product.findAll({
      where: {
        id: productsIds,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    if (findedProducts.length !== products.length) {
      const foundIds = findedProducts.map((p) => p.id);
      const missingIds = productsIds.filter((id) => !foundIds.includes(id));
      return response.status(404).json({
        error: 'Products not found',
        message: `Products with IDs ${missingIds.join(', ')} do not exist`,
      });
    }

    const mappedProducts = findedProducts.map((product) => {
      const requestProduct = products.find((p) => p.id === product.id);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url || `http://localhost:3001/files/${product.path}`,
        category: product.category.name,
        quantity: requestProduct.quantity,
      };
    });

    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products: mappedProducts,
      status: 'Pedido realizado',
    };

    const newOrder = await Order.create(order);

    return response.status(201).json(newOrder);
  }

  async update(request, response) {
    const { status } = request.body;
    const { id } = request.params;

    const validStatuses = [
      'Pedido realizado',
      'Em preparação',
      'Entrega em andamento',
      'Entregue',
    ];
    if (!validStatuses.includes(status)) {
      return response.status(400).json({
        error: 'Invalid status',
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const result = await Order.updateOne({ _id: id }, { status });

    if (result.matchedCount === 0) {
      return response.status(404).json({
        error: 'Order not found',
        message: 'Order with the specified ID was not found',
      });
    }

    return response.status(200).json({
      message: 'Order status updated successfully',
      status,
    });
  }

  async index(_request, response) {
    const orders = await Order.find();
    return response.status(200).json(orders);
  }
}

export default new OrderController();
