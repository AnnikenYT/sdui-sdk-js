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
  /**
   * Whether to log the requests and responses to the console.
   * @type {boolean}
   * @default false
   */
  debug?: boolean;
}

export interface ISduiData {
  lessons: ILessons;
  last_updated_at: string;
}

export interface ISduiResponseMeta {
  warnings?: string[];
  errors?: string[];
  success?: string[];
}

export type ISduiStatus = 'SUCCESS' | 'ERROR' | 'WARNING';

export interface ISduiResponse<T = ISduiData> {
  data: T;
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
  name: string;
  description: string;
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
  kind?: TKind;
  time_id: number;
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

export interface IShortCut {
  id: number;
  school_id: number;
  shortcut: string;
  name: string;
  description: string;
  meta: {
    displayname: string;
  }
}

export interface IUser {
  uuid?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  username?: string;
  is_ghost?: boolean;
  is_trackable?: boolean;
  dob?: any; // unknown
  tfa_mode?: any; // unknown
  permissions?: []; // unknown
  school?: ISchool;
  bookable?: IBookable;
  can?: {}; // not implemented;
  child_pivot?: []; // unknown
  parent_pivot?: IUser[];
  properties?: {}; // not implemented;
  grade?: IGrade;
  grade_id?: number;
  roles?: []; // not implemented;
  id?: number;
  school_id?: number;
  username?: string;
  type?: string;
  title?: string;
  sex?: string;
  state?: string;
  expire_at?: string;
  locale?: string;
  meta?: {}; // not implemented
  code?: string;
  registered_at?: string;
  confirmed_at?: string;
  shortcut?: IShortCut
  shortcut_id?: number;
  meta?: {
    displayname?: string;
    subtitle?: string;
    type?: string;
    uri?: string;
    avatar_uri?: string;
    salutation?: string;
    days_until_deletion?: number;
    is_signed?: boolean;
    is_paused?: boolean;
    deleted_at?: string;
    is_trackable_classbook_user?: boolean;
  }
}

export interface IChannel {
  id?: number;
  uuid?: string;
  name?: string;
  description?: string;
  description_members?: string;
  type?: string;
  subtitle?: string;
  school_id?: number;
  chat_id?: number;
  cloud_id?: number;
  target?: string;
  intern_id?: number;
  avatar?: string;
  icon?: string;
  color?: string;
  is_leavable?: boolean;
  is_public?: boolean;
  is_disabled?: boolean;
  is_twoway?: boolean;
  is_hidden_memberlist?: boolean;
  twoway_expires_at?: string;
  activity_at?: string;
  expires_at?: string;
  expiration_reason?: string;
  trashed_at?: string;
  created_at?: string;
  updated_at?: string;
  group?: any; // not implemented
  disabled_by_id?: any; // not implemented
  pivot?: {
    news_id?: number;
    channel_id?: number;
  },
  meta?: {
    is_official?: boolean;
    subtitle?: string;
    displayname?: string;
    shortcut?: string;
  }
}

export interface ISurveyOption {
  uuid?: string;
  name?: string;
  is_chosen?: boolean;
}
export interface ISurvey {
  can: {
    view: boolean;
    vote: boolean;
    revoke: boolean;
    results: boolean;
    download: boolean;
    end: boolean;
    delete: boolean;
  },
  meta: {
    is_over: boolean;
    options: ISurveryOption[];
    is_user_voted: boolean;
    csv: string;
    xls: string;
    languages: string[];
  }
  question: string;
  id: number;
  uuid: string;
  is_multi_answerable: boolean;
  is_anonymous: boolean;
  is_freetext: boolean;
  results_visibility: string;
  has_translations: boolean;
  created_at: string;
  updated_at: string;
  expires_at: string;
  ended_at: string;
  deleted_at: string;
  user: IUser
}


export interface INewsPost {
  id?: number;
  title?: string;
  content?: string;
  has_translations?: boolean;
  survey_uuid?: string;
  is_confirmable?: boolean;
  is_public?: boolean;
  is_official?: boolean;
  is_pinned?: boolean;
  published_at?: string;
  has_emergency_sms?: boolean;
  content_rendered?: string;
  user?: IUser;
  channels?: IChannel[] | Number[];
  survey?: ISurvery;
  updated_at?: string;
  created_at?: string;
  attachments?: IAttatchment[];
  preview?: string;
  meta?: {
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
  },
  can?: {
    update?: boolean;
    'view-statistics'?: boolean;
    confirm?: boolean;
    notify?: boolean;
    delete?: boolean;
    pin?: boolean;
  }
}

interface IAttatchment {
  id?: number;
  uuid?: string;
  user_id?: number;
  source_id?: number;
  source_type?: string;
  name?: string;
  type?: string;
  extension?: string;
  size?: number;
  created_at?: string;
  updated_at?: string;
  file_type?: string;
  meta?: {
    uri?: string;
    download_uri?: string;
    temp_uri?: string;
  }
}