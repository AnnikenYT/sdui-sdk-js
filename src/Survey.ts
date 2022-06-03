import { SduiError } from ".";
import { ISduiOptions, ISduiResponse, ISurvey } from "../lib";
import { SduiBaseClass } from "./SduiBaseClass";

export class Survey extends SduiBaseClass {
    entity?: ISurvey;
    constructor(token: string, options: ISduiOptions, entity?: ISurvey) {
        super(token, options);
        this.entity = entity;
    }

    /**
     * Vote on the survey.
     * @param option the indices of the option(s) to vote on
     * @requires this.entity to contain `meta.options`
     * @returns The survey
     */
    public async vote(options: number[]): Promise<Survey> {
        const result = await this.Axios.post<ISduiResponse<ISurvey>>(
            `/surveys/${this.entity!.id}/vote`, {
                "options": options.map(option => this.entity?.meta.options[option])
            }).catch((e: Error) => {
                throw new SduiError(e.message);
            });
        this.entity = result.data.data;
        return this;
    }

}