import React, { useState, useEffect } from 'react';
import { ServiceStatus as ServiceStatusType, HealthCheck } from '../types';
import { formatTimestamp, getStatusColor } from '../utils/workflow';

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Mock service status data
const mockServices: ServiceStatusType[] = [
  {
    id: '1',
    name: 'API Gateway',
    status: 'online',
    lastCheck: new Date(),
    responseTime: 45,
    uptime: 99.9,
    description: 'Main API gateway handling all requests',
    healthChecks: [
      {
        id: '1',
        name: 'HTTP Response',
        status: 'passing',
        message: 'OK',
        timestamp: new Date(),
      },
      {
        id: '2',
        name: 'Database Connection',
        status: 'passing',
        message: 'Connected',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: '2',
    name: 'Workflow Engine',
    status: 'online',
    lastCheck: new Date(Date.now() - 30000),
    responseTime: 125,
    uptime: 98.7,
    description: 'Core workflow execution engine',
    healthChecks: [
      {
        id: '3',
        name: 'Queue Processing',
        status: 'passing',
        message: 'Processing 23 jobs',
        timestamp: new Date(),
      },
      {
        id: '4',
        name: 'Memory Usage',
        status: 'warning',
        message: '78% memory usage',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: '3',
    name: 'Email Service',
    status: 'degraded',
    lastCheck: new Date(Date.now() - 120000),
    responseTime: 850,
    uptime: 95.2,
    description: 'Email sending and delivery service',
    healthChecks: [
      {
        id: '5',
        name: 'SMTP Connection',
        status: 'failing',
        message: 'Connection timeout',
        timestamp: new Date(),
      },
      {
        id: '6',
        name: 'Queue Size',
        status: 'warning',
        message: '1,245 pending emails',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: '4',
    name: 'File Storage',
    status: 'maintenance',
    lastCheck: new Date(Date.now() - 300000),
    responseTime: undefined,
    uptime: 99.5,
    description: 'File upload and storage service',
    healthChecks: [
      {
        id: '7',
        name: 'Storage Capacity',
        status: 'passing',
        message: '45% used',
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: '8',
        name: 'Upload Endpoint',
        status: 'failing',
        message: 'Service unavailable',
        timestamp: new Date(Date.now() - 300000),
      },
    ],
  },
  {
    id: '5',
    name: 'Authentication Service',
    status: 'online',
    lastCheck: new Date(Date.now() - 15000),
    responseTime: 67,
    uptime: 99.99,
    description: 'User authentication and authorization',
    healthChecks: [
      {
        id: '9',
        name: 'Login Endpoint',
        status: 'passing',
        message: 'OK',
        timestamp: new Date(),
      },
      {
        id: '10',
        name: 'Token Validation',
        status: 'passing',
        message: 'All tokens valid',
        timestamp: new Date(),
      },
    ],
  },
];

const StatusIndicator: React.FC<{ status: string }> = ({ status }) => {
  const getIcon = () => {
    switch (status) {
      case 'online':
      case 'passing':
        return <CheckIcon className="w-4 h-4" />;
      case 'offline':
      case 'failing':
        return <XIcon className="w-4 h-4" />;
      case 'degraded':
      case 'warning':
        return <AlertTriangleIcon className="w-4 h-4" />;
      case 'maintenance':
        return <ClockIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {getIcon()}
      <span className="ml-1 capitalize">{status}</span>
    </div>
  );
};

const HealthCheckCard: React.FC<{ healthCheck: HealthCheck }> = ({ healthCheck }) => (
  <div className="bg-gray-50 rounded-lg p-3">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-900">{healthCheck.name}</span>
      <StatusIndicator status={healthCheck.status} />
    </div>
    <p className="text-sm text-gray-600 mb-1">{healthCheck.message}</p>
    <p className="text-xs text-gray-500">
      Last checked: {formatTimestamp(healthCheck.timestamp)}
    </p>
  </div>
);

export const ServiceStatus: React.FC = () => {
  const [services, setServices] = useState<ServiceStatusType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setServices(mockServices);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadServices();
  };

  const getOverallStatus = () => {
    if (services.length === 0) return 'unknown';
    
    const offlineServices = services.filter(s => s.status === 'offline').length;
    const degradedServices = services.filter(s => s.status === 'degraded').length;
    const maintenanceServices = services.filter(s => s.status === 'maintenance').length;
    
    if (offlineServices > 0) return 'offline';
    if (degradedServices > 0) return 'degraded';
    if (maintenanceServices > 0) return 'maintenance';
    return 'online';
  };

  const getStatusCounts = () => {
    const counts = {
      online: services.filter(s => s.status === 'online').length,
      offline: services.filter(s => s.status === 'offline').length,
      degraded: services.filter(s => s.status === 'degraded').length,
      maintenance: services.filter(s => s.status === 'maintenance').length,
    };
    return counts;
  };

  const overallStatus = getOverallStatus();
  const statusCounts = getStatusCounts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Status</h1>
          <p className="mt-2 text-gray-600">
            Monitor the health and performance of all system services
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Overall Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Overall System Status</h2>
          <StatusIndicator status={overallStatus} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.online}</div>
            <div className="text-sm text-gray-600">Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.offline}</div>
            <div className="text-sm text-gray-600">Offline</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.degraded}</div>
            <div className="text-sm text-gray-600">Degraded</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.maintenance}</div>
            <div className="text-sm text-gray-600">Maintenance</div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {formatTimestamp(lastRefresh)}
        </div>
      </div>

      {/* Services List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <StatusIndicator status={service.status} />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {service.responseTime ? `${service.responseTime}ms` : 'N/A'}
                  </div>
                  <div className="text-xs text-gray-600">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {service.uptime?.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {Math.floor((Date.now() - service.lastCheck.getTime()) / 1000)}s
                  </div>
                  <div className="text-xs text-gray-600">Last Check</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Health Checks</h4>
                <div className="space-y-2">
                  {service.healthChecks.map(healthCheck => (
                    <HealthCheckCard key={healthCheck.id} healthCheck={healthCheck} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Incidents Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Incidents</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 text-center text-gray-500">
            <CheckIcon className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg font-medium">No recent incidents</p>
            <p className="text-sm">All services are operating normally</p>
          </div>
        </div>
      </div>
    </div>
  );
};
