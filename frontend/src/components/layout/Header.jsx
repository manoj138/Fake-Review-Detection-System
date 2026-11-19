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
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';

export function Header({ onMenuClick, onSearchSubmit }) {
  const [searchValue, setSearchValue] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'Review Intelligence / Dashboard';
    if (path.startsWith('/analyzer')) return 'Review Intelligence / AI Review Analyzer';
    if (path.startsWith('/reviews')) return 'Review Intelligence / Review Explorer';
    if (path.startsWith('/products')) return 'Product Intelligence / Overview';
    if (path.startsWith('/analytics')) return 'Safety & Trust / Analytics Center';
    if (path.startsWith('/reports')) return 'Moderation / Flagged Reports';
    if (path.startsWith('/settings')) return 'System / Account Settings';
    return 'Review Intelligence';
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/reviews?q=${encodeURIComponent(searchValue.trim())}`);
      showToast(`Searching reviews for "${searchValue.trim()}"`, 'info');
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
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-brand-border h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-brand-dark hover:bg-slate-100 transition-colors"
          title="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex flex-col">
          <span className="text-[11px] text-brand-muted font-medium">
            {getBreadcrumbs()}
          </span>
        </div>
      </div>

      {/* Middle: Quick Search Input */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <SearchInput
          size="sm"
          placeholder="Search reviews, products, or signals... (Press Enter)"
          value={searchValue}
          onChange={setSearchValue}
          onKeyDown={handleSearchKeyDown}
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
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
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg text-brand-muted hover:text-brand-dark hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-brand-border shadow-popover p-3 z-50 animate-slide-up">
              <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                <span className="text-xs font-semibold text-brand-dark">
                  Alerts & Notifications
                </span>
                <span className="text-[10px] text-brand-primary font-semibold cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="divide-y divide-brand-border/60 max-h-64 overflow-y-auto mt-2">
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
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              VG
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-brand-muted" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-brand-border shadow-popover p-2 z-50 animate-slide-up text-xs">
              <div className="p-2 border-b border-brand-border mb-1">
                <p className="font-semibold text-brand-dark">Vinita G.</p>
                <p className="text-brand-muted text-[11px]">lead.trust@reviewguard.ai</p>
              </div>
              <Link
                to="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 text-brand-dark"
              >
                <User className="w-3.5 h-3.5 text-brand-muted" />
                <span>Account Profile</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  showToast('Signed out of demo session.', 'info');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-rose-50 text-rose-600 text-left"
              >
                <X className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

