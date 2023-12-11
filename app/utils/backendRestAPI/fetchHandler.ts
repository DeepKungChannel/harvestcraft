import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { FetchHanlderReponse, Methods } from "./types/fetchHandler-d";

export default async function FetchHandler(path: string, method: Methods, options?: {payload?: object, options?: AxiosRequestConfig}): Promise<FetchHanlderReponse> {
    let api_response: AxiosResponse<any> | undefined  = undefined;
    try {
        if (method == Methods.get) {
            api_response = await axios.get(path, options?.options);
        }
        else if (method == Methods.post) {
            api_response = await axios.post(path, options?.payload);
        }
        else if (method == Methods.put) {
            api_response = await axios.put(path, options?.payload);
        }
        else if (method == Methods.delete) {
            api_response = await axios.delete(path, options?.options);
        }
        else if (method == Methods.patch) {
            api_response = await axios.patch(path, options?.payload);
        }
        else {
            return {status: 1000, response: "Failed to fetch"}
        }

        return {status: api_response!.status, response: api_response!.data}
    }
    catch (error: any) {
        // if error came from a axios
        if (error.response) {
            let status = undefined
            if (error.response.status) status = error.response.status
            else if (error.status) status = error.status

            return {status: status, response: error.response.data}
        }
        else {
            console.log(error)

            return {status: 1000, response: "Failed to fetch"}
        }

        // if error came from another source like no internet
    }


}