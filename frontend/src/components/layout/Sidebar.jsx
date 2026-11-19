import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Sparkles,
  SearchCheck,
  Package,
  BarChart3,
  ShieldAlert,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../../constants/navigation';
import { useAuth } from '../../context/AuthContext';
import { UserAvatar } from '../ui/UserAvatar';

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

export function Sidebar({ className = '', onHelpClick }) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <aside
      className={`w-64 bg-[#111827] text-white flex flex-col justify-between border-r border-[#1C2638] h-screen sticky top-0 select-none z-30 ${className}`}
    >
      {/* Top Branding Section */}
      <div>
        <div className="h-16 flex items-center px-5 border-b border-[#1C2638] gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#635BFF] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-white">
              ReviewGuard
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30">
              AI
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            Review Intelligence
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_COMPONENTS[item.icon] || LayoutDashboard;
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-[#1C2638] text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-[#1C2638]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`transition-colors ${
                      isActive ? 'text-[#635BFF]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span>{item.name}</span>
                </div>

                <div className="flex items-center gap-1.5">
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
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#635BFF]" />
                  )}
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-2 mx-4 border-t border-[#1C2638]" />

        {/* Secondary Navigation */}
        <div className="px-3 py-2 space-y-1">
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
                  onClick={onHelpClick}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#1C2638]/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.name}</span>
                  </div>
                </button>
              );
            }

            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-[#1C2638] text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#1C2638]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#635BFF]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* User Profile Section at Bottom */}
      <div className="p-3 border-t border-[#1C2638] bg-[#0E131F]">
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1C2638]/80 transition-colors">
          <div className="flex items-center gap-3">
            <UserAvatar
              name={user?.name || 'Vinita G.'}
              size="sm"
              status="online"
            />
            <div className="flex flex-col text-left max-w-[120px]">
              <span className="text-xs font-semibold text-white leading-tight truncate">
                {user?.name || 'Vinita G.'}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {user?.role || 'Lead Trust Officer'}
              </span>
            </div>
          </div>
          <NavLink
            to="/settings"
            title="Account Settings"
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <Settings className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

