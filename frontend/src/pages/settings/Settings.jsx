import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { ProfileTab } from '../../components/settings/ProfileTab';
import { DetectionEngineTab } from '../../components/settings/DetectionEngineTab';
import { SecurityTab } from '../../components/settings/SecurityTab';
import { NotificationsTab } from '../../components/settings/NotificationsTab';
import { User, Sliders, Shield, Bell } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

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

      {/* Tab Panels */}
      {activeTab === 'profile' && <ProfileTab />}
      {activeTab === 'preferences' && <DetectionEngineTab />}
      {activeTab === 'security' && <SecurityTab />}
      {activeTab === 'notifications' && <NotificationsTab />}
    </div>
  );
}

export default Settings;
