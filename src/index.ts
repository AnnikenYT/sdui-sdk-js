import { ISduiResponse } from './../lib/types.d';
import { ISduiOptions, ILesson, IUser } from '../lib';
import Axios, { AxiosResponse } from 'axios';
export class Sdui {
  private token: string;
  user: number;
  private default_delta: number;
  api_url: string;
  private timetable_url: string;
  debug: boolean;

  constructor(token?: string, user?: number, options?: ISduiOptions) {
    this.token = token || '';
    this.user = user || 0;
    this.default_delta = options?.default_delta || 0;
    this.api_url = options?.api_url || 'https://api.sdui.app/v1';
    this.timetable_url = `${this.api_url}/users/${user}/timetable`;
    this.debug = options?.debug || false;
  }

  /**
   * Get lessons asyncrhonously.
   * @param timedelta the delta in days. 0 is today, 1 is tomorrow, -1 is yesterday.
   * @default options.default_delta || 0
   * @returns a sorted array of lessons, sorted by start time.
   */
  public async getLessonsAsync(timedelta?: number): Promise<ILesson[]> {
    const today = this.getTimestamp(timedelta);
    this._debug(`Getting lessons for ${today}`);
    const result: AxiosResponse<ISduiResponse> = await Axios.get(
      `${this.timetable_url}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    this._debug('Got lessons');
    this._debug('Resolving promise');
    return Promise.resolve().then(() => {
      let lessons: ILesson[] = [];
      this._debug('Parsing lessons');
      lessons = Object.values(
        result.data.data.lessons
      ).filter((lesson: ILesson) => lesson.dates.includes(today));
      this._debug(`Got ${lessons.length} lessons`);
      this._debug('Sorting lessons');
      lessons = this.sort_lessons(lessons);
      this._debug('Done');
      return lessons;
    });
  }

  private getTimestamp(delta?: number): number {
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
  /**
   * TODO: implement
   * @param username the username of the user you want to get
   * @param password the password of the user you want to get
   * @param school the school's slink of the user you want to get
   * @returns The user's token
   */
  ///@ts-ignore
  private async getTokenAsync(
    username: string,
    password: string,
    school: string
  ): Promise<string> {
    const result = await Axios.post(`${this.api_url}/auth/login`, {
      identifier: username,
      password: password,
      slink: school,
    });
    return result.data.data.token;
  }

  public async getUserAsync(): Promise<IUser> {
    const result = await Axios.get(`${this.api_url}/self`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return result.data.data;
  }

  private _debug(message: any): void {
    if (this.debug) {
      console.log(message);
    }
  }
  private sort_lessons(lessons: ILesson[]): ILesson[] {
    return lessons.sort((a: ILesson, b: ILesson) => {
      return a.time_begins_at - b.time_begins_at;
    });
  }
}

export class SduiNotAuthenticatedError extends Error {
  constructor() {
    super(
      'User is not authenticated! Please authenticate with Sdui#authSync() first.'
    );
    this.name = 'SduiNotAuthenticatedError';
  }
}
