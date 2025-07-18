from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get OpenAI API key from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

@app.route("/")
def home():
    return jsonify({
        "status": "success",
        "message": "AutoTasker AI Backend is running"
    })

@app.route("/ai/summary", methods=["POST"])
def summarize():
    """Endpoint to summarize text using OpenAI API"""
    if not OPENAI_API_KEY:
        return jsonify({
            "status": "error",
            "message": "OpenAI API key not found. Please set it in the .env file."
        }), 400
    
    data = request.json
    if not data or "text" not in data:
        return jsonify({
            "status": "error",
            "message": "No text provided for summarization"
        }), 400
    
    try:
        # Call OpenAI API
        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant that summarizes text."
                },
                {
                    "role": "user",
                    "content": f"Summarize the following text concisely: {data['text']}"
                }
            ],
            "max_tokens": 150
        }
        
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=payload
        )
        
        response_data = response.json()
        summary = response_data["choices"][0]["message"]["content"].strip()
        
        return jsonify({
            "status": "success",
            "summary": summary
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Error generating summary: {str(e)}"
        }), 500

@app.route("/ai/post_social", methods=["POST"])
def post_social():
    """Endpoint to generate social media post from content"""
    if not OPENAI_API_KEY:
        return jsonify({
            "status": "error",
            "message": "OpenAI API key not found. Please set it in the .env file."
        }), 400
    
    data = request.json
    if not data or "content" not in data or "platform" not in data:
        return jsonify({
            "status": "error",
            "message": "Missing required fields: content and platform"
        }), 400
    
    try:
        # Call OpenAI API
        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }
        
        platform = data["platform"]  # e.g., "twitter", "linkedin", "instagram"
        
        payload = {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "system",
                    "content": f"You are a social media expert who creates engaging posts for {platform}."
                },
                {
                    "role": "user",
                    "content": f"Create a {platform} post based on this content: {data['content']}"
                }
            ],
            "max_tokens": 150
        }
        
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=payload
        )
        
        response_data = response.json()
        post = response_data["choices"][0]["message"]["content"].strip()
        
        return jsonify({
            "status": "success",
            "post": post,
            "platform": platform
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Error generating social media post: {str(e)}"
        }), 500

@app.route("/ai/screen_resume", methods=["POST"])
def screen_resume():
    """Endpoint to screen resumes using AI"""
    if not OPENAI_API_KEY:
        return jsonify({
            "status": "error",
            "message": "OpenAI API key not found. Please set it in the .env file."
        }), 400
    
    data = request.json
    if not data or "resume" not in data or "job_description" not in data:
        return jsonify({
            "status": "error",
            "message": "Missing required fields: resume and job_description"
        }), 400
    
    try:
        # Call OpenAI API
        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "system",
                    "content": "You are an HR assistant who screens resumes for job positions."
                },
                {
                    "role": "user",
                    "content": f"Evaluate this resume for the following job description. Provide a match percentage and brief explanation.\n\nJob Description: {data['job_description']}\n\nResume: {data['resume']}"
                }
            ],
            "max_tokens": 300
        }
        
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=payload
        )
        
        response_data = response.json()
        evaluation = response_data["choices"][0]["message"]["content"].strip()
        
        return jsonify({
            "status": "success",
            "evaluation": evaluation
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Error screening resume: {str(e)}"
        }), 500

@app.route("/notification/send", methods=["POST"])
def send_notification():
    """Mock endpoint to send notifications"""
    data = request.json
    if not data or "subject" not in data or "message" not in data:
        return jsonify({
            "status": "error",
            "message": "Missing required fields: subject and message"
        }), 400
    
    # In a real application, this would send an email, push notification, etc.
    # For this demo, we're just returning a success response
    return jsonify({
        "status": "success",
        "message": "Notification sent successfully",
        "notification": {
            "subject": data["subject"],
            "message": data["message"]
        }
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
