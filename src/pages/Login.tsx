import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Zap, TrendingUp, BarChart3, Globe } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { useNotify } from '../components/ui/Toast';
import { useLanguage } from '../components/ui/LanguageSwitcher';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keepLogged, setKeepLogged] = useState(false);
  const { login } = useUserStore();
  const navigate = useNavigate();
  const notify = useNotify();
  const { t, language, toggleLanguage } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { notify.warning(t.fillFields, t.fillFields); return; }
    setLoading(true);
    await login(email, password);
    setLoading(false);
    notify.success(t.welcome, t.loginSuccess);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Preview Side */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-md space-y-6">
          {/* Preview card 1 - Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-900">Bot Profit, USDT</span>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500 mb-1">Avg. daily profit</p>
            <p className="text-emerald-500 text-sm font-semibold">+12.4%</p>
            <div className="mt-3 h-16 flex items-end gap-1">
              {[40, 25, 35, 55, 30, 45, 60, 35, 50, 70, 55, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-500/20 rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Preview cards row */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white rounded-xl shadow-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span className="text-xs text-slate-500">PNL</span>
              </div>
              <p className="text-xl font-bold text-slate-900 font-mono">$5,647</p>
              <p className="text-xs text-emerald-500 mt-1">↗ +10% from last week</p>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow-lg border border-slate-200 p-4">
              <p className="text-xs text-slate-500 mb-1">Reward Rate</p>
              <p className="text-xl font-bold text-slate-900 font-mono">37.42%</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-500">-7.67%</span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center pt-4">
            <h2 className="text-2xl font-bold text-slate-900">{t.leftTitle}</h2>
            <p className="text-slate-600 mt-2 text-sm">{t.leftSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white relative">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="absolute top-6 right-6 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span>{language === 'fr' ? 'FR' : 'EN'}</span>
        </button>

        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 text-center">{t.loginTitle}</h1>
          <p className="text-slate-500 text-center mt-1 text-sm">{t.loginSubtitle}</p>

          {/* Social buttons */}
          <div className="grid grid-cols-4 gap-2 mt-6">
            {['G', 'f', 'in', '𝕏'].map((icon) => (
              <button key={icon} className="flex items-center justify-center w-full h-11 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors text-sm font-medium">
                <span className="text-lg">{icon}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">{language === 'fr' ? 'OU' : 'OR'}</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-900">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-900">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-10 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepLogged}
                  onChange={e => setKeepLogged(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
                />
                <span className="text-xs text-slate-500">{t.keepMeLoggedIn}</span>
              </label>
              <a href="#" className="text-xs text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                {t.forgotPassword}
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? t.signingIn : t.signIn}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            {t.noAccount}{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              {t.signUp}
            </Link>
          </p>

          <p className="text-center text-xs text-slate-400 mt-8">© 2026 Samy</p>
        </div>
      </div>
    </div>
  );
}
