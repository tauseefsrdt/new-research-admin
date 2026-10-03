import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPatrons,
  createPatron,
  updatePatron,
  deletePatron,
} from '../store/slices/patronSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Edit2, Trash2, Crown, User } from 'lucide-react';
import { formatImageUrl } from '../utils/imageUtils';
import { showSuccessToast, showErrorToast } from '../utils/toast';

export default function PatronsPage() {
  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.patrons);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatron, setSelectedPatron] = useState(null);
  const [patronToDelete, setPatronToDelete] = useState(null);
  const isFirstMount = useRef(true);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    type: 'PATRON',
    sortOrder: 1,
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchPatrons({
        search,
        type: typeFilter,
        status: statusFilter,
        page,
        size: pageSize,
        sortBy: 'sortOrder',
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
  }, [search, typeFilter, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedPatron(null);
    setFormData({
      name: '',
      role: '',
      image: 'Images/pankaj-DsE5rnwQ.webp',
      type: 'PATRON',
      sortOrder: totalElements + 1,
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (patron) => {
    setSelectedPatron(patron);
    setFormData({
      name: patron.name || '',
      role: patron.role || '',
      image: patron.image || '',
      type: patron.type || 'PATRON',
      sortOrder: patron.sortOrder || 0,
      status: patron.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (selectedPatron) {
        await dispatch(updatePatron({ id: selectedPatron.id, data: formData })).unwrap();
        showSuccessToast('Patron record updated successfully');
      } else {
        await dispatch(createPatron(formData)).unwrap();
        showSuccessToast('Patron record created successfully');
      }
      setIsModalOpen(false);
      loadData(pageNumber);
    } catch (err) {
      showErrorToast(err, { defaultMessage: selectedPatron ? 'Failed to update patron' : 'Failed to create patron' });
    }
  };

  const handleDelete = async () => {
    if (patronToDelete) {
      try {
        await dispatch(deletePatron(patronToDelete.id)).unwrap();
        showSuccessToast('Patron record deleted successfully');
        setIsDeleteModalOpen(false);
        setPatronToDelete(null);
      } catch (err) {
        showErrorToast(err, { defaultMessage: 'Failed to delete patron record' });
      }
    }
  };

  const columns = [
    {
      header: 'Patron Name & Role',
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
            <div className="text-[11px] text-[#0A4A8F] font-bold tracking-wider uppercase">
              {row.role}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Type',
      accessor: 'type',
      width: '130px',
      render: (row) => (
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
          row.type === 'PATRON'
            ? 'bg-amber-50 text-amber-800 border-amber-200'
            : 'bg-blue-50 text-[#0A4A8F] border-blue-200'
        }`}>
          {row.type === 'PATRON' ? 'University Patron' : 'Co-Patron'}
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
              setPatronToDelete(row);
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
        title="University Patrons & Co-Patrons"
        subtitle="Manage Chancellor, Pro Chancellor, Vice Chancellor, Registrar, and Director Research entries."
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
        addNewLabel="Add Patron"
        filters={[
          {
            key: 'type',
            label: 'Type',
            value: typeFilter,
            onChange: setTypeFilter,
            options: [
              { label: 'All Types', value: '' },
              { label: 'Patrons', value: 'PATRON' },
              { label: 'Co-Patrons', value: 'CO_PATRON' },
            ],
          },
        ]}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPatron ? 'Edit Patron' : 'Add New Patron'}
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
                placeholder="e.g. Er. Pankaj Agarwal"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Role / Title *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="CHANCELLOR / PRO CHANCELLOR"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              >
                <option value="PATRON">University Patron</option>
                <option value="CO_PATRON">University Co-Patron</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Image Path
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="Images/pankaj-DsE5rnwQ.webp"
              />
            </div>
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
              Save Patron
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Patron"
        message={`Are you sure you want to delete "${patronToDelete?.name}"?`}
        loading={actionLoading}
      />
    </div>
  );
}
