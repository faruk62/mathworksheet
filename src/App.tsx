import React, { useState } from 'react';
import { WorksheetControls } from './components/WorksheetControls';
import { Worksheet } from './components/Worksheet';
import { Sidebar } from './components/Sidebar';
import { SettingsPanel } from './components/SettingsPanel';
import { PDFPreview } from './components/PDFPreview';
import { ProblemCountSelector } from './components/ProblemCountSelector';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface PageSettings {
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
  pagesToDownload: 'all' | number[];
}

export default function App() {
  const [operator, setOperator] = useState<'+' | '-' | '×' | '÷'>('+');
  const [problemCount, setProblemCount] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(() => [{
    problems: generateProblems('+', 25),
    pageNumber: 1,
  }]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(true);
  const [pageSettings, setPageSettings] = useState<PageSettings>({
    pageSize: 'letter',
    pageNumbering: {
      enabled: true,
      startFrom: 1,
      centered: true,
    },
    margins: {
      top: 0.5,
      bottom: 0.5,
      left: 0.5,
      right: 0.5,
    },
    showMargins: true,
    pagesToDownload: 'all',
  });

  function generateProblems(op: '+' | '-' | '×' | '÷', count: number) {
    const problems = [];
    for (let i = 0; i < count; i++) {
      let num1 = Math.floor(Math.random() * 9) + 1;
      let num2 = Math.floor(Math.random() * 9) + 1;
      
      if (op === '-') {
        [num1, num2] = [Math.max(num1, num2), Math.min(num1, num2)];
      }
      
      problems.push({ num1, num2, operator: op });
    }
    return problems;
  }

  const handleOperatorChange = (newOperator: '+' | '-' | '×' | '÷') => {
    setOperator(newOperator);
    const newPages = pages.map(page => ({
      ...page,
      problems: generateProblems(newOperator, problemCount),
    }));
    setPages(newPages);
  };

  const handleProblemCountChange = (count: number) => {
    setProblemCount(count);
    const newPages = pages.map(page => ({
      ...page,
      problems: generateProblems(operator, count),
    }));
    setPages(newPages);
  };

  const handleAddPage = () => {
    setPages([...pages, {
      problems: generateProblems(operator, problemCount),
      pageNumber: pages.length + 1,
    }]);
    setCurrentPage(pages.length);
  };

  const handleGenerate = () => {
    const newPages = pages.map(page => ({
      ...page,
      problems: generateProblems(operator, problemCount),
    }));
    setPages(newPages);
  };

  const handleDownload = async () => {
    const pdf = new jsPDF({
      format: pageSettings.pageSize,
      unit: 'in',
    });

    for (let i = 0; i < pages.length; i++) {
      const worksheet = document.getElementById(`worksheet-${i}`);
      if (worksheet) {
        if (i > 0) pdf.addPage();
        
        const canvas = await html2canvas(worksheet);
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 
          pageSettings.margins.left, 
          pageSettings.margins.top, 
          pdfWidth - (pageSettings.margins.left + pageSettings.margins.right), 
          pdfHeight - (pageSettings.margins.top + pageSettings.margins.bottom)
        );
        
        if (pageSettings.pageNumbering.enabled) {
          const pageNum = (pageSettings.pageNumbering.startFrom + i).toString();
          const textWidth = pdf.getTextWidth(pageNum);
          const x = pageSettings.pageNumbering.centered 
            ? (pdfWidth - textWidth) / 2 
            : pdfWidth - pageSettings.margins.right - textWidth;
          
          pdf.text(pageNum, x, pdfHeight - pageSettings.margins.bottom + 0.3);
        }
      }
    }
    
    pdf.save('math-worksheet.pdf');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SettingsPanel
        settings={pageSettings}
        onSettingsChange={setPageSettings}
        isOpen={isSettingsPanelOpen}
        onToggle={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onOperatorSelect={handleOperatorChange}
        currentOperator={operator}
      />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Math Worksheet Generator</h1>
            <div className="flex items-center gap-4">
              <ProblemCountSelector count={problemCount} onChange={handleProblemCountChange} />
              <button
                onClick={handleAddPage}
                className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Page
              </button>
              <div className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Remember to download your work before closing
              </div>
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <PDFPreview
            pages={pages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            settings={pageSettings}
          />
        </main>
      </div>
    </div>
  );
}