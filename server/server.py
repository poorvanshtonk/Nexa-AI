import os

from flask import Flask, jsonify, request
from flask_cors import CORS
import ollama

DEFAULT_GREETING = "Ram Ram bhaiya ji, kaise ho?"
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")
PORT = int(os.getenv("PORT", "8000"))

app = Flask(__name__)
CORS(app)


def build_reply(message: str) -> str:
    response = ollama.chat(
        model=OLLAMA_MODEL,
        messages=[
            {"role": "user", "content": message},
        ],
    )
    return response["message"]["content"]


@app.route("/chat", methods=["GET"])
def get_chat():
    return jsonify({"reply": DEFAULT_GREETING})


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "").strip()

    if not message:
      return jsonify({"reply": "Message cannot be empty."}), 400

    try:
        reply = build_reply(message)
    except Exception as error:
        return jsonify({"reply": f"Chatbot request failed: {error}"}), 500

    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
