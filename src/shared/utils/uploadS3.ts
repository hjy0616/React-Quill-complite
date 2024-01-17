import axios from "axios";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@aws-sdk/client-s3";
import _dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// const cors = require('cors');

_dayjs.extend(utc);
_dayjs.extend(timezone);
_dayjs.tz.setDefault("Asia/Seoul");

export function kdayjs(params?: any) {
  return _dayjs(params).tz();
}

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  //   endpoint: "",
  region: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "",
  },
});

const projectName = "test4342";
export async function uploadS3Image(file: File, keys: string[]) {
  try {
    const keyString = keys.join("/");
    const s3Key = `${projectName}/resources/${keyString}/${kdayjs().format(
      "YYYY-MM"
    )}/${kdayjs().format("DD")}/${file.name}`;
    const params = {
      Body: file,
      Bucket: "test4342" ,
      Key: s3Key,
      ACL: "public-read" as any,
    };
    const data = await s3Client.send(new PutObjectCommand(params));
    const domain = process.env.NEXT_PUBLIC_S3_DOMAIN ?? "";
    return domain + "/" + params.Key;
  } catch (err) {
    console.log(err);
  }
}

export async function uploadS3ImagePreSigned(file: File, keys: string[]) {
  const formData = new FormData();
  formData.append("file", file);

  const keyString = keys.join("/");
  const s3Key = `${projectName}/resources/${keyString}/${kdayjs().format(
    "YYYY-MM"
  )}/${kdayjs().format("DD")}/${file.name}`;

  let { data } = await axios.post("/api/admin/aws", {
    name: s3Key,
    type: file.type,
  });
  const url = data.url;
  const public_url = data.url.split("?")[0];

  const returnUrl = await axios.put(url, file, {
    headers: {
      "Content-type": file.type,
    },
  });
  return public_url;
}