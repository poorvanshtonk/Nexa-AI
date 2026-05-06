import os

from flask import Flask, jsonify, request
from datetime import datetime
from flask_cors import CORS
import ollama

DEFAULT_GREETING = "Ram Ram bhaiya ji, kaise ho? Nexa AI sahi se chl rha h."
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")
PORT = int(os.getenv("PORT", "8000"))

app = Flask(__name__)
CORS(app)


def build_reply(message: str) -> str:
    response = ollama.chat(
        model=OLLAMA_MODEL,
        messages=[
            {
                "role": "system",
                "content": """
                You are Nexa AI, a smart, friendly,
                futuristic personal AI assistant.

                Keep responses:
                - natural
                - concise
                - helpful
                - slightly futuristic
                - conversational

                Do not say you are an AI language model.
                Act like a real assistant.
                """
            },
            {
                "role": "user",
                "content": message
            }
        ],
    )
    return response["message"]["content"]


@app.route("/chat", methods=["GET"])
def get_chat():
    return jsonify({"reply": DEFAULT_GREETING})

@app.route("/")
def home():
    return jsonify({
        "message": "Nexa AI Server Running 🚀"
    })


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "reply": "Message cannot be empty."
        }), 400

    # Time Tool
    if "time" in message.lower():
        current_time = datetime.now().strftime("%I:%M %p")

        return jsonify({
            "reply": f"The current time is {current_time}"
        })

    if any(word in message.lower() for word in ["date", "day", "today"]):

        current_date = datetime.now().strftime("%d %B %Y")
        current_day = datetime.now().strftime("%A")

        return jsonify({
            "reply": f"Today is {current_day}, {current_date}"
        })

    # Default Ollama Chat
    try:
        reply = build_reply(message)

    except Exception as error:
        return jsonify({
            "reply": f"Chatbot request failed: {error}"
        }), 500

    return jsonify({
        "reply": reply
    })
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
