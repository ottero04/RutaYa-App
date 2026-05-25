'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Map, Navigation, Bell, Wallet, LogOut } from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { MapModule } from '@/components/modules/MapModule'
import { RoutesModule } from '@/components/modules/RoutesModule'
import { AlertsModule } from '@/components/modules/AlertsModule'
import { CardModule } from '@/components/modules/CardModule'

type TabType = 'map' | 'routes' | 'alerts' | 'card'

export function AppLayout() {
  const [activeTab, setActiveTab] = useState<TabType>('map')
  const { user, logout } = useAuthStore()

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'map', label: 'Mapa', icon: Map },
    { id: 'routes', label: 'Rutas', icon: Navigation },
    { id: 'alerts', label: 'Alertas', icon: Bell },
    { id: 'card', label: 'Tarjeta', icon: Wallet },
  ]

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">R</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground text-sm">RutaYa</h1>
            <p className="text-xs text-muted-foreground">Popayán</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title="Cerrar sesión"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatedContent activeTab={activeTab} />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-card border-t border-border px-2 py-2 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all md:px-6 md:py-3 ${
                  isActive
                    ? 'text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
                <span className="text-xs font-medium hidden sm:block">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

function AnimatedContent({ activeTab }: { activeTab: TabType }) {
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full overflow-auto"
    >
      {activeTab === 'map' && <MapModule />}
      {activeTab === 'routes' && <RoutesModule />}
      {activeTab === 'alerts' && <AlertsModule />}
      {activeTab === 'card' && <CardModule />}
    </motion.div>
  )
}
