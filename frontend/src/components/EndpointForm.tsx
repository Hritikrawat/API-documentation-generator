import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import HeaderForm from './HeaderForm';
import { ApiEndpoint, Header } from '../types';

interface EndpointFormProps {
  endpoint?: ApiEndpoint;
  onSave: (endpoint: ApiEndpoint) => void;
  onCancel: () => void;
}

const EndpointForm: React.FC<EndpointFormProps> = ({ 
  endpoint, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<ApiEndpoint>(
    endpoint || {
      id: Date.now().toString(),
      name: '',
      url: '',
      method: 'GET',
      headers: [],
      payload: '',
      response: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHeadersChange = (headers: Header[]) => {
    setFormData(prev => ({ ...prev, headers }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="bg-stone-100 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {endpoint ? 'Edit Endpoint' : 'Add New Endpoint'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Endpoint Description
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="This API is used for ....."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-1">
            <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
              Method
            </label>
            <select
              id="method"
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Endpoint URL
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://api.example.com/users"
              required
            />
          </div>
        </div>

        <HeaderForm 
          headers={formData.headers} 
          onChange={handleHeadersChange} 
        />

        <div className="mb-4 mt-4">
          <label htmlFor="payload" className="block text-sm font-medium text-gray-700 mb-1">
            Request Payload (JSON)
          </label>
          <textarea
            id="payload"
            name="payload"
            value={formData.payload}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder='{\n  "username": "example",\n  "password": "password123"\n}'
          />
        </div>

        <div className="mb-4">
          <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-1">
            Example Response (JSON)
          </label>
          <textarea
            id="response"
            name="response"
            value={formData.response}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder='{\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "user": {\n    "id": 123,\n    "username": "example"\n  }\n}'
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-00 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Save size={16} className="mr-2" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EndpointForm;