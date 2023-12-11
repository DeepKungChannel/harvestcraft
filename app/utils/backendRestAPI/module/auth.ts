import FetchHandler from "../fetchHandler"
import { FetchHanlderReponse, Methods } from "../types/fetchHandler-d"

export default class AuthModule {
    api_path = 'auth/'
    prev_path: string
    signin: (username_or_email: string, password:string ) => Promise<FetchHanlderReponse>
    signup: (username: string, email: string, password: string) => Promise<any>
    fetch: () => Promise<FetchHanlderReponse>

    constructor(prev_path: string) {
        this.prev_path = prev_path
        this.signin = async(username_or_email, password) => {
            let api_response = await FetchHandler(this.prev_path + this.api_path + "signin", Methods.post, {payload: {username_or_email, password}})

            return api_response
        }
        this.signup = async(username, email, password) => {
            let api_response = await FetchHandler(this.prev_path + this.api_path + "signup", Methods.post, {payload: {username, email, password}})
            
            return api_response
        }

        this.fetch = async() => {
            let api_response = await FetchHandler(this.prev_path + this.api_path, Methods.get)
            return api_response
        }
    }


}