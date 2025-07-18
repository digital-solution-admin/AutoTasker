# 🚀 AutoTasker Quick Start Guide

Welcome to AutoTasker! This guide will help you get the entire AutoTasker platform running on your machine in minutes.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Docker** (v20.10 or later)
- **Docker Compose** (v2.0 or later)
- **Git** (for cloning the repository)
- **OpenAI API Key** (for AI features)

## 🛠️ Quick Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/digital-solution-admin/AutoTasker.git
cd AutoTasker
```

### Step 2: Environment Configuration

1. Copy the environment examples:
```bash
cp .env.n8n.example .env.n8n
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Edit the environment files with your configuration:

**Backend (.env):**
```env
OPENAI_API_KEY=your_openai_api_key_here
API_KEY_SECRET=your_secret_key_here
JWT_SECRET=your_jwt_secret_here
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_N8N_URL=http://localhost:5678
```

### Step 3: Start All Services

```bash
# Start all services with Docker Compose
docker-compose up -d

# Or start with logs visible
docker-compose up
```

### Step 4: Access the Applications

Once all services are running, you can access:

- **Frontend (React App)**: http://localhost:3000
- **n8n Workflow Builder**: http://localhost:5678
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 🔐 Default Credentials

### n8n Login
- **Username**: `admin`
- **Password**: `password123`

### Database Credentials
- **MongoDB**: `admin` / `password123`
- **PostgreSQL**: `n8n` / `n8n123`
- **Redis**: `redis123`

## 🧪 Test the Setup

1. **Test Backend API:**
```bash
curl http://localhost:5000/
```

2. **Test AI Summarization:**
```bash
curl -X POST http://localhost:5000/ai/summary \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a sample text to summarize."}'
```

3. **Access n8n Interface:**
   - Go to http://localhost:5678
   - Login with admin/password123
   - Create your first workflow!

## 🎯 Available Services

### Core Services
- **Frontend**: React.js drag & drop UI for workflow building
- **Backend**: Python Flask API with AI endpoints
- **n8n**: Workflow automation engine
- **MongoDB**: Optional workflow storage
- **PostgreSQL**: n8n database storage

### Support Services
- **Redis**: Caching and session storage
- **Nginx**: Reverse proxy (optional)

## 📊 Service Health Checks

Check if all services are healthy:

```bash
# View service status
docker-compose ps

# View logs for specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs n8n
```

## 🔧 Development Mode

For development with hot reloading:

```bash
# Start only databases
docker-compose up -d mongodb postgres redis

# Run backend locally
cd backend
pip install -r requirements.txt
python app.py

# Run frontend locally (in another terminal)
cd frontend
npm install
npm start
```

## 🛠️ Available Workflows

Pre-built workflow templates are available in the `/workflows` directory:

1. **Social Media Automation** - Generate and post content
2. **Resume Screening** - AI-powered candidate evaluation
3. **Email Summarization** - Automatically summarize emails
4. **File Management** - Intelligent file organization

## 🌐 Production Deployment

For production deployment:

1. **Update environment variables** for production
2. **Enable HTTPS** with SSL certificates
3. **Configure reverse proxy** (Nginx included)
4. **Set up monitoring** and logging
5. **Backup strategies** for databases

## 🔒 Security Notes

- Change all default passwords before production use
- Use environment variables for sensitive data
- Enable SSL/TLS for all external connections
- Regular security updates for all containers

## 📚 API Documentation

### AI Endpoints

**POST /ai/summary**
```json
{
  "text": "Text to summarize"
}
```

**POST /ai/post_social**
```json
{
  "content": "Content for social media",
  "platform": "twitter"
}
```

**POST /ai/screen_resume**
```json
{
  "resume": "Resume text",
  "job_description": "Job requirements"
}
```

## 🆘 Troubleshooting

### Common Issues

1. **Services not starting:**
   - Check Docker is running
   - Verify port availability
   - Check environment variables

2. **AI endpoints not working:**
   - Verify OpenAI API key is set
   - Check API key permissions
   - Monitor API usage limits

3. **Database connection issues:**
   - Wait for health checks to pass
   - Check database logs
   - Verify credentials

### Getting Help

- Check the logs: `docker-compose logs [service_name]`
- Restart services: `docker-compose restart`
- Reset everything: `docker-compose down -v && docker-compose up -d`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For support and questions:
- Create an issue on GitHub
- Email: ojasmishra889@gmail.com
- Documentation: Check the `/docs` directory

---

**Happy Automating! 🎉**
