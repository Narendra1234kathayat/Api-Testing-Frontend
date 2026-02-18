function ResponsePanel({
  responseTabs,
  activeResponseTab,
  onResponseTabChange,
  responseText,
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#0b1120]">
      <div className="flex items-center justify-between border-b border-white/10 p-3">
        <div className="flex flex-wrap gap-2">
          {responseTabs.map((tab) => {
            const isActive = tab === activeResponseTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onResponseTabChange(tab)}
                className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                  isActive
                    ? 'bg-primary-brand/30 text-white'
                    : 'text-white/55 hover:bg-white/5 hover:text-white/85'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3 text-xs text-white/70">
          <span className="font-semibold text-emerald-400">200 OK</span>
          <span>818ms</span>
          <span>158.75KB</span>
        </div>
      </div>

      <pre className="h-[430px] overflow-auto p-3 font-mono text-xs leading-5 text-[#e8d7aa]">
        {responseText}
      </pre>
    </section>
  )
}

export default ResponsePanel
