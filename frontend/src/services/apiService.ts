import axios from 'axios';
import { ApiDocumentationRequest } from '../types';

const API_URL = 'http://localhost:1234/doc/download';

export const generateDocumentation = async (data: ApiDocumentationRequest): Promise<Blob> => {
  try {
    const response = await axios.post(`${API_URL}`, data, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error generating documentation:', error);
    throw error;
  }
};