function CollectionsSidebar({ collections, activeRequestId, onSelectRequest }) {
  return (
    <aside className="h-full overflow-y-auto border-r border-white/10 bg-[#070b17] p-3">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-white/60">
          Collections
        </h2>
        <button
          type="button"
          className="rounded-md border border-white/15 px-2 py-1 text-xs text-white/70 hover:bg-white/5"
        >
          +
        </button>
      </div>

      <div className="space-y-4">
        {collections.map((collection) => (
          <section key={collection.id} className="space-y-2">
            <p className="text-sm font-semibold text-white">{collection.name}</p>
            {collection.folders.map((folder) => (
              <div key={folder.id} className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-white/45">
                  {folder.name}
                </p>
                <ul className="space-y-1">
                  {folder.requests.map((request) => {
                    const isActive = request.id === activeRequestId
                    return (
                      <li key={request.id}>
                        <button
                          type="button"
                          onClick={() => onSelectRequest(request)}
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition ${
                            isActive
                              ? 'bg-primary-brand/25 text-white'
                              : 'text-white/75 hover:bg-white/5'
                          }`}
                        >
                          <span className="text-[11px] font-bold text-emerald-400">
                            {request.method}
                          </span>
                          <span className="truncate">{request.name}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </aside>
  )
}

export default CollectionsSidebar
