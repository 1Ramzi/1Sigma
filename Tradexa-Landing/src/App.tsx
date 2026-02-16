import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight, 
  CheckCircle2,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Navigation component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Tradexa</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Tarifs</a>
            <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Témoignages</a>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Commencer
            </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Fonctionnalités</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Tarifs</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Témoignages</a>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full">
                Commencer
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero section
function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-8">
            <Zap className="w-4 h-4" />
            <span>Propulsé par l'IA avancée</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Signaux de Trading
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              en Temps Réel
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Recevez des signaux de trading précis alimentés par l'intelligence artificielle. 
            Rejoignez +3,000 traders et obtenez un taux de réussite de 78%+.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center gap-2">
              Essai Gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg border border-slate-700 hover:border-slate-600 transition-all">
              Voir la Démo
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>7 jours gratuits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>Annulation facile</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Features section
function Features() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Signaux IA en Temps Réel",
      description: "Recevez des signaux instantanés basés sur l'analyse algorithmique avancée du marché."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Gestion des Risques",
      description: "Stop-loss et take-profit automatiques pour protéger vos investissements."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Taux de Réussite 78%+",
      description: "Notre IA analyse des millions de données pour des prédictions précises."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Communauté Active",
      description: "Rejoignez +3,000 traders et partagez vos stratégies en temps réel."
    }
  ]

  return (
    <section id="features" className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pourquoi choisir <span className="text-indigo-400">Tradexa</span> ?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Notre plateforme combine l'intelligence artificielle et l'expertise des traders professionnels.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing section
function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "29",
      description: "Parfait pour débuter",
      features: ["5 signaux/jour", "Crypto & Forex", "Support email", "App mobile"]
    },
    {
      name: "Pro",
      price: "79",
      description: "Pour traders actifs",
      features: ["Signaux illimités", "Tous les marchés", "Support prioritaire", "Analyses techniques", "Alertes personnalisées"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "199",
      description: "Pour professionnels",
      features: ["Tout du Pro", "API access", "Account manager", "Stratégies personnalisées", "Formation privée"]
    }
  ]

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choisissez votre <span className="text-indigo-400">Plan</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Commencez gratuitement, passez à un plan payant quand vous êtes prêt.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative p-8 rounded-2xl border",
                plan.popular 
                  ? "bg-indigo-500/10 border-indigo-500/50 scale-105" 
                  : "bg-slate-800/50 border-slate-700"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-sm font-medium rounded-full">
                  Populaire
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-slate-400">/mois</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={cn(
                "w-full py-3 rounded-xl font-semibold transition-colors",
                plan.popular
                  ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-white"
              )}>
                Choisir {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats section
function Stats() {
  const stats = [
    { value: "3,000+", label: "Traders actifs" },
    { value: "78%", label: "Taux de réussite" },
    { value: "50K+", label: "Signaux envoyés" },
    { value: "24/7", label: "Support client" }
  ]

  return (
    <section className="py-20 bg-indigo-500/5 border-y border-indigo-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-indigo-400 mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA section
function CTA() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à booster vos trades ?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Rejoignez des milliers de traders qui utilisent déjà Tradexa pour optimiser leurs investissements.
          </p>
          <button className="group bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center gap-2 mx-auto">
            Commencer Gratuitement
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Tradexa</span>
          </div>
          
          <div className="text-slate-400 text-sm">
            © 2026 Tradexa. Tous droits réservés.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Mentions légales</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Confidentialité</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App component
function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
