import React, { useState, useEffect, useRef } from 'react';
import { Bookmark, Search, RefreshCw, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import ResearchCard from '../components/ResearchCard';
import { getResearchPapers, getDepartments } from '../data/researchService';
import { ResearchPaper, Department } from '../types';

function IndexedPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('');
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    try {
      setDepartments(getDepartments());
    } catch (err) {
      console.error('Error getting departments:', err);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      const data = getResearchPapers({ search, department: selectedDept, year: selectedYear });
      setPapers(data.papers || []);
      setCount(data.count || 0);
    } catch (err) {
      console.error('Error fetching indexed journals:', err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedDept, selectedYear]);

  // Page entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.archive-hero-reveal',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }
      );
      gsap.fromTo(
        '.archive-filter-reveal',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power2.out', clearProps: 'all' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const resetFilters = () => {
    setSearch('');
    setSelectedDept('All');
    setSelectedYear('');
  };

  const hasFilters = search || selectedDept !== 'All' || selectedYear;

  return (
    <div ref={pageRef} className="archive-page home-width py-8 sm:py-12">
      
      {/* Header */}
      <div className="page-hero-copy mb-8">
        <div className="archive-hero-reveal eyebrow">
          <span className="eyebrow-dot rose" />
          <Bookmark className="w-4 h-4" />
          <span>Scopus / Web of Science</span>
        </div>
        <h1 className="archive-hero-reveal text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#1F2937] tracking-tight mt-2 mb-3">
          Indexed <em> <br/>Journal Publications.</em>  
        </h1>
        <p className="archive-hero-reveal text-base sm:text-lg text-[#6B7280] max-w-2xl">
          High-impact papers indexed in WoS and SCOPUS 
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="archive-filter-reveal filter-bar indexed-filter-bar mb-6 p-4 rounded-2xl bg-white/80 border border-[#0A4A8F]/15 shadow-md backdrop-blur-md">
        
        {/* Search Field */}
        <div className="filter-search flex-1">
          <Search className="text-[#0A4A8F]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search indexed paper title, author, journal..."
            className="archive-input"
          />
        </div>

        {/* Department Filter */}
        <div className="filter-select department-select">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="archive-input"
          >
            <option value="All">All Faculties</option>
            {departments.map((dept) => (
              <option key={dept.key} value={dept.key}>
                {dept.name} ({dept.count})
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="filter-select">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="archive-input"
          >
            <option value="">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Reset */}
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="btn-ghost reset-button"
            title="Reset filters"
          >
            <RefreshCw className="w-4 h-4" style={{ color: 'var(--color-deep-teal)' }} />
            <span>Reset</span>
          </button>
        )}

      </div>

      <ResearchCard papers={papers} count={count} loading={loading} />

    </div>
  );
}

export default IndexedPage;
