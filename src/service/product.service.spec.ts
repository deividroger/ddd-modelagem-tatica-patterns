import Product from "../entity/Product"
import ProductService from "./product.service"

describe("Product service unit test", ()=>{

    it("should change the price of all products",()=>{
      const product1 = new Product("product1","Product Name",10)
      const product2 = new Product("product2","Product Name",20)
      
      const products = [product1,product2];

      ProductService.increasePrice(products,100);

      expect(product1.price).toBe(20);
      expect(product2.price).toBe(40);

    })

})