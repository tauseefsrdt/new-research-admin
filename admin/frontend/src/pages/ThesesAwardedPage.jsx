import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTheses,
  createThesis,
  updateThesis,
  deleteThesis,
} from '../store/slices/thesisSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Edit2, Trash2, Award } from 'lucide-react';

export default function ThesesAwardedPage() {
  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.theses);

  const [search, setSearch] = useState('');
  const [instituteFilter, setInstituteFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedThesis, setSelectedThesis] = useState(null);
  const [thesisToDelete, setThesisToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    scholarName: '',
    regNo: '',
    supervisors: '',
    institute: '',
    department: '',
    defenseDate: '',
    academicSession: '2025-26',
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchTheses({
        search,
        institute: instituteFilter,
        status: statusFilter,
        page,
        size: pageSize,
        sortBy: 'srNo',
        sortDir: 'asc',
      })
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, instituteFilter, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedThesis(null);
    setFormData({
      title: '',
      scholarName: '',
      regNo: '',
      supervisors: '',
      institute: 'Institute of Technology',
      department: 'Computer Science & Engineering',
      defenseDate: new Date().toLocaleDateString('en-GB'),
      academicSession: '2025-26',
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (thesis) => {
    setSelectedThesis(thesis);
    setFormData({
      title: thesis.title || '',
      scholarName: thesis.scholarName || '',
      regNo: thesis.regNo || '',
      supervisors: thesis.supervisors || '',
      institute: thesis.institute || '',
      department: thesis.department || '',
      defenseDate: thesis.defenseDate || '',
      academicSession: thesis.academicSession || '2025-26',
      status: thesis.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedThesis) {
      await dispatch(updateThesis({ id: selectedThesis.id, data: formData }));
      setIsModalOpen(false);
      loadData(pageNumber);
    } else {
      await dispatch(createThesis(formData));
      setIsModalOpen(false);
      loadData(0);
    }
  };

  const handleDelete = async () => {
    if (thesisToDelete) {
      await dispatch(deleteThesis(thesisToDelete.id));
      setIsDeleteModalOpen(false);
      setThesisToDelete(null);
    }
  };

  const columns = [
    {
      header: 'Ph.D Thesis Title',
      accessor: 'title',
      render: (row) => (
        <div className="max-w-md">
          <div className="font-semibold text-slate-800 line-clamp-2 leading-snug">
            {row.title}
          </div>
          <div className="text-[11px] text-[#0A4A8F] font-mono mt-0.5">
            Session: {row.academicSession || '2025-26'} • Defense: {row.defenseDate || '—'}
          </div>
        </div>
      ),
    },
    {
      header: 'Scholar Name & Reg No',
      accessor: 'scholarName',
      render: (row) => (
        <div>
          <div className="font-medium text-xs text-slate-800">
            {row.scholarName}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            {row.regNo || '—'}
          </div>
        </div>
      ),
    },
    {
      header: 'Supervisor(s)',
      accessor: 'supervisors',
      render: (row) => (
        <div className="text-xs text-slate-700 font-medium max-w-[180px] truncate">
          {row.supervisors || '—'}
        </div>
      ),
    },
    {
      header: 'Institute / Department',
      accessor: 'institute',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-[#0C2F44] line-clamp-1">
            {row.institute || '—'}
          </div>
          <div className="text-[11px] text-slate-500 line-clamp-1">
            {row.department || '—'}
          </div>
        </div>
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
              setThesisToDelete(row);
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
        title="Theses Awarded (Ph.D Degrees)"
        subtitle="Manage official records of Ph.D degrees awarded across sessions, scholars, and supervisors."
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
        addNewLabel="Add Thesis Awarded"
        filters={[
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
        title={selectedThesis ? 'Edit Ph.D Thesis' : 'Add New Ph.D Degree Awarded'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ph.D Thesis Title *
            </label>
            <textarea
              required
              rows={3}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="Full thesis title..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Scholar Name *
              </label>
              <input
                type="text"
                required
                value={formData.scholarName}
                onChange={(e) => setFormData({ ...formData, scholarName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Mr. Ritesh Kumar Upadhyay"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                value={formData.regNo}
                onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 202110301000004"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supervisor(s) *
            </label>
            <input
              type="text"
              required
              value={formData.supervisors}
              onChange={(e) => setFormData({ ...formData, supervisors: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="e.g. Prof. (Dr.) Rohit P Shabran"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institute *
              </label>
              <input
                type="text"
                required
                value={formData.institute}
                onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Institute of Legal Studies"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Legal Studies & Law"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Defense Date
              </label>
              <input
                type="text"
                value={formData.defenseDate}
                onChange={(e) => setFormData({ ...formData, defenseDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 16.07.2025"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Academic Session
              </label>
              <input
                type="text"
                value={formData.academicSession}
                onChange={(e) => setFormData({ ...formData, academicSession: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 2025-26"
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
              Save Thesis
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Thesis Record"
        message={`Are you sure you want to delete the thesis record for "${thesisToDelete?.scholarName}"?`}
        loading={actionLoading}
      />
    </div>
  );
}
