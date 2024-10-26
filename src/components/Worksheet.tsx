import React from 'react';
import { MathProblem } from './MathProblem';

interface WorksheetProps {
  problems: Array<{
    num1: number;
    num2: number;
    operator: '+' | '-' | '×' | '÷';
  }>;
  pageNumber: number;
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

export const Worksheet: React.FC<WorksheetProps> = ({ problems, pageNumber, settings }) => {
  const getOperatorName = (op: '+' | '-' | '×' | '÷') => {
    switch (op) {
      case '+': return 'Addition';
      case '-': return 'Subtraction';
      case '×': return 'Multiplication';
      case '÷': return 'Division';
    }
  };

  return (
    <div 
      className="h-full"
      style={{
        padding: `${settings.margins.top}in ${settings.margins.right}in ${settings.margins.bottom}in ${settings.margins.left}in`,
      }}
    >
      <div className="h-full flex flex-col">
        <h2 className="text-3xl font-semibold text-center mb-8">
          {getOperatorName(problems[0].operator)} Practice
        </h2>
        
        <div className="flex-1 grid grid-cols-5 gap-4 content-start">
          {problems.map((problem, index) => (
            <MathProblem
              key={index}
              num1={problem.num1}
              num2={problem.num2}
              operator={problem.operator}
              index={index + 1}
            />
          ))}
        </div>

        {settings.pageNumbering.enabled && (
          <div 
            className={`text-sm text-gray-600 mt-4 ${settings.pageNumbering.centered ? 'text-center' : 'text-right'}`}
          >
            Page {pageNumber}
          </div>
        )}
      </div>
    </div>
  );
};