# 📆 Sdui SDK

**Read Me!**
> This project is currently unmaintained. I am planning to update it again in the forseable future, but I am studying at a different school this year, meaning I do not have access to sdui. Due to major updates in the sdui backend a while back, this library may or may not work at the moment.
> The next update may take until May or August 2023.
> PRs are more than welcome!

### An Object-Oriented Asyncronous Javascript SDK for communicating with the Sdui API.

_Important note: This is a ***community*** project. Neither it nor the author is affiliated with Sdui GmBH._

![npm](https://img.shields.io/npm/v/sdui-sdk-js?style=for-the-badge)
![node-current](https://img.shields.io/node/v/sdui-sdk-js?style=for-the-badge) \
[![CI](https://github.com/AnnikenYT/sdui-sdk-js/actions/workflows/main.yml/badge.svg)](https://github.com/AnnikenYT/sdui-sdk-js/actions/workflows/main.yml)

## ✅ Features

- Login using Username and Password
- Login via Token and User ID
- Getting all lessons by time delta
- Getting current user
- Object Oriented
- Asyncronous
- Self documented
- More to come...

## 📝 Installation

You can install the package from [github packages](https://github.com/AnnikenYT/sdui-sdk-js/packages/1350044). For a guide on how to use Github Packages, please read [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

## 💻 Usage

To get startet, first you need to create an instance of the SDK.
There are two ways to authenticate to the Sdui API:
1. Pass authentication token and user id when creating the instance:

```ts
import { Sdui } from 'sdui-sdk-js';

const sdui = new Sdui(
  "<your-sdui-token>",  // Token
  000000,               // User ID
  {}                    // Options (Optional)
);

```

2. Instanciate the SDK and then call the `.authAsync()` method with the correct arguments:

```ts
import { Sdui } from 'sdui-sdk-js';

const sdui = new Sdui(
  '', // Value can also be ommited if no options are needed.
  0,  // ^^^^^
  {}  // Options (Optional)
)

sdui.authAsync(
  '<your-sdui-email>',
  '<your-sdui-password>',
  '<your-sdui-school-slink>'
).then(() => {
  /* Your code to interact with the api here */
}).catch((err) => {
  /* Catch any errors that might happen when authenticating. */
});

```

In an asyncronous context you can also `await` the `.authAsync()` method to authenticate.

From there, you can start using the SDK by getting the lessons for today:

```ts
sdui.getLessonsAsync(0)
    .then(lessons => {
        console.log(lessons);
    })
    .catch(error => {
        console.log(error);
    });
```

Most functions are self documented. A full list will come soon.

## ⚙ Options

```ts
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
```

## ❓ To Do

[x] Login with username and password
[ ] Fix Typings
[ ] Publish to NPM
