# Nexa AI

A modern AI-powered personal assistant built with **React, TypeScript, Flask, and Ollama**.
Nexa AI combines a clean conversational UI with local LLM capabilities and real-time utility tools to create a modular agentic AI assistant experience.

---

## 🚀 Features

* Modern React + TypeScript frontend
* Flask backend API
* Ollama local LLM integration
* Conversational AI chat interface
* Modular component architecture
* Responsive SaaS-style UI
* Typing indicator animations
* Auto-scrolling chat experience
* Real-time utilities:

  * Current Time
  * Current Date
  * Day Detection
* Sidebar workspace layout
* Suggested prompts system
* Scalable agentic architecture foundation

---

## 🧠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Modular CSS

### Backend

* Flask
* Flask-CORS
* Ollama Python Library

### AI Model

* Llama 3 (via Ollama)

---

## 📂 Project Structure

```bash
Nexa-AI/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   └── package.json
│
├── server/
│   ├── server.py
│   └── venv/
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd Nexa-AI
```

---

# 🖥️ Backend Setup

### 2️⃣ Navigate to Server

```bash
cd server
```

---

### 3️⃣ Create Virtual Environment

#### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

### 4️⃣ Install Dependencies

```bash
pip install flask flask-cors ollama
```

---

### 5️⃣ Install Ollama

Download and install Ollama from:

```text
https://ollama.com
```

---

### 6️⃣ Pull Llama 3 Model

```bash
ollama pull llama3
```

---

### 7️⃣ Run Backend Server

```bash
python server.py
```

Server runs on:

```text
http://localhost:8000
```

---

# 🌐 Frontend Setup

### 8️⃣ Navigate to Client

```bash
cd client
```

---

### 9️⃣ Install Dependencies

```bash
npm install
```

---

### 🔟 Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

## GET `/`

Health check endpoint.

### Response

```json
{
  "message": "Nexa AI Server Running 🚀"
}
```

---

## GET `/chat`

Returns default greeting.

### Response

```json
{
  "reply": "Ram Ram bhaiya ji, kaise ho?"
}
```

---

## POST `/chat`

Send chat message to Nexa AI.

### Request

```json
{
  "message": "Hello Nexa"
}
```

### Response

```json
{
  "reply": "Hello! How can I help you today?"
}
```

---

# 🧩 Current Agentic Features

Nexa AI currently supports:

* Conversational AI responses
* Time tool routing
* Date tool routing
* Day detection logic
* Typing state handling
* Modular message architecture

---

# 🛣️ Planned Features

* Weather integration
* Voice assistant
* Memory system
* Device connectivity
* Multi-tool routing
* AI workspace history
* Local file assistant
* Markdown rendering
* Streaming AI responses

---

# 🎯 Project Vision

Nexa AI is designed as a foundation for a personal agentic AI ecosystem capable of:

* conversational intelligence
* local execution
* tool usage
* modular expansion
* future device integration

The long-term goal is to evolve Nexa AI into a scalable personal AI operating assistant.

---

# 👨‍💻 Author

Built by Poorvansh Tonk

---

# 📜 License

This project is licensed under the MIT License.
