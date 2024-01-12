import redaxios from "redaxios";

import { useState, useEffect, useRef } from 'react';
import { getBaseUrl } from "@/services/utils";
import { useStoreAuth } from "@/store/authStore";
import { ApiError } from "@/module/exceptions/api";

interface IUserApiProps {
    endPoint: string;
    method?: string;
    data?: any;
}

function fetch<T>( props: IUserApiProps ) {
    const { accessToken } = useStoreAuth.getState().user;
    const axios = redaxios.create({
        baseURL: getBaseUrl(),
        responseType: "json"
    });

    let data:T | null = null;
    let error = { code: 200, data: "" };
    let isSuccess = false;

    const getRequest = () => {
        switch(props.method?.toLocaleLowerCase()) {
            case "post":
                return axios.post(props.endPoint, props.data,
                {
                    headers: { "Authorization": "Bearer " + accessToken }
                }) as any;
            default:
                return axios.get(props.endPoint, {
                    headers: { "Authorization": "Bearer " + accessToken }
                }) as any;
        }
    };

    const fetchData = async () => {
      console.log('Fetching data');
      try {
        const response = await getRequest();
        if (!response.ok) {
          throw new ApiError(response.statusText || response.data.message, response.status);
        }
        data = response.data.data as T;
        isSuccess = true;
      } catch (err) {
        error = {
          code: (err as any).code || (err as any).status || 500,
          data: (err as any).message || 'An error occurred'
        };
      }
    };
    fetchData();

    return { data, error, isSuccess };
};

export default fetch;