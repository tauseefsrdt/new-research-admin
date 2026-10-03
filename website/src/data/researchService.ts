import { patents, researchPapers, books } from './data';
import { Stats, FeaturedRecords, Department, Patent, ResearchPaper, Book, SearchResults } from '../types';

// Helper to extract year from various date/year formats
const matchesYear = (itemYear: any, targetYear: string | number): boolean => {
  if (!targetYear || targetYear === 'All' || targetYear === '') return true;
  if (!itemYear) return false;
  return String(itemYear).includes(String(targetYear).trim());
};

// Compute overall statistics
export const getStats = (): Stats => {
  const paperAuthors = researchPapers.map((p) => p.authorName).filter(Boolean);
  const patentInventors = patents.map((p) => p.patenterName).filter(Boolean);

  const researchers = new Set(
    [...paperAuthors, ...patentInventors]
      .filter(Boolean)
      .flatMap((names) => String(names).split(',').map((name) => name.trim()))
      .filter(Boolean)
  );

  return {
    totalIndexed: researchPapers.length,
    totalPapers: patents.length,
    totalBooks: books.length,
    totalResearchers: researchers.size,
  };
};

// Get featured records (top 3 of each)
export const getFeatured = (): FeaturedRecords => {
  return {
    papers: patents.slice(0, 3).map((p: any) => ({
      ...p,
      id: p._id || p.srNo,
      authors: p.patenterName,
      year: p.yearOfAward,
      abstract: p.patentNumber,
    })),
    indexed: researchPapers.slice(0, 3).map((p: any) => ({
      ...p,
      id: p._id || p.srNo,
      authors: p.authorName,
      departmentKey: p.department,
      journal: p.journalName,
      year: p.yearOfPublication,
      abstract: p.issnNumber,
      doi: p.ugcRecognitionLink,
    })),
    books: books.slice(0, 3).map((b: any) => ({
      ...b,
      id: b._id || b.slNo,
      title: b.paperTitle || b.bookOrChapterTitle || 'Untitled book or chapter',
      authors: b.teacherName,
      year: b.yearOfPublication,
      publisher: b.publisherName,
      abstract: b.bookOrChapterTitle,
      isbn: b.isbnIssn,
    })),
  };
};

// Compute distinct departments with counts from data
export const getDepartments = (): Department[] => {
  const deptCounts: Record<string, number> = {};
  researchPapers.forEach((paper: any) => {
    const dept = (paper.department || '').trim();
    if (dept) {
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    }
  });

  return Object.entries(deptCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({
      key,
      name: key,
      count,
    }));
};

// Get and filter patents
export const getPatents = ({ search = '', department = 'All', year = '' }: { search?: string; department?: string; year?: string | number } = {}): { patents: Patent[]; count: number } => {
  const filtered = patents.filter((item: any) => {
    // Search match
    if (search && search.trim()) {
      const term = search.trim().toLowerCase();
      const match =
        (item.title && item.title.toLowerCase().includes(term)) ||
        (item.patenterName && item.patenterName.toLowerCase().includes(term)) ||
        (item.patentNumber && item.patentNumber.toLowerCase().includes(term)) ||
        (item.yearOfAward && String(item.yearOfAward).toLowerCase().includes(term));
      if (!match) return false;
    }

    // Department match
    if (department && department !== 'All') {
      const deptTerm = department.toLowerCase();
      const matchDept =
        (item.patenterName && item.patenterName.toLowerCase().includes(deptTerm)) ||
        (item.title && item.title.toLowerCase().includes(deptTerm)) ||
        (item.patentNumber && item.patentNumber.toLowerCase().includes(deptTerm));
      if (!matchDept) return false;
    }

    // Year match
    if (year && !matchesYear(item.yearOfAward, year)) {
      return false;
    }

    return true;
  });

  const formatted: Patent[] = filtered.map((patent: any) => ({
    ...patent,
    id: patent._id || patent.srNo,
    authors: patent.patenterName,
    year: patent.yearOfAward,
    abstract: patent.patentNumber,
  }));

  return {
    patents: formatted,
    count: formatted.length,
  };
};

// Get and filter research papers
export const getResearchPapers = ({ search = '', department = 'All', year = '' }: { search?: string; department?: string; year?: string | number } = {}): { papers: ResearchPaper[]; count: number } => {
  const filtered = researchPapers.filter((item: any) => {
    // Search match
    if (search && search.trim()) {
      const term = search.trim().toLowerCase();
      const match =
        (item.title && item.title.toLowerCase().includes(term)) ||
        (item.authorName && item.authorName.toLowerCase().includes(term)) ||
        (item.journalName && item.journalName.toLowerCase().includes(term)) ||
        (item.department && item.department.toLowerCase().includes(term)) ||
        (item.issnNumber && String(item.issnNumber).toLowerCase().includes(term)) ||
        (item.ugcRecognitionLink && item.ugcRecognitionLink.toLowerCase().includes(term));
      if (!match) return false;
    }

    // Department match
    if (department && department !== 'All') {
      if ((item.department || '').trim() !== department.trim()) {
        return false;
      }
    }

    // Year match
    if (year && !matchesYear(item.yearOfPublication, year)) {
      return false;
    }

    return true;
  });

  const formatted: ResearchPaper[] = filtered.map((paper: any) => ({
    ...paper,
    id: paper._id || paper.srNo,
    authors: paper.authorName,
    departmentKey: paper.department,
    journal: paper.journalName,
    year: paper.yearOfPublication,
    abstract: paper.issnNumber,
    doi: paper.ugcRecognitionLink,
  }));

  return {
    papers: formatted,
    count: formatted.length,
  };
};

// Get and filter books
export const getBooks = ({ search = '', year = '' }: { search?: string; year?: string | number } = {}): { books: Book[]; count: number } => {
  const filtered = books.filter((item: any) => {
    // Search match
    if (search && search.trim()) {
      const term = search.trim().toLowerCase();
      const match =
        (item.paperTitle && item.paperTitle.toLowerCase().includes(term)) ||
        (item.bookOrChapterTitle && item.bookOrChapterTitle.toLowerCase().includes(term)) ||
        (item.teacherName && item.teacherName.toLowerCase().includes(term)) ||
        (item.publisherName && item.publisherName.toLowerCase().includes(term)) ||
        (item.isbnIssn && String(item.isbnIssn).toLowerCase().includes(term));
      if (!match) return false;
    }

    // Year match
    if (year && !matchesYear(item.yearOfPublication, year)) {
      return false;
    }

    return true;
  });

  const formatted: Book[] = filtered.map((book: any) => ({
    ...book,
    id: book._id || book.slNo,
    title: book.paperTitle || book.bookOrChapterTitle || 'Untitled book or chapter',
    authors: book.teacherName,
    year: book.yearOfPublication,
    publisher: book.publisherName,
    abstract: book.bookOrChapterTitle,
    isbn: book.isbnIssn,
  }));

  return {
    books: formatted,
    count: formatted.length,
  };
};

// Universal search across all research categories
export const searchResearch = (query: string): SearchResults => {
  if (!query || !query.trim()) {
    return { papers: [], indexed: [], books: [], total: 0 };
  }

  const { patents: matchedPatents } = getPatents({ search: query });
  const { papers: matchedResearch } = getResearchPapers({ search: query });
  const { books: matchedBooks } = getBooks({ search: query });

  const total = matchedPatents.length + matchedResearch.length + matchedBooks.length;

  return {
    papers: matchedPatents.slice(0, 10),
    indexed: matchedResearch.slice(0, 10),
    books: matchedBooks.slice(0, 10),
    total,
  };
};
