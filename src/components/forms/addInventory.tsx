import { useState } from "react";
import Button from "../global/button";
import Input from "./input";
import { IInventory } from "@/module/inventory";
import useApi from "@/hooks/useApi";
import fetch from "@/services/api";

interface IAddInventoryProps {
    onAdded: () => void;
}

const AddInventory = ( props: IAddInventoryProps ) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    // const { loading, isSuccess } = useApi<IInventory>({ endPoint: '/user/inventories', method: 'post' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSumbited, setIsSumbited] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState({ code: 404, data: "" });

    function handleAdd() {
        setIsLoading(true);
        const { isSuccess: succed, data, error: apiError } = fetch<IInventory>({ endPoint: '/user/inventories', method: 'post', data: { name, description } });
        setIsSuccess(succed);
        setIsSumbited(true);
        setIsLoading(false);
        if(succed) {
            props.onAdded();
        } else {
            setError(apiError);
        }
    }


    return(
        <div className="flex flex-col items-center">
            <h2>New inventory</h2>
            {!isSuccess && isSumbited && <p>{error.data}</p>}
            <Input id={"name"} name={"name"} type={"text"} label="Name" rules="required|min:3|max:25" onChange={value => value !== name && setName(value)} />
            <Input id={"description"} name={"description"} type={"textarea"} label="Description" rules="required|text" onChange={value => value !== description && setDescription(value)} />
            <div className="w-fit">
                <Button onClick={() => handleAdd()} text="Add" />
            </div>
            {isSumbited ? (isLoading ? <p>Loading</p> : <p className="text-green-600">Finished</p>) : null}
        </div>
    );
};

export default AddInventory;