import Button from "../global/button";
import Input from "./input";

interface IAddInventoryProps {
    onAdded: () => void;
}

const AddInventory = ( props: IAddInventoryProps ) => {
    function handleAdd() {
        props.onAdded();
    }

    function nameValidation(value: string): string | undefined {
        return "coucou";
    }

    return(
        <div className="flex flex-col items-center">
            <h2>New inventory</h2>
            <Input id={"name"} name={"name"} type={"text"} label="Name" rules="required|min:3|max:5" />
            <Input id={"description"} name={"description"} type={"textarea"} label="Description" rules="required|text" />
            <div className="w-fit">
                <Button onClick={() => handleAdd()} text="Add" />
            </div>
        </div>
    );
};

export default AddInventory;