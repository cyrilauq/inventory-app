import redaxios from "redaxios";
import { getBaseUrl } from "./utils";
import { ApiError, BadRequestError, NotFoundError } from "@/module/exceptions/api";
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
        return {
            code: 200,
            data: new User(response.data)
        };
    } catch(err) {
        if(err instanceof ApiError) {
            switch(err.status) {
                case 400: {
                    return { code: 400, data: err.message };
                }
                case 404: {
                    return { code: 404, data: "User not found" };
                }
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
                case 400: {
                    return { code: 400, data: err.message };
                }
                case 404: {
                    return { code: 404, data: "User not found" };
                }
            }
        }
        return { code: undefined, data: err };
    }
};

const refreshToken = (token: string) => {

};

export { logUser, refreshToken, registerUser };