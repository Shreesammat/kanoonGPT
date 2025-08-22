import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from "@pinecone-database/pinecone";

// Environment variable checks
const GCLOUD_PROJECT_ID = process.env.GCLOUD_PROJECT_ID;
const GCLOUD_LOCATION = process.env.GCLOUD_LOCATION;
if (!GCLOUD_PROJECT_ID)
  throw new Error("GCLOUD_PROJECT_ID environment variable is not set.");
if (!GCLOUD_LOCATION)
  throw new Error("GCLOUD_LOCATION environment variable is not set.");

export async function chunkText(text: string): Promise<string[]> {
  console.log("[2/4] Chunking extracted text...");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });
  const chunks = await splitter.splitText(text);
  console.log(`-> Text split into ${chunks.length} chunks.`);
  return chunks;
}

/**
 * STEP 4: Stores the chunks and their embeddings in ChromaDB. (No changes needed)
 */
export async function storeInDB(chunks: string[]) {
  if (!process.env.PINECONE_KEY) {
    throw new Error("Pinecone key does not exist");
  }

  const pc = new Pinecone({
    apiKey: process.env.PINECONE_KEY,
  });

  const index = process.env.PINECONE_INDEX;
  if (!index) {
    throw new Error("coudn't find index name");
  }
  const host = process.env.PINECONE_HOST;
  const namespace = pc.index(index, host).namespace("sample");

  const records = chunks.map((chunk, i) => ({
    id: i.toString(),
    text: chunk,
  }));

  await namespace.upsertRecords(records);
}


//!SECTION - SEQUENCE OF EXECUTION

// // 1. Pick a local PDF

//     const localPdf = path.resolve("./docs/sample.pdf"); // put your PDF here
//     const destName = "docs/sample.pdf";

//     console.log("📤 Uploading file to GCS...");
//     const gcsPath = await uploadFile(localPdf, destName);
//     console.log("✅ Uploaded to:", gcsPath);

//     // 2. Read back file(s) from GCS
//     console.log("📥 Reading file from GCS...");
//     const files = await readFilesFromPrefix("docs/");
//     console.log(`Found ${files.length} file(s) in GCS.`);

//     // 3. Extract text from the first PDF
//     console.log("🔎 Extracting text...");
//     const text = await extractTextFromPdf(gcsPath); // or use GCS path if your extract uses it
//     console.log("Sample Extracted Text:", text.slice(0, 300));

//     // 4. Chunk the text
//     console.log("✂️ Chunking...");
//     const chunks = await chunkText(text); // size=1000, overlap=200
//     console.log(`Created ${chunks.length} chunks.`);

//     await storeInDB(chunks);
//     // await deleteFile(gcsPath);
//   } catch (err) {
//     console.error("❌ Error in pipeline:", err);
//   }