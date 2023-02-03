import Product from "./Product";

describe('Product unit tests', ()=> {
    
    it("Should throw error when Id is empty", ()=>{
        
        expect(()=>{
            const product = new Product("","Product 1", 100);
        }).toThrowError("Id is required")

    });

    it("Should throw error when Name is empty", ()=>{
        
        expect(()=>{
            const product = new Product("12","", 100);
        }).toThrowError("Name is required")

    });

    it("Should throw error when Price is less than zero", ()=>{
        
        expect(()=>{
            const product = new Product("12","Product 1", -1);
        }).toThrowError("Price must be greater than zero")

    });

    it('Should change name',()=>{
        const product = new Product("12","Product 1", 100);

        product.changeName( "Product 2");

        expect(product.name).toBe('Product 2');

    });

    it('Should change Price',()=>{
        const product = new Product("12","Product 1", 100);

        product.changePrice(150);

        expect(product.price).toBe(150);

    });
    
})