import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { MOCK_REPORTS } from '../../data/reportsData';
import { formatDate } from '../../utils/formatDate';
import { useToast } from '../../hooks/useToast';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  FileCheck,
  AlertTriangle,
  Eye,
  Trash2,
  Check,
  XCircle,
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
          <table className="w-full text-left text-xs border-collapse">
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
                <tr
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-semibold text-brand-dark whitespace-nowrap">
                    {report.id}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-normal text-brand-dark line-clamp-1 italic">
                      "{report.snippet}"
                    </p>
                    <span className="text-[10px] text-brand-muted">
                      via {report.reporter}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-brand-dark max-w-[160px] truncate">
                    {report.product}
                  </td>
                  <td className="py-3.5 px-4 max-w-[180px]">
                    <span className="font-medium text-brand-dark truncate block">
                      {report.reason}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-brand-muted whitespace-nowrap">
                    {formatDate(report.date)}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        report.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : report.status === 'Pending'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReport(report);
                      }}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details and Action Modal */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={`Moderation Case: ${selectedReport.id}`}
          subtitle={`Submitted on ${formatDate(selectedReport.date)} • Reporter: ${selectedReport.reporter}`}
          maxWidth="max-w-xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => handleUpdateReportStatus(selectedReport.id, 'Resolved')}
              >
                Takedown Review
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleUpdateReportStatus(selectedReport.id, 'Reviewed')}
                >
                  Mark Under Review
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Check}
                  onClick={() => handleUpdateReportStatus(selectedReport.id, 'Resolved')}
                >
                  Mark Resolved
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-brand-border space-y-1">
              <span className="text-[10px] uppercase font-semibold text-brand-muted">
                Product Target
              </span>
              <p className="font-semibold text-brand-dark text-sm">
                {selectedReport.product}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold text-brand-muted block mb-1">
                Reported Review Content
              </span>
              <div className="p-3 rounded-lg border border-brand-border bg-white italic font-normal text-brand-dark">
                "{selectedReport.snippet}"
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-brand-border">
                <span className="text-[10px] uppercase font-semibold text-brand-muted block">
                  Violation Category
                </span>
                <span className="font-semibold text-brand-dark mt-0.5 block">
                  {selectedReport.reason}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-brand-border">
                <span className="text-[10px] uppercase font-semibold text-brand-muted block">
                  Risk Assessment
                </span>
                <span className="font-bold text-rose-600 mt-0.5 block">
                  {selectedReport.riskScore}% Probability ({selectedReport.severity})
                </span>
              </div>
            </div>

            {selectedReport.notes && (
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-amber-900">
                <span className="font-semibold block mb-0.5">Automated Investigator Notes:</span>
                <p className="leading-relaxed">{selectedReport.notes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
export default Reports;

