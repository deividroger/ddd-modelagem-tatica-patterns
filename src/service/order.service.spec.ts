import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit tests",()=>{
    
    it("should place an order",()=> {
        const customer = new Customer("c1","customer 1");
        const item1 = new OrderItem("I1","I1",10,"P1",1);

        const order = OrderService.placeOrder(customer,[item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);


    });


    it("should get total of all orders",()=>{
        
        const item1 = new OrderItem("I1","I1",100,"P1",1)
        const item2 = new OrderItem("I2","I2",200,"P1",2)
        
        const order1 = new Order("o1","c1",[item1]);
        const order2 = new Order("o1","c1",[item2]);

        const total = OrderService.total([order1,order2]);

        expect(total).toBe(500);
   }); 
});