import { ISduiOptions, ILesson, IUser } from './lib';
export declare class Sdui {
    private token;
    user: number;
    private default_delta;
    api_url: string;
    private timetable_url;
    debug: boolean;
    constructor(token?: string, user?: number, options?: ISduiOptions);
    /**
     * Get lessons asyncrhonously.
     * @param timedelta the delta in days. 0 is today, 1 is tomorrow, -1 is yesterday.
     * @default options.default_delta || 0
     */
    getLessonsAsync(timedelta?: number): Promise<ILesson[]>;
    private getTimestamp;
    /**
     * TODO: implement
     * @param username the username of the user you want to get
     * @param password the password of the user you want to get
     * @param school the school's slink of the user you want to get
     * @returns The user's token
     */
    private getTokenAsync;
    getUserAsync(): Promise<IUser>;
}
export declare class SduiNotAuthenticatedError extends Error {
    constructor();
}
