import { v4 as uuidv4 } from 'uuid';
import { WorkflowNode, WorkflowEdge, Workflow, DraggableNodeType } from '../types';

// Generate a unique ID
export const generateId = (): string => uuidv4();

// Create a new workflow node
export const createWorkflowNode = (
  type: WorkflowNode['type'],
  position: { x: number; y: number },
  nodeType: DraggableNodeType
): WorkflowNode => ({
  id: generateId(),
  type,
  position,
  data: {
    label: nodeType.label,
    description: nodeType.description,
    icon: nodeType.icon,
    config: nodeType.defaultConfig || {},
  },
});

// Create a new workflow edge
export const createWorkflowEdge = (
  source: string,
  target: string,
  type: 'default' | 'conditional' = 'default'
): WorkflowEdge => ({
  id: generateId(),
  source,
  target,
  type,
});

// Create a new empty workflow
export const createEmptyWorkflow = (name: string): Workflow => ({
  id: generateId(),
  name,
  description: '',
  nodes: [],
  edges: [],
  status: 'draft',
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: [],
});

// Validate workflow structure
export const validateWorkflow = (workflow: Workflow): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check if workflow has at least one trigger node
  const triggerNodes = workflow.nodes.filter(node => node.type === 'trigger');
  if (triggerNodes.length === 0) {
    errors.push('Workflow must have at least one trigger node');
  }

  // Check for orphaned nodes (nodes without connections)
  const connectedNodeIds = new Set([
    ...workflow.edges.map(edge => edge.source),
    ...workflow.edges.map(edge => edge.target),
  ]);
  
  const orphanedNodes = workflow.nodes.filter(node => 
    node.type !== 'trigger' && !connectedNodeIds.has(node.id)
  );
  
  if (orphanedNodes.length > 0) {
    errors.push(`Found ${orphanedNodes.length} orphaned nodes`);
  }

  // Check for circular dependencies
  const hasCircularDependency = checkCircularDependency(workflow.nodes, workflow.edges);
  if (hasCircularDependency) {
    errors.push('Workflow contains circular dependencies');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Check for circular dependencies in workflow
const checkCircularDependency = (nodes: WorkflowNode[], edges: WorkflowEdge[]): boolean => {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const hasCycle = (nodeId: string): boolean => {
    if (recursionStack.has(nodeId)) {
      return true;
    }
    if (visited.has(nodeId)) {
      return false;
    }

    visited.add(nodeId);
    recursionStack.add(nodeId);

    const connectedEdges = edges.filter(edge => edge.source === nodeId);
    for (const edge of connectedEdges) {
      if (hasCycle(edge.target)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (hasCycle(node.id)) {
      return true;
    }
  }

  return false;
};

// Format duration in a human-readable way
export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

// Format timestamp for display
export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Get status color for UI components
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'online':
    case 'active':
    case 'completed':
    case 'passing':
      return 'text-green-600 bg-green-100';
    case 'offline':
    case 'error':
    case 'failed':
    case 'failing':
      return 'text-red-600 bg-red-100';
    case 'degraded':
    case 'paused':
    case 'warning':
      return 'text-yellow-600 bg-yellow-100';
    case 'maintenance':
    case 'draft':
    case 'pending':
      return 'text-gray-600 bg-gray-100';
    case 'running':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};
