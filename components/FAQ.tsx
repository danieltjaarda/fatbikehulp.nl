'use client'

import { useState, useRef, useEffect } from 'react'

interface FAQItem {
  question: string
  answer: string | React.ReactNode
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        
        return (
          <div 
            key={index} 
            className="bg-white/40 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-200 shadow-xl"
          >
            <button
              type="button"
              onClick={() => handleToggle(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/30 transition-colors group"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-lg font-semibold pr-8" style={{ color: '#323232' }}>
                {item.question}
              </span>
              <svg
                className={`w-6 h-6 flex-shrink-0 text-gray-600 transition-transform duration-300 ease-in-out ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            <div
              id={`faq-answer-${index}`}
              ref={(el) => {
                contentRefs.current[index] = el
              }}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                maxHeight: isOpen ? '1000px' : '0px',
              }}
            >
              <div className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
