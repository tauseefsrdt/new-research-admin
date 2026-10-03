import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
} from '../store/slices/bookSlice';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Edit2, Trash2, BookOpen } from 'lucide-react';

export default function BooksPage() {
  const dispatch = useDispatch();
  const {
    items,
    totalElements,
    pageNumber,
    pageSize,
    totalPages,
    loading,
    actionLoading,
  } = useSelector((state) => state.books);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    bookOrChapterTitle: '',
    paperTitle: '',
    teacherName: '',
    publisherName: '',
    yearOfPublication: '',
    isbnIssn: '',
    affiliatingInstitute: '',
    scope: 'International',
    status: 'ACTIVE',
  });

  const loadData = (page = 0) => {
    dispatch(
      fetchBooks({
        search,
        status: statusFilter,
        page,
        size: pageSize,
        sortBy: 'slNo',
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
    setSelectedBook(null);
    setFormData({
      title: '',
      bookOrChapterTitle: '',
      paperTitle: '',
      teacherName: '',
      publisherName: '',
      yearOfPublication: new Date().getFullYear().toString(),
      isbnIssn: '',
      affiliatingInstitute: 'SRMU, Barabanki',
      scope: 'International',
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title || '',
      bookOrChapterTitle: book.bookOrChapterTitle || '',
      paperTitle: book.paperTitle || '',
      teacherName: book.teacherName || book.authors || '',
      publisherName: book.publisherName || book.publisher || '',
      yearOfPublication: book.yearOfPublication || book.year || '',
      isbnIssn: book.isbnIssn || book.isbn || '',
      affiliatingInstitute: book.affiliatingInstitute || '',
      scope: book.scope || 'International',
      status: book.status || 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedBook) {
      await dispatch(updateBook({ id: selectedBook.id, data: formData }));
      setIsModalOpen(false);
      loadData(pageNumber);
    } else {
      await dispatch(createBook(formData));
      setIsModalOpen(false);
      loadData(0);
    }
  };

  const handleDelete = async () => {
    if (bookToDelete) {
      await dispatch(deleteBook(bookToDelete.id));
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };

  const columns = [
    {
      header: 'Book / Chapter Title',
      accessor: 'bookOrChapterTitle',
      render: (row) => (
        <div className="max-w-md">
          <div className="font-semibold text-slate-800 line-clamp-2 leading-snug">
            {row.paperTitle || row.title || row.bookOrChapterTitle}
          </div>
          {row.bookOrChapterTitle && (
            <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
              {row.bookOrChapterTitle}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Authors / Faculty',
      accessor: 'teacherName',
      render: (row) => (
        <div className="text-xs text-slate-700 font-medium max-w-[180px] truncate">
          {row.teacherName || row.authors || '—'}
        </div>
      ),
    },
    {
      header: 'Publisher',
      accessor: 'publisherName',
      render: (row) => (
        <div className="text-xs text-slate-600 max-w-[180px] truncate">
          {row.publisherName || row.publisher || '—'}
        </div>
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
      header: 'ISBN / ISSN',
      accessor: 'isbnIssn',
      width: '130px',
      render: (row) => (
        <span className="font-mono text-xs text-slate-500 truncate block">
          {row.isbnIssn || row.isbn || '—'}
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
              setBookToDelete(row);
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
        title="Books & Authored Book Chapters"
        subtitle="Manage academic monographs, authored books, edited volumes, and conference proceedings."
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
        addNewLabel="Add Book / Chapter"
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
        title={selectedBook ? 'Edit Book / Chapter' : 'Add New Book / Chapter'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Chapter / Paper Title
            </label>
            <textarea
              rows={2}
              value={formData.paperTitle}
              onChange={(e) => setFormData({ ...formData, paperTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="e.g. Nano-Engineered Surface Coatings for Corrosion Resistance..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Book / Proceeding Title *
            </label>
            <textarea
              required
              rows={2}
              value={formData.bookOrChapterTitle}
              onChange={(e) => setFormData({ ...formData, bookOrChapterTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
              placeholder="e.g. Advancements in Nanomaterials for Sustainable Aviation"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Faculty / Teacher Name(s) *
              </label>
              <input
                type="text"
                required
                value={formData.teacherName}
                onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Dr. Alkesh Agrawal"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Publisher Name
              </label>
              <input
                type="text"
                value={formData.publisherName}
                onChange={(e) => setFormData({ ...formData, publisherName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. Springer Nature, IGI Global"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ISBN / ISSN
              </label>
              <input
                type="text"
                value={formData.isbnIssn}
                onChange={(e) => setFormData({ ...formData, isbnIssn: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F]"
                placeholder="e.g. 978-8131614570"
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
              Save Book
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Book Record"
        message={`Are you sure you want to delete "${bookToDelete?.paperTitle || bookToDelete?.bookOrChapterTitle}"?`}
        loading={actionLoading}
      />
    </div>
  );
}
