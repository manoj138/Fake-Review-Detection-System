import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../hooks/useToast';
import {
  User,
  Sliders,
  Shield,
  Bell,
  Save,
  Check,
  Key,
  Mail,
  Building,
  Sparkles,
} from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const { showToast } = useToast();

  // Profile Form state
  const [profile, setProfile] = useState({
    name: 'Vinita G.',
    email: 'vinita.g@reviewguard.ai',
    title: 'Lead Trust & Safety Officer',
    organization: 'Acme E-Commerce Trust Lab',
    bio: 'Overseeing review authenticity protocols and syndication bot containment.',
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    autoFlagThreshold: 80,
    emailAlerts: true,
    compactTable: false,
    strictNLP: true,
    darkModeSimulation: false,
  });

  // Security Form state
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: true,
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    burstSpamAlerts: true,
    weeklyDigest: true,
    criticalEscalations: true,
    merchantDisputes: false,
    systemUptime: true,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Profile information updated successfully.', 'success');
  };

  const handleSavePreferences = () => {
    showToast('Platform detection preferences saved.', 'success');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (security.newPassword && security.newPassword !== security.confirmPassword) {
      showToast('Passwords do not match. Please re-enter.', 'danger');
      return;
    }
    showToast('Security credentials updated successfully.', 'success');
    setSecurity({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactor: security.twoFactor,
    });
  };

  const handleSaveNotifications = () => {
    showToast('Notification alert preferences saved.', 'success');
  };

  const tabs = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'preferences', label: 'Detection Engine', icon: Sliders },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'notifications', label: 'Alert Channels', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Settings & System Configuration"
        subtitle="Manage your personal credentials, detection sensitivity thresholds, and moderation notifications."
      />

      {/* Tabs Navigation */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <Card className="max-w-3xl">
          <CardHeader
            title="Profile Information"
            subtitle="Update your administrator identity and organization credentials"
          />
          <form onSubmit={handleSaveProfile}>
            <CardBody className="space-y-5">
              {/* Avatar Banner */}
              <div className="flex items-center gap-4 pb-4 border-b border-brand-border">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#635BFF] to-[#8B5CF6] text-white text-xl font-bold flex items-center justify-center shadow-md">
                  VG
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-dark">
                    {profile.name}
                  </h4>
                  <p className="text-xs text-brand-muted">{profile.title}</p>
                  <button
                    type="button"
                    onClick={() => showToast('Avatar image upload is disabled in demo mode.', 'info')}
                    className="text-xs text-[#635BFF] font-medium hover:underline mt-1 inline-block"
                  >
                    Change photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-brand-dark mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-dark mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-dark mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) =>
                      setProfile({ ...profile, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-dark mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={profile.organization}
                    onChange={(e) =>
                      setProfile({ ...profile, organization: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-brand-dark mb-1">
                  Professional Bio
                </label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="w-full p-2.5 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                />
              </div>
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button type="submit" variant="primary" size="sm" icon={Save}>
                Save Profile
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {/* Tab 2: Detection Engine Preferences */}
      {activeTab === 'preferences' && (
        <Card className="max-w-3xl">
          <CardHeader
            title="AI Detection & Sensitivity Controls"
            subtitle="Calibrate confidence thresholds and heuristic strictness"
          />
          <CardBody className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-semibold text-brand-dark">
                    Auto-Flag Probability Threshold: {preferences.autoFlagThreshold}%
                  </span>
                  <p className="text-xs text-brand-muted">
                    Reviews scoring above this percentage will be automatically quarantined for moderation.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#635BFF] bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {preferences.autoFlagThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={preferences.autoFlagThreshold}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    autoFlagThreshold: Number(e.target.value),
                  })
                }
                className="w-full accent-[#635BFF] cursor-pointer"
              />
            </div>

            <div className="border-t border-brand-border pt-4 space-y-4">
              <Toggle
                checked={preferences.strictNLP}
                onChange={(checked) =>
                  setPreferences({ ...preferences, strictNLP: checked })
                }
                label="Strict Syntactic Clustering"
                description="Flags reviews with repeating sentence cadence or promotional exclamation bursts."
              />

              <Toggle
                checked={preferences.compactTable}
                onChange={(checked) =>
                  setPreferences({ ...preferences, compactTable: checked })
                }
                label="Compact Table View"
                description="Increases row density on Review Explorer and Reports tables."
              />
            </div>
          </CardBody>
          <CardFooter className="flex justify-end">
            <Button
              type="button"
              variant="primary"
              size="sm"
              icon={Save}
              onClick={handleSavePreferences}
            >
              Update Preferences
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <Card className="max-w-3xl">
          <CardHeader
            title="Security & Password"
            subtitle="Manage your session encryption and password requirements"
          />
          <form onSubmit={handleSaveSecurity}>
            <CardBody className="space-y-4">
              <div className="max-w-md space-y-3">
                <div>
                  <label className="block text-xs font-medium text-brand-dark mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={security.currentPassword}
                    onChange={(e) =>
                      setSecurity({ ...security, currentPassword: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-dark mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter at least 8 characters"
                    value={security.newPassword}
                    onChange={(e) =>
                      setSecurity({ ...security, newPassword: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-dark mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-type new password"
                    value={security.confirmPassword}
                    onChange={(e) =>
                      setSecurity({ ...security, confirmPassword: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                  />
                </div>
              </div>

              <div className="border-t border-brand-border pt-4">
                <Toggle
                  checked={security.twoFactor}
                  onChange={(checked) =>
                    setSecurity({ ...security, twoFactor: checked })
                  }
                  label="Enforce Two-Factor Authentication (2FA)"
                  description="Requires an authenticator app code on each session login."
                />
              </div>
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button type="submit" variant="primary" size="sm" icon={Key}>
                Update Password
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <Card className="max-w-3xl">
          <CardHeader
            title="Notification Alerts"
            subtitle="Configure what events trigger real-time notifications"
          />
          <CardBody className="space-y-4">
            <Toggle
              checked={notifications.burstSpamAlerts}
              onChange={(checked) =>
                setNotifications({ ...notifications, burstSpamAlerts: checked })
              }
              label="Bot Attack & Burst Velocity Spikes"
              description="Alert immediately when more than 20 suspicious reviews are submitted in 15 minutes."
            />

            <Toggle
              checked={notifications.criticalEscalations}
              onChange={(checked) =>
                setNotifications({
                  ...notifications,
                  criticalEscalations: checked,
                })
              }
              label="Critical Severity Reviews Flagged"
              description="Sends high-priority notification when a review scores above 90% fake probability."
            />

            <Toggle
              checked={notifications.merchantDisputes}
              onChange={(checked) =>
                setNotifications({
                  ...notifications,
                  merchantDisputes: checked,
                })
              }
              label="Merchant Moderation Inquiries"
              description="Notify when a store owner files a dispute against an automated takedown."
            />

            <Toggle
              checked={notifications.weeklyDigest}
              onChange={(checked) =>
                setNotifications({ ...notifications, weeklyDigest: checked })
              }
              label="Weekly Intelligence Summary"
              description="Receive weekly consolidated PDF audit report with fraud trend analytics."
            />
          </CardBody>
          <CardFooter className="flex justify-end">
            <Button
              type="button"
              variant="primary"
              size="sm"
              icon={Save}
              onClick={handleSaveNotifications}
            >
              Save Notification Preferences
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
export default Settings;
