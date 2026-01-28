'use client'

import FAQ from '@/components/FAQ'

export default function TestFAQNew() {
  const testItems = [
    {
      question: 'Test vraag 1',
      answer: 'Dit is het antwoord op test vraag 1'
    },
    {
      question: 'Test vraag 2',
      answer: (
        <div>
          <p>Dit is een complex antwoord met:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Punt 1</li>
            <li>Punt 2</li>
          </ul>
        </div>
      )
    }
  ]

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test FAQ Component</h1>
      <FAQ items={testItems} />
      
      <div className="mt-8 p-4 bg-yellow-100 rounded">
        <p className="font-bold">Debug Info:</p>
        <p>Als de FAQ items hierboven werken, dan werkt het component!</p>
        <p>Probeer browser cache te legen (Ctrl+F5 of Cmd+Shift+R)</p>
      </div>
    </div>
  )
}












