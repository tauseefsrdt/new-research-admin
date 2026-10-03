import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchResearchPapers,
  createResearchPaper,
  updateResearchPaper,
  deleteResearchPaper,
  fetchDepartments,
} from '../store/slices/researchPaperSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Edit2, Trash2 } from 'lucide-react';
import { showSuccessToast, showErrorToast } from '../utils/toast';

export default function ResearchPapersPage() {
  const dispatch = useDispatch();
  const {
    items,
    departments,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.researchPapers);

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [paperToDelete, setPaperToDelete] = useState(null);
  const isFirstMount = useRef(true);

  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    department: '',
    journalName: '',
    yearOfPublication: '',
    issnNumber: '',
    ugcRecognitionLink: '',
    featured: false,
    citations: 0,
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchResearchPapers({
        search,
        department: departmentFilter,
        status: statusFilter,
        page,
        size: pageSize,
        sortBy: 'srNo',
        sortDir: 'asc',
      })
    );
  };

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

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
  }, [search, departmentFilter, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedPaper(null);
    setFormData({
      title: '',
      authorName: '',
      department: departments[0]?.key || 'DCSE',
      journalName: '',
      yearOfPublication: new Date().getFullYear().toString(),
      issnNumber: '',
      ugcRecognitionLink: '',
      featured: false,
      citations: 0,
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (paper) => {
    setSelectedPaper(paper);
    setFormData({
      title: paper.title || '',
      authorName: paper.authorName || '',
      department: paper.department || '',
      journalName: paper.journalName || '',
      yearOfPublication: paper.yearOfPublication || '',
      issnNumber: paper.issnNumber || '',
      ugcRecognitionLink: paper.ugcRecognitionLink || '',
      featured: paper.featured || false,
      citations: paper.citations || 0,
      status: paper.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (selectedPaper) {
        await dispatch(updateResearchPaper({ id: selectedPaper.id, data: formData })).unwrap();
        showSuccessToast('Publication updated successfully');
        setIsModalOpen(false);
        loadData(pageNumber);
      } else {
        await dispatch(createResearchPaper(formData)).unwrap();
        showSuccessToast('Publication created successfully');
        setIsModalOpen(false);
        loadData(0);
      }
    } catch (err) {
      showErrorToast(err, { defaultMessage: selectedPaper ? 'Failed to update publication' : 'Failed to create publication' });
    }
  };

  const handleDelete = async () => {
    if (paperToDelete) {
      try {
        await dispatch(deleteResearchPaper(paperToDelete.id)).unwrap();
        showSuccessToast('Publication deleted successfully');
        setIsDeleteModalOpen(false);
        setPaperToDelete(null);
      } catch (err) {
        showErrorToast(err, { defaultMessage: 'Failed to delete publication' });
      }
    }
  };

  const columns = [
    {
      header: 'Paper Title & Journal',
      accessor: 'title',
      render: (row) => (
        <div className="max-w-md">
          <div className="font-semibold text-slate-800 line-clamp-2 leading-snug">
            {row.title}
          </div>
          <div className="text-[11px] text-[#0A4A8F] font-medium mt-0.5 line-clamp-1">
            {row.journalName || row.journal || 'Journal Publication'}
          </div>
        </div>
      ),
    },
    {
      header: 'Authors',
      accessor: 'authorName',
      render: (row) => (
        <div className="text-xs text-slate-700 font-medium max-w-[200px] truncate">
          {row.authorName || row.authors || '—'}
        </div>
      ),
    },
    {
      header: 'Dept',
      accessor: 'department',
      width: '100px',
      render: (row) => (
        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
          {row.department || '—'}
        </span>
      ),
    },
    {
      header: 'Year',
      accessor: 'yearOfPublication',
      width: '80px',
      render: (row) => (
        <span className="font-mono text-xs text-slate-600">
          {row.yearOfPublication || row.year || '—'}
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
              setPaperToDelete(row);
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
        title="Indexed Research Publications"
        subtitle="Manage UGC-CARE, Scopus, and Web of Science peer-reviewed research papers."
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
        addNewLabel="Add Publication"
        filters={[
          {
            key: 'department',
            label: 'Department',
            value: departmentFilter,
            onChange: setDepartmentFilter,
            options: [
              { label: 'All Departments', value: '' },
              ...departments.map((d) => ({
                label: `${d.name} (${d.count})`,
                value: d.key,
              })),
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
        title={selectedPaper ? 'Edit Publication' : 'Add New Indexed Publication'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Article / Paper Title *
            </label>
            <textarea
              required
              rows={3}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="Full title of the research paper..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Journal Name *
              </label>
              <input
                type="text"
                required
                value={formData.journalName}
                onChange={(e) => setFormData({ ...formData, journalName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Applied Physics A"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Year of Publication *
              </label>
              <input
                type="text"
                required
                value={formData.yearOfPublication}
                onChange={(e) => setFormData({ ...formData, yearOfPublication: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 2026"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Authors *
              </label>
              <input
                type="text"
                required
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Dr. Vaibhava Srivastava, Deepak Kumar Singh"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department Code / Name *
              </label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. DCSE, DoEEE, IBST, FoHSS"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ISSN / DOI / Link
              </label>
              <input
                type="text"
                value={formData.issnNumber}
                onChange={(e) => setFormData({ ...formData, issnNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 0947-8396"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                DOI / UGC Recognition Link
              </label>
              <input
                type="text"
                value={formData.ugcRecognitionLink}
                onChange={(e) => setFormData({ ...formData, ugcRecognitionLink: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="https://doi.org/..."
              />
            </div>
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
              Save Publication
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Research Paper"
        message={`Are you sure you want to delete "${paperToDelete?.title}"?`}
        loading={actionLoading}
      />
    </div>
  );
}
