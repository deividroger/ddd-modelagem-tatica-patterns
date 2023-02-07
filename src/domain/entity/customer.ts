import { Fn } from "sequelize/types/utils";
import Address from "./address";

export default class Customer {
   private _id: string;
   private _name : string;
   private _address!: Address;
   private _active: boolean = false;
   private _rewardPoints: number = 0;

   public onAddressChanged?: (address: Address) => void;

    
    constructor(id: string,name: string,onCreated?:Function) {
        this._id = id;
        this._name = name;
        
        this.validate();
        
        onCreated && onCreated();

    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {

        if(this._address === undefined) {

            throw new Error('Address is mandatory to activate a customer');
        }

        this._active = true;
    }

    isActive():boolean {
        return this._active;
    }

    deactivate() {
        this._active = false;
    }

    validate() {
        if(this._name.length === 0) {
            throw new Error('Name is required');
        }

        if(this._id.length === 0) {
            throw new Error('Id is required');
        }
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get id() {
        return this._id;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

    get name(): string {
        return this._name;
    }

     changeAddress(address: Address) {
        this._address = address;

        this.onAddressChanged && this.onAddressChanged(address);

    }

    get Address(): Address {
        return this._address;
    }

}