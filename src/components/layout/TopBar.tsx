import { Link } from 'react-router-dom';
import { Search, Bell, ChevronDown, Zap, Plus, Building2, Menu } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { useLanguage } from '../ui/LanguageSwitcher';

const tickerItems = [
  { pair: 'EUR/USD', price: '1.0845', change: '+0.12%', positive: true },
  { pair: 'GOLD', price: '2,055.30', change: '+0.45%', positive: true },
  { pair: 'GBP/JPY', price: '188.50', change: '-0.32%', positive: false },
  { pair: 'NAS100', price: '17,960', change: '+0.61%', positive: true },
];

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useUserStore();
  const { language } = useLanguage();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Market Ticker */}
        <div className="flex items-center gap-5 overflow-hidden mask-linear-fade">
          <div className="flex animate-ticker gap-5">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div key={`${item.pair}-${i}`} className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-xs font-semibold text-slate-700">{item.pair}</span>
                <span className={`text-xs font-mono ${item.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                  {item.price}
                </span>
                <span className={`text-[10px] px-1 py-0.5 rounded ${
                  item.positive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'
                }`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={language === 'fr' ? 'Rechercher...' : 'Search...'}
            className="w-52 h-9 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Signals count */}
        <Link to="/signals" className="h-9 px-3 rounded-lg bg-indigo-50 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors hidden sm:flex">
          <Zap className="w-3.5 h-3.5" />
          <span>5 {language === 'fr' ? 'signaux' : 'signals'}</span>
        </Link>

        {/* Special Broker Button - Mobile variant (icon only) and Desktop variant */}
        <Link 
          to="/broker" 
          className="h-9 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center gap-2 text-sm font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-md shadow-amber-500/20"
        >
          <Building2 className="w-4 h-4" />
          <span className="hidden sm:inline">{language === 'fr' ? 'Mon Broker' : 'My Broker'}</span>
        </Link>

        {/* User - Avatar only */}
        {user && (
          <div className="flex items-center gap-2">
            <img src={user.avatar} alt="" className="w-8 h-8 rounded-full border border-slate-200" />
          </div>
        )}
      </div>
    </header>
  );
}
