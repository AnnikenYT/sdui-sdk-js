import { ILesson, ISduiResponse, INewsPost, IPostable } from '../lib';
import { AxiosResponse } from 'axios';
import { SduiBaseClass } from './SduiBaseClass';
import { NewsPost } from './NewsPost';

/**
 * Sdui Client
 * @param {string} token - The token to use for authentication
 * @param {number} user - The user id to use for the timetable
 * @param {ISduiOptions} options - The options to use for the client
 */
export class Sdui extends SduiBaseClass {
  // SECION: Get methods

  /**
   * Get lessons asyncrhonously.
   * @param timedelta the delta in days. 0 is today, 1 is tomorrow, -1 is yesterday.
   * @returns a sorted array of lessons, sorted by start time.
   */
  public async getLessonsAsync(timedelta?: number): Promise<ILesson[]> {
    const today = this.getTimestamp(timedelta);
    this._debug(
      `Getting lessons for ${today} using url ${this.Axios.defaults.baseURL}/user/self/timetable`
    );
    const result: AxiosResponse<ISduiResponse> = await this.Axios.get(
      '/user/self/timetable'
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

  /**
   * Get news posts asyncrhonously.
   * @param page the page of the posts to get
   * @returns a list of NewsPosts
   */
  public async getNewsAsync(page?: number): Promise<NewsPost[]> {
    const result = await this.Axios.get<ISduiResponse<INewsPost[]>>(
      '/users/self/feed/news',
      {
        params: {
          page: page,
        },
      }
    );
    return result.data.data.map((post: INewsPost) => {
      return new NewsPost(this.token, this.options, post);
    });
  }

  /**
   * Get Postables (Newschannels)
   * @returns A list of postables
   */
  public async getPostablesAsync(): Promise<IPostable[]> {
    const result = await this.Axios.get<ISduiResponse<IPostable[]>>(
      '/users/self/channels/postable',
      {
        params: {
          'order-by': 'name',
          'order-dir': 'asc',
          type: 'global',
          search: '',
        },
      }
    );
    return result.data.data;
  }

  // SECTION: Factory methods
  /**
   * Create a new post
   * @param {INewsPost} post - The post to post
   * @returns The posted post
   */
  public createNewsPost(post: INewsPost): NewsPost {
    return new NewsPost(this.token, this.options, post);
  }

  private sort_lessons(lessons: ILesson[]): ILesson[] {
    return lessons.sort((a: ILesson, b: ILesson) => {
      return a.time_begins_at - b.time_begins_at;
    });
  }
}
/**
 * Thrown on invalid response from Sdui
 * @param message The message of the error
 */
export class SduiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SduiError';
  }
}

export class SduiNotAuthenticatedError extends SduiError {
  constructor() {
    super(
      'User is not authenticated! Please authenticate with Sdui#authSync() first.'
    );
    this.name = 'SduiNotAuthenticatedError';
  }
}
export class SduiInvalidUserError extends SduiError {
  constructor(missing_propertys?: string[]) {
    super(
      `Recived invalid user response! Please check arguments. Specific missing arguments are: ${missing_propertys}`
    );
    this.name = 'SduiInvalidUserError';
  }
}
