import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, FileSpreadsheet, FileCode, FileText, Check } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const DEFAULT_FORMATS = [
  { id: 'csv', label: 'CSV Spreadsheet (.csv)', icon: FileSpreadsheet, desc: 'Compatible with Excel & Sheets' },
  { id: 'json', label: 'JSON Dataset (.json)', icon: FileCode, desc: 'Raw heuristic telemetry records' },
  { id: 'pdf', label: 'Executive PDF (.pdf)', icon: FileText, desc: 'Consolidated audit report' },
];

export function ExportButton({
  label = 'Export',
  formats = DEFAULT_FORMATS,
  onExport,
  size = 'sm',
  variant = 'secondary',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const dropdownRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectFormat = (formatId) => {
    setIsOpen(false);
    setIsExporting(true);

    setTimeout(() => {
      setIsExporting(false);
      if (onExport) {
        onExport(formatId);
      } else {
        showToast(`Dispatched ${formatId.toUpperCase()} package download.`, 'success', 2500);
      }
    }, 400);
  };

  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        disabled={isExporting}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 font-semibold rounded-lg border transition-all ${sizeClasses} ${
          variant === 'primary'
            ? 'bg-[#635BFF] text-white border-transparent hover:bg-[#5248EE] shadow-xs'
            : 'bg-white text-brand-dark border-brand-border hover:bg-slate-50 shadow-2xs'
        } ${isExporting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}`}
      >
        <Download className="w-3.5 h-3.5 text-brand-muted" />
        <span>{isExporting ? 'Generating...' : label}</span>
        <ChevronDown className="w-3 h-3 text-brand-muted ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl border border-brand-border shadow-popover p-1.5 z-50 animate-slide-up text-xs">
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-muted border-b border-brand-border/60 mb-1">
            Choose Export Format
          </div>

          <div className="space-y-0.5">
            {formats.map((fmt) => {
              const Icon = fmt.icon || FileText;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => handleSelectFormat(fmt.id)}
                  className="w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
                >
                  <Icon className="w-4 h-4 text-[#635BFF] mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-brand-dark text-xs">{fmt.label}</p>
                    {fmt.desc && (
                      <p className="text-[10px] text-brand-muted leading-tight">{fmt.desc}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExportButton;

