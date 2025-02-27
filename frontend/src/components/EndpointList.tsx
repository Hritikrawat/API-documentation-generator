import React from 'react';
import { ApiEndpoint } from '../types';
import EndpointCard from './EndpointCard';

interface EndpointListProps {
  endpoints: ApiEndpoint[];
  onEdit: (endpoint: ApiEndpoint) => void;
  onDelete: (id: string) => void;
}

const EndpointList: React.FC<EndpointListProps> = ({ 
  endpoints, 
  onEdit, 
  onDelete 
}) => {
  if (endpoints.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No endpoints added yet. Click "Add Endpoint" to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {endpoints.map(endpoint => (
        <EndpointCard
          key={endpoint.id}
          endpoint={endpoint}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EndpointList;