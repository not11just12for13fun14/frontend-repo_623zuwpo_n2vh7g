function PreviewPane({ html, text, title }) {
  if (!html && !text) {
    return (
      <div className="p-8 text-blue-200/70">Your document preview will appear here.</div>
    )
  }
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-slate-700 bg-slate-900/60">
        <div className="text-sm text-blue-200/80">Preview • {title}</div>
        <div className="text-xs text-blue-300/60">Format: Rich Text</div>
      </div>
      <div className="overflow-auto p-6 text-sm leading-7">
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html || (text || '').replaceAll('\n','<br/>') }} />
      </div>
    </div>
  )
}

export default PreviewPane
