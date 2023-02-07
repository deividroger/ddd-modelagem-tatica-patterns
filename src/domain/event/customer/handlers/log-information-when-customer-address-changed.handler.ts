import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class LogInformationWhenCustomerAddressChangedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {

        if (event.eventData.message && event.eventData.address) {
            console.log(event.eventData.message);
            console.log(event.eventData.address);
        }


    }
}