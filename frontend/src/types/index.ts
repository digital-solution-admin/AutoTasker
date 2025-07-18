// Node types for workflow builder
export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    icon?: string;
    config?: Record<string, any>;
  };
}

// Edge types for connections between nodes
export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: 'default' | 'conditional';
  data?: {
    condition?: string;
    label?: string;
  };
}

// Complete workflow definition
export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: 'draft' | 'active' | 'paused' | 'error';
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

// Workflow template
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  thumbnail?: string;
  tags: string[];
  usageCount: number;
}

// Service status
export interface ServiceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  lastCheck: Date;
  responseTime?: number;
  uptime?: number;
  description?: string;
  healthChecks: HealthCheck[];
}

// Health check details
export interface HealthCheck {
  id: string;
  name: string;
  status: 'passing' | 'failing' | 'warning';
  message?: string;
  timestamp: Date;
}

// Draggable node type for the palette
export interface DraggableNodeType {
  id: string;
  type: WorkflowNode['type'];
  label: string;
  description: string;
  icon: string;
  category: string;
  defaultConfig?: Record<string, any>;
}

// Workflow execution log
export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  steps: ExecutionStep[];
  error?: string;
}

// Individual execution step
export interface ExecutionStep {
  id: string;
  nodeId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  input?: any;
  output?: any;
  error?: string;
}
