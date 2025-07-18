# n8n Configuration

This directory contains the n8n workflow engine configuration for AutoTasker.

## 📁 Directory Structure

```
n8n/
├── config.json          # n8n configuration file
├── workflows/           # Exported workflow templates
├── credentials/         # Credential templates (DO NOT commit actual credentials)
├── custom-nodes/        # Custom node definitions
└── README.md           # This file
```

## 🔧 Configuration

### config.json

The main configuration file that defines:
- Database settings (SQLite by default)
- API credentials configuration
- Node package settings
- Webhook endpoints
- Logging configuration

### Environment Variables

Make sure these environment variables are set:

```bash
# Required for AI features
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here

# n8n authentication (optional)
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_secure_password
```

## 🚀 Running n8n

### With Docker Compose (Recommended)

```bash
# From the root directory
docker-compose up n8n
```

### Manual Installation

```bash
# Install n8n globally
npm install -g n8n

# Set environment variables
export N8N_CONFIG_FILES=./n8n/config.json
export OPENAI_API_KEY=your_key_here

# Start n8n
n8n start
```

## 📋 Available Workflows

The following workflow templates are available in the `/workflows` directory:

1. **Email Summarizer** - Automatically summarizes incoming emails
2. **Social Media Poster** - Posts content across multiple platforms
3. **Resume Screener** - Analyzes and scores resumes
4. **File Organizer** - Automatically organizes files by type/date

## 🔌 Custom Nodes

AutoTasker includes custom nodes for:
- AI text processing
- File manipulation
- Social media integrations
- Email processing

### Installing Custom Nodes

```bash
# Install community packages
npm install -g @n8n/n8n-nodes-langchain
npm install -g n8n-nodes-openai
```

## 🌐 API Endpoints

When n8n is running, the following endpoints are available:

- **Main Interface**: http://localhost:5678
- **Webhook Endpoint**: http://localhost:5678/webhook/
- **Test Webhook**: http://localhost:5678/webhook-test/
- **Public API**: http://localhost:5678/api/

## 🔐 Security

### Production Considerations

1. **Authentication**: Always enable basic auth in production
2. **HTTPS**: Use HTTPS for all webhook endpoints
3. **API Keys**: Store sensitive credentials in environment variables
4. **Database**: Use PostgreSQL or MySQL for production

### Environment Variables for Production

```bash
# Security
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=your_username
N8N_BASIC_AUTH_PASSWORD=your_secure_password

# Database (PostgreSQL example)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n_user
DB_POSTGRESDB_PASSWORD=your_db_password

# SSL/TLS
N8N_PROTOCOL=https
N8N_SSL_KEY=/path/to/your/ssl/key.pem
N8N_SSL_CERT=/path/to/your/ssl/cert.pem
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port 5678 in use**: Change the port in docker-compose.yml
2. **Missing API keys**: Check your .env files
3. **Workflow not triggering**: Verify webhook URLs
4. **Database connection issues**: Check database credentials

### Debug Mode

To enable debug logging:

```bash
export N8N_LOG_LEVEL=debug
n8n start
```

## 📚 Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community](https://community.n8n.io/)
- [Custom Node Development](https://docs.n8n.io/integrations/creating-nodes/)
- [Workflow Templates](https://n8n.io/workflows/)

## 🤝 Contributing

To contribute new workflows or custom nodes:

1. Create your workflow in the n8n interface
2. Export it to the `/workflows` directory
3. Document the workflow in the main README
4. Submit a pull request

## 📝 Notes

- The SQLite database file will be created automatically
- Workflow data is persisted in the database
- Custom nodes should be documented in their own README files
- Always test workflows in a development environment first
