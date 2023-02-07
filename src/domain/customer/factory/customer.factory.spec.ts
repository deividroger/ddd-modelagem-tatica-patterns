import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {

    it("should create a customer", () => {
        const customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
    });

    it("it should create a customer with address", () => {

        const address = new Address("123 Main St", 123,"00000-000", "New York");

        const customer = CustomerFactory.createWithAddress("John",address);
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);
    });
});