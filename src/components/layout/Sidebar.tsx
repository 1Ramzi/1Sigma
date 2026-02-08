import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Zap, Building2, Globe, LogOut, GraduationCap, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useUserStore } from '../../stores/userStore';
import { useLanguage } from '../ui/LanguageSwitcher';

const menuItems = [
  { to: '/dashboard', label: 'Dashboard', labelFr: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/signals', label: 'Signals Live', labelFr: 'Signaux Live', icon: Zap },
  { to: '/academy', label: 'Academy', labelFr: 'Académie', icon: GraduationCap },
];

export function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const { user, logout } = useUserStore();
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();

  return (
    <aside className={cn(
      "fixed left-0 top-0 bottom-0 w-[220px] bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-300",
      mobile ? "translate-x-0" : "hidden lg:flex"
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-slate-200">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-lg text-slate-900">Samy</span>
        {mobile && (
          <button onClick={onClose} className="ml-auto lg:hidden">
            <ArrowRight className="w-5 h-5 text-slate-400 rotate-180" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map(item => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all',
                active 
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span>{language === 'fr' ? item.labelFr : item.label}</span>
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-slate-100 px-2">
           <Link
            to="/broker"
            onClick={onClose}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all group"
          >
            <Building2 className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-center text-sm leading-tight">
              {language === 'fr' ? 'Rejoindre notre Partenaire' : 'Join our Partner'}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-medium bg-white/20 px-2 py-1 rounded-full mt-1">
              <span>PuPrime</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200 space-y-2 bg-white">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Globe className="w-[18px] h-[18px]" />
          <span>{language === 'fr' ? 'Français' : 'English'}</span>
          <span className="ml-auto text-xs text-slate-400">{language.toUpperCase()}</span>
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>{language === 'fr' ? 'Déconnexion' : 'Logout'}</span>
        </button>

        {/* User */}
        {user && (
          <div className="flex items-center gap-3 pt-2 mt-2 border-t border-slate-100">
            <img src={user.avatar} alt="" className="w-9 h-9 rounded-full border border-slate-200" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.username}</p>
              <p className="text-[11px] text-slate-500 truncate">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
