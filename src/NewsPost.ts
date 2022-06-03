import { SduiError } from '.';
import { INewsPost, ISduiOptions, ISduiResponse } from '../lib';
import { SduiBaseClass } from './SduiBaseClass';
import { Survey } from './Survey';
import _ from 'lodash';

export class NewsPost extends SduiBaseClass {
  entity?: INewsPost;
  constructor(token: string, options: ISduiOptions, entity?: INewsPost) {
    super(token, options);
    this.entity = entity;
  }

  /**
   * Post the news post.
   * @requires this.entity to contain `title`, `content` and `channels`
   * @returns The news post
   */
  public async post(): Promise<NewsPost> {
    const result = await this.Axios.post<ISduiResponse<INewsPost>>(
      `/channels/news`,
      this.entity
    );
    this.entity = result.data.data;
    return this;
  }

  /**
   * Get the news post.
   * @requires this.entity to contain `id`
   */
  public async get(): Promise<NewsPost> {
    const result = await this.Axios.get<ISduiResponse<INewsPost>>(
      `/channels/news/${this.entity!.id}`
    );
    this.entity = result.data.data;
    return this;
  }

  public async delete(): Promise<void> {
    if (!this.entity?.can?.delete)
      throw new SduiError('Cannot delete this post');
    await this.Axios.delete(`/channels/news/${this.entity!.id}`);
  }

  public async update(entity: INewsPost): Promise<NewsPost> {
    // if (!this.entity?.can?.update) throw new SduiError("Cannot update this post");
    _.merge(this.entity, entity);
    const result = await this.Axios.put<ISduiResponse<INewsPost>>(
      `/channels/news/${this.entity!.id}`,
      this.entity
    );
    this.entity = result.data.data;
    return this;
  }

  public async confirm(): Promise<NewsPost> {
    if (!this.entity?.can?.confirm)
      throw new SduiError('Cannot confirm this post');
    const result = await this.Axios.put<ISduiResponse<INewsPost>>(
      `/channels/news/${this.entity!.id}/confirm`
    );
    this.entity = result.data.data;
    return this;
  }

  public async pin(): Promise<NewsPost> {
    if (!this.entity?.can?.pin)
      return Promise.reject(new SduiError('Cannot pin this post'));
    const result = await this.Axios.put<ISduiResponse<INewsPost>>(
      `/channels/news/${this.entity!.id}/pin`,
      {
        is_pinned: true,
      }
    ).catch((e: Error) => {
      throw new SduiError(e.message);
    });
    this.entity = result.data.data;
    return this;
  }

  public async unpin(): Promise<NewsPost> {
    if (!this.entity?.can?.pin)
      return Promise.reject(new SduiError('Cannot unpin this post'));
    const result = await this.Axios.put<ISduiResponse<INewsPost>>(
      `/channels/news/${this.entity!.id}/pin`,
      {
        is_pinned: false,
      }
    );
    this.entity = result.data.data;
    return this;
  }

  public getSurvey(): Survey {
    if (!this.entity?.survey)
      throw new SduiError('No survey attached to this post');
    return new Survey(this.token, this.options, this.entity?.survey);
  }
}
