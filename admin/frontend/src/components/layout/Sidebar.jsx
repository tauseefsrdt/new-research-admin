import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Lightbulb,
  FileText,
  BookOpen,
  Building2,
  Users,
  Award,
  GraduationCap,
  Files,
  UserCheck,
  Crown,
  Image,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { section: 'Overview' },
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  
  { section: 'Research & Scholarly' },
  { path: '/patents', label: 'Patents & Designs', icon: Lightbulb },
  { path: '/research-papers', label: 'Indexed Publications', icon: FileText },
  { path: '/books', label: 'Books & Chapters', icon: BookOpen },
  
  { section: 'Academic & Faculties' },
  { path: '/institutes', label: 'Institutes & Depts', icon: Building2 },
  { path: '/vacant-seats', label: 'Ph.D Vacant Seats', icon: Users },
  { path: '/theses-awarded', label: 'Theses Awarded', icon: Award },
  { path: '/phd-supervisors', label: 'Supervisor Yearwise', icon: GraduationCap },

  { section: 'Documents & Media' },
  { path: '/rc-documents', label: 'R&C Formats', icon: Files },
  { path: '/leaderships', label: 'R&C Leadership', icon: UserCheck },
  { path: '/patrons', label: 'University Patrons', icon: Crown },
  { path: '/gallery', label: 'Research Gallery', icon: Image },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0C2F44] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 flex items-center gap-3 px-6 border-b border-white/10 bg-[#0A2637]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0A4A8F] to-[#1A5FA8] flex items-center justify-center shadow-md p-1 border border-white/20">
            <GraduationCap className="w-6 h-6 text-[#FFB703]" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#FFB703] uppercase block">
              SRMU Admin
            </span>
            <span className="text-sm font-bold tracking-tight text-white block">
              Research Portal
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 custom-scrollbar">
          {menuItems.map((item, idx) => {
            if (item.section) {
              return (
                <div
                  key={idx}
                  className="pt-4 pb-1.5 px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400"
                >
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-[#0A4A8F] text-white shadow-md font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            );
          })}
        </div>

        {/* Footer info & website link */}
        <div className="p-4 border-t border-white/10 bg-[#0A2637]/60">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors border border-white/10"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>Visit Live Website</span>
          </a>
        </div>
      </aside>
    </>
  );
}
