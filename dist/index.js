import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

export default class S3CM {
  constructor(options) {
    this.client = new S3Client(options);
  }

  // S3CM.upload
  async upload(files, bucket, key, arr) {
    return new Promise((resolve, reject) => {
      await Object.values(files).reduce(async (accPromise, file) => {
        await accPromise;
        // s3-sdk
        const response = await client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: `${key}/${file.name}`,
            Body: file,
            ContentType: file.type,
          })
        );
        arr.push(`${key}/${file.name}`);
      }, Promise.resolve());
      resolve(arr);
    });
  }

  // S3CM.delete
  async delete(fileIndex, bucket, key, arr) {
    return new Promise((resolve, reject) => {
      // s3-sdk
      await client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        })
      );
      arr.splice(fileIndex, 1);
      resolve(arr);
    });
  }
}
