import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
    private s3 = new S3Client({
        region: "us-east-1",
        credentials: {
           accessKeyId: process.env.accesskey_bucket || "",
           secretAccessKey: process.env.secretkey_bucket || "",
        }
    });

    async uploadFile(file: Express.Multer.File) {
        if (!file) {
            throw new InternalServerErrorException("No se ha proporcionado ningún archivo");
        }

        const key = file.originalname;
        const url = `https://nest-ocso-testt.s3.us-east-1.amazonaws.com/${key}`
        const bucket = "nest-ocso-testt";

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        try {
            const response = await this.s3.send(command);
            return url;
            /*return {
                message: "Archivo subido exitosamente a S3",
                fileName: key,
                response,
            };*/
        } catch (error: any) {
            console.error("DETALLE DEL ERROR S3:", error);
            throw new InternalServerErrorException(`Error al conectar con AWS S3: ${error.message || error}`);
        }
    }
}