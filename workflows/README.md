# AutoTasker Workflow Templates

This directory contains pre-built workflow templates that you can import into n8n to quickly get started with automation.

## 📋 Available Workflows

### 1. Email Summarizer (`email_summarizer.json`)
**Purpose**: Automatically summarizes incoming emails using AI

**Features**:
- Connects to email accounts (Gmail, Outlook, etc.)
- Uses OpenAI API to generate concise summaries
- Sends summaries via webhook or saves to database
- Configurable summary length and style

**Setup**:
1. Import the workflow into n8n
2. Configure email credentials
3. Set up OpenAI API key
4. Configure webhook endpoint or database connection

**Usage**:
```bash
# Trigger via webhook
curl -X POST http://localhost:5678/webhook/email-summary \
  -H "Content-Type: application/json" \
  -d '{"email_content": "Your email content here"}'
```

### 2. Social Media Poster (`social_media_poster.json`)
**Purpose**: Generates and posts AI-created content to social media platforms

**Features**:
- AI-powered content generation
- Multi-platform posting (Twitter, Facebook, LinkedIn)
- Customizable tone and style
- Media attachment support
- Scheduling capabilities

**Setup**:
1. Import the workflow into n8n
2. Configure social media API credentials
3. Set up OpenAI API key for content generation
4. Configure platform-specific settings

**Usage**:
```bash
# Post to Twitter
curl -X POST http://localhost:5678/webhook/social-media-post \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a post about productivity tips",
    "platform": "twitter",
    "tone": "friendly"
  }'
```

### 3. Resume Screener (Coming Soon)
**Purpose**: Automatically screens and scores resumes using AI

**Features**:
- PDF and document parsing
- AI-powered skill extraction
- Scoring based on job requirements
- Automated candidate ranking
- Integration with ATS systems

### 4. File Organizer (Coming Soon)
**Purpose**: Automatically organizes files based on content and metadata

**Features**:
- Content-based file categorization
- Intelligent folder structure creation
- Duplicate detection and removal
- Metadata extraction and tagging
- Batch processing capabilities

## 🚀 Quick Start

### Importing Workflows

1. **Via n8n Interface**:
   - Open n8n at http://localhost:5678
   - Click "Import from file"
   - Select the desired JSON file from this directory
   - Configure the imported workflow

2. **Via API**:
   ```bash
   # Import workflow via API
   curl -X POST http://localhost:5678/rest/workflows/import \
     -H "Content-Type: application/json" \
     -d @email_summarizer.json
   ```

### Configuration Steps

1. **Set up credentials** in n8n:
   - OpenAI API key
   - Social media platform credentials
   - Email account credentials
   - Database connections (if applicable)

2. **Configure webhooks**:
   - Set up webhook URLs for external integrations
   - Configure authentication if needed

3. **Test the workflow**:
   - Use the n8n interface to manually trigger workflows
   - Test with sample data
   - Verify all integrations work correctly

## 🔧 Customization

### Modifying Workflows

Each workflow can be customized for your specific needs:

1. **AI Prompts**: Modify the prompts sent to OpenAI for different output styles
2. **Integrations**: Add or remove platform integrations
3. **Data Processing**: Adjust how data is processed and transformed
4. **Error Handling**: Customize error handling and notification logic

### Environment Variables

Make sure these environment variables are set:

```bash
# AI Services
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here

# Social Media
TWITTER_API_KEY=your_twitter_key
TWITTER_API_SECRET=your_twitter_secret
FACEBOOK_ACCESS_TOKEN=your_facebook_token

# Email
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret

# Database (optional)
DATABASE_URL=your_database_url
```

## 📊 Workflow Monitoring

### Execution History

Monitor workflow executions in n8n:
- View execution history
- Check success/failure rates
- Debug failed executions
- Monitor performance metrics

### Logging

Enable detailed logging for troubleshooting:
```json
{
  "logging": {
    "level": "debug",
    "outputs": ["console", "file"],
    "file": {
      "filePath": "logs/workflows.log"
    }
  }
}
```

## 🛠️ Development

### Creating New Workflows

1. **Design in n8n**: Use the visual interface to create your workflow
2. **Test thoroughly**: Test with various inputs and edge cases
3. **Export**: Export the workflow as JSON
4. **Document**: Create documentation following the template above
5. **Share**: Add to this directory and update the README

### Best Practices

1. **Error Handling**: Always include error handling nodes
2. **Authentication**: Use secure credential storage
3. **Testing**: Include test data and validation steps
4. **Documentation**: Document all configuration steps
5. **Version Control**: Use meaningful names and descriptions

## 📚 Resources

- [n8n Workflow Documentation](https://docs.n8n.io/workflows/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Social Media API Documentation](https://developer.twitter.com/en/docs)
- [Email API Documentation](https://developers.google.com/gmail/api)

## 🤝 Contributing

To contribute new workflows:

1. Create and test your workflow in n8n
2. Export it as JSON
3. Add documentation following the template above
4. Submit a pull request with your workflow and documentation

## 📝 Template Structure

When creating new workflows, follow this JSON structure:

```json
{
  "name": "Workflow Name",
  "nodes": [...],
  "connections": {...},
  "active": false,
  "settings": {
    "saveManualExecutions": true,
    "callerPolicy": "workflowsFromSameOwner"
  },
  "meta": {
    "templateId": "unique-template-id",
    "description": "Brief description of what the workflow does",
    "tags": ["tag1", "tag2", "tag3"]
  }
}
```

## 🔐 Security Notes

- Never commit actual API keys or credentials
- Use environment variables for sensitive data
- Regularly rotate API keys
- Monitor workflow executions for suspicious activity
- Use HTTPS for all external API calls
