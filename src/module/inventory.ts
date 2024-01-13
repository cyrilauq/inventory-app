import IInventoryItem from "./inventoryItem";

export interface IInventory {
    id: string;
    userId: string;
    name: string;
    items?: IInventoryItem[] | undefined
}