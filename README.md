# [S3CM.js]()

S3 Client Manager - client-side AWS S3 javascript library

**DO NOT RECOMMEND TO USE IN PRODOCTION YET**

## Features

- client-side oriented JS library
- Promise-base functions
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
  import React, { useState } from 'react';
  import S3CM from 's3cm';

  const App = () => {
    const [arr, setArr] = useState([]);
    const [stateText, setStateText] = useState('nothing');

    // full information of configuration, see  https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html
    const S3config = {
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: 'my-access-key',
        secretAccessKey: 'my-secret-key',
      },
    };
    const CMconfig = {
      bucket: 'my-bucket-name',
      key: 'my-location-directory(key)',
      array : {arr && arr}
    };
    const s3cm = new S3CM(S3config, CMconfig);

    const uploadTest = async (files) => {
      setStateText('uploading..');
      const response = await s3cm.upload(files);
      setArr(response);
      setStateText('uploaded');
    };

    const deleteTest = async () => {};

    return (
      <>
        <h1>React Test</h1>
        state : {setStateText}
        arr : {arr}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            uploadTest(e.target.files);
          }}
        />
      </>
    );
  };
  ```

## API

#### s3cm(S3config, CMconfig)

- _example_
  ```javascript
  const s3cm = new S3CM(
    {
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: `abcdefg`,
        secretAccessKey: `23ifmo0sdfmopaellsdflle`,
      },
    },
    {
      bucket: 'coffee-main-1',
      key: 'board/398042/gallery',
      arr: ['apple.jpeg', 'banana404.png'],
    }
  );
  ```
- _param_

  `S3config` : [S3ClientConfig](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html)

  `CMconfig` :

  ```javascript
  const CMconfig = {
    bucket: 'your-bucket-name',
    key: 'your-key',
    array: arrFromYourDB, // [option] if not defined, return empty string array
    isDuplicatedFileNameAutoChange: true, // [option] default : true, if false throw error when upload duplcated name of file
  };
  ```

- _return_

  `s3cm`

#### s3cm.upload(files)

- _example_

  ```javascript
  // if upload 2 files each names '010.jpeg', 'jot.png'
  // when array = ['abc.png', 'yeeeeeeeee.svg']
  const arrUpdated = await s3cm.upload(files);

  console.log(arrUpdated);
  // ['abc.png', 'yeeeeeeeee.svg', '010.jpeg', 'jot.png']
  ```

- _param_

  `files` : Array of [file object](https://developer.mozilla.org/en-US/docs/Web/API/File)

- _return_

  updated `arr` after uploading files

#### s3cm.deleteByIndex(fileIndex)

- _example_

  ```javascript
  // if delete 'yeeeeeeeee.svg'
  // when array = ['abc.png', 'yeeeeeeeee.svg', '010.jpeg', 'jot.png']
  const arrUpdated = await s3cm.deleteByIndex(1);

  console.log(arrUpdated);
  // ['abc.png', '010.jpeg', 'jot.png']
  ```

- _param_

  `fileIndex` : number index of filename to be deleted

- _return_

  updated `array` after uploading files

#### s3cm.deleteByKey(fileKey)

- _example_

  ```javascript
  // if delete 'yeeeeeeeee.svg'
  // when array = ['abc.png', 'yeeeeeeeee.svg', '010.jpeg', 'jot.png']
  const arrUpdated = await s3cm.deleteByKey('yeeeeeeeee.svg');

  console.log(arrUpdated);
  // ['abc.png', '010.jpeg', 'jot.png']
  ```

- _param_

  `fileKey` : string key of file to be deleted

- _return_

  updated `array` after uploading files

## License

[MIT License](https://opensource.org/licenses/mit-license.php)

## Authors

[Taegyeong Lee](https://github.com/hanarotg)
