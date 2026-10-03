import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVacantSeats,
  createVacantSeat,
  updateVacantSeat,
  deleteVacantSeat,
} from '../store/slices/vacantSeatSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Edit2, Trash2 } from 'lucide-react';

export default function VacantSeatsPage() {
  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.vacantSeats);

  const [search, setSearch] = useState('');
  const [instituteFilter, setInstituteFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatToDelete, setSeatToDelete] = useState(null);

  const [formData, setFormData] = useState({
    institute: '',
    department: '',
    supervisorName: '',
    designation: 'Professor',
    designationSeatLimit: 8,
    allottedSeat: 0,
    noOfVacant: 8,
    totalPhD: null,
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchVacantSeats({
        search,
        institute: instituteFilter,
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
  }, [search, instituteFilter, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedSeat(null);
    setFormData({
      institute: 'Institute of Technology',
      department: 'Computer Science & Engineering',
      supervisorName: '',
      designation: 'Professor',
      designationSeatLimit: 8,
      allottedSeat: 0,
      noOfVacant: 8,
      totalPhD: null,
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (seat) => {
    setSelectedSeat(seat);
    setFormData({
      institute: seat.institute || '',
      department: seat.department || '',
      supervisorName: seat.supervisorName || '',
      designation: seat.designation || '',
      designationSeatLimit: seat.designationSeatLimit || 0,
      allottedSeat: seat.allottedSeat || 0,
      noOfVacant: seat.noOfVacant || 0,
      totalPhD: seat.totalPhD,
      status: seat.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const vacant = Math.max(0, (formData.designationSeatLimit || 0) - (formData.allottedSeat || 0));
    const dataToSend = { ...formData, noOfVacant: vacant };

    if (selectedSeat) {
      await dispatch(updateVacantSeat({ id: selectedSeat.id, data: dataToSend }));
    } else {
      await dispatch(createVacantSeat(dataToSend));
    }
    setIsModalOpen(false);
    loadData(pageNumber);
  };

  const handleDelete = async () => {
    if (seatToDelete) {
      await dispatch(deleteVacantSeat(seatToDelete.id));
      setIsDeleteModalOpen(false);
      setSeatToDelete(null);
    }
  };

  const columns = [
    {
      header: 'Supervisor Name & Designation',
      accessor: 'supervisorName',
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-800">
            {row.supervisorName || '—'}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            {row.designation || 'Faculty Member'}
          </div>
        </div>
      ),
    },
    {
      header: 'Institute & Department',
      accessor: 'institute',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-[#0C2F44] line-clamp-1">
            {row.institute}
          </div>
          <div className="text-[11px] text-[#0A4A8F] line-clamp-1 font-mono">
            {row.department}
          </div>
        </div>
      ),
    },
    {
      header: 'Seat Limit',
      accessor: 'designationSeatLimit',
      width: '90px',
      render: (row) => (
        <span className="font-mono text-xs font-bold text-slate-700">
          {row.designationSeatLimit ?? '—'}
        </span>
      ),
    },
    {
      header: 'Allotted',
      accessor: 'allottedSeat',
      width: '80px',
      render: (row) => (
        <span className="font-mono text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          {row.allottedSeat ?? 0}
        </span>
      ),
    },
    {
      header: 'Vacant Seats',
      accessor: 'noOfVacant',
      width: '100px',
      render: (row) => (
        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
          (row.noOfVacant || 0) > 0
            ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
            : 'text-slate-500 bg-slate-100 border-slate-200'
        }`}>
          {row.noOfVacant ?? 0} seats
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '90px',
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
              setSeatToDelete(row);
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
        title="Ph.D Vacant Seat Matrix"
        subtitle="Manage faculty supervisors, designation-wise seat limits, enrolled scholars, and vacant PhD seats."
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
        addNewLabel="Add Supervisor Matrix"
        filters={[
          {
            key: 'institute',
            label: 'Institute',
            value: instituteFilter,
            onChange: setInstituteFilter,
            options: [
              { label: 'All Institutes', value: '' },
              { label: 'Institute of Technology', value: 'Technology' },
              { label: 'IBST', value: 'IBST' },
              { label: 'IMCE', value: 'IMCE' },
              { label: 'IMS', value: 'Media' },
              { label: 'INSH', value: 'INSH' },
              { label: 'IOP', value: 'IOP' },
              { label: 'ILS', value: 'Legal' },
              { label: 'IAST', value: 'Agricultural' },
              { label: 'IER', value: 'Education' },
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
        title={selectedSeat ? 'Edit Supervisor Seat Matrix' : 'Add New Supervisor Seat Record'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Supervisor Name *
              </label>
              <input
                type="text"
                required
                value={formData.supervisorName}
                onChange={(e) => setFormData({ ...formData, supervisorName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Prof. (Dr.) Alkesh Agrawal"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Designation *
              </label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Professor / Associate Professor"
              />
            </div>
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
                placeholder="e.g. Institute of Technology"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department *
              </label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. CSE / DoEEE"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Designation Seat Limit *
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.designationSeatLimit}
                onChange={(e) => setFormData({ ...formData, designationSeatLimit: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Allotted Scholars *
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.allottedSeat}
                onChange={(e) => setFormData({ ...formData, allottedSeat: parseInt(e.target.value, 10) || 0 })}
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
              Save Record
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Supervisor Record"
        message={`Are you sure you want to delete supervisor record for "${seatToDelete?.supervisorName}"?`}
        loading={actionLoading}
      />
    </div>
  );
}
