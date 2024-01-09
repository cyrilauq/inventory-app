import redaxios from "redaxios";
import { getBaseUrl } from "./utils";
import { ApiError } from "@/module/exceptions/api";
import { User } from "@/module/user";
import { ApiResponse } from "@/module/apiResponse";

interface RegisterArgs {
    username: string,
    firstname: string,
    name: string,
    email: string,
    password: string,
}

const axios = redaxios.create({
    baseURL: getBaseUrl(),
    responseType: "json"
});

const logUser = async (username: string, password: string): Promise<ApiResponse> => {
    try {
        const response = await axios.post('/login', { login: username, password }) as any;
        if(!response.ok) {
            throw new ApiError(response.statusText || response.data.message, response.status);
        }
        console.log(response);
        
        return {
            code: 200,
            data: new User({ ...response.data.data.user, ...response.data.data.tokens })
        };
    } catch(err) {
        if(err instanceof ApiError) {
            switch(err.status) {
                case 400: 
                    return { code: 400, data: err.message };
                case 404:
                    return { code: 404, data: "User not found" };
            }
        }
        return { code: undefined, data: err };
    }
};

const registerUser = async (args: RegisterArgs): Promise<ApiResponse> => {
    try {
        const response = await axios.post('/register', { ...args }) as any;
        if(!response.ok) {
            throw new ApiError(response.statusText || response.data.message, response.status);
        }
        return {
            code: 200,
            data: new User(response.data)
        };
    } catch(err) {
        if(err instanceof ApiError) {
            switch(err.status) {
                case 400:
                    return { code: 400, data: err.message };
                case 404:
                    return { code: 404, data: "User not found" };
                case 409:
                    return { code: 404, data: err.message };
            }
        }
        return { code: undefined, data: (err as any)?.data?.message || "Ann error occured" };
    }
};

const refreshToken = async (token: string) => {
    try {
        const response = await axios.post('/refresh-token', {}, {
            headers: {
                'Authorization': token,
            }
        }) as any;
        if(!response.ok) {
            throw new ApiError(response.statusText || response.data.message, response.status);
        }
        return {
            code: 200,
            data: new User(response.data)
        };
    } catch(err) {
        if(err instanceof ApiError) {
            switch(err.status) {
                case 401:
                    return { code: 400, data: err.message };
            }
        }
        return { code: undefined, data: err };
    }
};

export { logUser, refreshToken, registerUser };