'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ZoomIn, ZoomOut, MapPin, Clock, Users } from 'lucide-react'
import { WelcomeBanner } from '@/components/common/WelcomeBanner'

interface Bus {
  id: string
  route: string
  lat: number
  lng: number
  status: 'en_ruta' | 'parada' | 'llegando'
  passengers: number
  maxPassengers: number
  nextStop: string
  estimatedTime: number
}

const initialBuses: Bus[] = [
  {
    id: '1',
    route: 'Ruta 03',
    lat: 2.4421,
    lng: -76.6134,
    status: 'en_ruta',
    passengers: 18,
    maxPassengers: 40,
    nextStop: 'Centro Comercial',
    estimatedTime: 4,
  },
  {
    id: '2',
    route: 'Ruta 05',
    lat: 2.4435,
    lng: -76.6110,
    status: 'llegando',
    passengers: 32,
    maxPassengers: 40,
    nextStop: 'Museo de Arte',
    estimatedTime: 2,
  },
  {
    id: '3',
    route: 'Ruta 07',
    lat: 2.4405,
    lng: -76.6155,
    status: 'en_ruta',
    passengers: 25,
    maxPassengers: 40,
    nextStop: 'Parque San Francisco',
    estimatedTime: 6,
  },
  {
    id: '4',
    route: 'Ruta 09',
    lat: 2.4450,
    lng: -76.6095,
    status: 'parada',
    passengers: 15,
    maxPassengers: 40,
    nextStop: 'Estación Terminal',
    estimatedTime: 8,
  },
  {
    id: '5',
    route: 'Ruta 02',
    lat: 2.4380,
    lng: -76.6170,
    status: 'en_ruta',
    passengers: 28,
    maxPassengers: 40,
    nextStop: 'Biblioteca Municipal',
    estimatedTime: 3,
  },
]

export function MapModule() {
  const [buses, setBuses] = useState<Bus[]>(initialBuses)
  const [zoom, setZoom] = useState(14)
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null)
  const [isTracking, setIsTracking] = useState(false)

  // Simulate real-time bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.001,
          lng: bus.lng + (Math.random() - 0.5) * 0.001,
          passengers: Math.max(0, Math.min(bus.maxPassengers, bus.passengers + Math.floor(Math.random() * 5 - 2))),
          estimatedTime: Math.max(1, bus.estimatedTime - 0.5),
        }))
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBus(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Welcome Banner */}
      <div className="px-4 pt-4 pb-2">
        <WelcomeBanner />
      </div>

      {/* Simple Grid Map Representation */}
      <div className="flex-1 bg-gradient-to-b from-background to-muted relative overflow-hidden">
        {/* Map Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* City Center Marker */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent">
            <MapPin className="w-6 h-6 text-accent" />
          </div>
        </motion.div>

        {/* Buses on Map */}
        {buses.map((bus) => {
          // Normalize coordinates to map position (0-100%)
          const xPercent = ((bus.lng - (-76.62)) / 0.02) * 100
          const yPercent = ((bus.lat - 2.43) / 0.02) * 100

          return (
            <motion.button
              key={bus.id}
              onClick={() => setSelectedBus(bus)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all"
              style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg ${
                  bus.status === 'llegando'
                    ? 'bg-yellow-500'
                    : bus.status === 'parada'
                    ? 'bg-blue-500'
                    : 'bg-accent'
                }`}
              >
                {bus.route.split(' ')[1]}
              </motion.div>
            </motion.button>
          )
        })}

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-4 flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setZoom(Math.min(20, zoom + 1))}
            className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center shadow-lg hover:bg-accent/90"
          >
            <ZoomIn className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setZoom(Math.max(10, zoom - 1))}
            className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center shadow-lg hover:bg-accent/90"
          >
            <ZoomOut className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Status Legend */}
        <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-3 text-xs space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-accent rounded-full" /> En ruta
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" /> Llegando
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-blue-500 rounded-full" /> Parada
          </div>
        </div>
      </div>

      {/* Bus Details Panel */}
      {selectedBus && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="bg-card border-t border-border p-4"
        >
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-foreground">{selectedBus.route}</h3>
                <p className="text-xs text-muted-foreground">{selectedBus.nextStop}</p>
              </div>
              <button
                onClick={() => setSelectedBus(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-background rounded-lg p-2 text-center">
                <Clock className="w-4 h-4 mx-auto mb-1 text-accent" />
                <p className="text-xs text-muted-foreground">Llega en</p>
                <p className="font-bold text-foreground">{selectedBus.estimatedTime}min</p>
              </div>
              <div className="bg-background rounded-lg p-2 text-center">
                <Users className="w-4 h-4 mx-auto mb-1 text-accent" />
                <p className="text-xs text-muted-foreground">Pasajeros</p>
                <p className="font-bold text-foreground">{selectedBus.passengers}/{selectedBus.maxPassengers}</p>
              </div>
              <div className="bg-background rounded-lg p-2 text-center">
                <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-accent" />
                <p className="text-xs text-muted-foreground">Estado</p>
                <p className="font-bold text-foreground text-xs capitalize">{selectedBus.status.replace('_', ' ')}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-accent text-accent-foreground py-2 rounded-lg font-semibold hover:bg-accent/90"
            >
              Subir a {selectedBus.route}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
