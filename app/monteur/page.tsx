import Link from 'next/link'

export default function MonteurDashboard() {
  const links = [
    {
      href: '/monteur/gym',
      icon: '💪',
      title: 'Gym Tracker',
      description: "Track je workouts, PR's en progressie",
    },
    {
      href: '/dashboard',
      icon: '📊',
      title: 'Dashboard',
      description: 'Bekijk reparatie overzicht',
    },
    {
      href: '/reparaties',
      icon: '🔧',
      title: 'Reparaties',
      description: 'Beheer alle aanvragen',
    },
    {
      href: '/klanten',
      icon: '👥',
      title: 'Klanten',
      description: 'Beheer klantgegevens',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Monteur Portal</h1>
            <p className="text-sm text-gray-500 mt-1">Welkom bij het monteur dashboard</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">{link.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-base font-medium text-gray-900">{link.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-xs text-gray-600">
              Deze pagina's zijn beveiligd en worden niet geïndexeerd door zoekmachines
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}