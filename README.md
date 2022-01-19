<center>

# [S3CM.js]()

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
S3 Client Manager - client-side AWS S3 javascript library
**DO NOT RECOMMEND TO USE IN PRODOCTION YET**

</center>

## Features

- client-side oriented JS library
- Promise
- Order-Keeping Multiple file-upload
- [AWS-SDK-V3](https://github.com/aws/aws-sdk-js-v3) Based

## Install

- npm installation
  ```shell
  $ npm i s3cm
  ```
- browser
  ```html
  <script src="https://cdn.jsdelivr.net/npm/s3cm/dist/index.js"></script>
  ```

## QuickStart

- CORS
  _example(CORS)_
  basically, AWS S3 is blocked by [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS), DO NOT USE IN PRODUCTION, use only when you have to test or study
  ```shell
  [
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "HEAD",
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "http://localhost:3000"
        ],
        "ExposeHeaders": [
            "ETag",
            "x-amz-meta-custom-header"
        ]
    }
  ]
  ```
- React.js

  ```javascript
  import React from 'react';
  import S3CM from 's3cm';

  const App = () => {

    // full information of configuration, see
    const config = {

    }
    const s3cm = new S3CM(config);


    return ()
  }
  ```

## API

#### s3cm(config)

- _example_
  ```javascript
  const s3cm = new S3CM({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: `abcdefg`,
      secretAccessKey: `23ifmo0sdfmopaellsdflle`,
    },
  });
  ```
- _param_
  `config` : See [S3ClientConfig](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html)
- _return_
  _s3cm_

#### s3cm.upload(files, bucket, key, arr)

- _example_

  ```javascript
  // if upload 2 files each names '010.jpeg', 'jot.png'
  const arrUpdated = await s3cm.upload(
    files,
    'my-bucket-2',
    'user/steve/profile',
    ['abc.png', 'yeeeeeeeee.svg']
  );

  console.log(arrUpdated);
  // ['abc.png', 'yeeeeeeeee.svg', '010.jpeg', 'jot.png']
  ```

- _param_
  `files` : Array of [file object](https://developer.mozilla.org/en-US/docs/Web/API/File)
  `bucket` : S3 bucket name
  `key` : S3 key
  `arr` : String Array to be updated
- _return_
  String Array that updated after uploading files

#### s3cm.delete(fileidx, bucket, key, arr)

- _example_

  ```javascript
  // if delete 'yeeeeeeeee.svg'
  const arrUpdated = await s3cm.delete(1, 'my-bucket-2', 'user/steve/profile', [
    'abc.png',
    'yeeeeeeeee.svg',
    '010.jpeg',
    'jot.png',
  ]);

  console.log(arrUpdated);
  // ['abc.png', '010.jpeg', 'jot.png']
  ```

- _param_
  `fileidx` : index of filename to be deleted

- _return_
  String Array that updated after uploading files

## License

[MIT License](https://opensource.org/licenses/mit-license.php)

## Authors

[Taegyeong Lee](https://github.com/hanarotg)

```

```
