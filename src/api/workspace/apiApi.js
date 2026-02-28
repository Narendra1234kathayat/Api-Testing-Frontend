import { request } from '../auth/authClient'

function getApis({ collectionId, workspaceId } = {}) {
  return request('/api/apis', {
    method: 'GET',
    params: {
      ...(collectionId ? { collectionId } : {}),
      ...(workspaceId ? { workspaceId } : {}),
    },
  })
}

export { getApis }
