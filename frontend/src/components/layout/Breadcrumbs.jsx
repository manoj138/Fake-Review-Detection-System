import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({
  items = [],
  showHome = true,
  className = '',
}) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-brand-muted ${className}`}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {showHome && (
          <li>
            <Link
              to="/dashboard"
              className="text-brand-muted hover:text-brand-dark transition-colors flex items-center"
              title="Dashboard Home"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
              {isLast || !item.path ? (
                <span className="font-semibold text-brand-dark truncate max-w-[150px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-brand-dark transition-colors truncate max-w-[120px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
export default Breadcrumbs;

