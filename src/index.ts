import { ISduiOptions, ILesson, IUser } from './lib';
import Axios from 'axios';
export class Sdui {
  private token: string;
  user: number;
  private default_delta: number;
  api_url: string;
  private timetable_url: string;

  constructor(token?: string, user?: number, options?: ISduiOptions) {
    this.token = token || '';
    this.user = user || 0;
    this.default_delta = options?.default_delta || 0;
    this.api_url = options?.api_url || 'https://api.sdui.app/v1';
    this.timetable_url = `${this.api_url}/users/${user}/timetable`;
  }
  /**
   * Get lessons asyncrhonously.
   * @param timedelta the delta in days. 0 is today, 1 is tomorrow, -1 is yesterday.
   * @default options.default_delta || 0
   */
  public async getLessonsAsync(timedelta?: number): Promise<ILesson[]> {
    const today = this.getTimestamp(timedelta);
    const result = await Axios.get(`${this.timetable_url}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return Promise.resolve().then(() => {
      let lessons: ILesson[] = [];
      const keys = Object.keys(result.data.data.lessons);
      keys.forEach((key: string) => {
        const lesson: ILesson = result.data.data.lessons[key];
        lesson.dates.forEach((date: number) => {
          if (date === today) {
            lessons.push(lesson);
          }
        });
      });
      return lessons;
    });
  }

  private getTimestamp(delta?: number): Number {
    const timedelta = delta || this.default_delta;
    return (
      Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1 + timedelta,
        23
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
}

export class SduiNotAuthenticatedError extends Error {
  constructor() {
    super(
      'User is not authenticated! Please authenticate with Sdui#authSync() first.'
    );
    this.name = 'SduiNotAuthenticatedError';
  }
}
