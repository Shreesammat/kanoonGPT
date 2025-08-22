import { CloudClient } from "chromadb";

export const client = new CloudClient({
  apiKey: process.env.CHROMA_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE
});