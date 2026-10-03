import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInstitutes,
  createInstitute,
  updateInstitute,
  deleteInstitute,
} from '../store/slices/instituteSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Edit2, Trash2, Building2, GraduationCap, Plus, X, Code2, List } from 'lucide-react';

import { formatImageUrl } from '../utils/imageUtils';
import ImageUpload from '../components/common/ImageUpload';
import { showSuccessToast, showErrorToast, showWarningToast } from '../utils/toast';

export default function InstitutesPage() {

  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.institutes);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [instituteToDelete, setInstituteToDelete] = useState(null);
  const [newProgramInput, setNewProgramInput] = useState('');
  const [isRawJsonMode, setIsRawJsonMode] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    slug: '',
    departmentCountLabel: '',
    image: '',
    description: '',
    programsJson: '[]',
    sortOrder: 0,
    status: 'ACTIVE',
  });

  const getParsedPrograms = () => {
    try {
      if (Array.isArray(formData.programsJson)) {
        return formData.programsJson;
      }
      if (typeof formData.programsJson === 'string' && formData.programsJson.trim()) {
        const parsed = JSON.parse(formData.programsJson);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      return [];
    }
    return [];
  };

  const handleAddProgram = () => {
    const trimmed = newProgramInput.trim();
    if (!trimmed) return;
    const current = getParsedPrograms();
    if (!current.includes(trimmed)) {
      const updated = [...current, trimmed];
      setFormData((prev) => ({ ...prev, programsJson: JSON.stringify(updated) }));
    } else {
      showWarningToast('This program already exists in the list.');
    }
    setNewProgramInput('');
  };

  const handleRemoveProgram = (indexToRemove) => {
    const current = getParsedPrograms();
    const updated = current.filter((_, idx) => idx !== indexToRemove);
    setFormData((prev) => ({ ...prev, programsJson: JSON.stringify(updated) }));
  };

  const loadData = (page = 0) => {
    dispatch(
      fetchInstitutes({
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
    setSelectedInstitute(null);
    setNewProgramInput('');
    setIsRawJsonMode(false);
    setFormData({
      title: '',
      code: '',
      slug: '',
      departmentCountLabel: '3 DEPARTMENTS',
      image: '/Images/c1.webp',
      description: '',
      programsJson: '["Program 1", "Program 2"]',
      sortOrder: totalElements + 1,
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (inst) => {
    setSelectedInstitute(inst);
    setNewProgramInput('');
    setIsRawJsonMode(false);
    setFormData({
      title: inst.title || '',
      code: inst.code || '',
      slug: inst.slug || '',
      departmentCountLabel: inst.departmentCountLabel || '',
      image: inst.image || '',
      description: inst.description || '',
      programsJson: inst.programsJson || '[]',
      phdYearwiseDeptCodesJson: inst.phdYearwiseDeptCodesJson || '[]',
      paperCodesJson: inst.paperCodesJson || '[]',
      patentCodesJson: inst.patentCodesJson || '[]',
      bookCodesJson: inst.bookCodesJson || '[]',
      sortOrder: inst.sortOrder || 0,
      status: inst.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (selectedInstitute) {
        const payload = {
          ...selectedInstitute,
          ...formData,
        };
        await dispatch(updateInstitute({ id: selectedInstitute.id, data: payload })).unwrap();
        showSuccessToast('Institute updated successfully');
        setIsModalOpen(false);
        loadData(pageNumber);
      } else {
        await dispatch(createInstitute(formData)).unwrap();
        showSuccessToast('Institute created successfully');
        setIsModalOpen(false);
        loadData(0);
      }
    } catch (err) {
      console.error('Failed to save institute:', err);
      showErrorToast(err, { defaultMessage: 'Failed to save institute' });
    }
  };

  const handleDelete = async () => {
    if (instituteToDelete) {
      try {
        await dispatch(deleteInstitute(instituteToDelete.id)).unwrap();
        showSuccessToast('Institute deleted successfully');
        setIsDeleteModalOpen(false);
        setInstituteToDelete(null);
      } catch (err) {
        showErrorToast(err, { defaultMessage: 'Failed to delete institute' });
      }
    }
  };

  const columns = [
    {
      header: 'Institute Title & Code',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-xs flex items-center justify-center relative">
            <img
              src={formatImageUrl(row.image, '/Images/c1.webp')}
              alt={row.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }
              }}
            />
            <div className="hidden absolute inset-0 items-center justify-center bg-slate-100 text-slate-400">
              <Building2 className="w-6 h-6 text-[#0A4A8F]/40" />
            </div>
          </div>
          <div>
            <div className="font-semibold text-slate-800 line-clamp-1">
              {row.title}
            </div>
            <div className="text-[11px] text-[#0A4A8F] font-mono font-bold">
              {row.code} • {row.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Description',
      accessor: 'description',
      render: (row) => (
        <div className="text-xs text-slate-600 line-clamp-2 max-w-xs sm:max-w-sm lg:max-w-md" title={row.description}>
          {row.description ? (
            row.description
          ) : (
            <span className="text-slate-400 italic">No description provided</span>
          )}
        </div>
      ),
    },
    {
      header: 'Academic Programs',
      accessor: 'programsJson',
      render: (row) => {
        let programs = [];
        try {
          programs = typeof row.programsJson === 'string' ? JSON.parse(row.programsJson || '[]') : (row.programsJson || []);
        } catch {
          programs = [];
        }
        if (!Array.isArray(programs) || programs.length === 0) {
          return <span className="text-slate-400 text-xs italic">No programs listed</span>;
        }
        return (
          <div className="flex flex-wrap gap-1 max-w-xs">
            {programs.slice(0, 2).map((p, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[11px] font-medium bg-blue-50 text-[#0A4A8F] px-2 py-0.5 rounded-md border border-blue-100"
                title={p}
              >
                {p}
              </span>
            ))}
            {programs.length > 2 && (
              <span
                className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200"
                title={programs.slice(2).join(', ')}
              >
                +{programs.length - 2} more
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: 'Departments',
      accessor: 'departmentCountLabel',
      width: '150px',
      render: (row) => (
        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          {row.departmentCountLabel || 'Departments'}
        </span>
      ),
    },
    {
      header: 'Sort Order',
      accessor: 'sortOrder',
      width: '90px',
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
              setInstituteToDelete(row);
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
        title="Institutes & Academic Departments"
        subtitle="Manage university institutes, faculty hubs, programs, and departmental mappings."
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
        addNewLabel="Add Institute"
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
        title={selectedInstitute ? 'Edit Institute' : 'Add New Institute'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institute Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Institute of Technology"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Code / Acronym *
              </label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. IoT"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Slug (URL Key) *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. institute-of-technology"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department Count Label
              </label>
              <input
                type="text"
                value={formData.departmentCountLabel}
                onChange={(e) => setFormData({ ...formData, departmentCountLabel: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 5 DEPARTMENTS"
              />
            </div>
          </div>

          <ImageUpload
            value={formData.image}
            onChange={(newUrl) => setFormData({ ...formData, image: newUrl })}
            module="institute-department"
            label="Institute / Department Banner Image"
            fallbackIcon={Building2}
            helperText="Upload official department banner or building photo (JPG, PNG, WEBP)"
          />

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Description / Overview
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {formData.description ? formData.description.length : 0} chars
              </span>
            </div>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F] leading-relaxed"
              placeholder="Overview of the institute, key research areas, laboratory facilities, and departments..."
            />
          </div>

          {/* Academic Programs Section */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0A4A8F]/10 flex items-center justify-center text-[#0A4A8F]">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Academic Programs
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Loaded from database ({getParsedPrograms().length} {getParsedPrograms().length === 1 ? 'Program' : 'Programs'})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRawJsonMode(!isRawJsonMode)}
                className="text-[11px] font-medium text-slate-500 hover:text-[#0A4A8F] flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-200/60"
                title="Toggle between Interactive Visual Chips and Raw JSON mode"
              >
                {isRawJsonMode ? <List className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                {isRawJsonMode ? 'Visual Mode' : 'JSON Mode'}
              </button>
            </div>

            {isRawJsonMode ? (
              <div>
                <input
                  type="text"
                  value={formData.programsJson}
                  onChange={(e) => setFormData({ ...formData, programsJson: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                  placeholder='["Civil Engineering", "CSE", "ECE"]'
                />
                <p className="text-[11px] text-slate-400 mt-1">Must be a valid JSON array of strings.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* List of current programs as chips */}
                <div className="flex flex-wrap gap-2 min-h-[42px] p-2.5 bg-white rounded-xl border border-slate-200/80 items-center">
                  {getParsedPrograms().length > 0 ? (
                    getParsedPrograms().map((prog, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50/80 text-[#0A4A8F] border border-blue-200/60 shadow-2xs group transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0A4A8F]/60" />
                        <span>{prog}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveProgram(idx)}
                          className="text-blue-400 hover:text-red-600 hover:bg-red-50 p-0.5 rounded transition-colors"
                          title="Remove program"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic px-1">
                      No academic programs added yet. Add one below.
                    </span>
                  )}
                </div>

                {/* Add new program input */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newProgramInput}
                      onChange={(e) => setNewProgramInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddProgram();
                        }
                      }}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F] bg-white"
                      placeholder="Type academic program name (e.g. Mechanical Engineering) and press Enter..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddProgram}
                    disabled={!newProgramInput.trim()}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0A4A8F] hover:bg-[#0C2F44] disabled:opacity-40 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Program
                  </button>
                </div>
              </div>
            )}
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
              Save Institute
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Institute"
        message={`Are you sure you want to delete "${instituteToDelete?.title}"?`}
        loading={actionLoading}
      />
    </div>
  );
}
