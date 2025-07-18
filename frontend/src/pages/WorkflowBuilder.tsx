import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkflowCanvas } from '../components/WorkflowCanvas';
import { NodePalette } from '../components/NodePalette';
import { WorkflowNode, WorkflowEdge, Workflow } from '../types';
import { createEmptyWorkflow, validateWorkflow } from '../utils/workflow';

const SaveIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a1 1 0 01-1 1H7a1 1 0 01-1-1v-4a1 1 0 011-1h1M9 10V9a1 1 0 011-1h1a1 1 0 011 1v1.586l3 3V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.586l3-3V9a1 1 0 011-1z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const WorkflowBuilder: React.FC = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  
  const [workflow, setWorkflow] = useState<Workflow>(() => 
    createEmptyWorkflow('Untitled Workflow')
  );
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Load workflow if editing existing one
  useEffect(() => {
    if (workflowId) {
      // TODO: Load workflow from API
      console.log('Loading workflow:', workflowId);
    }
  }, [workflowId]);

  // Validate workflow on changes
  useEffect(() => {
    const validation = validateWorkflow(workflow);
    setValidationErrors(validation.errors);
  }, [workflow]);

  const handleNodesChange = useCallback((nodes: WorkflowNode[]) => {
    setWorkflow(prev => ({
      ...prev,
      nodes,
      updatedAt: new Date(),
    }));
  }, []);

  const handleEdgesChange = useCallback((edges: WorkflowEdge[]) => {
    setWorkflow(prev => ({
      ...prev,
      edges,
      updatedAt: new Date(),
    }));
  }, []);

  const handleSaveWorkflow = useCallback(async () => {
    setIsSaving(true);
    try {
      // TODO: Save workflow to API
      console.log('Saving workflow:', workflow);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Workflow saved successfully!');
    } catch (error) {
      console.error('Error saving workflow:', error);
      alert('Error saving workflow. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [workflow]);

  const handleRunWorkflow = useCallback(async () => {
    const validation = validateWorkflow(workflow);
    if (!validation.isValid) {
      alert('Please fix validation errors before running the workflow.');
      return;
    }

    try {
      // TODO: Execute workflow via API
      console.log('Running workflow:', workflow);
      alert('Workflow execution started!');
    } catch (error) {
      console.error('Error running workflow:', error);
      alert('Error running workflow. Please try again.');
    }
  }, [workflow]);

  const handleDeleteNode = useCallback(() => {
    if (!selectedNode) return;
    
    const updatedNodes = workflow.nodes.filter(node => node.id !== selectedNode.id);
    const updatedEdges = workflow.edges.filter(
      edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id
    );
    
    setWorkflow(prev => ({
      ...prev,
      nodes: updatedNodes,
      edges: updatedEdges,
      updatedAt: new Date(),
    }));
    
    setSelectedNode(null);
  }, [selectedNode, workflow]);

  const handleWorkflowNameChange = useCallback((name: string) => {
    setWorkflow(prev => ({
      ...prev,
      name,
      updatedAt: new Date(),
    }));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Workflows
            </button>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={workflow.name}
                onChange={(e) => handleWorkflowNameChange(e.target.value)}
                className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
              />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                workflow.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {workflow.status}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {validationErrors.length > 0 && (
              <div className="text-red-600 text-sm">
                {validationErrors.length} validation error(s)
              </div>
            )}
            
            <button
              onClick={handleSaveWorkflow}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              <SaveIcon className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
            
            <button
              onClick={handleRunWorkflow}
              disabled={validationErrors.length > 0}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <PlayIcon className="w-4 h-4" />
              <span>Run</span>
            </button>
            
            {selectedNode && (
              <button
                onClick={handleDeleteNode}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Node Palette */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <NodePalette />
        </div>

        {/* Workflow Canvas */}
        <div className="flex-1 flex flex-col">
          <WorkflowCanvas
            nodes={workflow.nodes}
            edges={workflow.edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            selectedNode={selectedNode}
            onNodeSelect={setSelectedNode}
          />
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Node Properties
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedNode.data.label}
                  onChange={(e) => {
                    const updatedNodes = workflow.nodes.map(node =>
                      node.id === selectedNode.id
                        ? { ...node, data: { ...node.data, label: e.target.value } }
                        : node
                    );
                    handleNodesChange(updatedNodes);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={selectedNode.data.description || ''}
                  onChange={(e) => {
                    const updatedNodes = workflow.nodes.map(node =>
                      node.id === selectedNode.id
                        ? { ...node, data: { ...node.data, description: e.target.value } }
                        : node
                    );
                    handleNodesChange(updatedNodes);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded-md text-sm text-gray-600">
                  {selectedNode.type}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={selectedNode.position.x}
                    onChange={(e) => {
                      const updatedNodes = workflow.nodes.map(node =>
                        node.id === selectedNode.id
                          ? { ...node, position: { ...node.position, x: parseInt(e.target.value) || 0 } }
                          : node
                      );
                      handleNodesChange(updatedNodes);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="X"
                  />
                  <input
                    type="number"
                    value={selectedNode.position.y}
                    onChange={(e) => {
                      const updatedNodes = workflow.nodes.map(node =>
                        node.id === selectedNode.id
                          ? { ...node, position: { ...node.position, y: parseInt(e.target.value) || 0 } }
                          : node
                      );
                      handleNodesChange(updatedNodes);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Y"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
