function CreateEntityModal({
  modalState,
  selectedWorkspace,
  userId,
  isCreatingCollection,
  onChangeField,
  onClose,
  onSubmit,
}) {
  if (!modalState.type) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#0a0f1f] p-6 shadow-2xl backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-white">
          {modalState.type === 'workspace' ? 'Create Workspace' : 'Create Collection'}
        </h2>
        <p className="mt-1 text-xs text-white/65">
          {modalState.type === 'workspace'
            ? 'Provide a workspace name. It will be associated with your logged-in user.'
            : 'Create top-level collection (parentCollectionId null) or sub-collection under selected parent.'}
        </p>

        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="create-name"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/60"
            >
              Name
            </label>
            <input
              id="create-name"
              value={modalState.name}
              onChange={(event) => {
                onChangeField('name', event.target.value)
                if (modalState.error) onChangeField('error', '')
              }}
              placeholder={
                modalState.type === 'workspace' ? 'My Workspace' : 'My Collection'
              }
              className="w-full rounded-md border border-white/15 bg-[#0d1428] px-3 py-2 text-sm text-white outline-none focus:border-highlight/70"
            />
          </div>

          {modalState.type === 'collection' ? (
            <>
              <div>
                <label
                  htmlFor="collection-description"
                  className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/60"
                >
                  Collection Description
                </label>
                <textarea
                  id="collection-description"
                  value={modalState.description}
                  onChange={(event) => onChangeField('description', event.target.value)}
                  rows={3}
                  placeholder="Describe this collection"
                  className="w-full rounded-md border border-white/15 bg-[#0d1428] px-3 py-2 text-sm text-white outline-none focus:border-highlight/70"
                />
              </div>
              <div className="rounded-md border border-white/15 bg-[#0d1428] p-3 text-xs text-white/70">
                <p>
                  workspaceId:{' '}
                  <span className="font-semibold text-highlight">{selectedWorkspace}</span>
                </p>
                <p>
                  parentCollectionId:{' '}
                  <span className="font-semibold text-highlight">
                    {modalState.parentCollectionId || 'null'}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <p className="text-xs text-white/70">
              User ID: <span className="font-semibold text-highlight">{userId || 'Not found'}</span>
            </p>
          )}

          {modalState.error ? <p className="text-xs text-rose-300">{modalState.error}</p> : null}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
              disabled={isCreatingCollection}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full rounded-md bg-highlight/95 px-3 py-2 text-sm font-semibold text-[#111827] hover:bg-highlight disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isCreatingCollection}
            >
              {isCreatingCollection ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEntityModal
