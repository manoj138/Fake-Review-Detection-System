import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { ReportTableRow } from '../../components/reports/ReportTableRow';
import { ReportDetailsModal } from '../../components/reports/ReportDetailsModal';
import { MOCK_REPORTS } from '../../data/reportsData';
import { useToast } from '../../hooks/useToast';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
} from 'lucide-react';

export function Reports() {
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const { showToast } = useToast();

  const filteredReports = useMemo(() => {
    return reports.filter((rep) => {
      if (statusFilter !== 'All' && rep.status !== statusFilter) {
        return false;
      }
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesId = rep.id.toLowerCase().includes(query);
        const matchesProduct = rep.product.toLowerCase().includes(query);
        const matchesReason = rep.reason.toLowerCase().includes(query);
        const matchesSnippet = rep.snippet.toLowerCase().includes(query);
        if (!matchesId && !matchesProduct && !matchesReason && !matchesSnippet) {
          return false;
        }
      }
      return true;
    });
  }, [reports, statusFilter, search]);

  const totalReports = reports.length;
  const pendingCount = reports.filter((r) => r.status === 'Pending').length;
  const reviewedCount = reports.filter((r) => r.status === 'Reviewed').length;
  const resolvedCount = reports.filter((r) => r.status === 'Resolved').length;

  const handleUpdateReportStatus = (reportId, newStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
    );
    showToast(`Report ${reportId} marked as ${newStatus}.`, 'success');
    setSelectedReport(null);
  };

  const handleExport = () => {
    showToast('Exporting Flagged Reports registry as CSV...', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Moderation & Flagged Reports"
        subtitle="Manage user complaints, automated bot flags, and merchant dispute resolution workflows."
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleExport}
          >
            Export Log
          </Button>
        }
      />

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <Card
          hover
          onClick={() => setStatusFilter('All')}
          className={`p-4 cursor-pointer transition-all ${
            statusFilter === 'All' ? 'border-[#635BFF] ring-1 ring-[#635BFF]' : ''
          }`}
        >
          <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
            Total Reports
          </span>
          <h3 className="text-xl font-bold text-brand-dark mt-1">{totalReports}</h3>
          <span className="text-[11px] text-brand-muted mt-1 block">All recorded issues</span>
        </Card>

        <Card
          hover
          onClick={() => setStatusFilter('Pending')}
          className={`p-4 cursor-pointer transition-all ${
            statusFilter === 'Pending' ? 'border-rose-500 ring-1 ring-rose-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
              Pending
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mt-1">{pendingCount}</h3>
          <span className="text-[11px] text-rose-600 mt-1 block">Awaiting action</span>
        </Card>

        <Card
          hover
          onClick={() => setStatusFilter('Reviewed')}
          className={`p-4 cursor-pointer transition-all ${
            statusFilter === 'Reviewed' ? 'border-amber-500 ring-1 ring-amber-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
              Reviewed
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mt-1">{reviewedCount}</h3>
          <span className="text-[11px] text-amber-600 mt-1 block">Under investigation</span>
        </Card>

        <Card
          hover
          onClick={() => setStatusFilter('Resolved')}
          className={`p-4 cursor-pointer transition-all ${
            statusFilter === 'Resolved' ? 'border-emerald-500 ring-1 ring-emerald-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
              Resolved
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mt-1">{resolvedCount}</h3>
          <span className="text-[11px] text-emerald-600 mt-1 block">Action completed</span>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <SearchInput
              size="sm"
              placeholder="Search reports by ID, product, or reason..."
              value={search}
              onChange={setSearch}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select
              size="sm"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Reviewed', label: 'Reviewed' },
                { value: 'Resolved', label: 'Resolved' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-brand-border shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-slate-50/80 text-brand-muted uppercase font-semibold">
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Review Snippet</th>
                <th className="py-3 px-4">Target Product</th>
                <th className="py-3 px-4">Report Reason</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-dark">
              {filteredReports.map((report) => (
                <ReportTableRow
                  key={report.id}
                  report={report}
                  onReview={setSelectedReport}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details and Action Modal */}
      <ReportDetailsModal
        report={selectedReport}
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        onUpdateStatus={handleUpdateReportStatus}
      />
    </div>
  );
}
export default Reports;

