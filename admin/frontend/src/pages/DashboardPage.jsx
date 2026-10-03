import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDashboardStats } from '../store/slices/dashboardSlice';
import {
  Lightbulb,
  FileText,
  BookOpen,
  Users,
  Building2,
  Award,
  GraduationCap,
  Files,
  ArrowRight,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const statCards = [
    {
      title: 'Patents & Designs',
      count: stats?.totalPatents ?? '...',
      active: stats?.totalActivePatents ?? '...',
      icon: Lightbulb,
      link: '/patents',
      color: 'from-amber-500/20 to-amber-500/05 text-amber-600 border-amber-200/80',
      iconBg: 'bg-amber-500 text-white',
    },
    {
      title: 'Indexed Publications',
      count: stats?.totalResearchPapers ?? '...',
      active: stats?.totalActiveResearchPapers ?? '...',
      icon: FileText,
      link: '/research-papers',
      color: 'from-blue-500/20 to-blue-500/05 text-blue-600 border-blue-200/80',
      iconBg: 'bg-[#0A4A8F] text-white',
    },
    {
      title: 'Books & Chapters',
      count: stats?.totalBooks ?? '...',
      active: stats?.totalActiveBooks ?? '...',
      icon: BookOpen,
      link: '/books',
      color: 'from-emerald-500/20 to-emerald-500/05 text-emerald-600 border-emerald-200/80',
      iconBg: 'bg-emerald-600 text-white',
    },
    {
      title: 'Active Researchers',
      count: stats?.totalResearchers ?? '...',
      subtitle: 'Authors & Inventors',
      icon: Users,
      link: '/research-papers',
      color: 'from-purple-500/20 to-purple-500/05 text-purple-600 border-purple-200/80',
      iconBg: 'bg-purple-600 text-white',
    },
  ];

  const academicCards = [
    {
      title: 'Institutes & Departments',
      count: stats?.totalInstitutes ?? '...',
      description: '10 Institutes & 29+ Academic Departments',
      icon: Building2,
      link: '/institutes',
    },
    {
      title: 'Ph.D Vacant Seat Matrix',
      count: stats?.totalVacantSeats ?? '...',
      description: 'Supervisors & Seat Limits Matrix',
      icon: Users,
      link: '/vacant-seats',
    },
    {
      title: 'Theses Awarded',
      count: stats?.totalThesesAwarded ?? '...',
      description: 'Ph.D Degrees Awarded Session-wise',
      icon: Award,
      link: '/theses-awarded',
    },
    {
      title: 'Supervisor Yearwise',
      count: stats?.totalPhdSupervisors ?? '...',
      description: 'Departmental PhD Yearwise Records',
      icon: GraduationCap,
      link: '/phd-supervisors',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C2F44] via-[#0A4A8F] to-[#125B9A] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold text-[#FFB703] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Research & Consultancy Cell</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight mb-2">
            SRMU Research CMS Dashboard
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Manage real-time publications, patents, book chapters, faculty supervisors, vacancy seat matrix, and downloadable official R&C documents.
          </p>
        </div>
      </div>

      {/* Primary Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="group p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-[#0A4A8F]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    {card.title}
                  </span>
                  <div className="text-3xl font-bold text-[#0C2F44] font-serif">
                    {card.count}
                  </div>
                </div>
                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {card.active !== undefined ? (
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {card.active} Active Records
                  </span>
                ) : (
                  <span className="text-slate-500 font-medium">{card.subtitle}</span>
                )}
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0A4A8F] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Academic Entities Summary Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-serif text-[#0C2F44] flex items-center gap-2">
            <span className="w-2 h-4 bg-[#FFB703] rounded-full" />
            Academic & Ph.D Repositories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {academicCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.link}
                className="group p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0A4A8F]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-[#0A4A8F] group-hover:bg-[#0A4A8F] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold font-serif text-slate-800">
                      {card.count}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#0C2F44] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Records Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Patents */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h3 className="font-serif font-bold text-sm text-[#0C2F44]">
                Recent Patents & Designs
              </h3>
            </div>
            <Link to="/patents" className="text-xs font-semibold text-[#0A4A8F] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {stats?.recentPatents && stats.recentPatents.length > 0 ? (
              stats.recentPatents.map((p) => (
                <div key={p.id} className="py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {p.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {p.patenterName} • {p.yearOfAward || p.year}
                    </p>
                  </div>
                  <Badge variant={p.status}>{p.status}</Badge>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No patents found</p>
            )}
          </div>
        </div>

        {/* Recent Publications */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0A4A8F]" />
              <h3 className="font-serif font-bold text-sm text-[#0C2F44]">
                Recent Indexed Publications
              </h3>
            </div>
            <Link to="/research-papers" className="text-xs font-semibold text-[#0A4A8F] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {stats?.recentPapers && stats.recentPapers.length > 0 ? (
              stats.recentPapers.map((r) => (
                <div key={r.id} className="py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {r.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {r.authorName} • {r.department} • {r.yearOfPublication}
                    </p>
                  </div>
                  <Badge variant={r.status}>{r.status}</Badge>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No papers found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
