# 🤖 AI Chatbot (React + Flask + Ollama)

A full-stack AI chatbot that runs **entirely locally** using **React (TypeScript + Vite)** for the frontend, **Flask** for the backend, and **Ollama (LLaMA models)** for AI responses.

---

## 🚀 Features

* ⚡ Fast and modern UI built with React + Vite
* 🧠 AI responses powered by local LLMs via Ollama
* 🔗 Flask backend for API handling
* 🔒 Fully local setup (no external APIs required)
* 📦 Clean and modular project structure

---

## 📂 Project Structure

```
AI-Chatbot/
│── client/        # React + TypeScript frontend
│── server/        # Flask backend
│── venv/          # Python virtual environment
│── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-chatbot.git
cd ai-chatbot
```

---

## 🧠 Step 1: Start Backend (Flask + Ollama)

### 🔹 Navigate to server

```bash
cd server
```

### 🔹 Create & activate virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 🔹 Install dependencies

```bash
pip install flask flask-cors ollama
```

### 🔹 Start Ollama (in a separate terminal)

```bash
ollama serve
```

### 🔹 Run backend server

```bash
python server.py
```

👉 Backend runs on:

```
http://127.0.0.1:8000
```

---

## 💻 Step 2: Start Frontend (React)

### 🔹 Navigate to client

```bash
cd client
```

### 🔹 Install dependencies

```bash
npm install
```

### 🔹 Run development server

```bash
npm run dev
```

👉 Frontend will run on:

```
http://localhost:5173
```

---

## 🔗 API Configuration

By default, the frontend connects to:

```
http://localhost:8000
```

To change this, create a `.env` file inside `/client`:

```bash
VITE_API_URL=http://localhost:8000
```

---

## 🧪 Usage

1. Start the backend server
2. Start the frontend
3. Open the app in your browser
4. Start chatting with your local AI 🤖

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript + Vite
* **Backend:** Flask (Python)
* **AI Engine:** Ollama (LLaMA 3)
* **Communication:** REST API (JSON)

---

## 🔮 Future Improvements

* Streaming responses (real-time typing effect)
* Chat history & memory
* Multi-model support
* Authentication system
* Docker deployment

---

## 🤝 Contributing

Feel free to fork this repo and submit pull requests. Suggestions and improvements are always welcome!

---

## 📜 License

This project is open-source and available under the MIT License.
