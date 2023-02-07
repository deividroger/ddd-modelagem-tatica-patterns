import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/Product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";
import {v4 as uuid} from 'uuid';

describe("order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "1234", "city 1");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("123", "Product 1", 10);

        await productRepository.create(product);

        const orderItem = new OrderItem("123", product.name, product.price, product.id, 2);

        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();

        await orderRepository.create(order);


        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id,

            }, include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: "123",
                product_id: "123"
            }]
        });

    });

    it("should replace an order", async () =>  {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "1234", "city 1");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("123", "Product 1", 10);

        await productRepository.create(product);

        const orderItem = new OrderItem("123", product.name, product.price, product.id, 2);

        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();

        await orderRepository.create(order);

        let orderFound = await orderRepository.find("123");

        orderFound.addItem(new OrderItem(uuid(), product.name, product.price, product.id, 3));

        await orderRepository.update(orderFound);

        orderFound = await orderRepository.find("123");

         expect(orderFound.items).toHaveLength(2);

    });


    it("should find an order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "1234", "city 1");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("123", "Product 1", 10);

        await productRepository.create(product);

        const orderItem = new OrderItem("123", product.name, product.price, product.id, 2);

        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();

        await orderRepository.create(order);

        const orderFound = await orderRepository.find("123");

        expect(orderFound).toStrictEqual(order);

    });

    it("should throw an error when order not found", async () => {

        const orderRepository = new OrderRepository();

        await expect(orderRepository.find("123")).rejects.toThrow("Order not found");
    });

    it("should find all orders", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "1234", "city 1");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("123", "Product 1", 10);

        await productRepository.create(product);

        const orders = [];

        const orderRepository = new OrderRepository();
       
        for (let index = 1; index <= 3; index++) {

            const orderItem = new OrderItem(uuid(), product.name, product.price, product.id, 2);

            const order = new Order(uuid(), customer.id, [orderItem]);

            await orderRepository.create(order);

            orders.push(order);
        }

        const ordersFound = await orderRepository.findAll();

        expect(ordersFound).toStrictEqual(orders);

    });

});