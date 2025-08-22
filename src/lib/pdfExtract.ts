import { DocumentProcessorServiceClient } from "@google-cloud/documentai";

const client = new DocumentProcessorServiceClient({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE,
});

export async function extractTextFromPdf(gcsUri: string) {
  const name = `projects/${process.env.GCLOUD_PROJECT_ID}/locations/us/processors/${process.env.DOCUMENT_AI_PROCESSOR_ID}`;

  const request = {
    name: name,
    gcsDocument: {
      gcsUri: gcsUri,
      mimeType: "application/pdf",
    },
  };

  const [result] = await client.processDocument(request);

  const text = result.document?.text || "";
  console.log("Extracted text length:", text.length);
  return text;
}
