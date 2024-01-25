import Input from "@/components/forms/input";
import { CSSProperties, useState } from 'react';
import fetch from "@/services/api";

import { FileUploader } from "react-drag-drop-files";
import { ApiError } from "@/module/exceptions/api";
import { ApiResponse } from "@/module/apiResponse";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("");
    const [barcode, setBarcode] = useState("");
    const [file, setFile] = useState(null);
    const fileTypes = ["JPG", "PNG", "JPEG"];
    const [message, setMessage] = useState<ApiResponse<string>>();

    const addProduct =  async () => {
        const result = await fetch<any>({ endPoint: '/product', method: 'post', data: { name, description, weight, weightUnit: unit, barcode, file } });
        console.log(result);
        if(result.isSuccess) {
            setMessage({ code: 200, data: "product added" })
        } else {
            setMessage({ code: 400, data: result.error.data })
        }
    };

    const handleFileChange = (givenFile: any) => setFile(givenFile);

    const getMessage = () => {
        if(!message) return null;
        if(message?.code === 200) {
            return <p>{message.data + ""}</p>
        } else {
            return <p>{message.data + ""}</p>
        }
    };

    return(
        <div>
            <h3>Add a product</h3>
            {getMessage()}
            <Input name="name" type="text" id="name" label="Name" onBlur={setName} rules="required|min:5|max:50" />
            <Input name="description" type="textarea" id="description" label="Description" onBlur={setDescription} rules="required|min:5|max:250" />
            <div className="flex flex-row">
                <Input name="weight" type="number" id="weight" label="weight" onBlur={setWeight} rules="required" />
                <Input name="unit" type="text" id="unit" label="unit" onBlur={setUnit} rules="required|min:2|max:5" />
            </div>
            <Input name="barcode" type="text" id="barcode" label="barcode" onBlur={setBarcode} rules="required|min:5|max:50" />
            <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} />
            <button onClick={() => addProduct()}>Add product</button>
        </div>
    );
};

export default AddProductForm;