
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id:  entity.id,
            name: entity.name,
            number: entity.Address.number,
            zipcode: entity.Address.zip,    
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.Address.street,

        });
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            number: entity.Address.number,
            zipcode: entity.Address.zip,    
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.Address.street,
        }, {
            where: {
                id: entity.id
            }
        });
    }

    async find(id: string): Promise<Customer> {

        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id: id,
                }, rejectOnEmpty: true
            });    
        } catch (error) {
            throw Error('Customer not found');   
        }

        const customerResult =  new Customer(customerModel.id, customerModel.name);
        customerResult.changeAddress( new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city));

        return customerResult; 
    }

    async findAll(): Promise<Customer[]> {
        
        const customerModels = await CustomerModel.findAll();
        
       let customers = customerModels.map(customerModel => {
            const customer = new Customer(customerModel.id, customerModel.name);
            customer.changeAddress(new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city));
            return customer;
        });
        return customers;
    }
}