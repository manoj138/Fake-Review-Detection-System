import React, { useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../../constants/navigation';
import {
  LayoutDashboard,
  Sparkles,
  SearchCheck,
  Package,
  BarChart3,
  ShieldAlert,
  Settings,
  HelpCircle,
} from 'lucide-react';

const ICON_COMPONENTS = {
  LayoutDashboard,
  Sparkles,
  SearchCheck,
  Package,
  BarChart3,
  ShieldAlert,
  Settings,
  HelpCircle,
};

export function ResponsiveDrawer({ isOpen, onClose, onHelpClick }) {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-[#111827] text-white flex flex-col justify-between shadow-2xl z-50">
        <div>
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-[#1C2638]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#635BFF] to-[#8B5CF6] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base text-white">ReviewGuard</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#8B5CF6]/30 text-[#A78BFA]">
                AI
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              Navigation
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = ICON_COMPONENTS[item.icon] || LayoutDashboard;
              const isActive =
                location.pathname === item.path ||
                (item.path === '/dashboard' && location.pathname === '/');

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium ${
                    isActive
                      ? 'bg-[#1C2638] text-white font-semibold'
                      : 'text-slate-300 hover:bg-[#1C2638]/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#8B5CF6] text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            <div className="my-3 border-t border-[#1C2638]" />

            {SECONDARY_NAV_ITEMS.map((item) => {
              const Icon = ICON_COMPONENTS[item.icon] || Settings;
              if (item.isAction) {
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      onClose();
                      onHelpClick && onHelpClick();
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-[#1C2638]/60 hover:text-white text-left"
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.name}</span>
                  </button>
                );
              }
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium ${
                    isActive
                      ? 'bg-[#1C2638] text-white font-semibold'
                      : 'text-slate-300 hover:bg-[#1C2638]/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-[#1C2638] bg-[#0E131F]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              VG
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Vinita G.</p>
              <p className="text-[10px] text-slate-400">Lead Trust Officer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
