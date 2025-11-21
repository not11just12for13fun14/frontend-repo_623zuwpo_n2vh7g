import { useMemo } from 'react'

function Header() {
  const today = useMemo(() => new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }), [])
  return (
    <header className="py-6 px-4 sm:px-8 border-b border-slate-800/50 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Flames" className="w-8 h-8" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">PH Legal Doc Generator</h1>
            <p className="text-xs text-blue-200/70">Automate affidavits, deeds, and more • {today}</p>
          </div>
        </div>
        <a href="/test" className="text-xs sm:text-sm text-blue-300 hover:text-white transition-colors">System check</a>
      </div>
    </header>
  )
}

export default Header
