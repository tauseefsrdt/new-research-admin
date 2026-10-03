import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../store/slices/gallerySlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Edit2, Trash2, Image, ImageOff } from 'lucide-react';
import { formatImageUrl } from '../utils/imageUtils';
import { showSuccessToast, showErrorToast } from '../utils/toast';

export default function GalleryImagesPage() {
  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.gallery);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null);

  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    caption: '',
    category: 'Research',
    sortOrder: 1,
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchGallery({
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
    setSelectedImage(null);
    setFormData({
      src: '/Images/research/8.webp',
      alt: 'Research laboratory facility',
      caption: 'Advanced Research Laboratory',
      category: 'Research',
      sortOrder: totalElements + 1,
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (img) => {
    setSelectedImage(img);
    setFormData({
      src: img.src || '',
      alt: img.alt || '',
      caption: img.caption || '',
      category: img.category || 'Research',
      sortOrder: img.sortOrder || 0,
      status: img.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (selectedImage) {
        await dispatch(updateGalleryImage({ id: selectedImage.id, data: formData })).unwrap();
        showSuccessToast('Gallery image updated successfully');
      } else {
        await dispatch(createGalleryImage(formData)).unwrap();
        showSuccessToast('Gallery image added successfully');
      }
      setIsModalOpen(false);
      loadData(pageNumber);
    } catch (err) {
      showErrorToast(err, { defaultMessage: selectedImage ? 'Failed to update gallery image' : 'Failed to add gallery image' });
    }
  };

  const handleDelete = async () => {
    if (imageToDelete) {
      try {
        await dispatch(deleteGalleryImage(imageToDelete.id)).unwrap();
        showSuccessToast('Gallery image deleted successfully');
        setIsDeleteModalOpen(false);
        setImageToDelete(null);
      } catch (err) {
        showErrorToast(err, { defaultMessage: 'Failed to delete gallery image' });
      }
    }
  };

  const columns = [
    {
      header: 'Image Preview',
      accessor: 'src',
      width: '120px',
      render: (row) => (
        <div className="w-20 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-xs flex items-center justify-center relative">
          <img
            src={formatImageUrl(row.src)}
            alt={row.alt || row.caption}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.nextElementSibling) {
                e.currentTarget.nextElementSibling.style.display = 'flex';
              }
            }}
          />
          <div className="hidden absolute inset-0 items-center justify-center bg-slate-100 text-slate-400">
            <ImageOff className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      ),
    },
    {
      header: 'Caption & Alt Text',
      accessor: 'caption',
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-800 text-xs">
            {row.caption || 'Research Image'}
          </div>
          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
            {row.alt || row.src}
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      width: '130px',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-[#0A4A8F] border border-slate-200">
          {row.category}
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
              setImageToDelete(row);
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
        title="Research & Labs Gallery"
        subtitle="Manage photo gallery assets displayed across About and Research highlight sections."
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
        addNewLabel="Add Image"
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Image Source URL / Path *
            </label>
            <input
              type="text"
              required
              value={formData.src}
              onChange={(e) => setFormData({ ...formData, src: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="/Images/research/8.webp"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Caption Title
              </label>
              <input
                type="text"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="Instrumentation & EV Lab"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alt Description
              </label>
              <input
                type="text"
                value={formData.alt}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="Research and consultancy activities"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              />
            </div>

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
              Save Image
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Gallery Image"
        message={`Are you sure you want to delete this gallery image?`}
        loading={actionLoading}
      />
    </div>
  );
}
