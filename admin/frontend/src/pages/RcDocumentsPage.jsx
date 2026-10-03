import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRcDocuments,
  createRcDocument,
  updateRcDocument,
  deleteRcDocument,
} from '../store/slices/rcDocumentSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import PdfUpload from '../components/common/PdfUpload';
import { Edit2, Trash2, Download, FileText } from 'lucide-react';

export default function RcDocumentsPage() {
  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.rcDocuments);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docToDelete, setDocToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    filename: '',
    category: 'Thesis Submission',
    description: '',
    fileType: 'pdf',
    fileSize: '500 KB',
    path: '/research/',
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchRcDocuments({
        search,
        category: categoryFilter,
        status: statusFilter,
        page,
        size: pageSize,
        sortBy: 'id',
        sortDir: 'asc',
      })
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, categoryFilter, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedDoc(null);
    setFormData({
      title: '',
      filename: 'Proforma.pdf',
      category: 'Thesis Submission',
      description: '',
      fileType: 'pdf',
      fileSize: '500 KB',
      path: '/research/Proforma.pdf',
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setSelectedDoc(doc);
    setFormData({
      title: doc.title || '',
      filename: doc.filename || '',
      category: doc.category || 'Thesis Submission',
      description: doc.description || '',
      fileType: doc.fileType || 'pdf',
      fileSize: doc.fileSize || '500 KB',
      path: doc.path || '',
      status: doc.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedDoc) {
      await dispatch(updateRcDocument({ id: selectedDoc.id, data: formData }));
    } else {
      await dispatch(createRcDocument(formData));
    }
    setIsModalOpen(false);
    loadData(pageNumber);
  };

  const handleDelete = async () => {
    if (docToDelete) {
      await dispatch(deleteRcDocument(docToDelete.id));
      setIsDeleteModalOpen(false);
      setDocToDelete(null);
    }
  };

  const columns = [
    {
      header: 'Document Title & Description',
      accessor: 'title',
      render: (row) => (
        <div className="max-w-md">
          <div className="font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0A4A8F] shrink-0" />
            <span>{row.title}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            {row.description || row.filename}
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#0A4A8F] border border-blue-200">
          {row.category}
        </span>
      ),
    },
    {
      header: 'File Type & Size',
      accessor: 'fileType',
      width: '120px',
      render: (row) => (
        <span className="font-mono text-xs text-slate-600 uppercase">
          {row.fileType} • {row.fileSize || 'N/A'}
        </span>
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
      width: '100px',
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
              setDocToDelete(row);
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
        title="R&C Formats & Official Documents"
        subtitle="Manage official thesis submission formats, checklists, no dues proformas, and plagiarism clearance templates."
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
        addNewLabel="Add R&C Document"
        filters={[
          {
            key: 'category',
            label: 'Category',
            value: categoryFilter,
            onChange: setCategoryFilter,
            options: [
              { label: 'All Categories', value: '' },
              { label: 'Thesis Submission', value: 'Thesis Submission' },
              { label: 'Quality & Plagiarism', value: 'Quality & Plagiarism' },
              { label: 'Checklists', value: 'Checklists' },
              { label: 'Administrative & Financial', value: 'Administrative & Financial' },
              { label: 'General', value: 'General' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'All Statuses', value: '' },
              { label: 'Active', value: 'ACTIVE' },
              { label: 'Inactive', value: 'INACTIVE' },
            ],
          },
        ]}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDoc ? 'Edit R&C Document' : 'Add New R&C Proforma / Document'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Document Display Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="e.g. Checklists (R&C)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Filename *
              </label>
              <input
                type="text"
                required
                value={formData.filename}
                onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Checklists (R&C).pdf"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              >
                <option value="Thesis Submission">Thesis Submission</option>
                <option value="Quality & Plagiarism">Quality & Plagiarism</option>
                <option value="Checklists">Checklists</option>
                <option value="Administrative & Financial">Administrative & Financial</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description / Instructions
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="Guidelines for candidates submitting this form..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                File Type
              </label>
              <select
                value={formData.fileType}
                onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              >
                <option value="pdf">PDF (.pdf)</option>
                <option value="docx">Word (.docx)</option>
                <option value="doc">Word (.doc)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                File Size
              </label>
              <input
                type="text"
                value={formData.fileSize}
                onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 321 KB"
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
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          {/* PDF Document Upload */}
          <PdfUpload
            value={formData.path}
            onChange={(url) => setFormData({ ...formData, path: url, filename: url.split('/').pop() || formData.filename })}
            module="rc-documents"
            label="Upload / Update Document (PDF)"
            helperText="Upload official guideline / proforma PDF (Stored in upload_pdf/rc-documents/)"
          />

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
              Save Document
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete RC Document"
        message={`Are you sure you want to delete "${docToDelete?.title}"?`}
        loading={actionLoading}
      />
    </div>
  );
}
