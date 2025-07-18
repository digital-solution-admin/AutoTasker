# Workflow Builder Frontend

A modern React.js application for creating and managing automation workflows with a visual drag & drop interface.

## Features

- **Visual Workflow Builder**: Drag and drop interface for creating complex automation workflows
- **Real-time Canvas**: Interactive canvas with node connections and real-time updates
- **Template Gallery**: Pre-built workflow templates for common automation scenarios
- **Service Status Monitoring**: Real-time monitoring of system services and health checks
- **Workflow Management**: Create, edit, save, and execute workflows
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React 18**: Modern React with hooks and function components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **@dnd-kit**: Modern drag and drop library
- **Lucide React**: Beautiful icon library

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Layout.tsx
│   │   ├── NodePalette.tsx
│   │   └── WorkflowCanvas.tsx
│   ├── pages/           # Page components
│   │   ├── WorkflowBuilder.tsx
│   │   ├── WorkflowList.tsx
│   │   ├── TemplateGallery.tsx
│   │   └── ServiceStatus.tsx
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   └── workflow.ts
│   ├── App.tsx         # Main application component
│   ├── App.css         # Application styles
│   └── index.tsx       # Application entry point
├── public/             # Static assets
├── package.json        # Dependencies and scripts
└── tailwind.config.js  # Tailwind configuration
```

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

## Usage

### Creating a Workflow

1. Navigate to the Workflows page
2. Click "Create Workflow" button
3. Use the node palette to drag components onto the canvas
4. Connect nodes by clicking and dragging between connection points
5. Configure node properties in the properties panel
6. Save and run your workflow

### Using Templates

1. Go to the Templates page
2. Browse available templates by category
3. Click "Use Template" to create a new workflow from a template
4. Customize the template as needed

### Monitoring Services

1. Visit the Service Status page
2. View overall system health and individual service status
3. Monitor response times, uptime, and health checks
4. Refresh status information as needed

## Components

### WorkflowCanvas
The main drag-and-drop canvas for building workflows. Features:
- Node positioning and movement
- Connection lines between nodes
- Real-time updates
- Selection and editing

### NodePalette
Sidebar component with draggable workflow components:
- Triggers (Webhook, Schedule, Email)
- Actions (Send Email, HTTP Request, Database Query)
- Logic (Conditions, Filters)
- Utilities (Delay, Transform)

### Layout
Application shell with navigation and routing:
- Responsive navigation bar
- Mobile-friendly menu
- Route-based active states

## Customization

### Adding New Node Types

1. Update the `DraggableNodeType` interface in `types/index.ts`
2. Add new node types to the `nodeTypes` array in `NodePalette.tsx`
3. Handle the new node type in the canvas rendering logic

### Styling

The application uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Custom components in `App.css`
- Responsive breakpoints and utilities

### API Integration

The application is currently using mock data. To integrate with a real API:

1. Update the utility functions in `utils/workflow.ts`
2. Replace mock data with API calls in the page components
3. Add error handling and loading states

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for new features
3. Include responsive design considerations
4. Test on multiple browsers and devices

## License

This project is licensed under the MIT License.
