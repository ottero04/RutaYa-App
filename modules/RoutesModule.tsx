'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Clock, Users, ChevronDown } from 'lucide-react'

interface Route {
  id: string
  number: string
  name: string
  zone: string
  startPoint: string
  endPoint: string
  departure: string
  arrival: string
  passengers: number
  maxPassengers: number
  stops: number
  price: number
}

const routes: Route[] = [
  {
    id: '1',
    number: '03',
    name: 'Centro - Campohermoso',
    zone: 'Centro',
    startPoint: 'Terminal Central',
    endPoint: 'Campohermoso',
    departure: '06:30',
    arrival: '07:15',
    passengers: 18,
    maxPassengers: 40,
    stops: 12,
    price: 1500,
  },
  {
    id: '2',
    number: '05',
    name: 'Centro - Santa Rosa',
    zone: 'Sur',
    startPoint: 'Museo de Arte',
    endPoint: 'Santa Rosa',
    departure: '07:00',
    arrival: '07:45',
    passengers: 32,
    maxPassengers: 40,
    stops: 15,
    price: 1500,
  },
  {
    id: '3',
    number: '07',
    name: 'Centro - San Francisco',
    zone: 'Oeste',
    startPoint: 'Parque San Francisco',
    endPoint: 'Barrio San Francisco',
    departure: '07:30',
    arrival: '08:30',
    passengers: 25,
    maxPassengers: 40,
    stops: 18,
    price: 2000,
  },
  {
    id: '4',
    number: '09',
    name: 'Centro - Terminal',
    zone: 'Centro',
    startPoint: 'Estación Terminal',
    endPoint: 'Centro Comercial',
    departure: '08:00',
    arrival: '08:20',
    passengers: 15,
    maxPassengers: 40,
    stops: 8,
    price: 1500,
  },
  {
    id: '5',
    number: '02',
    name: 'Centro - Biblioteca',
    zone: 'Norte',
    startPoint: 'Biblioteca Municipal',
    endPoint: 'Sector Campohermoso',
    departure: '06:00',
    arrival: '06:45',
    passengers: 28,
    maxPassengers: 40,
    stops: 14,
    price: 1500,
  },
]

export function RoutesModule() {
  const [search, setSearch] = useState('')
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null)
  const [filterZone, setFilterZone] = useState<string | null>(null)

  const zones = [...new Set(routes.map((r) => r.zone))]

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.number.includes(search) ||
      route.name.toLowerCase().includes(search.toLowerCase()) ||
      route.startPoint.toLowerCase().includes(search.toLowerCase())

    const matchesZone = !filterZone || route.zone === filterZone

    return matchesSearch && matchesZone
  })

  return (
    <div className="w-full h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <h2 className="text-lg font-bold text-foreground mb-4">Todas las rutas</h2>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ruta, zona o parada..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
        </div>

        {/* Zone Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterZone(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filterZone === null
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Todas
          </motion.button>
          {zones.map((zone) => (
            <motion.button
              key={zone}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterZone(zone)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filterZone === zone
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {zone}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Routes List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                onClick={() =>
                  setExpandedRoute(expandedRoute === route.id ? null : route.id)
                }
                className="w-full text-left cursor-pointer"
              >
                <div className="bg-card border border-border rounded-xl p-4 hover:bg-muted/50 transition-colors">
                  {/* Route Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center font-bold text-sm">
                        {route.number}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-sm">{route.name}</h3>
                        <p className="text-xs text-muted-foreground">{route.zone}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        rotate: expandedRoute === route.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        {route.departure} - {route.arrival}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        {route.passengers}/{route.maxPassengers}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">${route.price}</p>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedRoute === route.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-border pt-3 space-y-3"
                    >
                      {/* Route Details */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="text-muted-foreground text-xs">Inicio</p>
                            <p className="text-foreground font-semibold">{route.startPoint}</p>
                          </div>
                        </div>
                        <div className="ml-2 h-6 w-0.5 bg-accent/30"></div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="text-muted-foreground text-xs">Fin</p>
                            <p className="text-foreground font-semibold">{route.endPoint}</p>
                          </div>
                        </div>
                      </div>

                      {/* Stops Info */}
                      <div className="bg-background rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          {route.stops} paradas en total
                        </p>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent"
                            style={{
                              width: `${(route.passengers / route.maxPassengers) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ocupación: {Math.round((route.passengers / route.maxPassengers) * 100)}%
                        </p>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                      >
                        Rastrear ruta {route.number}
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-muted-foreground text-sm">No se encontraron rutas</p>
          </div>
        )}
      </div>
    </div>
  )
}
