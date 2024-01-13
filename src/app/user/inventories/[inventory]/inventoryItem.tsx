import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Link from 'next/link';

interface IInventoryItemProps {
    id?: string;
    name?: string;
    qty?: number;
    description?: string;
    barcode?: string;
    price?: number;
    editCallBack?: (itemId: string) => void;
    deleteCallBack?: (itemId: string) => void;
}

const InventoryItem = ( props: IInventoryItemProps ) => {
    function handleDelete() {
        if(props.deleteCallBack && props.id) {
            props.deleteCallBack(props.id);
        }
    }

    function handleUpdate() {
        if(props.editCallBack && props.id) {
            props.editCallBack(props.id);
        }
    }

    function getActionButton() {
        if(props.id) {
            return <>
                    <EditRoundedIcon onClick={handleUpdate} className="cursor-pointer" titleAccess='update inventory' />
                    <DeleteRoundedIcon onClick={handleDelete} className="cursor-pointer" titleAccess='delete inventory' />
            </>;
        }
        return undefined
    }

    return(
        <div className='group'>
            <div className='flex flex-row justify-around min-w-[450px]'>
                <span className="bg-gray-400 w-1/5 text-left">{props.name ? <Link href={`/user/inventories/${props.id}`}>{props.name}</Link> : "Name"}</span>
                <span className="w-1/5">{props.qty || "Quantity"}</span>
                <span className="bg-gray-400 w-1/5 text-left">{props.price || "Price (per unit)"}</span>
                <span className="w-1/5 text-left">{props.barcode || "Barcode"}</span>
                <div className="bg-gray-400 w-1/5 text-center justify-around">
                    {getActionButton() || "Action buttons"}
                </div>
            </div>
            <div className='absolute hidden group-hover:block ml-0'>
                {props.description}
            </div>
        </div>
    );
};

export default InventoryItem;