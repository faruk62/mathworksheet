import React from 'react';

interface ProblemCountSelectorProps {
  count: number;
  onChange: (count: number) => void;
}

export const ProblemCountSelector: React.FC<ProblemCountSelectorProps> = ({ count, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-700">Problems per page:</label>
      <select
        value={count}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="px-3 py-1 border rounded-md text-sm"
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};