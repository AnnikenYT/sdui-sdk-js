import Axios from "axios";
import { IAttatchment, IChannel, INewsPost, ISduiResponse, ISurvery, IUser } from "../lib";

export default class NewsPost {
    public id?: number;
    public title?: string;
    public content?: string;
    public has_translations?: boolean;
    public survey_uuid?: string;
    public is_confirmable?: boolean;
    public is_public?: boolean;
    public is_official?: boolean;
    public is_pinned?: boolean;
    public published_at?: string;
    public has_emergency_sms?: boolean;
    public content_rendered?: string;
    public user?: IUser;
    public channels?: IChannel[] | Number[];
    public survey?: ISurvery;
    public updated_at?: string;
    public created_at?: string;
    public attachments?: IAttatchment[];
    public preview?: string;
    public meta?: {
        uri?: string;
        confirm_uri?: boolean;
        is_confirmed?: boolean;
        languages?: string[];
        csv?: string;
        xls?: string;
        statistics?: {
            readby?: {
                total?: number;
                current?: number;
            },
            confirmed?: {
                total?: number;
                current?: number;
            }
        }
    };
    public can?: {
        update?: boolean;
        'view-statistics'?: boolean;
        confirm?: boolean;
        notify?: boolean;
        delete?: boolean;
        pin?: boolean;
    };
    constructor(
        id?: number,
        title?: string,
        content?: string,
        has_translations?: boolean,
        survey_uuid?: string,
        is_confirmable?: boolean,
        is_public?: boolean,
        is_official?: boolean,
        is_pinned?: boolean,
        published_at?: string,
        has_emergency_sms?: boolean,
        content_rendered?: string,
        user?: IUser,
        channels?: IChannel[] | Number[],
        survey?: ISurvery,
        updated_at?: string,
        created_at?: string,
        attachments?: IAttatchment[],
        preview?: string,
        meta?: {
            uri?: string,
            confirm_uri?: boolean,
            is_confirmed?: boolean,
            languages?: string[],
            csv?: string,
            xls?: string,
            statistics?: {
                readby?: {
                    total?: number,
                    current?: number,
                },
                confirmed?: {
                    total?: number,
                    current?: number,
                }
            }
        },
        can?: {
            update?: boolean,
            'view-statistics'?: boolean,
            confirm?: boolean,
            notify?: boolean,
            delete?: boolean,
            pin?: boolean,
        }
    ) {
        this.id = id ?? 0
        this.title = title ?? ''
        this.content = content ?? ''
        this.has_translations = has_translations ?? false
        this.survey_uuid = survey_uuid ?? ''
        this.is_confirmable = is_confirmable ?? false
        this.is_public = is_public ?? false
        this.is_official = is_official ?? false
        this.is_pinned = is_pinned ?? false
        this.published_at = published_at ?? ''
        this.has_emergency_sms = has_emergency_sms ?? false
        this.content_rendered = content_rendered ?? ''
        this.user = user ?? {}
        this.channels = channels ?? []
        this.survey = survey ?? undefined
        this.updated_at = updated_at ?? ''
        this.created_at = created_at ?? ''
        this.attachments = attachments ?? []
        this.preview = preview ?? ''
        this.meta = meta ?? {}
        this.can = can ?? {}
    }
    /**
     * Post a new news post
     * @param {INewsPost} post - The post to post
     * @returns The posted post
     */
    public async postNewsAsync(post: INewsPost): Promise<INewsPost> {
        const result = await Axios.post<ISduiResponse<INewsPost>>(`${this.api_url}/channels/news`, post, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        return result.data.data;
    }

}