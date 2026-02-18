import { useMemo, useState } from 'react'
import CollectionsSidebar from '../components/CollectionsSidebar'
import RequestPanel from '../components/RequestPanel'
import ResponsePanel from '../components/ResponsePanel'
import WorkspaceNavbar from '../components/WorkspaceNavbar'
import {
  collections,
  queryParams,
  requestTabs,
  responseTabs,
  sampleResponse,
  workspaces,
} from '../data/mockWorkspace'

function getInitialRequest() {
  return collections[0].folders[0].requests[0]
}

function ApiWorkspacePage() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0].id)
  const [activeRequest, setActiveRequest] = useState(getInitialRequest())
  const [activeRequestTab, setActiveRequestTab] = useState(requestTabs[0])
  const [activeResponseTab, setActiveResponseTab] = useState(responseTabs[0])

  const allRequests = useMemo(
    () =>
      collections.flatMap((collection) =>
        collection.folders.flatMap((folder) => folder.requests)
      ),
    []
  )
  const [openRequestTabs, setOpenRequestTabs] = useState(() =>
    allRequests.slice(0, 3)
  )

  const handleSelectRequest = (request) => {
    setOpenRequestTabs((prev) => {
      if (prev.some((tab) => tab.id === request.id)) return prev
      return [...prev, request]
    })
    setActiveRequest(request)
  }

  const handleCloseTab = (requestId) => {
    setOpenRequestTabs((prevTabs) => {
      if (prevTabs.length <= 1) return prevTabs

      const closingIndex = prevTabs.findIndex((tab) => tab.id === requestId)
      const nextTabs = prevTabs.filter((tab) => tab.id !== requestId)

      if (activeRequest.id === requestId) {
        const fallbackIndex =
          closingIndex >= nextTabs.length ? nextTabs.length - 1 : closingIndex
        setActiveRequest(nextTabs[fallbackIndex])
      }

      return nextTabs
    })
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_10%,#111b36_0%,#060913_45%,#04070f_100%)] text-white">
      <WorkspaceNavbar
        workspaces={workspaces}
        selectedWorkspace={selectedWorkspace}
        onWorkspaceChange={setSelectedWorkspace}
      />

      <section className="grid h-[calc(100vh-56px)] grid-cols-1 md:grid-cols-[270px_1fr]">
        <CollectionsSidebar
          collections={collections}
          activeRequestId={activeRequest.id}
          onSelectRequest={handleSelectRequest}
        />

        <div className="overflow-hidden p-3 md:p-4">
          <div className="mb-3 flex gap-2 overflow-x-auto border-b border-white/10 pb-2">
            {openRequestTabs.map((request) => {
              const isActive = request.id === activeRequest.id
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
                    onClick={() => handleCloseTab(request.id)}
                    className="mr-1 inline-flex h-5 w-5 items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white"
                    aria-label={`Close ${request.name} tab`}
                  >
                    x
                  </button>
                </div>
              )
            })}
          </div>

          <div className="grid h-[calc(100%-46px)] grid-cols-1 gap-3 xl:grid-cols-2">
            <RequestPanel
              request={activeRequest}
              requestTabs={requestTabs}
              activeRequestTab={activeRequestTab}
              onRequestTabChange={setActiveRequestTab}
              queryParams={queryParams}
            />
            <ResponsePanel
              responseTabs={responseTabs}
              activeResponseTab={activeResponseTab}
              onResponseTabChange={setActiveResponseTab}
              responseText={sampleResponse}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default ApiWorkspacePage
