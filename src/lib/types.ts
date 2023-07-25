export interface SduiOptions {
    // SECTION: Authentication
    // - User and password
    /**
     * The identifier of the user, usually the email address.
    */
    identifier?: string;
    /**
     * The slink of the user, usually the school name.
    */
    slink?: string;
    /**
     * The password of the user.
    */
    password?: string;
    // - Token
    /**
     * The token of the user.
    */
    token?: string;
    // SECTION: API
    /**
     * The URL of the API.
     * @default "https://api.sdui.app/v1/"
    */
    api_url?: string;
}

export interface SduiBaseResponse<T> {
    data: T;
    status: "SUCCESS" | "ERROR";
    meta: {
        warnings: string[];
        errors: string[];
        success: string[];
    }
}

export interface SduiLoginResponse {
    token_type: "Bearer";
    expires_in: number;
    access_token: string;
}