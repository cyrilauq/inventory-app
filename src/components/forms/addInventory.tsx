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
        <div>
            <h2>New inventory</h2>
            <Input id={"name"} name={"name"} type={"text"} label="Name" rules="required|min:3|max:5" />
            <button onClick={() => handleAdd()}>Add</button>
        </div>
    );
};

export default AddInventory;