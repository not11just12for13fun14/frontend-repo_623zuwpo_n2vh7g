import { useMemo } from 'react'

function Field({ q, value, onChange }) {
  const common = "w-full bg-slate-900/60 border border-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 ring-blue-500/50"
  if (q.type === 'textarea') return (
    <textarea value={value || ''} onChange={e => onChange(q.key, e.target.value)} placeholder={q.placeholder || ''} className={common + ' min-h-[100px]'} />
  )
  if (q.type === 'select') return (
    <select value={value || ''} onChange={e => onChange(q.key, e.target.value)} className={common}>
      <option value="">Select...</option>
      {(q.options || []).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
  if (q.type === 'number') return (
    <input type="number" value={value || ''} onChange={e => onChange(q.key, e.target.value)} placeholder={q.placeholder || ''} className={common} />
  )
  if (q.type === 'date') return (
    <input type="date" value={value || ''} onChange={e => onChange(q.key, e.target.value)} className={common} />
  )
  return (
    <input value={value || ''} onChange={e => onChange(q.key, e.target.value)} placeholder={q.placeholder || ''} className={common} />
  )
}

function FormBuilder({ template, answers, setAnswers, onGenerate, generating }) {
  const sections = useMemo(() => template?.questions || [], [template])

  const handle = (k, v) => setAnswers(prev => ({ ...prev, [k]: v }))

  return (
    <div className="space-y-6">
      {sections.map((q) => (
        <div key={q.key} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <label className="block text-sm text-blue-200/70 mb-1">{q.label}{q.required ? ' *' : ''}</label>
          {q.help && <p className="text-xs text-blue-300/60 mb-2">{q.help}</p>}
          <Field q={q} value={answers[q.key]} onChange={handle} />
        </div>
      ))}

      <button
        onClick={onGenerate}
        disabled={generating}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-4 py-3 rounded-lg"
      >
        {generating ? 'Generating…' : `Generate ${template?.title || 'Document'}`}
      </button>
    </div>
  )
}

export default FormBuilder
