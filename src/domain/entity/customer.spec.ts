import Address from "./address";
import Customer from "./customer";

describe("Customer Unit tests",()=>{

    it("Should throw error when Id is empty", ()=>{
        expect(()=> {
             new Customer('','Teste');
        }).toThrowError('Id is required')

    });

    it("Should throw error when Name is empty", ()=>{
        expect(()=> {
            new Customer('123','');
        }).toThrowError('Name is required')

    });

    it('Should change name',()=>{
        const customer = new Customer('123','Name');

        customer.changeName('Santos');
        
        expect(customer.name).toBe('Santos');

    });

    it('Should activate customer',()=>{

        const customer = new Customer('1','Customer 1');
        const address = new Address('Rua',10,'0000-000','São Paulo');

        customer.changeAddress(address);

        customer.activate()

        expect(customer.isActive()).toBe(true);

    });

    it('Should deactivate customer',()=>{

        const customer = new Customer('1','Customer 1');
        

        customer.deactivate();

        expect(customer.isActive()).toBe(false);

    });

    it('Should throw error when address is undefined when you activate a customer',()=>{


        expect(()=>{
            const customer = new Customer('1','Customer 1');
        
            customer.activate();

        }).toThrowError('Address is mandatory to activate a customer');
    });

    it("should add reward points",()=>{
        const customer = new Customer("1","Customer 1");
        
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(20);
    })

});