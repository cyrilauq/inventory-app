import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Link from 'next/link';

interface IInventoryItemProps {
    id?: string;
    name?: string;
    count?: number;
    editCallBack?: (itemId: string) => void;
    deleteCallBack?: (itemId: string) => void;
    addCallBack?: (itemId: string) => void;
}

const InventoryItem = ( props: IInventoryItemProps ) => {
    function handleDelete() {
        if(props.deleteCallBack && props.id) {
            props.deleteCallBack(props.id);
        }
    }

    function handleAdd() {
        if(props.addCallBack && props.id) {
            props.addCallBack(props.id);
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
                    <AddCircleRoundedIcon onClick={handleAdd} className="cursor-pointer" titleAccess='add item' />
                    <EditRoundedIcon onClick={handleUpdate} className="cursor-pointer" titleAccess='update inventory' />
                    <DeleteRoundedIcon onClick={handleDelete} className="cursor-pointer" titleAccess='delete inventory' />
            </>;
        }
        return undefined
    }

    return(
        <div className='flex flex-row justify-around min-w-[450px]'>
            <span className="bg-gray-400 w-2/5 text-left">{props.name ? <Link href={`/user/inventories/${props.id}`}>{props.name}</Link> : "Name"}</span>
            <span className="w-1/5">{props.count || "Count"}</span>
            <div className="bg-gray-400 w-1/4 text-center justify-around">
                {getActionButton() || "Action buttons"}
            </div>
        </div>
    );
};

export default InventoryItem;