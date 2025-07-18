import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Workflow } from '../types';
import { formatTimestamp, getStatusColor } from '../utils/workflow';

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Mock data for demonstration
const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Welcome Email Campaign',
    description: 'Send welcome email to new users',
    nodes: [],
    edges: [],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
    tags: ['email', 'onboarding'],
  },
  {
    id: '2',
    name: 'Data Backup Process',
    description: 'Daily backup of user data to cloud storage',
    nodes: [],
    edges: [],
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-17'),
    tags: ['backup', 'daily'],
  },
  {
    id: '3',
    name: 'Order Processing Workflow',
    description: 'Process new orders and send confirmations',
    nodes: [],
    edges: [],
    status: 'draft',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    tags: ['orders', 'ecommerce'],
  },
  {
    id: '4',
    name: 'Error Notification System',
    description: 'Send alerts when system errors occur',
    nodes: [],
    edges: [],
    status: 'paused',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-15'),
    tags: ['alerts', 'monitoring'],
  },
];

export const WorkflowList: React.FC = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Load workflows from API
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateWorkflow = () => {
    navigate('/builder');
  };

  const handleEditWorkflow = (workflowId: string) => {
    navigate(`/builder/${workflowId}`);
  };

  const handleDeleteWorkflow = async (workflowId: string) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      // TODO: Delete workflow via API
      setWorkflows(prev => prev.filter(w => w.id !== workflowId));
    }
  };

  const handleToggleStatus = async (workflowId: string) => {
    // TODO: Update workflow status via API
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId 
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' as any }
        : w
    ));
  };

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'paused', label: 'Paused' },
    { value: 'error', label: 'Error' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
          <p className="mt-2 text-gray-600">
            Manage your automation workflows
          </p>
        </div>
        <button
          onClick={handleCreateWorkflow}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create Workflow</span>
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Workflows Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map(workflow => (
            <div
              key={workflow.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {workflow.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {workflow.description}
                    </p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                        {workflow.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {workflow.nodes.length} nodes
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {workflow.tags?.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-4">
                  Created: {formatTimestamp(workflow.createdAt)}
                  <br />
                  Updated: {formatTimestamp(workflow.updatedAt)}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditWorkflow(workflow.id)}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit workflow"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(workflow.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        workflow.status === 'active'
                          ? 'text-yellow-600 hover:bg-yellow-100'
                          : 'text-green-600 hover:bg-green-100'
                      }`}
                      title={workflow.status === 'active' ? 'Pause workflow' : 'Start workflow'}
                    >
                      <PlayIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete workflow"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <Link
                    to={`/builder/${workflow.id}`}
                    className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Open →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredWorkflows.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'No workflows match your filters' 
              : 'No workflows found'
            }
          </div>
          <button
            onClick={handleCreateWorkflow}
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Create your first workflow
          </button>
        </div>
      )}
    </div>
  );
};
