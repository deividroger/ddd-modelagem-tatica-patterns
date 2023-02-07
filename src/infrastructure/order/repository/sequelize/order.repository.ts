import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => {
                return {
                    id: item.id,
                    product_id: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }
            })

        }, {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {

        await OrderModel.destroy({	where: { id: entity.id }});

        await this.create(entity);

    }

    async find(id: string): Promise<Order> {

        let orderFound;

        try {
            orderFound = await OrderModel.findOne(
                {
                    where: {
                        id: id
                    },
                    include: ["items"],
                    rejectOnEmpty: true
                }
            );
        } catch (error) {
            throw new Error("Order not found");
            
        }
        const items = orderFound.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
        const order = new Order(orderFound.id, orderFound.customer_id, items);

        return order;
    }


   async findAll(): Promise<Order[]> {
        const ordersModel = OrderModel.findAll({ include: ["items"] });

        const orders = (await ordersModel).map(orderModel => {
            return new Order(orderModel.id, orderModel.customer_id, orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)));
        });

        return orders;
    }

}