import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CollectionsSidebar from '../components/CollectionsSidebar'
import CreateEntityModal from '../components/CreateEntityModal'
import RequestPanel from '../components/RequestPanel'
import ResponsePanel from '../components/ResponsePanel'
import WorkspaceNavbar from '../components/WorkspaceNavbar'
import { useRequestTabs } from '../hooks/useRequestTabs'
import { useWorkspaceState } from '../hooks/useWorkspaceState'
import { requestTabs, responseTabs } from '../data/workspaceUiConstants'
import { clearAuthState, isAuthenticated } from '../../../utils/auth'
import { useUser } from '../../../context/useUser'
import { getWorkspaces } from '../../../api/workspace/workspaceApi'
import { getCollections } from '../../../api/workspace/collectionApi'
import { getApis } from '../../../api/workspace/apiApi'

function extractList(payload, keys = []) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of keys) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.results)) return payload.results

  if (payload.data && typeof payload.data === 'object') {
    for (const key of keys) {
      if (Array.isArray(payload.data[key])) return payload.data[key]
    }
  }

  return []
}

function mergeApisIntoCollections(rawCollections, rawApis) {
  const apisByCollectionId = new Map()

  rawApis.forEach((apiItem) => {
    const collectionId = apiItem.collectionId || apiItem.collectionid
    if (!collectionId) return

    const bucket = apisByCollectionId.get(collectionId) || []
    bucket.push(apiItem)
    apisByCollectionId.set(collectionId, bucket)
  })

  return rawCollections.map((collection) => {
    if (Array.isArray(collection.api) && collection.api.length > 0) {
      return collection
    }

    const collectionId = collection._id || collection.id
    return {
      ...collection,
      api: apisByCollectionId.get(collectionId) || [],
    }
  })
}

