import Input from "@/components/forms/input";
import { CSSProperties, useState } from 'react';
import fetch from "@/services/api";

import { FileUploader } from "react-drag-drop-files";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("");
    const [barcode, setBarcode] = useState("");
    const [file, setFile] = useState(null);
    const fileTypes = ["JPG", "PNG", "JPEG"];

    const addProduct =  async () => {
        const result = await fetch<undefined>({ endPoint: '/product', method: 'post', data: { name, description, weight, weightUnit: unit, barcode, file } });
    };

    const handleFileChange = (givenFile: any) => setFile(givenFile); 

    return(
        <div>
            <h3>Add a product</h3>
            <Input name="name" type="text" id="name" label="Name" onBlur={setName} />
            <Input name="description" type="textarea" id="description" label="Description" onBlur={setDescription} />
            <div className="flex flex-row">
                <Input name="weight" type="number" id="weight" label="weight" onBlur={setWeight} />
                <Input name="unit" type="text" id="unit" label="unit" onBlur={setUnit} />
            </div>
            <Input name="barcode" type="text" id="barcode" label="barcode" onBlur={setBarcode} />
            <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} />
            <button onClick={() => addProduct()}>Add product</button>
        </div>
    );
};

export default AddProductForm;