import EventInterface from "./events.interface";

export default interface EventHandlerInterface<T extends EventInterface=EventInterface>  {   
    handle(event: T): void;
}