import React from 'react';

interface MathProblemProps {
  num1: number;
  num2: number;
  operator: '+' | '-' | '×' | '÷';
  index: number;
}

export const MathProblem: React.FC<MathProblemProps> = ({ num1, num2, operator, index }) => {
  return (
    <div className="p-4">
      <div className="text-lg">
        <div className="mb-1 text-gray-600">{index})</div>
        <div className="font-mono">
          <div className="text-right mb-1">{num1}</div>
          <div className="text-right mb-1">{operator} {num2}</div>
          <div className="border-t border-black pt-1">
            <div className="h-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};