function ApiWorkspacePage() {
  const navigate = useNavigate()
  const { userId, setUser } = useUser()
  const isLocked = !isAuthenticated()
  const [seedWorkspaces, setSeedWorkspaces] = useState([])
  const [seedCollections, setSeedCollections] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isCancelled = false

    const loadWorkspaceData = async () => {
      if (isLocked) {
        setSeedWorkspaces([])
        setSeedCollections([])
        setLoadError('')
        return
      }

      try {
        setIsLoadingData(true)
        setLoadError('')

        const [workspacesResponse, collectionsResponse, apisResponse] = await Promise.all([
          getWorkspaces({ userId: userId || undefined }),
          getCollections(),
          getApis(),
        ])

        if (isCancelled) return

        const workspaces = extractList(workspacesResponse, ['workspaces', 'projects'])
        const collections = extractList(collectionsResponse, ['collections'])
        const apis = extractList(apisResponse, ['apis', 'requests'])
        const collectionsWithApis = mergeApisIntoCollections(collections, apis)

        setSeedWorkspaces(workspaces)
        setSeedCollections(collectionsWithApis)
      } catch (error) {
        if (isCancelled) return
        setSeedWorkspaces([])
        setSeedCollections([])
        setLoadError(error.message || 'Failed to load workspace data.')
      } finally {
        if (!isCancelled) setIsLoadingData(false)
      }
    }

    loadWorkspaceData()

    return () => {
      isCancelled = true
    }
  }, [isLocked, userId])

  const {
    workspaceList,
    selectedWorkspace,
    setSelectedWorkspace,
    workspaceCollections,
    modalState,
    isCreatingCollection,
    openModal,
    closeModal,
    setModalField,
    createEntity,
    deleteWorkspace,
    deleteCollection,
  } = useWorkspaceState({
    seedWorkspaces,
    seedCollections,
    defaultWorkspaceId: '',
    userId,
    isLocked,
  })

  const {
    activeRequest,
    setActiveRequest,
    openRequestTabs,
    activeRequestTab,
    setActiveRequestTab,
    activeResponseTab,
    setActiveResponseTab,
    selectRequest,
    closeRequestTab,
  } = useRequestTabs({
    workspaceCollections,
    defaultRequestTab: requestTabs[0],
    defaultResponseTab: responseTabs[0],
  })

  const handleSignInSuggestion = () => navigate('/signin')
  const handleLogout = () => {
    clearAuthState()
    setUser(null)
    navigate('/signin', { replace: true })
  }

  const handleSubmitModal = async (event) => {
    event.preventDefault()
    await createEntity()
  }

  const workspaceContent = (
    <div className="overflow-hidden p-3 md:p-4">
      <div className="mb-3 flex gap-2 overflow-x-auto border-b border-white/10 pb-2">
        {openRequestTabs.map((request) => {
          const isActive = request.id === activeRequest?.id
          return (
            <div
              key={request.id}
              className={`flex shrink-0 items-center rounded-md border text-sm transition ${
                isActive
                  ? 'border-primary-brand/60 bg-primary-brand/25 text-white'
                  : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveRequest(request)}
                className="flex items-center px-2 py-1.5 text-left"
              >
                <span className="mr-2 text-xs font-bold text-emerald-400">
                  {request.method}
                </span>
                <span>{request.name}</span>
              </button>
              <button
                type="button"
                onClick={() => closeRequestTab(request.id)}
                className="mr-1 inline-flex h-5 w-5 items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white"
                aria-label={`Close ${request.name} tab`}
              >
                x
              </button>
            </div>
          )
        })}
      </div>

      {activeRequest ? (
        <div className="grid h-[calc(100%-46px)] grid-cols-1 gap-3 xl:grid-cols-2">
          <RequestPanel
            request={activeRequest}
            requestTabs={requestTabs}
            activeRequestTab={activeRequestTab}
            onRequestTabChange={setActiveRequestTab}
            queryParams={activeRequest?.params || []}
          />
          <ResponsePanel
            responseTabs={responseTabs}
            activeResponseTab={activeResponseTab}
            onResponseTabChange={setActiveResponseTab}
            responseText=""
          />
        </div>
      ) : (
        <div className="grid h-[calc(100%-46px)] place-items-center rounded-xl border border-white/10 bg-[#0b1120] p-6 text-center">
          <p className="text-sm text-white/70">
            No requests available in this workspace yet.
          </p>
        </div>
      )}
    </div>
  )

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_10%,#111b36_0%,#060913_45%,#04070f_100%)] text-white">
      <WorkspaceNavbar
        workspaces={workspaceList}
        selectedWorkspace={selectedWorkspace}
        onWorkspaceChange={setSelectedWorkspace}
        onAddWorkspace={() => openModal('workspace')}
        onDeleteWorkspace={deleteWorkspace}
        onLogout={handleLogout}
        isLocked={isLocked}
        onSignInSuggestion={handleSignInSuggestion}
      />

      <section className="grid h-[calc(100vh-56px)] grid-cols-1 md:grid-cols-[320px_1fr]">
        <CollectionsSidebar
          collections={workspaceCollections}
          activeRequestId={activeRequest?.id}
          onSelectRequest={selectRequest}
          onAddCollection={(parentCollectionId) =>
            openModal('collection', parentCollectionId)
          }
          onDeleteCollection={deleteCollection}
          isLocked={isLocked}
          onSignInSuggestion={handleSignInSuggestion}
        />
        {isLoadingData ? (
          <div className="grid h-full place-items-center text-sm text-white/70">
            Loading workspace data...
          </div>
        ) : loadError ? (
          <div className="grid h-full place-items-center p-6 text-center">
            <p className="text-sm text-rose-200">{loadError}</p>
          </div>
        ) : (
          workspaceContent
        )}
      </section>

      <CreateEntityModal
        modalState={modalState}
        selectedWorkspace={selectedWorkspace}
        userId={userId}
        isCreatingCollection={isCreatingCollection}
        onChangeField={setModalField}
        onClose={closeModal}
        onSubmit={handleSubmitModal}
      />
    </main>
  )
}

export default ApiWorkspacePage
