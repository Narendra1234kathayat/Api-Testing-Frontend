function RequestPanel({
  request,
  requestTabs,
  activeRequestTab,
  onRequestTabChange,
  queryParams,
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#0b1120]">
      <div className="border-b border-white/10 p-3">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-bold text-emerald-400">
            {request.method}
          </span>
          <input
            readOnly
            value={request.url}
            className="flex-1 rounded-md border border-white/10 bg-[#0a0f1f] px-3 py-2 text-sm text-white/85 outline-none"
          />
          <button
            type="button"
            className="rounded-md bg-highlight/95 px-3 py-2 text-xs font-semibold text-[#111827] hover:bg-highlight"
          >
            Send
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {requestTabs.map((tab) => {
            const isActive = tab === activeRequestTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onRequestTabChange(tab)}
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
      </div>

      <div className="p-3">
        <p className="mb-2 text-xs uppercase tracking-wide text-white/55">Query Params</p>
        <div className="overflow-hidden rounded-md border border-white/10">
          <div className="grid grid-cols-[80px_1fr_1fr] bg-white/5 px-2 py-1.5 text-xs font-semibold text-white/65">
            <span>Use</span>
            <span>Name</span>
            <span>Value</span>
          </div>
          {queryParams.map((param) => (
            <div
              key={param.name}
              className="grid grid-cols-[80px_1fr_1fr] border-t border-white/10 px-2 py-1.5 text-xs text-white/80"
            >
              <span>{param.enabled ? 'Yes' : 'No'}</span>
              <span>{param.name}</span>
              <span>{param.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RequestPanel
