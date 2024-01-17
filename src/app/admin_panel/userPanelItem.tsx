import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

interface IItemProps {
    userId?: string;
    username: string;
    fullname: string;
    email: string;
    className?: string;
    onAction?: (action: CrudActions, uid: string) => void; 
}

const UserPanelItem = ( { userId, onAction, email, fullname, username, className }: IItemProps ) => {

    function getActionsBtn() {
        if(onAction && userId) {
            return <div className='flex flex-row mx-auto'>
                <EditRoundedIcon onClick={() => onAction(CrudActions.UPDATE, userId)} className="cursor-pointer" titleAccess='update user' style={{ color: '#cdcd15' }} />
                <DeleteRoundedIcon onClick={() => onAction(CrudActions.DELETE, userId)} className="cursor-pointer" titleAccess='delete user' style={{ color: '#c50f0f' }} />
            </div>
        }
        return <div>Action buttons</div>
    }

    return(
        <div className={"flex flex-row p-2 " + className}>
            <div className="w-56">
                {fullname}
            </div>
            <div className="w-36">
                {username}
            </div>
            <div className="w-56">
                {email}
            </div>
            {getActionsBtn()}
        </div>
    );
};

UserPanelItem.defaultProps = {
    username: "Username",
    fullname: "Fullname",
    email: "Email",
    className: ""
};

export default UserPanelItem;