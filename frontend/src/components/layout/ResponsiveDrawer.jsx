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
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';

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
  const { user, logout } = useAuth();
  const { showToast } = useToast();

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

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#111827] text-white flex flex-col justify-between shadow-2xl z-50 animate-slide-right select-none">
        <div className="overflow-y-auto">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-[#1C2638]">
            <div className="flex items-center gap-2.5">
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
              className="text-slate-400 hover:text-white p-2 rounded-lg"
              title="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              Review Intelligence
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
                  className={`flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-lg text-xs font-medium transition-colors ${
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
                  {item.badgeCount && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-white">
                      {item.badgeCount}
                    </span>
                  )}
                </NavLink>
              );
            })}

            <div className="my-3 border-t border-[#1C2638]" />

            <div className="px-3 pb-1 text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              System
            </div>
            {SECONDARY_NAV_ITEMS.map((item) => {
              const Icon = ICON_COMPONENTS[item.icon] || Settings;
              if (item.isAction) {
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      onClose();
                      onHelpClick && onHelpClick();
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 min-h-[44px] rounded-lg text-xs font-medium text-slate-300 hover:bg-[#1C2638]/60 hover:text-white text-left"
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 min-h-[44px] rounded-lg text-xs font-medium transition-colors ${
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

        {/* User Card at bottom with Logout */}
        <div className="p-3 border-t border-[#1C2638] bg-[#0E131F]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#635BFF] to-[#8B5CF6] flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                {user?.avatar || 'VG'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Vinita G.'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.role || 'Lead Officer'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                logout();
                showToast('Signed out of session.', 'info');
              }}
              className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResponsiveDrawer;
