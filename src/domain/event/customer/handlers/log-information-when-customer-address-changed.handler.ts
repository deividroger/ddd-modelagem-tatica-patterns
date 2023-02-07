import EventHandlerInterface from "../../@shared/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class LogInformationWhenCustomerAddressChangedHandler implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {

        if (event.eventData.message && event.eventData.address) {
            console.log(event.eventData.message);
            console.log(event.eventData.address);
        }
    }
}