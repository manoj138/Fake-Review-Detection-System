import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { UserAvatar } from '../ui/UserAvatar';
import { Save } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function ProfileTab({
  initialProfile = {
    name: 'Vinita G.',
    email: 'vinita.g@reviewguard.ai',
    title: 'Lead Trust & Safety Officer',
    organization: 'Acme E-Commerce Trust Lab',
    bio: 'Overseeing review authenticity protocols and syndication bot containment.',
  },
  onSave,
}) {
  const [profile, setProfile] = useState(initialProfile);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(profile);
    } else {
      showToast('Profile information updated successfully.', 'success');
    }
  };

  return (
    <Card className="max-w-3xl">
      <CardHeader
        title="Profile Information"
        subtitle="Update your administrator identity and organization credentials"
      />
      <form onSubmit={handleSubmit}>
        <CardBody className="space-y-5">
          {/* Avatar Banner */}
          <div className="flex items-center gap-4 pb-4 border-b border-brand-border">
            <UserAvatar name={profile.name} size="xl" status="online" />
            <div>
              <h4 className="text-sm font-semibold text-brand-dark">
                {profile.name}
              </h4>
              <p className="text-xs text-brand-muted">{profile.title}</p>
              <button
                type="button"
                onClick={() =>
                  showToast('Avatar image upload is disabled in demo mode.', 'info')
                }
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
  );
}

export default ProfileTab;

