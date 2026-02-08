import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, Shield, Wallet, Link2, AlertCircle, ChevronRight, Building2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../components/ui/LanguageSwitcher';
import { useNotify } from '../components/ui/Toast';

const BROKER_URL = 'https://www.puprime.com/';

export default function Broker() {
  const { t } = useLanguage();
  const notify = useNotify();
  const [step, setStep] = useState(1);
  const [brokerId, setBrokerId] = useState('');
  const [depositConfirmed, setDepositConfirmed] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    if (!brokerId) {
      notify.error('ID requis', 'Veuillez entrer votre ID broker');
      return;
    }
    if (!depositConfirmed) {
      notify.warning('Dépôt requis', 'Veuillez confirmer que vous avez effectué le dépôt');
      return;
    }
    setConnecting(true);
    await new Promise(r => setTimeout(r, 1500));
    setConnecting(false);
    notify.success('Compte connecté !', 'Votre compte broker est maintenant lié.');
    setStep(3);
  };

  const steps = [
    { num: 1, title: t.step1, desc: t.step1Desc },
    { num: 2, title: t.step2, desc: t.step2Desc },
    { num: 3, title: t.step3, desc: t.step3Desc },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.broker}</h1>
          <p className="text-slate-500 mt-1">{t.brokerSubtitle}</p>
        </div>
        <Badge variant="info" className="self-start sm:self-auto">
          <Building2 className="w-3 h-3 mr-1" /> PuPrime
        </Badge>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              step >= s.num ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step > s.num ? 'bg-emerald-500' : step === s.num ? 'bg-white/20' : 'bg-slate-300'
              }`}>
                {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
              </div>
              <span className="text-sm font-medium">{s.title}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight className="w-5 h-5 text-slate-400 mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Steps */}
        <div className="lg:col-span-2 space-y-4">
          {/* Step 1: Create Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`p-6 ${step === 1 ? 'ring-2 ring-indigo-500' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900">{t.step1}</h3>
                    {step > 1 && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{t.step1Desc}</p>
                  <a
                    href={BROKER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    {t.createBrokerAccount}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setStep(2)}
                    className="ml-3 text-sm text-indigo-600 font-medium hover:text-indigo-700"
                  >
                    {t.language === 'fr' ? "J'ai déjà un compte →" : "I already have an account →"}
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Step 2: Deposit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={`p-6 ${step === 2 ? 'ring-2 ring-indigo-500' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900">{t.step2}</h3>
                    {step > 2 && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{t.step2Desc}</p>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">{t.minDeposit}</p>
                        <p className="text-xs text-amber-600 mt-1">
                          {t.language === 'fr' 
                            ? "Ce montant vous permet de suivre tous nos signaux avec une marge de sécurité."
                            : "This amount allows you to follow all our signals with a safety margin."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={depositConfirmed}
                        onChange={(e) => setDepositConfirmed(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700 font-medium">{t.confirmDeposit}</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Step 3: Connect Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`p-6 ${step === 3 ? 'ring-2 ring-indigo-500' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Link2 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900">{t.step3}</h3>
                    {step === 3 && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{t.step3Desc}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.brokerId}</label>
                      <input
                        type="text"
                        value={brokerId}
                        onChange={(e) => setBrokerId(e.target.value)}
                        placeholder={t.brokerIdPlaceholder}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg px-4 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <Button 
                      onClick={handleConnect} 
                      isLoading={connecting}
                      className="w-full sm:w-auto"
                    >
                      {connecting ? t.connecting : t.connectAccount}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-slate-900">{t.whyBroker}</h3>
            </div>
            <p className="text-sm text-slate-600">{t.whyBrokerDesc}</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900">{t.security}</h3>
            </div>
            <p className="text-sm text-slate-600">{t.securityDesc}</p>
          </Card>

          <div className="bg-slate-900 text-white rounded-xl p-5">
            <h4 className="font-semibold mb-2">{t.language === 'fr' ? 'Besoin d\'aide ?' : 'Need help?'}</h4>
            <p className="text-sm text-slate-300 mb-3">
              {t.language === 'fr' 
                ? "Notre équipe est disponible 24/7 pour vous aider avec la configuration de votre compte."
                : "Our team is available 24/7 to help you set up your account."}
            </p>
            <button className="text-sm text-indigo-400 font-medium hover:text-indigo-300">
              {t.language === 'fr' ? 'Contacter le support →' : 'Contact support →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
