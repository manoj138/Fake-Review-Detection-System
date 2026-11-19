import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ResponsiveDrawer } from './ResponsiveDrawer';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { HelpCircle, ExternalLink, ShieldCheck, Mail } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function AppLayout() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleContactSupport = () => {
    const ticketId = `SR-${Math.floor(1000 + Math.random() * 9000)}`;
    showToast(`Support ticket #${ticketId} created. Safety engineers will respond shortly.`, 'success', 3000);
    setHelpModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-row font-sans text-[#172033] antialiased overflow-x-hidden">
      {/* Desktop Sidebar (Fixed width ~256px on lg+) */}
      <Sidebar
        className="hidden lg:flex flex-shrink-0"
        onHelpClick={() => setHelpModalOpen(true)}
      />

      {/* Mobile Drawer (< lg screens) */}
      <ResponsiveDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        onHelpClick={() => setHelpModalOpen(true)}
      />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header onMenuClick={() => setMobileDrawerOpen(true)} />

        <main className="flex-1 p-3.5 sm:p-5 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Help & Support Modal */}
      <Modal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        title="ReviewGuard Help & Documentation"
        subtitle="Platform documentation, detection methodologies, and developer guidelines"
        maxWidth="max-w-xl"
        footer={
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 w-full">
            <span className="text-[11px] text-brand-muted">Version 1.0.0 (Production Build)</span>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button variant="secondary" size="sm" onClick={() => setHelpModalOpen(false)}>
                Dismiss
              </Button>
              <Button variant="primary" size="sm" icon={Mail} onClick={handleContactSupport}>
                Contact Trust Team
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4 text-xs text-brand-muted leading-relaxed">
          <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-brand-dark">
            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-[#635BFF] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#635BFF] flex-shrink-0" />
              <span>AI Review Intelligence Architecture</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              ReviewGuard identifies synthetic, incentivized, duplicate, and competitor-sabotage reviews using automated multi-signal analysis.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-brand-dark text-xs mb-2">How Detection Signals Work:</h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Duplicate Signatures:</strong> Character-level and n-gram syntactic duplication across disparate merchant stores.</li>
              <li><strong>Emotional Over-Amplification:</strong> Excessive capitalization, triple punctuation bursts, and promotional affiliate tags.</li>
              <li><strong>Rating & Sentiment Dissonance:</strong> Incongruity between star ratings (e.g., 5-stars) and negative phrase vocabulary.</li>
              <li><strong>Velocity Clustering:</strong> Abnormal review injection rates from shared proxy subnets within brief time intervals.</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default AppLayout;
