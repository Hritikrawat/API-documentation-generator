export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: Header[];
  payload: string;
  response: string;
}

export interface Header {
  id: string;
  key: string;
  value: string;
}

export interface ApiDocumentationRequest {
  endpoints: ApiEndpoint[];
}