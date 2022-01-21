import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

export default class S3CM {
  constructor(config, option) {
    this.client = new S3Client(config);
    this.bucket = option.bucket;
  }

  // S3CM.upload
  async upload(files, key, arr) {
    await Object.values(files).reduce(async (accPromise, file) => {
      await accPromise;
      // s3-sdk
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: `${key}/${file.name}`,
          Body: file,
          ContentType: file.type,
        })
      );
      arr.push(`${key}/${file.name}`);
    }, Promise.resolve());

    return new Promise((resolve, reject) => {
      resolve(arr);
    });
  }

  // S3CM.delete
  async delete(fileIndex, key, arr) {
    // s3-sdk
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );
    arr.splice(fileIndex, 1);
    return new Promise((resolve, reject) => {
      resolve(arr);
    });
  }
}
