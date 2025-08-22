import {Storage} from '@google-cloud/storage'


const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCP_KEY_FILE
})
const bucket =  storage.bucket(process.env.GCS_BUCKET_NAME as string);

const bucketName = process.env.GCS_BUCKET_NAME; // ✅ not the string itself
if (!bucketName) {
  throw new Error("Missing GCS_BUCKET_NAME in environment variables");
}

export async function uploadFile(localPath: string, destFileName: string) {
    await bucket.upload(localPath, {destination: destFileName})
    console.log(`gs://${bucket.name}/${destFileName}`);
    return `gs://${bucket.name}/${destFileName}`;
}

export async function readFilesFromPrefix(prefix: string): Promise<string[]> {
    const [files] = await bucket.getFiles({prefix});
    const contents: string[] = [];

    for(const file of files) {
        const [data] = await file.download();
        contents.push(data.toString());
    }

    return contents;
}

export async function deleteFile(gcspath: string) {
    try {
        await bucket.file(gcspath.replace(`gs://${process.env.GCS_BUCKET_NAME}//`, "")).delete();
        console.log("Successfully deleted pdf after use in GCS bucket");
    } catch (err) {
        console.log("Couldn't delete file in GCS bucket :", err);
    }
}

export {bucket};