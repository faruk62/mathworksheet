import React from 'react';

interface SettingsPanelProps {
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
    pagesToDownload: 'all' | number[];
  };
  onSettingsChange: (settings: SettingsPanelProps['settings']) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
}) => {
  return (
    <div className={`bg-white border-r transition-all duration-300 ${isOpen ? 'w-80' : 'w-16'}`}>
      <div className="p-4 flex items-center justify-between border-b">
        {isOpen && <h2 className="text-lg font-semibold">Settings</h2>}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Page Size</h3>
            <select
              value={settings.pageSize}
              onChange={(e) => onSettingsChange({
                ...settings,
                pageSize: e.target.value as 'letter' | 'a4'
              })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="letter">Letter (8.5" × 11")</option>
              <option value="a4">A4 (210mm × 297mm)</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Page Numbering</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.pageNumbering.enabled}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    pageNumbering: {
                      ...settings.pageNumbering,
                      enabled: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300"
                />
                <span className="ml-2 text-sm">Show page numbers</span>
              </label>

              {settings.pageNumbering.enabled && (
                <>
                  <div>
                    <label className="text-sm">Start from page:</label>
                    <input
                      type="number"
                      value={settings.pageNumbering.startFrom}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        pageNumbering: {
                          ...settings.pageNumbering,
                          startFrom: parseInt(e.target.value)
                        }
                      })}
                      className="w-20 px-2 py-1 ml-2 border rounded"
                      min="1"
                    />
                  </div>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.pageNumbering.centered}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        pageNumbering: {
                          ...settings.pageNumbering,
                          centered: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm">Center align page numbers</span>
                  </label>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Margins (inches)</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm">Top:</label>
                <input
                  type="number"
                  value={settings.margins.top}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    margins: {
                      ...settings.margins,
                      top: parseFloat(e.target.value)
                    }
                  })}
                  className="w-20 px-2 py-1 ml-2 border rounded"
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <label className="text-sm">Bottom:</label>
                <input
                  type="number"
                  value={settings.margins.bottom}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    margins: {
                      ...settings.margins,
                      bottom: parseFloat(e.target.value)
                    }
                  })}
                  className="w-20 px-2 py-1 ml-2 border rounded"
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <label className="text-sm">Left:</label>
                <input
                  type="number"
                  value={settings.margins.left}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    margins: {
                      ...settings.margins,
                      left: parseFloat(e.target.value)
                    }
                  })}
                  className="w-20 px-2 py-1 ml-2 border rounded"
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <label className="text-sm">Right:</label>
                <input
                  type="number"
                  value={settings.margins.right}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    margins: {
                      ...settings.margins,
                      right: parseFloat(e.target.value)
                    }
                  })}
                  className="w-20 px-2 py-1 ml-2 border rounded"
                  step="0.1"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};