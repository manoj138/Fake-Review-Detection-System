import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { Save } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function NotificationsTab({
  initialNotifications = {
    burstSpamAlerts: true,
    weeklyDigest: true,
    criticalEscalations: true,
    merchantDisputes: false,
    systemUptime: true,
  },
  onSave,
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const { showToast } = useToast();

  const handleSave = () => {
    if (onSave) {
      onSave(notifications);
    } else {
      showToast('Notification alert preferences saved.', 'success');
    }
  };

  return (
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
          onClick={handleSave}
        >
          Save Notification Preferences
        </Button>
      </CardFooter>
    </Card>
  );
}

export default NotificationsTab;

