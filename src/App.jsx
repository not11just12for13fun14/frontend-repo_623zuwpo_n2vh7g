import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TemplatePicker from './components/TemplatePicker'
import FormBuilder from './components/FormBuilder'
import PreviewPane from './components/PreviewPane'

function App() {
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    setAnswers({})
    setResult(null)
  }, [selected])

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const handleGenerate = async () => {
    if (!selected) return
    try {
      setGenerating(true)
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template_key: selected.key, answers, as_html: true })
      })
      if (!res.ok) throw new Error('Failed to generate document')
      const data = await res.json()
      setResult(data)
    } catch (e) {
      alert(e.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />

      <main className="max-w-6xl mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="space-y-4">
          {!selected ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-2">Choose a document type</h2>
              <p className="text-sm text-blue-200/80 mb-4">Pick a template to begin. Each template follows standard Philippine legal formatting and prompts you for the required details.</p>
              <TemplatePicker onSelect={setSelected} />
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{selected.title}</h2>
                  <p className="text-sm text-blue-200/80">{selected.description}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-blue-300 hover:text-white text-sm">Change</button>
              </div>
              <FormBuilder template={selected} answers={answers} setAnswers={setAnswers} onGenerate={handleGenerate} generating={generating} />
            </div>
          )}
        </section>

        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl min-h-[400px] overflow-hidden">
          <PreviewPane html={result?.rendered_html} text={result?.rendered_text} title={result?.title || 'Document'} />
        </section>
      </main>

      <footer className="text-center text-xs text-blue-300/60 py-6">
        For guidance only. This tool does not provide legal advice. Consult a lawyer for complex matters.
      </footer>
    </div>
  )
}

export default App
