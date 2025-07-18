import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { DraggableNodeType } from '../types';

interface NodePaletteProps {
  onNodeSelect?: (nodeType: DraggableNodeType) => void;
}

// Available node types for the workflow builder
const nodeTypes: DraggableNodeType[] = [
  // Triggers
  {
    id: 'webhook-trigger',
    type: 'trigger',
    label: 'Webhook',
    description: 'Trigger workflow from HTTP request',
    icon: '🌐',
    category: 'Triggers',
  },
  {
    id: 'schedule-trigger',
    type: 'trigger',
    label: 'Schedule',
    description: 'Run workflow on schedule',
    icon: '⏰',
    category: 'Triggers',
  },
  {
    id: 'email-trigger',
    type: 'trigger',
    label: 'Email',
    description: 'Trigger on email received',
    icon: '📧',
    category: 'Triggers',
  },
  
  // Actions
  {
    id: 'send-email',
    type: 'action',
    label: 'Send Email',
    description: 'Send email notification',
    icon: '📤',
    category: 'Actions',
  },
  {
    id: 'http-request',
    type: 'action',
    label: 'HTTP Request',
    description: 'Make HTTP API call',
    icon: '🔗',
    category: 'Actions',
  },
  {
    id: 'database-query',
    type: 'action',
    label: 'Database Query',
    description: 'Execute database query',
    icon: '🗄️',
    category: 'Actions',
  },
  {
    id: 'file-upload',
    type: 'action',
    label: 'File Upload',
    description: 'Upload file to storage',
    icon: '📁',
    category: 'Actions',
  },
  
  // Conditions
  {
    id: 'if-condition',
    type: 'condition',
    label: 'If Condition',
    description: 'Branch workflow based on condition',
    icon: '🔀',
    category: 'Logic',
  },
  {
    id: 'filter',
    type: 'condition',
    label: 'Filter',
    description: 'Filter data based on criteria',
    icon: '🔍',
    category: 'Logic',
  },
  
  // Utilities
  {
    id: 'delay',
    type: 'delay',
    label: 'Delay',
    description: 'Wait for specified time',
    icon: '⏱️',
    category: 'Utilities',
  },
];

const DraggableNode: React.FC<{ nodeType: DraggableNodeType; onSelect?: (nodeType: DraggableNodeType) => void }> = ({ 
  nodeType, 
  onSelect 
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: nodeType.id,
    data: nodeType,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`draggable-node p-3 bg-white border border-gray-200 rounded-lg cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => onSelect?.(nodeType)}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{nodeType.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {nodeType.label}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {nodeType.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export const NodePalette: React.FC<NodePaletteProps> = ({ onNodeSelect }) => {
  const categories = Array.from(new Set(nodeTypes.map(node => node.category)));

  return (
    <div className="node-palette w-64 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Node Palette</h2>
        
        {categories.map(category => (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">{category}</h3>
            <div className="space-y-2">
              {nodeTypes
                .filter(node => node.category === category)
                .map(nodeType => (
                  <DraggableNode
                    key={nodeType.id}
                    nodeType={nodeType}
                    onSelect={onNodeSelect}
                  />
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
