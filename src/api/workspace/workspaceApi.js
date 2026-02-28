import { request } from '../auth/authClient'

function getWorkspaces({ userId } = {}) {
  return request('/api/workspaces', {
    method: 'GET',
    params: userId ? { userId } : undefined,
  })
}

function createWorkspace(payload) {
  return request('/api/workspaces', {
    method: 'POST',
    data: payload,
  })
}

function deleteWorkspace(workspaceId) {
  return request(`/api/workspaces/${workspaceId}`, {
    method: 'DELETE',
  })
}

export { createWorkspace, deleteWorkspace, getWorkspaces }
