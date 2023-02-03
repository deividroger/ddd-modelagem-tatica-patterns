import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests",()=>{

    it("Should throw error when Id is empty", ()=>{
        
        expect(()=>{
            let order = new Order("","123",[]);
        }).toThrowError("Id is required")

    });

    it("Should throw error when CustomerId is empty", ()=>{
        
        expect(()=>{
            let order = new Order("123","",[]);
        }).toThrowError("CustomerId is required")
    });

    it("Should throw error when CustomerId is empty", ()=>{
        
        expect(()=>{
            let order = new Order("123","123",[]);
        }).toThrowError("Item qtd must be greater than zero")
    });

    it("Should calculate total", ()=>{
        const item = new OrderItem('i1','item 1', 100,"p1",2);
        const item2 = new OrderItem('i2','item 2', 100,"p2",2);

        const order = new Order('o1','c1',[item,item2]);

        const total = order.total();

        expect(total).toBe(400);

    });

    it("Should throw error if the item qtd is less or equal zero", ()=>{
        
        expect(()=>{

        const item = new OrderItem('i1','item 1', 100,"p1",0);
        const order = new Order('o1','c1',[item]);
        
        }).toThrowError("Quantity must be greater than 0");
        
    });

});