
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class LogInformationWhenCustomerAddressChangedHandler implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {
        console.log(event.eventData.message);
        console.log(event.eventData.address);

    }
}