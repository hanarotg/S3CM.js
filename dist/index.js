import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v1 as uuidv1 } from 'uuid';

export default class S3CM {
  constructor(S3config, CMconfig) {
    this.client = new S3Client(S3config);
    this.bucket = CMconfig.bucket;
    this.key = CMconfig.key;
    this.array = CMconfig.array;
    this.isDuplicatedFileNameAutoChange =
      CMconfig.isDuplicatedFileNameAutoChange
        ? CMconfig.isDuplicatedFileNameAutoChange
        : true;
  }

  // S3CM.upload
  async upload(files) {
    await Object.values(files).reduce(async (accPromise, file) => {
      let uploadKey = `${this.key}/${file.name}`;
      let indexOfName = this.array.indexOf(uploadKey);

      // if same file name already exist, chage name of file with date.string
      if (indexOfName !== -1) {
        // In case of isDuplicatedFileNameAutoChange set false, return warning
        if (this.isDuplicatedFileNameAutoChange === false) {
          console.error(
            '[S3CM.js] S3 warning will occur. if you not want to get warning, and hope duplicated name to be auto-changed, set isDuplicatedFileNameAutoChange true'
          );
        }

        // if file has to be renamed change key string
        let fileName = file.name;
        let flieExtension = fileName.substring(
          fileName.lastIndexOf('.'),
          fileName.length
        );
        uploadKey = `${this.key}/${uuidv1()}${flieExtension}`;
      }

      await accPromise;
      // s3-sdk
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: uploadKey,
          Body: file,
          ContentType: file.type,
        })
      );
      this.array.push(uploadKey);
    }, Promise.resolve());

    return new Promise((resolve, reject) => {
      resolve(this.array);
    });
  }

  // S3CM.deleteByIndex
  async deleteByIndex(index) {
    // s3-sdk
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: this.array[index],
      })
    );
    this.array.splice(index, 1);
    return new Promise((resolve, reject) => {
      resolve(this.array);
    });
  }

  // S3CM.deleteByName
  async deleteByKey(key) {
    let indexOfKey = this.array.indexOf(key);
    // Error : Cannot find name of file from array
    if (indexOfKey === -1) {
      console.error(
        `[S3CM.js] deleteByName : cannot find file that named ${key} from array`
      );
    }

    // s3-sdk
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );

    this.array.splice(indexOfKey, 1);

    return new Promise((resolve, reject) => {
      resolve(this.array);
    });
  }
}
