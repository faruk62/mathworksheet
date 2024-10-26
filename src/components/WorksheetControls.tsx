import React from 'react';

interface WorksheetControlsProps {
  onOperatorChange: (operator: '+' | '-' | '×' | '÷') => void;
  onGenerate: () => void;
  onDownload: () => void;
}

export const WorksheetControls: React.FC<WorksheetControlsProps> = ({
  onOperatorChange,
  onGenerate,
  onDownload,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
      <select 
        className="px-4 py-2 border rounded-lg bg-white shadow-sm"
        onChange={(e) => onOperatorChange(e.target.value as '+' | '-' | '×' | '÷')}
      >
        <option value="+">Addition</option>
        <option value="-">Subtraction</option>
        <option value="×">Multiplication</option>
        <option value="÷">Division</option>
      </select>
      
      <div className="flex-1"></div>
      
      <button
        onClick={onGenerate}
        className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Generate New
      </button>
      
      <button
        onClick={onDownload}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PDF
      </button>
    </div>
  );
};