import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

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
                    <AddCircleRoundedIcon onClick={handleAdd} titleAccess='add item' />
                    <EditRoundedIcon onClick={handleUpdate} titleAccess='update inventory' />
                    <DeleteRoundedIcon onClick={handleDelete} titleAccess='delete inventory' />
            </>;
        }
        return undefined
    }

    return(
        <div className='flex flex-row justify-around min-w-[450px]'>
            <span>{props.name || "Name"}</span>
            <span>{props.count || "Count"}</span>
            <div>
                {getActionButton() || "Action buttons"}
            </div>
        </div>
    );
};

export default InventoryItem;