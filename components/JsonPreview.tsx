import React, { useState } from 'react';
import { CametraxPayload } from '../types';
import { Code, Copy, Check } from 'lucide-react';

interface JsonPreviewProps {
  payload: CametraxPayload;
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ payload }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-0 border border-gray-700 shadow-lg overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center gap-2">
          <Code size={18} className="text-green-400" />
          <h2 className="text-lg font-semibold text-white">Payload</h2>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      <div className="p-4 bg-gray-900 flex-1 overflow-auto custom-scrollbar">
        <pre className="text-xs font-mono text-green-300 leading-relaxed whitespace-pre-wrap break-words">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default JsonPreview;