import { useEffect, useState, useMemo } from 'react'

function TemplatePicker({ onSelect }) {
  const [templates, setTemplates] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTemplates = async () => {
    try {
      setLoading(true)
      setError('')
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/templates`)
      if (!res.ok) throw new Error('Failed to load templates')
      const data = await res.json()
      setTemplates(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return templates.filter(t => (
      t.title.toLowerCase().includes(q) ||
      (t.category || '').toLowerCase().includes(q) ||
      (t.description || '').toLowerCase().includes(q)
    ))
  }, [templates, query])

  if (loading) {
    return (
      <div className="p-6 text-blue-200">Loading templates...</div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-red-300">{error}</div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates (e.g., Affidavit, Deed)"
          className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 ring-blue-500/50"
        />
        <button onClick={loadTemplates} className="px-3 py-2 text-sm bg-slate-800/60 border border-slate-700 rounded text-blue-200 hover:text-white">Refresh</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <button
            key={t.key}
            onClick={() => onSelect(t)}
            className="text-left bg-slate-800/60 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 rounded-xl p-4 transition-colors"
          >
            <div className="text-xs text-blue-300/70 mb-1">{t.category}</div>
            <div className="text-white font-semibold">{t.title}</div>
            {t.requires_notarization && (
              <div className="mt-2 inline-block text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded px-2 py-0.5">Notarization Required</div>
            )}
            {t.description && (
              <p className="mt-2 text-sm text-blue-200/80 line-clamp-2">{t.description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplatePicker
