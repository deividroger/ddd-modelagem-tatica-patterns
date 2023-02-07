import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer/customer-created.event";
import LogInformationWhenCustomerAddressChangedHandler from "../customer/handlers/log-information-when-customer-address-changed.handler";
import LogInformationWhenCustomerIsCreatedHandler from "../customer/handlers/log-information-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handlers/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10,
            email: "client@client.net"
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });

    it("should notify customer was created event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new LogInformationWhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        new Customer("123", "teste", () => {
            const customerCreatedEvent = new CustomerCreatedEvent({
                message: `Esse é o primeiro console.log do evento: CustomerCreated`
            });

            eventDispatcher.notify(customerCreatedEvent);
        });

        expect(spyEventHandler).toHaveBeenCalled();

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();

    });

    it("should notify customer changed address event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new LogInformationWhenCustomerIsCreatedHandler();

        const addressChangedHandler = new LogInformationWhenCustomerAddressChangedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", addressChangedHandler);

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventAddressHandler = jest.spyOn(addressChangedHandler, "handle");

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(addressChangedHandler);

        const customer = new Customer("1", "João", () => {

            const customerCreatedEvent = new CustomerCreatedEvent({
                message: `Esse é o primeiro console.log do evento: CustomerCreated`
            });

            eventDispatcher.notify(customerCreatedEvent);
        });

        customer.onAddressChanged = (address: Address) => {
            const customerCreatedEvent = new CustomerCreatedEvent({
                message: `Esse é o segundo console.log do evento: CustomerCreated`,
                address: `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${address.toString()}`
            });

            eventDispatcher.notify(customerCreatedEvent);
        };

        customer.changeAddress(new Address("Rua", 10, '12345-123', "Cidade"));

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventAddressHandler).toHaveBeenCalled();

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();

    });
});