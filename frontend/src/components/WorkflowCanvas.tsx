import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, useDroppable } from '@dnd-kit/core';
import { WorkflowNode, WorkflowEdge, DraggableNodeType } from '../types';
import { createWorkflowNode, createWorkflowEdge, generateId } from '../utils/workflow';

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  onNodesChange: (nodes: WorkflowNode[]) => void;
  onEdgesChange: (edges: WorkflowEdge[]) => void;
  selectedNode?: WorkflowNode;
  onNodeSelect: (node: WorkflowNode | null) => void;
}

interface WorkflowNodeComponentProps {
  node: WorkflowNode;
  isSelected: boolean;
  onClick: () => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
}

const WorkflowNodeComponent: React.FC<WorkflowNodeComponentProps> = ({
  node,
  isSelected,
  onClick,
  onPositionChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      
      const canvas = document.getElementById('workflow-canvas');
      if (!canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const newPosition = {
        x: e.clientX - canvasRect.left - dragOffset.x,
        y: e.clientY - canvasRect.top - dragOffset.y,
      };

      onPositionChange(node.id, newPosition);
    },
    [isDragging, dragOffset, node.id, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'action':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'condition':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'delay':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div
      className={`workflow-node absolute p-4 min-w-32 cursor-move select-none ${getNodeColor(node.type)} ${
        isSelected ? 'selected' : ''
      }`}
      style={{
        left: node.position.x,
        top: node.position.y,
        zIndex: isDragging ? 1000 : 1,
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{node.data.icon}</span>
        <div className="flex-1">
          <div className="text-sm font-medium">{node.data.label}</div>
          {node.data.description && (
            <div className="text-xs opacity-75">{node.data.description}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const DroppableCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: 'workflow-canvas',
  });

  return (
    <div
      ref={setNodeRef}
      id="workflow-canvas"
      className="workflow-canvas flex-1 relative overflow-auto"
      style={{ minHeight: '600px' }}
    >
      {children}
    </div>
  );
};

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  selectedNode,
  onNodeSelect,
}) => {
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      
      if (!over || over.id !== 'workflow-canvas') return;

      const nodeType = active.data.current as DraggableNodeType;
      if (!nodeType) return;

      // Calculate drop position
      const canvasElement = document.getElementById('workflow-canvas');
      if (!canvasElement) return;

      const canvasRect = canvasElement.getBoundingClientRect();
      const dropPosition = {
        x: event.activatorEvent ? 
          (event.activatorEvent as MouseEvent).clientX - canvasRect.left - 80 : 
          Math.random() * 400 + 100,
        y: event.activatorEvent ? 
          (event.activatorEvent as MouseEvent).clientY - canvasRect.top - 40 : 
          Math.random() * 200 + 100,
      };

      // Create new node
      const newNode = createWorkflowNode(nodeType.type, dropPosition, nodeType);
      onNodesChange([...nodes, newNode]);
    },
    [nodes, onNodesChange]
  );

  const handleNodePositionChange = useCallback(
    (nodeId: string, newPosition: { x: number; y: number }) => {
      const updatedNodes = nodes.map(node =>
        node.id === nodeId ? { ...node, position: newPosition } : node
      );
      onNodesChange(updatedNodes);
    },
    [nodes, onNodesChange]
  );

  const handleNodeSelect = useCallback(
    (node: WorkflowNode | null) => {
      onNodeSelect(node);
    },
    [onNodeSelect]
  );

  const handleCanvasClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DroppableCanvas>
        <div className="absolute inset-0" onClick={handleCanvasClick}>
          {/* Render edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {edges.map(edge => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              
              if (!sourceNode || !targetNode) return null;

              const sourceX = sourceNode.position.x + 64; // Half node width
              const sourceY = sourceNode.position.y + 32; // Half node height
              const targetX = targetNode.position.x + 64;
              const targetY = targetNode.position.y + 32;

              return (
                <line
                  key={edge.id}
                  x1={sourceX}
                  y1={sourceY}
                  x2={targetX}
                  y2={targetY}
                  className="workflow-edge"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
            
            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#64748b"
                />
              </marker>
            </defs>
          </svg>

          {/* Render nodes */}
          {nodes.map(node => (
            <WorkflowNodeComponent
              key={node.id}
              node={node}
              isSelected={selectedNode?.id === node.id}
              onClick={() => handleNodeSelect(node)}
              onPositionChange={handleNodePositionChange}
            />
          ))}
        </div>
      </DroppableCanvas>
    </DndContext>
  );
};
