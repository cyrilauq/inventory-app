import redaxios from "redaxios";

import { useState, useEffect, useRef } from 'react';
import { getBaseUrl } from "@/services/utils";
import { useStoreAuth } from "@/store/authStore";
import { ApiError } from "@/module/exceptions/api";
import { ApiResponse } from '../module/apiResponse';

interface IUserApiProps {
    endPoint: string;
    method?: string;
    data?: any;
}

function useApi<T>( props: IUserApiProps ) {
    const { accessToken } = useStoreAuth(state => state.user);
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ code: 200, data: "" });
    const [isSuccess, setIsSuccess] = useState(false);
    const axios = redaxios.create({
        baseURL: getBaseUrl(),
        responseType: "json"
    });

    useEffect(() => {
      if (loading) {
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
            setData((response.data.data as T));
            setIsSuccess(true);
          } catch (err) {
            setError({
              code: (err as any).code || (err as any).status || 500,
              data: (err as any).message || 'An error occurred'
            });
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
    }, [accessToken, axios, loading, props]);

    return { data, loading, error, isSuccess };
};

export default useApi;