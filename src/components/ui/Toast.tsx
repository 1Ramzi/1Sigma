import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';
interface Toast { id: string; type: ToastType; title: string; message?: string; }

const icons = { success: CheckCircle, error: AlertCircle, warning: AlertTriangle, info: Info };
const styles = {
  success: 'border-accent-green/20 bg-emerald-50',
  error: 'border-accent-red/20 bg-red-50',
  warning: 'border-accent-orange/20 bg-amber-50',
  info: 'border-accent/20 bg-indigo-50',
};
const iconCls = { success: 'text-accent-green', error: 'text-accent-red', warning: 'text-accent-orange', info: 'text-accent' };

interface Ctx { success: (t: string, m?: string) => void; error: (t: string, m?: string) => void; warning: (t: string, m?: string) => void; info: (t: string, m?: string) => void; }
const ToastCtx = createContext<Ctx | null>(null);
export function useNotify(): Ctx { const c = useContext(ToastCtx); if (!c) throw new Error('wrap in ToastProvider'); return c; }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const rm = useCallback((id: string) => setToasts(t => t.filter(x => x.id !== id)), []);
  const add = useCallback((type: ToastType, title: string, message?: string) => {
    const id = `t-${Date.now()}`;
    setToasts(t => [...t, { id, type, title, message }]);
    setTimeout(() => rm(id), 4000);
  }, [rm]);
  const ctx: Ctx = { success: (t, m) => add('success', t, m), error: (t, m) => add('error', t, m), warning: (t, m) => add('warning', t, m), info: (t, m) => add('info', t, m) };

  return (
    <ToastCtx.Provider value={ctx}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] space-y-2 w-80">
        <AnimatePresence>
          {toasts.map(toast => {
            const Icon = icons[toast.type];
            return (
              <motion.div key={toast.id} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }}
                className={`flex items-start gap-3 p-4 rounded-[var(--radius-md)] border bg-bg-card shadow-[var(--shadow-lg)] ${styles[toast.type]}`}>
                <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconCls[toast.type]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{toast.title}</p>
                  {toast.message && <p className="text-xs text-text-secondary mt-0.5">{toast.message}</p>}
                </div>
                <button onClick={() => rm(toast.id)} className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
