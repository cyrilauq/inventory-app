import redaxios from "redaxios";

import { useStoreAuth } from '../store/authStore';
import { getBaseUrl } from './utils';
import { ApiResponse } from "@/module/apiResponse";
import { ApiError } from "next/dist/server/api-utils";

const axios = redaxios.create({
    baseURL: getBaseUrl(),
    responseType: "json"
});

const getInventories = async (): Promise<ApiResponse<any>> => {
    const { accessToken, email } = useStoreAuth.getState().user || { accessToken: "", email: "" };
    
    try {
        const response = await axios.get('/user/inventories', {
            headers: {
                'Authorization': "Bearer " + accessToken
            }
        }) as any;
        if(!response.ok) {
            throw new ApiError(response.statusText || response.data.message, response.status);
        }
        return {
            code: 200,
            data: (response.data.data as any[]).map(d => { return { id: d._id, name: d.name, userId: d.userId } })
        };
    } catch(err) {
        return {
            code: (err as any).code || (err as any).status || 500,
            data: (err as any).message || "An error occured"
        };
    }
}

export { getInventories };