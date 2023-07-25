import axios, { AxiosInstance } from "axios";
import { defu } from "defu";
import { SduiBaseResponse, SduiLoginResponse, SduiOptions } from "./lib/types";

const defaultOptions: SduiOptions = {
    api_url: "https://api.sdui.app/v1/"
}

export default class Sdui {
    public token: string | undefined;
    private axios: AxiosInstance;

    constructor(config: SduiOptions) {
        // Assign options
        const options = defu(config, defaultOptions);

        // Create axios instance
        this.axios = axios.create({
            baseURL: options.api_url,
        });
        this.axios.interceptors.request.use((config) => {
            if (options.token) {
                config.headers.Authorization = `Bearer ${options.token}`;
            }
            return config;
        });

        // Authenticate
        if (options.identifier && options.slink && options.password) {
            this.login(options.identifier, options.slink, options.password).then((response) => {
                this.token = response?.data.access_token;
                console.log(this.token);
            });
        }
        else if (options.token) {
            this.token = options.token;
        }
        else {
            throw new Error("No authentication method provided.");
        }
    }

    private async login(identifier: string, slink: string, password: string) {
        const response = await this.axios?.post<SduiBaseResponse<SduiLoginResponse>>("/auth/login", {
            identifier,
            slink,
            password
        });
        return response?.data;
    }
}