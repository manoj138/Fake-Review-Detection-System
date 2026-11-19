import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function CopyButton({
  textToCopy,
  label,
  successMessage = 'Copied to clipboard!',
  size = 'sm',
  variant = 'ghost',
  className = '',
}) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!textToCopy) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy);
    }

    setCopied(true);
    showToast(successMessage, 'success', 2000);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const iconSize = size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={label || 'Copy to clipboard'}
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
        copied
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'text-brand-muted hover:text-brand-dark hover:bg-slate-100 border border-transparent'
      } ${className}`}
    >
      {copied ? (
        <Check className={`${iconSize} text-emerald-600`} />
      ) : (
        <Copy className={iconSize} />
      )}
      {label && <span>{copied ? 'Copied' : label}</span>}
    </button>
  );
}

export default CopyButton;

