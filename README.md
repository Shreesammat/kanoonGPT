# KanoonGPT

-->supabase for auth, database.
-->pinecone/chromaDB for vectorDB.
-->trpc for type safe rest api calls

-->one landing page + one working page


# IN THE WORKING PAGE

--> user can upload a legal text or a legal docs
--> legal docs will be parsed using a library and converted to text
--> this text will in a chunked manner will also be added to vector db (for future retrival in the chat session)
--> now this text will be feed to gemini api 
--> gemin api will summarize the entire legal docs in simple words and also figure out important clauses 
with labels like Termination, confidentaility, Arbitration, Payments etc, these labels will be marked with diff colors with a tooltip (CTA) for explaining this clauses in depth.

--> clicking on this tooltip will initiate the chat session 
--> also clicking on start chat button will initiate the chat session

--> once the chat session is started, all the chats will be embedded and stored in vector db.
--> and for each subsequent gemini api request , context feeeded will be retrived from vector db on the basis of the user's query. 

---> to improve ux/loading/and ensure low token limit usage, we can do

1. when the pdf text is uploaded to gemini api in one go (it might be a very large token). so we will iterate the tokens and summarize in each iteration and then hit the api again with the summary + next token iteration to create new summary.
we will keep doing this until the end of tokens.( this will comes in handy for large pdfs )

2. chat streaming to enhance ux for chats/and give a impression of less loading time

3. good crispy animation for highlighting clause , easy flow, colors and overall ux is important.

# WORK DIVISON
--> Adi, Abhishek: Frontend
--> Lavneesh: Backend + prompting
--> Sarim, Sammat: Chunking + RAG pipeline
