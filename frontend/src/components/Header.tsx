import React from 'react';
import { FileText, Code } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText size={24} />
          <h1 className="text-xl font-bold text-blue-600">API Documentation Generator</h1>
        </div>
        {/* <div className="flex items-center space-x-2"> */}
          {/* <Code size={20} /> */}
          {/* <span className="text-sm">Build beautiful API docs</span> */}
        {/* </div> */}

        <div className="flex items-center justify-center w-40">
          <img 
            src="src\components\images\saltoris.png" 
            alt="Coding workspace" 
            // className="w-40 h-40 object-cover rounded-md shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;