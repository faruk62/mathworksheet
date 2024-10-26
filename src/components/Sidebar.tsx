import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onOperatorSelect: (operator: '+' | '-' | '×' | '÷') => void;
  currentOperator: '+' | '-' | '×' | '÷';
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  onOperatorSelect,
  currentOperator,
}) => {
  const operators = [
    { symbol: '+', name: 'Addition' },
    { symbol: '-', name: 'Subtraction' },
    { symbol: '×', name: 'Multiplication' },
    { symbol: '÷', name: 'Division' },
  ] as const;

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen && <h2 className="text-lg font-semibold">Templates</h2>}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="mt-4">
        {operators.map(({ symbol, name }) => (
          <button
            key={symbol}
            onClick={() => onOperatorSelect(symbol)}
            className={`w-full p-4 text-left hover:bg-gray-700 flex items-center gap-3 ${
              currentOperator === symbol ? 'bg-gray-700' : ''
            }`}
          >
            <span className="w-8 h-8 flex items-center justify-center bg-gray-600 rounded">
              {symbol}
            </span>
            {isOpen && (
              <div>
                <div className="font-medium">{name}</div>
                <div className="text-sm text-gray-400">View templates</div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};