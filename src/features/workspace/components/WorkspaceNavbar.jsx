function WorkspaceNavbar({
  workspaces,
  selectedWorkspace,
  onWorkspaceChange,
}) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 bg-[#0a0f1f] px-4">
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary-brand/25 text-sm font-bold text-highlight">
          GM
        </div>
        <p className="text-sm font-semibold text-white">GetMan</p>
      </div>

      <label className="flex items-center gap-2 text-sm text-white/80">
        <span className="text-white/60">Workspace</span>
        <select
          className="rounded-md border border-white/15 bg-[#0d1428] px-2 py-1.5 text-sm text-white outline-none focus:border-highlight/70"
          value={selectedWorkspace}
          onChange={(event) => onWorkspaceChange(event.target.value)}
        >
          {workspaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>
      </label>
    </header>
  )
}

export default WorkspaceNavbar
