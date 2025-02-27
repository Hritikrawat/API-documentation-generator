// import React, { useState } from 'react';
// import { Plus, FileDown, AlertCircle } from 'lucide-react';
// import Header from './components/Header';
// import EndpointList from './components/EndpointList';
// import EndpointForm from './components/EndpointForm';
// import { ApiEndpoint } from './types';
// import { generateDocumentation } from './services/apiService';

// function App() {
//   const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [currentEndpoint, setCurrentEndpoint] = useState<ApiEndpoint | undefined>(undefined);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleAddEndpoint = () => {
//     setCurrentEndpoint(undefined);
//     setShowForm(true);
//   };

//   const handleEditEndpoint = (endpoint: ApiEndpoint) => {
//     setCurrentEndpoint(endpoint);
//     setShowForm(true);
//   };

//   const handleDeleteEndpoint = (id: string) => {
//     setEndpoints(endpoints.filter(endpoint => endpoint.id !== id));
//   };

//   const handleSaveEndpoint = (endpoint: ApiEndpoint) => {
//     if (currentEndpoint) {
//       // Edit existing endpoint
//       setEndpoints(endpoints.map(ep => 
//         ep.id === endpoint.id ? endpoint : ep
//       ));
//     } else {
//       // Add new endpoint
//       setEndpoints([...endpoints, endpoint]);
//     }
//     setShowForm(false);
//   };

//   const handleGenerateDocumentation = async () => {
//     if (endpoints.length === 0) {
//       setError('Please add at least one endpoint before generating documentation.');
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       const pdfBlob = await generateDocumentation({ endpoints });
      
//       // Create a download link for the PDF
//       const url = window.URL.createObjectURL(pdfBlob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'api-documentation.pdf');
//       document.body.appendChild(link);
//       link.click();
      
//       // Clean up
//       link.parentNode?.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       setError('Failed to generate documentation. Please check your backend connection.');
//       console.error(err);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
      
//       <main className="container mx-auto px-4 py-8">
//         {error && (
//           <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-start">
//             <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
//             <span>{error}</span>
//           </div>
//         )}
        
//         <div className="flex justify-between items-center mb-6">
//           {/* <h2 className="text-2xl font-bold text-gray-800">API Endpoints</h2> */}
//           <div className="flex space-x-3">
//             <button
//               onClick={handleAddEndpoint}
//               className="flex items-center px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <Plus size={16} className="mr-2" />
//               Add Endpoint
//             </button>
//             <button
//               onClick={handleGenerateDocumentation}
//               disabled={isGenerating || endpoints.length === 0}
//               className={`flex items-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                 isGenerating || endpoints.length === 0
//                   ? 'bg-gray-400 text-white cursor-not-allowed'
//                   : 'bg-green-600 text-white hover:bg-green-700'
//               }`}
//             >
//               <FileDown size={16} className="mr-2" />
//               {isGenerating ? 'Generating...' : 'Generate PDF'}
//             </button>
//           </div>
//         </div>
        
//         {showForm ? (
//           <EndpointForm
//             endpoint={currentEndpoint}
//             onSave={handleSaveEndpoint}
//             onCancel={() => setShowForm(false)}
//           />
//         ) : (
//           <EndpointList
//             endpoints={endpoints}
//             onEdit={handleEditEndpoint}
//             onDelete={handleDeleteEndpoint}
//           />
//         )}
//       </main>
//     </div>
//   );
  
// }

// export default App;




import React, { useState, useEffect } from 'react';
import { Plus, FileDown, AlertCircle, AlertTriangle } from 'lucide-react';
import Header from './components/Header';
import EndpointList from './components/EndpointList';
import EndpointForm from './components/EndpointForm';
import { ApiEndpoint } from './types';
import { generateDocumentation } from './services/apiService';

function App() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState<ApiEndpoint | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMeme, setShowMeme] = useState(false);

  useEffect(() => {
    // Function to detect DevTools
    const detectDevTools = (event: Event) => {
      // Method 1: Detect using console.log timing difference
      const startTime = new Date();
      const endTime = new Date();
      const timeDiff = endTime.getTime() - startTime.getTime();
      
      // Method 2: Detect using window size change
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      // Method 3: Detect F12 key
      const isF12 = (event as KeyboardEvent).key === 'F12';
      
      if (timeDiff > 100 || widthThreshold || heightThreshold || isF12) {
        setShowMeme(true);
      }
    };

    // Add event listeners
    window.addEventListener('resize', detectDevTools);
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || 
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        setShowMeme(true);
      }
    });
    
    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      setShowMeme(true);
    });
    
    // Check periodically
    const interval = setInterval(detectDevTools, 1000);
    
    return () => {
      window.removeEventListener('resize', detectDevTools);
      clearInterval(interval);
    };
  }, []);

  const handleAddEndpoint = () => {
    setCurrentEndpoint(undefined);
    setShowForm(true);
  };

  const handleEditEndpoint = (endpoint: ApiEndpoint) => {
    setCurrentEndpoint(endpoint);
    setShowForm(true);
  };

  const handleDeleteEndpoint = (id: string) => {
    setEndpoints(endpoints.filter(endpoint => endpoint.id !== id));
  };

  const handleSaveEndpoint = (endpoint: ApiEndpoint) => {
    if (currentEndpoint) {
      // Edit existing endpoint
      setEndpoints(endpoints.map(ep => 
        ep.id === endpoint.id ? endpoint : ep
      ));
    } else {
      // Add new endpoint
      setEndpoints([...endpoints, endpoint]);
    }
    setShowForm(false);
  };

  const handleGenerateDocumentation = async () => {
    if (endpoints.length === 0) {
      setError('Please add at least one endpoint before generating documentation.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const pdfBlob = await generateDocumentation({ endpoints });
      
      // Create a download link for the PDF
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'api-documentation.pdf');
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to generate documentation. Please check your backend connection.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {showMeme && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle size={64} className="text-yellow-500" />
            </div>
            {/* <h2 className="text-2xl font-bold mb-4">You Very Chalak Bro</h2> */}
            <img 
              src="src\components\images\inspectMeme.png" 
              alt="Meme" 
              className="w-full h-auto rounded-lg mb-4"
            />
            {/* <p className="text-gray-700 mb-4">Nice try! But we don't allow inspect element here.</p> */}
            <button 
              onClick={() => setShowMeme(false)}
              className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
            >
              I Promise Not To Do It Again
            </button>
          </div>
        </div>
      )}

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-start">
            <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <button
              onClick={handleAddEndpoint}
              className="flex items-center px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Plus size={16} className="mr-2" />
              Add Endpoint
            </button>
            <button
              onClick={handleGenerateDocumentation}
              disabled={isGenerating || endpoints.length === 0}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isGenerating || endpoints.length === 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <FileDown size={16} className="mr-2" />
              {isGenerating ? 'Generating...' : 'Generate PDF'}
            </button>
          </div>
        </div>
        
        {showForm ? (
          <EndpointForm
            endpoint={currentEndpoint}
            onSave={handleSaveEndpoint}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <EndpointList
            endpoints={endpoints}
            onEdit={handleEditEndpoint}
            onDelete={handleDeleteEndpoint}
          />
        )}
      </main>
    </div>
  );
}

export default App;