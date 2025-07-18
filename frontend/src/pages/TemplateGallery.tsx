import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkflowTemplate } from '../types';

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

// Mock template data
const mockTemplates: WorkflowTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email Sequence',
    description: 'Automated welcome email sequence for new user onboarding',
    category: 'Marketing',
    nodes: [],
    edges: [],
    thumbnail: '📧',
    tags: ['email', 'onboarding', 'marketing'],
    usageCount: 1250,
  },
  {
    id: '2',
    name: 'E-commerce Order Processing',
    description: 'Complete order processing workflow from payment to fulfillment',
    category: 'E-commerce',
    nodes: [],
    edges: [],
    thumbnail: '🛒',
    tags: ['orders', 'payment', 'fulfillment'],
    usageCount: 892,
  },
  {
    id: '3',
    name: 'Social Media Auto-Post',
    description: 'Schedule and publish content across multiple social platforms',
    category: 'Social Media',
    nodes: [],
    edges: [],
    thumbnail: '📱',
    tags: ['social', 'scheduling', 'content'],
    usageCount: 743,
  },
  {
    id: '4',
    name: 'Customer Support Ticket Routing',
    description: 'Automatically route support tickets based on priority and category',
    category: 'Support',
    nodes: [],
    edges: [],
    thumbnail: '🎫',
    tags: ['support', 'routing', 'automation'],
    usageCount: 567,
  },
  {
    id: '5',
    name: 'Lead Scoring & Nurturing',
    description: 'Score leads and trigger nurturing campaigns based on behavior',
    category: 'Sales',
    nodes: [],
    edges: [],
    thumbnail: '🎯',
    tags: ['leads', 'scoring', 'nurturing'],
    usageCount: 456,
  },
  {
    id: '6',
    name: 'Data Backup & Sync',
    description: 'Regular data backup and synchronization across multiple systems',
    category: 'Operations',
    nodes: [],
    edges: [],
    thumbnail: '💾',
    tags: ['backup', 'sync', 'data'],
    usageCount: 334,
  },
  {
    id: '7',
    name: 'Invoice Generation & Sending',
    description: 'Automatically generate and send invoices to customers',
    category: 'Finance',
    nodes: [],
    edges: [],
    thumbnail: '🧾',
    tags: ['invoices', 'billing', 'finance'],
    usageCount: 289,
  },
  {
    id: '8',
    name: 'Content Moderation',
    description: 'Automated content moderation for user-generated content',
    category: 'Content',
    nodes: [],
    edges: [],
    thumbnail: '🔍',
    tags: ['moderation', 'content', 'safety'],
    usageCount: 198,
  },
];

const categories = [
  'All Categories',
  'Marketing',
  'E-commerce',
  'Social Media',
  'Support',
  'Sales',
  'Operations',
  'Finance',
  'Content',
];

export const TemplateGallery: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTemplates(mockTemplates);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Categories' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (templateId: string) => {
    // TODO: Create workflow from template
    navigate(`/builder?template=${templateId}`);
  };

  const handlePreviewTemplate = (templateId: string) => {
    // TODO: Show template preview modal
    console.log('Preview template:', templateId);
  };

  const sortedTemplates = [...filteredTemplates].sort((a, b) => b.usageCount - a.usageCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Template Gallery</h1>
        <p className="text-gray-600">
          Choose from our collection of pre-built workflow templates to get started quickly
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{templates.length}</div>
          <div className="text-sm text-gray-600">Total Templates</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{categories.length - 1}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {templates.reduce((sum, t) => sum + t.usageCount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Uses</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{filteredTemplates.length}</div>
          <div className="text-sm text-gray-600">Filtered Results</div>
        </div>
      </div>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedTemplates.map(template => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {template.thumbnail}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                      +{template.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <UsersIcon className="w-4 h-4" />
                    <span>{template.usageCount.toLocaleString()} uses</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Use Template</span>
                  </button>
                  <button
                    onClick={() => handlePreviewTemplate(template.id)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Preview template"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredTemplates.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            No templates match your search criteria
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All Categories');
            }}
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Popular Templates Section */}
      {!searchTerm && selectedCategory === 'All Categories' && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Most Popular Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTemplates.slice(0, 3).map(template => (
              <div
                key={template.id}
                className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 border border-primary-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">
                    {template.thumbnail}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-primary-900">{template.name}</div>
                    <div className="text-sm text-primary-700">
                      {template.usageCount.toLocaleString()} uses
                    </div>
                  </div>
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 transition-colors"
                  >
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
