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
    const unitWeigths = ['kg', 'lbs']

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
        <div className="flex flex-col">
            <h3 className="text-center my-4">Add a product</h3>
            {getMessage()}
            <Input name="name" type="text" id="name" label="Name" onBlur={setName} rules="required|min:5|max:50" />
            <Input name="description" type="textarea" id="description" label="Description" onBlur={setDescription} rules="required|min:5|max:250" />
            <div className="flex flex-row">
                <Input name="weight" type="number" id="weight" label="Weight" onBlur={setWeight} rules="required" />
                <select onChange={e => setUnit(e.target.value)} className="bg-transparent">
                    {unitWeigths.map(e => <option key={e} value={e} className="text-black">{e}</option>)}
                </select>
            </div>
            <Input name="barcode" type="text" id="barcode" label="Barcode" onBlur={setBarcode} rules="required|min:5|max:50" />
            <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} />
            <button className="self-center my-4" onClick={() => addProduct()}>Add product</button>
        </div>
    );
};

export default AddProductForm;