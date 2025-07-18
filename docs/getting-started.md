# Getting Started with AutoTasker

This guide will help you get AutoTasker up and running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker & Docker Compose** (version 20.10+ recommended)
- **Node.js** (version 16+ recommended)
- **Python** (version 3.8+ recommended)
- **Git** for version control

## 🚀 Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/digital-solution-admin/AutoTasker.git
cd AutoTasker
```

### 2. Environment Configuration

Copy the example environment files:

```bash
# Main environment file
cp .env.example .env

# n8n specific environment
cp .env.n8n.example .env.n8n

# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env
```

### 3. Configure Your API Keys

Edit the `.env` files to add your API keys:

```bash
# In .env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# In backend/.env
OPENAI_API_KEY=your_openai_api_key_here
FLASK_ENV=development
```

### 4. Start the Services

Use Docker Compose to start all services:

```bash
# Start all services
docker-compose up -d

# Or use the Makefile
make up
```

This will start:
- n8n workflow engine on port 5678
- Backend API on port 5000
- Frontend application on port 3000

### 5. Access the Applications

- **n8n Workflow Builder**: http://localhost:5678
- **AutoTasker Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 First Steps

### 1. Set Up n8n

1. Open http://localhost:5678 in your browser
2. Create your n8n account
3. Set up your first workflow using the templates in `/workflows`

### 2. Test the Backend API

```bash
# Health check
curl http://localhost:5000/health

# Test AI summarization
curl -X POST http://localhost:5000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text to summarize here"}'
```

### 3. Explore the Frontend

1. Open http://localhost:3000
2. Navigate through the workflow builder
3. Try creating your first automation

## 📚 Next Steps

- Read the [API Reference](api-reference.md) for backend integration
- Check out [n8n Workflows Guide](n8n-workflows.md) for workflow creation
- Explore the [Frontend Guide](frontend-guide.md) for UI customization

## 🛠️ Development Setup

If you want to contribute or develop locally:

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend Development

```bash
cd frontend
npm install
npm start
```

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**: Change ports in docker-compose.yml
2. **API Keys Not Working**: Verify your .env files are properly configured
3. **n8n Not Starting**: Check Docker logs with `docker-compose logs n8n`

### Getting Help

- Check the [FAQ](../README.md#faq) in the main README
- Look at existing issues on GitHub
- Create a new issue if you need help

## 📝 Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | Required |
| `N8N_BASIC_AUTH_ACTIVE` | Enable basic auth for n8n | true |
| `N8N_BASIC_AUTH_USER` | n8n username | admin |
| `N8N_BASIC_AUTH_PASSWORD` | n8n password | password |
| `BACKEND_PORT` | Backend service port | 5000 |
| `FRONTEND_PORT` | Frontend service port | 3000 |

## 🚀 Production Deployment

For production deployment, see the [Deployment Guide](deployment.md).
