import EventInterface from "../../@shared/event/events.interface";

export default class AddressChangedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}