import "dotenv/config";

import path from "path";
import { uploadFile, readFilesFromPrefix, deleteFile } from "./gcs";
import { extractTextFromPdf } from "./pdfExtract"; // you should already have this
import { chunkText, storeInDB } from "./run-pipeline";

async function main() {
  try {
    // 1. Pick a local PDF

    const localPdf = path.resolve("./docs/sample.pdf"); // put your PDF here
    const destName = "docs/sample.pdf";

    console.log("📤 Uploading file to GCS...");
    const gcsPath = await uploadFile(localPdf, destName);
    console.log("✅ Uploaded to:", gcsPath);

    // 2. Read back file(s) from GCS
    console.log("📥 Reading file from GCS...");
    const files = await readFilesFromPrefix("docs/");
    console.log(`Found ${files.length} file(s) in GCS.`);

    // 3. Extract text from the first PDF
    console.log("🔎 Extracting text...");
    const text = await extractTextFromPdf(gcsPath); // or use GCS path if your extract uses it
    console.log("Sample Extracted Text:", text.slice(0, 300));

    // 4. Chunk the text
    console.log("✂️ Chunking...");
    const chunks = await chunkText(text); // size=1000, overlap=200
    console.log(`Created ${chunks.length} chunks.`);

    await storeInDB(chunks);
    // await deleteFile(gcsPath);
  } catch (err) {
    console.error("❌ Error in pipeline:", err);
  }
}

main();
