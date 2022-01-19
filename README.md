![logo](/public/logo.png)
**WE DO NOT RECOMMEND THIS LIBRARY IN PRODOCTION YET**
S3 Client Manager - client-side aws S3 manager

---

### Features

- client-side oriented JS library
- Multiple asynchronous file-uploading

---

### Prerequisite

Before installing our library, Some set have to be done.

1. S3 CORS
2. Explain its logic

---

### QuickStart

- #### React.js

  Working on..

  1. install aws-sdk
     ```shell
     npm i aws-sdk
     ```
  2. install s3-manager

---

### Functions

- ##### S3manager.config

- ##### S3manager.get

- ##### S3manager.update

  upload, delete objects in S3
  **Params**
  | name | type | required | description | Examples |
  | --- | --- | --- | --- | --- |
  | Key | string |true | S3 Location(directory) to be updated | `/abc1234/gallery/2022-03-02-16:40:35`<br/>`/products/74839294/images` |
  | Ori | | | |

  **Returns**
  | name | type | description | Examples |
  | --- | --- | --- | --- |
  | location | string<br/>Array[string] | return S3 updated File Locations | `[https://my-s3-bucket/images/abcde.png, https://my-s3-bucket/images/5689.svg]`|

  **Example Codes**

  ```javascript
  const response = await S3Manager.update('/images');
  console.log(response);
  ```

---

### License

[MIT License](https://opensource.org/licenses/mit-license.php)

---

### Authors

[Taegyeong Lee](https://github.com/hanarotg)
