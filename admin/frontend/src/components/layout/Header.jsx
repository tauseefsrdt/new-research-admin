import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, LogOut, User, Search, Bell, Sparkles } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { showInfoToast } from '../../utils/toast';

export default function Header({ onMenuToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    showInfoToast('You have been logged out.');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
      {/* Mobile Toggle & Search placeholder */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A4A8F]/08 border border-[#0A4A8F]/15">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
          <span className="text-xs font-mono font-semibold text-[#0A4A8F]">
            Research & Consultancy Admin Control Center
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0A4A8F] to-[#0C2F44] text-white flex items-center justify-center font-bold text-sm shadow-sm border border-white">
              {user?.fullName ? user.fullName.charAt(0) : 'A'}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">
                {user?.fullName || 'Administrator'}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {user?.username || 'admin'}
              </div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-fadeIn">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-800">
                    {user?.fullName || 'Administrator'}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono truncate">
                    {user?.email || 'admin@srmu.ac.in'}
                  </p>
                </div>

                <div className="p-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
