import redaxios from "redaxios";
import { getBaseUrl } from "./utils";
import { ApiError, BadRequestError, NotFoundError } from "@/module/exceptions/api";
import { User } from "@/module/user";

const axios = redaxios.create({
    baseURL: getBaseUrl(),
    responseType: "json"
});

const logUser = async (username: string, password: string) => {
    try {
        console.log(getBaseUrl());
        console.log(process.env.NODE_ENV);
        
        
        const response = await axios.post('/login', { username, password }) as any;
        if(!response.ok) {
            throw new ApiError(response.statusText || response.data.message, response.status);
        }
        return new User(response.data);
    } catch(err) {
        console.log('chch');
        
        if(err instanceof ApiError) {
            switch(err.status) {
                case 400: {
                    throw new BadRequestError(err.message);
                }
                case 404: {
                    throw new NotFoundError("User not found");
                }
            }
        }
        throw err;
    }
};

const refreshToken = (token: string) => {

};

export { logUser, refreshToken };