export default interface IInventoryItem {
    id: string;
    name: string;
    description?: string;
    qty: number;
    barcode: string;
}