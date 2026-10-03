import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLeaderships,
  createLeadership,
  updateLeadership,
  deleteLeadership,
} from '../store/slices/leadershipSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Edit2, Trash2, Mail, Building2, User } from 'lucide-react';
import { formatImageUrl } from '../utils/imageUtils';

export default function LeadershipPage() {
  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.leaderships);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [leaderToDelete, setLeaderToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    tag: 'Leadership',
    image: '/about/Nabeel Ahmad.png',
    institution: 'SRMU, Barabanki-India',
    sortOrder: 1,
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchLeaderships({
        search,
        status: statusFilter,
        page,
        size: pageSize,
        sortBy: 'sortOrder',
        sortDir: 'asc',
      })
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedLeader(null);
    setFormData({
      name: '',
      role: '',
      email: '',
      tag: 'Leadership',
      image: '/about/Nabeel Ahmad.png',
      institution: 'SRMU, Barabanki-India',
      sortOrder: totalElements + 1,
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (leader) => {
    setSelectedLeader(leader);
    setFormData({
      name: leader.name || '',
      role: leader.role || '',
      email: leader.email || '',
      tag: leader.tag || 'Leadership',
      image: leader.image || '',
      institution: leader.institution || 'SRMU, Barabanki-India',
      sortOrder: leader.sortOrder || 0,
      status: leader.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedLeader) {
      await dispatch(updateLeadership({ id: selectedLeader.id, data: formData }));
    } else {
      await dispatch(createLeadership(formData));
    }
    setIsModalOpen(false);
    loadData(pageNumber);
  };

  const handleDelete = async () => {
    if (leaderToDelete) {
      await dispatch(deleteLeadership(leaderToDelete.id));
      setIsDeleteModalOpen(false);
      setLeaderToDelete(null);
    }
  };

  const columns = [
    {
      header: 'Officer Name & Role',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-xs flex items-center justify-center relative">
            <img
              src={formatImageUrl(row.image)}
              alt={row.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }
              }}
            />
            <div className="hidden absolute inset-0 items-center justify-center bg-slate-100 text-slate-400">
              <User className="w-6 h-6 text-[#0A4A8F]/40" />
            </div>
          </div>
          <div>
            <div className="font-semibold text-slate-800">
              {row.name}
            </div>
            <div className="text-[11px] text-[#0A4A8F] font-medium">
              {row.role}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Email / Contact',
      accessor: 'email',
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
          <Mail className="w-3.5 h-3.5 text-[#0A4A8F]" />
          <span>{row.email || '—'}</span>
        </div>
      ),
    },
    {
      header: 'Tag / Role Type',
      accessor: 'tag',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
          {row.tag || 'Official'}
        </span>
      ),
    },
    {
      header: 'Order',
      accessor: 'sortOrder',
      width: '80px',
      render: (row) => (
        <span className="font-mono text-xs text-slate-500">#{row.sortOrder}</span>
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
              setLeaderToDelete(row);
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
        title="R&C Leadership & Administration"
        subtitle="Manage Director (Research), Deputy Director, and Assistant Registrar official directory entries."
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
        addNewLabel="Add Officer"
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedLeader ? 'Edit R&C Officer' : 'Add New R&C Officer'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="Prof. (Dr.) Nabeel Ahmad"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Designation / Role *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="Director (Research)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="director.research@srmu.ac.in"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tag / Category
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="Leadership, Administration"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="/about/Nabeel Ahmad.png"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
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
              Save Officer
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Officer Record"
        message={`Are you sure you want to delete "${leaderToDelete?.name}"?`}
        loading={actionLoading}
      />
    </div>
  );
}
