import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

interface IButtonProps {
    operation?: string;
    onClick?: () => void;
    text?: string;
    titleAccess?: string;
}

const Button = ( props: IButtonProps ) => {
    function getButton() {
        switch(props.operation?.toLocaleLowerCase() || "") {
            case "edit":
                return <EditRoundedIcon titleAccess={props.titleAccess} />;
            case "delete":
                return <DeleteRoundedIcon titleAccess={props.titleAccess} />;
            case "add":
                return <AddCircleRoundedIcon titleAccess={props.titleAccess} />;
            default:
                return undefined;
        }
    }

    return(
        <div onClick={() => props.onClick && props.onClick()} className="cursor-pointer self-start w-fit rounded-md bg-slate-300 text-black px-3 py-1 font-bold items-center">
            {getButton()}
            {props.text}
        </div>
    );
};

export default Button;