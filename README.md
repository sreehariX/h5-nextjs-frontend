<div align="center">
  
![h5-logo](public/images/common/H5_Logo_Transparent.png)

[H5 Website] | [Hosting] | [Getting Started]
</div>

This is the main source code repository for [H5 Website]. It contains both the Next.js frontend application and FastAPI backend server code.

[H5 Website]: https://h5-nextjs-frontend.vercel.app/
[Getting Started]: #quick-start
[Hosting]: #hosting

## Why H5 Website?

- **Modern Stack:** Built with Next.js 14 and FastAPI, offering server-side rendering and efficient API handling
- **AI Assistant:** Integrated Gemini AI for intelligent hostel-related queries
- **Interactive UI:** Framer Motion animations, responsive design, and dark mode support
- **Vector Search:** ChromaDB for efficient information retrieval

## Quick Start

1. Clone the repository
2. Follow the [Installation Guide](#installation)
3. Start developing with `npm run dev` for frontend and `uvicorn main:app --reload` for backend

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- Gemini API key

## Installation
### Frontend Setup

1. **Clone & Navigate**
   ```bash
   git clone https://github.com/sreehariX/h5-nextjs-frontend.git
   cd h5-nextjs-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Open your browser and visit: `http://localhost:3000`
  

### Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd h5website-backend
   ```

2. **Create & Activate Virtual Environment**
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   Create a `.env` file in the backend root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Start Development Server**
   ```bash
   uvicorn main:app --reload
   ```

6. **Verify Installation**
   - API will be running at: `http://localhost:8000`


## Features

- **AI Chat Assistant**: Get instant answers about hostel facilities, rules, and events
- **Interactive UI**: Smooth animations and responsive design
- **Vector Search**: Efficient information retrieval using ChromaDB
- **Markdown Support**: Rich text formatting for announcements and FAQs

## Tech Stack

- **Frontend**: Next.js 14, Framer Motion, TailwindCSS
- **Backend**: FastAPI, ChromaDB, Gemini AI
- **Styling**: CSS Modules, TailwindCSS
- **Animations**: Framer Motion
- **AI**: Google Gemini API

## Hosting 

### frontend
- Frontend is currently hosted on vercel will be hosted on gymkhana.iitb.ac.in server soon


### backend
- For chatbot we are using chromadb,gemini api and fastapi
- The fastapi is running on a azure vm
- It is configured using apache server


## License

TNot yet decided will be soon
