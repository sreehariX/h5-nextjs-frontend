from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb
import google.generativeai as genai
import os
from dotenv import load_dotenv
from datetime import datetime
import pandas as pd
import tiktoken
from typing import List

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

load_dotenv()
COLLECTION_NAME = "h5_website_content"
PERSIST_DIR = "./chroma_db"

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
chroma_client = chromadb.PersistentClient(path=PERSIST_DIR)

class QueryRequest(BaseModel):
    query: str

def chunk_text(text: str, token_count: int) -> List[str]:
    chunks = []
    chunk_size = 2000  
    
    if token_count <= chunk_size:
        chunks.append(text)
        return chunks
    
    encoding = tiktoken.get_encoding("cl100k_base")
    tokens = encoding.encode(text)
    
    for i in range(0, len(tokens), chunk_size):
        chunk_tokens = tokens[i:i + chunk_size]
        chunk_text = encoding.decode(chunk_tokens)
        chunks.append(chunk_text)
    
    return chunks

def get_embedding(text: str) -> List[float]:
    try:
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=text
        )
        return result['embedding']
    except Exception as e:
        print(f"Error getting embedding: {e}")
        return None

def initialize_collection():
    try:
        collection = chroma_client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"}
        )
        
        if collection.count() == 0:
            df = pd.read_csv('ContentForRag.csv')
            
            documents = []
            embeddings = []
            metadatas = []
            ids = []
            id_counter = 0
            
            for _, row in df.iterrows():
                content = row['content'].strip('"""')
                chunks = chunk_text(content, int(row['token_count']))
                
                for chunk in chunks:
                    embedding = get_embedding(chunk)
                    if embedding:
                        documents.append(chunk)
                        embeddings.append(embedding)
                        metadatas.append({
                            'url': row['url'],
                            'token_count': int(row['token_count']),
                            'char_count': int(row['char_count']),
                            'pagename': row['pagename']
                        })
                        ids.append(f"doc_{id_counter}")
                        id_counter += 1
            
            if documents:
                collection.add(
                    documents=documents,
                    embeddings=embeddings,
                    metadatas=metadatas,
                    ids=ids
                )
        
        return collection
    except Exception as e:
        print(f"Error initializing collection: {e}")
        raise

def get_final_response(query: str, context: str) -> str:
    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction="""You are an assistant for IIT Bombay Hostel 5. Format responses in markdown:

            Guidelines:
            - Use markdown formatting for better readability
            - Use bullet points for lists
            - Use bold for important information
            - Use headings when appropriate
            - Include timing information in a clear format
            
            Example format:
            **Mess Timings:**
            - Breakfast: 7:30 AM - 9:30 AM
            - Lunch: 12:00 PM - 2:15 PM

            
            
            Important:
            - Never mention "the context" or "according to"
            - Keep responses conversational but well-formatted
            - Use markdown tables for structured data
            - Format links properly: [text](url)
            - strictly dont include greetings in every response only for questions like hi hello hola how are you etc. you should say hi how can i help you or similar answers friendly"""
        )
        
        current_time = datetime.now()
        day_of_week = current_time.strftime('%A').upper()
        
        prompt = f"""Time: {current_time}
        Day: {day_of_week}
        
        User: {query}
        
        Available Information: {context}
        
        Respond with proper markdown formatting."""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error getting final response: {e}")
        return "I'm having trouble right now. Please try again in a moment."

@app.post("/query")
async def query_endpoint(request: QueryRequest):
    try:
        collection = chroma_client.get_collection(COLLECTION_NAME)
        
        query_embedding = get_embedding(request.query)
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=3,
            include=['documents', 'metadatas', 'distances']
        )
        
        context = " ".join(results['documents'][0])
        final_response = get_final_response(request.query, context)
        
        sources = []
        for meta in results['metadatas'][0]:
            if meta and isinstance(meta, dict):
                source = {
                    'url': meta.get('url', '#'),
                    'title': meta.get('pagename', 'Additional Information')
                }
                if source['url'] and source['title']:
                    sources.append(source)
        
        
        
        return {
            'query': request.query,
            'response': final_response,
            'timestamp': datetime.now().isoformat(),
            'sources': sources
        }
    
    except Exception as e:
        print(f"Error in query endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("startup")
async def startup_event():
    initialize_collection()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)