import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPatents,
  createPatent,
  updatePatent,
  deletePatent,
} from '../store/slices/patentSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import PdfUpload from '../components/common/PdfUpload';
import { Edit2, Trash2, ExternalLink, Star, FileText } from 'lucide-react';
import { showSuccessToast, showErrorToast } from '../utils/toast';

export default function PatentsPage() {
  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.patents);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [patentToDelete, setPatentToDelete] = useState(null);
  const isFirstMount = useRef(true);

  const [formData, setFormData] = useState({
    title: '',
    patenterName: '',
    patentNumber: '',
    yearOfAward: '',
    departmentKey: '',
    doi: '',
    pdf: '',
    pdfUrl: '',
    featured: false,
    citations: 0,
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchPatents({
        search,
        status: statusFilter,
        page,
        size: pageSize,
        sortBy: 'srNo',
        sortDir: 'asc',
      })
    );
  };

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      loadData(0);
      return;
    }
    const timer = setTimeout(() => {
      loadData(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedPatent(null);
    setFormData({
      title: '',
      patenterName: '',
      patentNumber: '',
      yearOfAward: new Date().getFullYear().toString(),
      departmentKey: '',
      doi: '',
      pdf: '',
      pdfUrl: '',
      featured: false,
      citations: 0,
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (patent) => {
    setSelectedPatent(patent);
    setFormData({
      title: patent.title || '',
      patenterName: patent.patenterName || '',
      patentNumber: patent.patentNumber || '',
      yearOfAward: patent.yearOfAward || '',
      departmentKey: patent.departmentKey || '',
      doi: patent.doi || '',
      pdf: patent.pdf || patent.pdfUrl || '',
      pdfUrl: patent.pdfUrl || patent.pdf || '',
      featured: patent.featured || false,
      citations: patent.citations || 0,
      status: patent.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (selectedPatent) {
        await dispatch(updatePatent({ id: selectedPatent.id, data: formData })).unwrap();
        showSuccessToast('Patent updated successfully');
        setIsModalOpen(false);
        loadData(pageNumber);
      } else {
        await dispatch(createPatent(formData)).unwrap();
        showSuccessToast('Patent created successfully');
        setIsModalOpen(false);
        loadData(0);
      }
    } catch (err) {
      showErrorToast(err, { defaultMessage: selectedPatent ? 'Failed to update patent' : 'Failed to create patent' });
    }
  };

  const handleDelete = async () => {
    if (patentToDelete) {
      try {
        await dispatch(deletePatent(patentToDelete.id)).unwrap();
        showSuccessToast('Patent deleted successfully');
        setIsDeleteModalOpen(false);
        setPatentToDelete(null);
      } catch (err) {
        showErrorToast(err, { defaultMessage: 'Failed to delete patent' });
      }
    }
  };

  const columns = [
    {
      header: 'Patent / Design Title',
      accessor: 'title',
      render: (row) => (
        <div className="max-w-md">
          <div className="font-semibold text-slate-800 line-clamp-2 leading-snug">
            {row.title}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            App/Pat No: {row.patentNumber || 'N/A'}
          </div>
        </div>
      ),
    },
    {
      header: 'Inventors / Faculty',
      accessor: 'patenterName',
      render: (row) => (
        <div className="text-xs text-slate-700 font-medium max-w-[200px] truncate">
          {row.patenterName || row.authors || '—'}
        </div>
      ),
    },
    {
      header: 'Year',
      accessor: 'yearOfAward',
      width: '90px',
      render: (row) => (
        <span className="font-mono text-xs text-slate-600">
          {row.yearOfAward || row.year || '—'}
        </span>
      ),
    },
    {
      header: 'PDF Document',
      width: '120px',
      render: (row) => {
        const pdfLink = row.pdf || row.pdfUrl;
        return pdfLink ? (
          <a
            href={pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
            title="Open patent PDF"
          >
            <FileText className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>PDF</span>
            <ExternalLink className="w-2.5 h-2.5 text-red-500" />
          </a>
        ) : (
          <span className="text-xs text-slate-300 font-mono">—</span>
        );
      },
    },
    {
      header: 'Featured',
      accessor: 'featured',
      width: '90px',
      render: (row) =>
        row.featured ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            Top
          </span>
        ) : (
          <span className="text-xs text-slate-400">—</span>
        ),
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '100px',
      render: (row) => <Badge variant={row.status}>{row.status}</Badge>,
    },
    {
      header: 'Actions',
      width: '110px',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-[#0A4A8F] hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setPatentToDelete(row);
              setIsDeleteModalOpen(true);
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        title="Patents & Design Registrations"
        subtitle="Manage all national and international patents and innovations filed across departments."
        columns={columns}
        data={items}
        loading={loading}
        totalElements={totalElements}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={(page) => loadData(page)}
        searchQuery={search}
        onSearchChange={setSearch}
        onRefresh={() => loadData(pageNumber)}
        onAddNew={handleOpenAdd}
        addNewLabel="Add Patent"
        filters={[
          {
            key: 'status',
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'All Statuses', value: '' },
              { label: 'Active', value: 'ACTIVE' },
              { label: 'Draft', value: 'DRAFT' },
              { label: 'Inactive', value: 'INACTIVE' },
            ],
          },
        ]}
      />

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPatent ? 'Edit Patent / Design' : 'Add New Patent / Design'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Patent / Innovation Title *
            </label>
            <textarea
              required
              rows={3}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="Full title of the patent..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patent / Application Number *
              </label>
              <input
                type="text"
                required
                value={formData.patentNumber}
                onChange={(e) => setFormData({ ...formData, patentNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 202611005849 A"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Year of Award / Filing *
              </label>
              <input
                type="text"
                required
                value={formData.yearOfAward}
                onChange={(e) => setFormData({ ...formData, yearOfAward: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 2026"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Inventors / Patenter Names *
            </label>
            <input
              type="text"
              required
              value={formData.patenterName}
              onChange={(e) => setFormData({ ...formData, patenterName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="e.g. Dr. Alkesh Agrawal, Prof. Nabeel Ahmad"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department Code / Key
              </label>
              <input
                type="text"
                value={formData.departmentKey}
                onChange={(e) => setFormData({ ...formData, departmentKey: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. DCSE, FoME, DEEE"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              >
                <option value="ACTIVE">Active (Published)</option>
                <option value="DRAFT">Draft</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          {/* PDF Upload / Update Option */}
          <PdfUpload
            value={formData.pdf || formData.pdfUrl}
            onChange={(url) => setFormData({ ...formData, pdf: url, pdfUrl: url })}
            module="patents"
            label="Patent Certificate / Document (PDF)"
            helperText="Upload official patent publication / certificate PDF (Stored in upload_pdf/patents/)"
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-[#0A4A8F] rounded border-slate-300 focus:ring-[#0A4A8F]"
            />
            <label htmlFor="featured" className="text-xs font-medium text-slate-700">
              Highlight on Homepage featured carousel
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-5 py-2 text-sm font-medium text-white bg-[#0A4A8F] hover:bg-[#0C2F44] rounded-xl shadow-sm transition-all flex items-center gap-2 disabled:opacity-60"
            >
              {actionLoading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Save Patent
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Patent Record"
        message={`Are you sure you want to delete "${patentToDelete?.title}"? This action will remove it permanently.`}
        loading={actionLoading}
      />
    </div>
  );
}
