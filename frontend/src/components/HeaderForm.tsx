import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Header as HeaderType } from '../types';

interface HeaderFormProps {
  headers: HeaderType[];
  onChange: (headers: HeaderType[]) => void;
}

const HeaderForm: React.FC<HeaderFormProps> = ({ headers, onChange }) => {
  const addHeader = () => {
    const newHeader: HeaderType = {
      id: Date.now().toString(),
      key: '',
      value: ''
    };
    onChange([...headers, newHeader]);
  };

  const updateHeader = (id: string, field: 'key' | 'value', value: string) => {
    const updatedHeaders = headers.map(header => 
      header.id === id ? { ...header, [field]: value } : header
    );
    onChange(updatedHeaders);
  };

  const removeHeader = (id: string) => {
    const updatedHeaders = headers.filter(header => header.id !== id);
    onChange(updatedHeaders);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-medium">Headers</h3>
        <button
          type="button"
          onClick={addHeader}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
        >
          <Plus size={16} className="mr-1" />
          Add Header
        </button>
      </div>
      
      {headers.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No headers added yet</p>
      ) : (
        <div className="space-y-2">
          {headers.map(header => (
            <div key={header.id} className="flex space-x-2">
              <input
                type="text"
                value={header.key}
                onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                placeholder="Key"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={header.value}
                onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeHeader(header.id)}
                className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderForm;