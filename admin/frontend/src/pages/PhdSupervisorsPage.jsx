import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPhdSupervisors,
  createPhdSupervisor,
  updatePhdSupervisor,
  deletePhdSupervisor,
} from '../store/slices/phdSupervisorSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Edit2, Trash2 } from 'lucide-react';
import { showSuccessToast, showErrorToast } from '../utils/toast';

export default function PhdSupervisorsPage() {
  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.phdSupervisors);

  const [search, setSearch] = useState('');
  const [deptCodeFilter, setDeptCodeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [supervisorToDelete, setSupervisorToDelete] = useState(null);

  const [formData, setFormData] = useState({
    supervisor: '',
    departmentName: 'Computer Science & Engineering',
    departmentCode: 'CSE',
    instituteSlug: 'institute-of-technology',
    yearlyJson: '{"2020":1,"2021":1,"2022":1,"2023":1,"2024":1,"2025":1,"2026":1}',
    grandTotal: 7,
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchPhdSupervisors({
        search,
        deptCode: deptCodeFilter,
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
  }, [search, deptCodeFilter, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedSupervisor(null);
    setFormData({
      supervisor: '',
      departmentName: 'Computer Science & Engineering',
      departmentCode: 'CSE',
      instituteSlug: 'institute-of-technology',
      yearlyJson: '{"2020":0,"2021":0,"2022":0,"2023":1,"2024":1,"2025":1,"2026":1}',
      grandTotal: 4,
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (record) => {
    setSelectedSupervisor(record);
    setFormData({
      supervisor: record.supervisor || '',
      departmentName: record.departmentName || '',
      departmentCode: record.departmentCode || '',
      instituteSlug: record.instituteSlug || '',
      yearlyJson: record.yearlyJson || '{}',
      grandTotal: record.grandTotal || 0,
      status: record.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (selectedSupervisor) {
        await dispatch(updatePhdSupervisor({ id: selectedSupervisor.id, data: formData })).unwrap();
        showSuccessToast('Ph.D Supervisor record updated successfully');
      } else {
        await dispatch(createPhdSupervisor(formData)).unwrap();
        showSuccessToast('Ph.D Supervisor record created successfully');
      }
      setIsModalOpen(false);
      loadData(pageNumber);
    } catch (err) {
      showErrorToast(err, { defaultMessage: selectedSupervisor ? 'Failed to update supervisor record' : 'Failed to create supervisor record' });
    }
  };

  const handleDelete = async () => {
    if (supervisorToDelete) {
      try {
        await dispatch(deletePhdSupervisor(supervisorToDelete.id)).unwrap();
        showSuccessToast('Ph.D Supervisor record deleted successfully');
        setIsDeleteModalOpen(false);
        setSupervisorToDelete(null);
      } catch (err) {
        showErrorToast(err, { defaultMessage: 'Failed to delete supervisor record' });
      }
    }
  };

  const columns = [
    {
      header: 'Supervisor Name',
      accessor: 'supervisor',
      render: (row) => (
        <div className="font-semibold text-slate-800">
          {row.supervisor}
        </div>
      ),
    },
    {
      header: 'Department',
      accessor: 'departmentName',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-[#0C2F44]">
            {row.departmentName}
          </div>
          <div className="text-[11px] font-mono text-[#0A4A8F]">
            Code: {row.departmentCode}
          </div>
        </div>
      ),
    },
    {
      header: 'Institute Slug',
      accessor: 'instituteSlug',
      render: (row) => (
        <span className="font-mono text-xs text-slate-500">
          {row.instituteSlug || '—'}
        </span>
      ),
    },
    {
      header: 'Total Awarded',
      accessor: 'grandTotal',
      width: '130px',
      render: (row) => (
        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          {row.grandTotal} Ph.D(s)
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
              setSupervisorToDelete(row);
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
        title="Ph.D Supervisor Yearwise Award Matrix"
        subtitle="Manage department-wise and year-wise PhD degrees produced by individual research supervisors."
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
        addNewLabel="Add Supervisor Award Row"
        filters={[
          {
            key: 'deptCode',
            label: 'Dept Code',
            value: deptCodeFilter,
            onChange: setDeptCodeFilter,
            options: [
              { label: 'All Codes', value: '' },
              { label: 'CSE', value: 'CSE' },
              { label: 'Civil', value: 'Civil' },
              { label: 'ECE', value: 'ECE' },
              { label: 'EE', value: 'EE' },
              { label: 'ME', value: 'ME' },
              { label: 'IBST', value: 'IBST' },
              { label: 'IMCE', value: 'IMCE' },
              { label: 'Media', value: 'Media' },
              { label: 'HSS', value: 'HSS' },
              { label: 'Chy', value: 'Chy' },
              { label: 'PHY', value: 'PHY' },
              { label: 'Math', value: 'Math' },
              { label: 'IOP', value: 'IOP' },
              { label: 'Law', value: 'Law' },
              { label: 'IER', value: 'IER' },
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
        title={selectedSupervisor ? 'Edit Supervisor Award Matrix' : 'Add New Supervisor Record'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supervisor Name *
            </label>
            <input
              type="text"
              required
              value={formData.supervisor}
              onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="e.g. Dr. Bineet Kumar Gupta"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department Name *
              </label>
              <input
                type="text"
                required
                value={formData.departmentName}
                onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Computer Science & Engineering"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department Code *
              </label>
              <input
                type="text"
                required
                value={formData.departmentCode}
                onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. CSE"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institute Slug
              </label>
              <input
                type="text"
                value={formData.instituteSlug}
                onChange={(e) => setFormData({ ...formData, instituteSlug: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. institute-of-technology"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Grand Total Awarded *
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.grandTotal}
                onChange={(e) => setFormData({ ...formData, grandTotal: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Yearly Award Distribution JSON
            </label>
            <input
              type="text"
              value={formData.yearlyJson}
              onChange={(e) => setFormData({ ...formData, yearlyJson: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder='{"2020":1,"2021":2,"2022":1}'
            />
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
              Save Supervisor Record
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
        message={`Are you sure you want to delete supervisor record for "${supervisorToDelete?.supervisor}"?`}
        loading={actionLoading}
      />
    </div>
  );
}
