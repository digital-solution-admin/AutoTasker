# 🧠 AutoTasker

A no-code automation tool powered by AI, inspired by Zapier & n8n.

## 🎯 Project Goal

Build a no-code automation platform that lets users automate tasks like posting to social media, summarizing emails, renaming files, and screening resumes using AI.

## Features
- Social media posting automation
- Email summarization
- Resume screening
- Drag and drop workflow builder
- AI-powered task automation
- Custom workflow templates

## 📦 Tech Stack
- n8n for workflow engine
- React.js + Tailwind CSS for frontend
- Python (Flask/FastAPI) for AI backend
- OpenAI API for AI capabilities
- Node.js for custom scripts
- Docker for containerization
- MongoDB for workflow storage (optional)

## 🧠 Project Structure
```
/frontend    - React.js drag & drop UI
/backend     - Python API for AI tasks
/n8n         - n8n configuration
/workflows   - Predefined workflow templates
/docs        - Documentation
```

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js and npm
- Python 3.8+

### Run Locally
```bash
# Start n8n
docker-compose up

# Start backend (from /backend directory)
pip install -r requirements.txt
python app.py

# Start frontend (from /frontend directory)
npm install
npm start
```

## 🌐 Access
- n8n interface: [http://localhost:5678](http://localhost:5678)
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## 🧒 Easy to Build
Even beginners can contribute to this project:
- Set up Docker and clone the repo
- Use n8n UI to build workflows
- Connect with OpenAI API
- Use the drag & drop UI to create automations

## 📋 Roadmap
1. ✅ Setup GitHub repo structure
2. ⚙️ Configure n8n with Docker
3. 🧱 Build frontend drag & drop UI
4. 🧠 Create AI backend services
5. 🔌 Connect n8n to backend
6. ✨ Build workflow templates
7. 🌐 Add API key management
8. 📤 Setup hosting options
9. 🔐 Add authentication (optional)
10. 📖 Complete documentation

## 📝 License
MIT

## 👨‍💻 Author
Created by [digital-solution-admin](https://github.com/digital-solution-admin)
Contact: ojasmishra889@gmail.com
