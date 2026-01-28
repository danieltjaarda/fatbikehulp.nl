'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const brands = [
  { name: 'Phatfour', image: '/Phatfour.avif', alt: 'Phatfour fatbike merk logo' },
  { name: 'Engwe', image: '/Engwe.avif', alt: 'Engwe fatbike merk logo' },
  { name: 'OUXI', image: '/OUXI.avif', alt: 'OUXI fatbike merk logo' },
  { name: 'Ruff Cycles', image: '/ruff cycles.avif', alt: 'Ruff Cycles fatbike merk logo' },
  { name: 'Knaap', image: '/Knaap.avif', alt: 'Knaap fatbike merk logo' },
  { name: 'STOER Bikes', image: '/STOER Bikes.avif', alt: 'STOER Bikes fatbike merk logo' },
  { name: 'La souris', image: '/La souris.png', alt: 'La souris fatbike merk logo' },
]

export default function BrandSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    let animationId: number
    let maxScroll = 0
    let direction = 1 // 1 for right, -1 for left

    // Calculate max scroll
    const updateMaxScroll = () => {
      maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
    }

    // Initial calculation
    updateMaxScroll()

    const scroll = () => {
      // Faster speed on mobile, slower on desktop
      const isMobile = window.innerWidth < 768
      const speed = isMobile ? 0.4 : 0.25
      scrollPosition += speed * direction
      
      if (scrollPosition >= maxScroll) {
        direction = -1 // Change direction to left
      } else if (scrollPosition <= 0) {
        direction = 1 // Change direction to right
      }
      
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    // Recalculate on resize
    const handleResize = () => {
      updateMaxScroll()
    }
    window.addEventListener('resize', handleResize)

    // Start scrolling after a short delay
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(scroll)
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands]

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex items-center space-x-8 sm:space-x-12 px-4">
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ minWidth: '150px', height: '80px' }}
                >
                  <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                    <Image
                      src={brand.image}
                      alt={brand.alt}
                      fill
                      className="object-contain"
                      sizes="150px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

