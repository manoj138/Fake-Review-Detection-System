import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Sparkles,
  ChevronDown,
  User,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/SearchInput';
import { Breadcrumbs } from './Breadcrumbs';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../context/AuthContext';

export function Header({ onMenuClick }) {
  const [searchValue, setSearchValue] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { user, logout } = useAuth();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/analyzer')) return 'Review Analyzer';
    if (path.startsWith('/reviews')) return 'Review Explorer';
    if (path.startsWith('/products')) return 'Products';
    if (path.startsWith('/analytics')) return 'Trust Analytics';
    if (path.startsWith('/reports')) return 'Reports';
    if (path.startsWith('/settings')) return 'Settings';
    return 'Intelligence';
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/reviews?q=${encodeURIComponent(searchValue.trim())}`);
      showToast(`Searching reviews for "${searchValue.trim()}"`, 'info');
      setMobileSearchOpen(false);
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Syndicate Bot Cluster Detected',
      time: '12m ago',
      desc: '42 repetitive reviews matched in Electronics.',
      unread: true,
    },
    {
      id: 2,
      title: 'Report REP-8041 Escalated',
      time: '45m ago',
      desc: 'High velocity commercial spam flagged on AeroSound.',
      unread: true,
    },
    {
      id: 3,
      title: 'Accuracy Benchmark Reached',
      time: '2h ago',
      desc: 'Detection accuracy verified at 94.6% confidence.',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-brand-border px-3 sm:px-6">
      <div className="h-16 flex items-center justify-between gap-2">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-brand-dark hover:bg-slate-100 transition-colors flex-shrink-0"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted hidden sm:inline">
              ReviewGuard AI
            </span>
            <div className="hidden sm:block">
              <Breadcrumbs items={[{ label: getBreadcrumbs() }]} />
            </div>
            <h2 className="text-xs font-bold text-brand-dark truncate max-w-[140px] sm:hidden">
              {getBreadcrumbs()}
            </h2>
          </div>
        </div>

        {/* Middle: Desktop Search Input */}
        <div className="flex-1 max-w-md mx-3 hidden md:block">
          <SearchInput
            size="sm"
            placeholder="Search reviews, products, or signals... (Press Enter)"
            value={searchValue}
            onChange={setSearchValue}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Mobile Search Toggle Button (< md) */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-lg text-brand-muted hover:text-brand-dark hover:bg-slate-100 transition-colors"
            title="Search reviews"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          <Button
            variant="ai"
            size="sm"
            icon={Sparkles}
            onClick={() => navigate('/analyzer')}
            className="hidden sm:inline-flex"
          >
            Analyze Review
          </Button>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="p-2 rounded-lg text-brand-muted hover:text-brand-dark hover:bg-slate-100 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {notificationsOpen && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-1rem)] sm:w-80 max-w-sm bg-white rounded-xl border border-brand-border shadow-popover p-3 z-50 animate-slide-up">
                <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                  <span className="text-xs font-semibold text-brand-dark">
                    Alerts & Notifications
                  </span>
                  <span className="text-[10px] text-brand-primary font-semibold cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="divide-y divide-brand-border/60 max-h-60 overflow-y-auto mt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 hover:bg-slate-50 px-2 rounded-lg cursor-pointer">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-brand-dark">{n.title}</span>
                        <span className="text-[10px] text-brand-muted">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-brand-muted mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-brand-border mt-2 text-center">
                  <Link
                    to="/reports"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs font-medium text-brand-primary hover:underline"
                  >
                    View all in Reports Center
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#635BFF] to-[#8B5CF6] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {user?.avatar || 'VG'}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-brand-muted hidden sm:block" />
            </button>

            {profileOpen && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-1rem)] sm:w-56 max-w-xs bg-white rounded-xl border border-brand-border shadow-popover p-2 z-50 animate-slide-up text-xs">
                <div className="p-2 border-b border-brand-border mb-1">
                  <p className="font-semibold text-brand-dark truncate">{user?.name || 'Vinita G.'}</p>
                  <p className="text-brand-muted text-[11px] truncate">{user?.email || 'lead.trust@reviewguard.ai'}</p>
                </div>
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 text-brand-dark"
                >
                  <User className="w-3.5 h-3.5 text-brand-muted" />
                  <span>Account Settings</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                    showToast('You have been logged out.', 'info');
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-rose-50 text-rose-600 text-left cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Mobile Search Bar (< md) */}
      {mobileSearchOpen && (
        <div className="md:hidden pb-3 pt-1 border-t border-brand-border/60 animate-slide-up">
          <SearchInput
            size="sm"
            autoFocus
            placeholder="Search reviews, products, signals..."
            value={searchValue}
            onChange={setSearchValue}
            onKeyDown={handleSearchKeyDown}
            onClear={() => setSearchValue('')}
          />
        </div>
      )}
    </header>
  );
}
export default Header;
