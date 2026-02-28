import { request } from '../auth/authClient'

function getCollections({ workspaceId } = {}) {
  return request('/api/collections', {
    method: 'GET',
    params: workspaceId ? { workspaceId } : undefined,
  })
}

function createCollection(payload) {
  return request('/api/collections', {
    method: 'POST',
    data: payload,
  })
}

function deleteCollection(collectionId) {
  return request(`/api/collections/${collectionId}`, {
    method: 'DELETE',
  })
}

export { createCollection, deleteCollection, getCollections }
