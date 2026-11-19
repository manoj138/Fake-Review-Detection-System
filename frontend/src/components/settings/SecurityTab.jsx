import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { Key } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function SecurityTab({
  initialSecurity = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: true,
  },
  onSave,
}) {
  const [security, setSecurity] = useState(initialSecurity);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (security.newPassword && security.newPassword !== security.confirmPassword) {
      showToast('Passwords do not match. Please re-enter.', 'danger');
      return;
    }
    if (onSave) {
      onSave(security);
    } else {
      showToast('Security credentials updated successfully.', 'success');
      setSecurity({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactor: security.twoFactor,
      });
    }
  };

  return (
    <Card className="max-w-3xl">
      <CardHeader
        title="Security & Password"
        subtitle="Manage your session encryption and password requirements"
      />
      <form onSubmit={handleSubmit}>
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
  );
}

export default SecurityTab;

