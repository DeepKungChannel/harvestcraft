import FetchHandler from "./fetchHandler";
import AuthModule from "./module/auth";
import { FetchHanlderReponse, Methods } from "./types/fetchHandler-d";


export default class Backend {
    api_path = "/api/harvestcraft/"
    auth: AuthModule
    ping: () => Promise<FetchHanlderReponse>

    constructor() {
        this.auth = new AuthModule(this.api_path)
        this.ping = async() => {
            const api_response = await FetchHandler(this.api_path + "ping", Methods.get)

            return api_response
        }
    }
}