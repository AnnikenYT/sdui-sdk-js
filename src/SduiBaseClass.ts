import axios, { AxiosError, AxiosInstance } from "axios";
import { SduiError, SduiInvalidUserError } from ".";
import { ISduiOptions, ISduiResponse, IUser } from "../lib";

export abstract class SduiBaseClass {

    protected token: string;
    options: ISduiOptions;
    user: IUser = {};
    api_url: string;
    protected default_delta: number;
    protected debug: boolean;
    protected Axios: AxiosInstance = axios;
    constructor(token?: string, options?: ISduiOptions) {
        this.api_url = options?.api_url || 'https://api.sdui.app/v1/';
        this.debug = options?.debug || false;
        this.default_delta = options?.default_delta || 0;
        this.token = token || '';
        this.options = options || {};
        this.createAxiosInstance();
        this.getUserAsync().then((user) => {
            this.user = user;
        });
    }



    // SECTION: Authentication
    /**
     * @param username the username of the user you want to get
     * @param password the password of the user you want to get
     * @param school the school's slink of the user you want to get
     * @returns The user's token
     */
    private async getTokenAsync(
        username: string,
        password: string,
        school: string
    ): Promise<string> {
        const result = await this.Axios.post(`/auth/login`, {
            identifier: username,
            password: password,
            slink: school,
        });
        this._debug(result.data.data.token_type);
        return result.data.data.access_token;
    }

    /**
     * Gets user with the current token
     * @returns The user
     */
    public async getUserAsync(): Promise<IUser> {
        const result = await this.Axios.get(`/users/self`);
        this._debug(result.data.data.id);
        return result.data.data;
    }

    /**
     * Login as a user
     * This should only be used if you did not pass a token to the constructor
     * @param email the email of the user you want to log in as
     * @param password the password of the user you want to log in as
     * @param school the school's slink of the user you want to log in as
     */
    public async authAsync(email: string, password: string, school: string) {
        const token = await this.getTokenAsync(email, password, school);
        if (token) {
            this.token = token;
        } else {
            throw new SduiInvalidUserError(['token']);
        }
        const user = await this.getUserAsync();
        if (user) {
            this.user = user;
            this._debug('user:' + this.user);
        } else {
            throw new SduiInvalidUserError();
        }
        this.createAxiosInstance();
    }



    // SECTION: Utility functions
    protected getTimestamp(delta?: number): number {
        const timedelta = delta || this.default_delta;
        return (
            Date.UTC(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() - 1 + timedelta,
                22
            ) / 1000
        );
    }

    protected createAxiosInstance() {
        const instance = axios.create({
            baseURL: this.api_url,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
        });
        instance.interceptors.response.use((response) => response, (error: AxiosError<ISduiResponse>) => {
            if (this.debug) {
                throw error;
            }
            throw new SduiError(`${error.response?.statusText}! Sdui responded with => "${error.response?.data.meta.errors}"`);
        }
        );
        this.Axios = instance;
    }

    protected _debug(message: any): void {
        if (this.debug) {
            console.log(message);
        }
    }
}