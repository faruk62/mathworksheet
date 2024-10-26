import React from 'react';
import { Worksheet } from './Worksheet';

interface PDFPreviewProps {
  pages: Array<{
    problems: Array<{ num1: number; num2: number; operator: '+' | '-' | '×' | '÷' }>;
    pageNumber: number;
  }>;
  currentPage: number;
  onPageChange: (page: number) => void;
  settings: {
    pageSize: 'letter' | 'a4';
    pageNumbering: {
      enabled: boolean;
      startFrom: number;
      centered: boolean;
    };
    margins: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    showMargins: boolean;
  };
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({
  pages,
  currentPage,
  onPageChange,
  settings,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Page {currentPage + 1} of {pages.length}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => onPageChange(Math.min(pages.length - 1, currentPage + 1))}
              disabled={currentPage === pages.length - 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        <div 
          id={`worksheet-${currentPage}`}
          className="bg-white shadow-lg mx-auto transition-transform transform hover:scale-105"
          style={{
            width: settings.pageSize === 'letter' ? '8.5in' : '210mm',
            height: settings.pageSize === 'letter' ? '11in' : '297mm',
            transform: 'scale(0.75)',
            transformOrigin: 'top center',
          }}
        >
          <Worksheet 
            problems={pages[currentPage].problems}
            pageNumber={pages[currentPage].pageNumber}
            settings={settings}
          />
        </div>
      </div>
    </div>
  );
};