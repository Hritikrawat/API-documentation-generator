import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { ApiEndpoint } from '../types';

interface EndpointCardProps {
  endpoint: ApiEndpoint;
  onEdit: (endpoint: ApiEndpoint) => void;
  onDelete: (id: string) => void;
}

const EndpointCard: React.FC<EndpointCardProps> = ({ 
  endpoint, 
  onEdit, 
  onDelete 
}) => {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{endpoint.name}</h3>
            <div className="flex items-center mt-1">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </span>
              <span className="ml-2 text-sm text-gray-600 truncate max-w-xs">
                {endpoint.url}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(endpoint)}
              className="p-1 text-gray-500 hover:text-indigo-600 focus:outline-none"
              aria-label="Edit endpoint"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(endpoint.id)}
              className="p-1 text-gray-500 hover:text-red-600 focus:outline-none"
              aria-label="Delete endpoint"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50">
        <div className="mb-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Headers</h4>
          {endpoint.headers.length > 0 ? (
            <div className="mt-1 text-sm">
              {endpoint.headers.map((header, index) => (
                <div key={header.id} className="text-gray-600">
                  <span className="font-medium">{header.key}:</span> {header.value}
                </div>
              )).slice(0, 2)}
              {endpoint.headers.length > 2 && (
                <div className="text-xs text-gray-500 mt-1">
                  +{endpoint.headers.length - 2} more headers
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">No headers</div>
          )}
        </div>
        
        {endpoint.payload && (
          <div className="mb-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Payload</h4>
            <div className="mt-1 text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded overflow-hidden text-ellipsis whitespace-nowrap">
              {endpoint.payload.length > 50 
                ? endpoint.payload.substring(0, 50) + '...' 
                : endpoint.payload}
            </div>
          </div>
        )}
        
        {endpoint.response && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Response</h4>
            <div className="mt-1 text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded overflow-hidden text-ellipsis whitespace-nowrap">
              {endpoint.response.length > 50 
                ? endpoint.response.substring(0, 50) + '...' 
                : endpoint.response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndpointCard;