import { request } from '../auth/authClient'

function getWorkspaces({ userId } = {}) {
  return request('/api/project/all-projects', {
    method: 'GET',
  })
}

function createWorkspace(payload) {

  return request('/api/project/create-project', {
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
