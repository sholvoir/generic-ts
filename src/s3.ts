import {
   DeleteObjectCommand,
   GetObjectCommand,
   PutObjectCommand,
   S3Client,
} from "@aws-sdk/client-s3";

export class S3 {
   private s3: S3Client;
   constructor(
      endpoint: string,
      region: string,
      accessKeyId: string,
      secretAccessKey: string,
      private bucket: string,
   ) {
      this.s3 = new S3Client({
         endpoint,
         region,
         credentials: {
            accessKeyId,
            secretAccessKey,
         },
      });
   }
   public async getTextObject(key: string): Promise<string> {
      const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
      const response = await this.s3.send(command);
      if (!response.Body) throw new Error("No body");
      return await response.Body.transformToString();
   }
   public async putTextObject(key: string, body: string) {
      const command = new PutObjectCommand({
         Bucket: this.bucket,
         Key: key,
         Body: body,
         ContentType: "text/plain",
      });
      await this.s3.send(command);
   }
   public async deleteObject(key: string) {
      const command = new DeleteObjectCommand({
         Bucket: this.bucket,
         Key: key,
      });
      await this.s3.send(command);
   }
}
