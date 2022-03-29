export interface ISduiOptions {
  /**
   * The default delta for getLessons
   * @type {number}
   * @default 0
   */
  default_delta?: number;
  /**
   * If the data should be cached or not. Heavily recommended
   * @type {boolean}
   * @default true
   */
  cache_data?: boolean;
  /**
   * If the api url should be different from the default API
   * @type {string}
   * @default "https://api.sdui.app/v1"
   */
  api_url?: string;
  /**
   * Whether to authenticate the user automatically if no token or id is provided. If this is false, and no token or id is provided, you will need to authenticate manually.
   * @type {boolean}
   * @default true
   */
  no_auth?: boolean;
  /**
   * The sdk uses axios under the hood. Here you can pass in any axios options you want to use.
   * @todo not implemented yet.
   */
  axios_options?: any;
}

export interface ISduiResponseMeta {
  warnings?: string[];
  errors?: string[];
  success?: string[];
}

export type ISduiStatus = 'SUCCESS' | 'ERROR' | 'WARNING';

export interface ISduiResponse {
  data: ILessons;
  meta: ISduiResponseMeta;
  status: ISduiStatus;
}

export interface IBookable {
  id: number;
  name: string;
  shortcut: string;
}

export interface IGrade {
  id: number;
  name: string;
  shortcut: string;
}

export interface ITeacher {
  id: number;
  name: string;
  shortcut: string;
}

export interface IMeta {
  displayname: string;
  shortcut: string;
  color: TColor;
}

export interface ISubject {
  color?: TColor;
  meta?: IMeta;
  id: number;
  shortcut: string;
  name: string;
}

export type TColor =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black';

export interface ICourse {
  meta: IMeta;
  subject: ISubject;
  id: number;
  name: string | null;
  description: string | null;
  subject_id: number;
}

export interface ISubstitutedPivot {
  id: number;
  lesson_id: number;
  target_id: number;
  lesson_date: string;
}

export interface ILesson {
  bookables: IBookable[];
  grades: IGrade[];
  teachers: ITeacher[];
  dates: number[];
  id: number;
  day: number;
  subject_id?: number;
  subject?: ISubject;
  kind: TKind;
  time_id: number | null;
  comment: string;
  course: ICourse;
  time_begins_at: number;
  time_ends_at: number;
  meta: IMeta;
  substituted_pivot: ISubstitutedPivot[];
  substituted_target_lessons: ILesson[];
  referenced_pivot: any[];
  referenced_target_lessons: any[];
}

export type TKind =
  | null
  | 'EVENT'
  | 'SWAPED'
  | 'CANCLED'
  | 'SUBSTITUTION'
  | 'MOVED_TO'
  | 'BOOKABLE_CHANGE';

export interface ILessons {
  [key: string]: ILesson;
}

export interface ISchool {
  id: number;
  name: string;
  name_alias?: string;
  slink: string;
  state: string;
  uuid: string;
  url?: string;
  street?: string;
  is_beta: boolean;
  is_partner: boolean;
  shortcut: string;
  locale: string;
  environment?: any;
  old_id: number;
  has_sdui: boolean;
  visited_count: number;
  visited_teacher_count: number;
  visited_parent_count: number;
  visited_student_count: number;
  is_locked: number;
  city: string;
  phase: string;
  status: string;
  phase_code: number;
  pipedrive_id: number;
  hubspot_id: string;
}

export interface IUser {
  uuid?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  is_ghost?: boolean;
  is_trackable?: boolean;
  dob?: null; // unknown
  tfa_mode?: null; // unknown
  permissions?: []; // unknown
  school?: ISchool;
  bookable?: IBookable;
  can?: {}; // not implemented;
  child_pivot?: []; // unknown
  parent_pivot?: IUser[];
  properties?: {}; // not implemented;
  grade?: IGrade;
  roles?: []; // not implemented;
  id?: number;
  school_id?: number;
  username?: string;
  type?: string;
  title?: null;
  sex?: string;
  state?: string;
  expire_at?: null;
  locale?: string;
  meta?: {}; // not implemented
  code?: string;
  registered_at?: string;
  confirmed_at?: string;
}

