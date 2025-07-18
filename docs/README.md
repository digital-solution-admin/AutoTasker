# AutoTasker Documentation

Welcome to the AutoTasker documentation! This directory contains comprehensive guides and references for using and contributing to AutoTasker.

## 📚 Documentation Structure

- [`getting-started.md`](getting-started.md) - Quick start guide for new users
- [`api-reference.md`](api-reference.md) - Backend API documentation
- [`frontend-guide.md`](frontend-guide.md) - Frontend development guide
- [`n8n-workflows.md`](n8n-workflows.md) - n8n workflow configuration guide
- [`deployment.md`](deployment.md) - Deployment and hosting instructions
- [`contributing.md`](contributing.md) - Contribution guidelines

## 🚀 Quick Links

- [Project Overview](../README.md)
- [Quick Start Guide](../QUICKSTART.md)
- [Frontend Setup](../frontend/README.md)
- [Backend API](../backend/README.md)

## 🎯 What is AutoTasker?

AutoTasker is a no-code automation platform that combines the power of n8n workflows with AI capabilities to help users automate complex tasks like:

- 📧 Email summarization and management
- 📱 Social media content posting
- 📄 Resume screening and analysis
- 🗂️ File organization and renaming
- 🔄 Custom workflow automation

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   n8n Engine    │
│   (React.js)    │◄──►│   (Python)      │◄──►│   (Workflows)   │
│   Port 3000     │    │   Port 5000     │    │   Port 5678     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Python (Flask/FastAPI) + OpenAI API
- **Workflow Engine**: n8n
- **Containerization**: Docker + Docker Compose
- **Database**: MongoDB (optional)

## 📝 Getting Help

If you need help:
1. Check the relevant documentation file
2. Look at existing workflow examples in `/workflows`
3. Review the API examples in the backend
4. Create an issue on GitHub

## 🤝 Contributing

We welcome contributions! Please read the [contributing guide](contributing.md) to get started.

## 📄 License

This project is licensed under the MIT License.
