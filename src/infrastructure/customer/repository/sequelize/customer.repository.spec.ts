import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("customer repository test", () => {

    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force:true}
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach( async() => {
        await sequelize.close();
    });
    
    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1","Customer 1");
        
        customer.changeAddress(new Address("street 1",1,"1234","city 1"));

        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({where: {
            id: "1"
        }});
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: customer.Address.street,
            number: customer.Address.number,
            zipcode: customer.Address.zip,
            city: customer.Address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1","Customer 1");
        
        customer.changeAddress(new Address("street 1",1,"1234","city 1"));

        await customerRepository.create(customer);

        customer.changeName('Customer 2');
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {
            id: "1"
        }});
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: customer.Address.street,
            number: customer.Address.number,
            zipcode: customer.Address.zip,
            city: customer.Address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1","Customer 1");
        
        customer.changeAddress( new Address("street 1",1,"1234","city 1"));

        await customerRepository.create(customer);

        const customerFound = await customerRepository.find("1");

        expect(customer).toStrictEqual(customerFound);
    });

    it("should thorw an error when customer not found", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1","Customer 1");
        
        customer.changeAddress( new Address("street 1",1,"1234","city 1"));

        await customerRepository.create(customer);

        await expect(customerRepository.find("2")).rejects.toThrowError("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1","Customer 1");
        
        customer.changeAddress( new Address("street 1",1,"1234","city 1"));

        await customerRepository.create(customer);

        const customer2 = new Customer("2","Customer 2");
        
        customer2.changeAddress( new Address("street 2",2,"1234","city 2"));

        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toContainEqual(customer);
        expect(customers).toContainEqual(customer2);

        expect(customers).toHaveLength(2);

    });

});