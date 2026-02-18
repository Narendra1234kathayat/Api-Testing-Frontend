const workspaces = [
  { id: 'ws-main', name: 'My Workspace' },
  { id: 'ws-team', name: 'Team Sandbox' },
]

const collections = [
  {
    id: 'col-github',
    name: 'GitHub REST API',
    folders: [
      {
        id: 'folder-repos',
        name: 'Repository',
        requests: [
          {
            id: 'req-search-repos',
            method: 'GET',
            name: 'Search Repos',
            url: '{{baseUrl}}/search/repositories?q=bruno&order=desc&sort=stars',
          },
          {
            id: 'req-repo-info',
            method: 'GET',
            name: 'Repository Info',
            url: '{{baseUrl}}/repos/octocat/hello-world',
          },
          {
            id: 'req-repo-issues',
            method: 'GET',
            name: 'Search Issues',
            url: '{{baseUrl}}/search/issues?q=is:issue+is:open+repo:octocat/hello-world',
          },
        ],
      },
      {
        id: 'folder-users',
        name: 'User',
        requests: [
          {
            id: 'req-user-info',
            method: 'GET',
            name: 'User Info',
            url: '{{baseUrl}}/users/octocat',
          },
        ],
      },
    ],
  },
]

const requestTabs = ['Params', 'Body', 'Headers', 'Auth', 'Vars', 'Script']
const responseTabs = ['Response', 'Headers', 'Timeline', 'Tests']

const queryParams = [
  { enabled: true, name: 'q', value: 'bruno' },
  { enabled: true, name: 'order', value: 'desc' },
  { enabled: true, name: 'sort', value: 'stars' },
]

const sampleResponse = `{
  "total_count": 22912,
  "incomplete_results": false,
  "items": [
    {
      "id": 542284380,
      "node_id": "R_kgDOIFKaXA",
      "name": "bruno",
      "full_name": "usebruno/bruno",
      "private": false,
      "owner": {
        "login": "usebruno",
        "id": 114530840,
        "html_url": "https://github.com/usebruno"
      },
      "stargazers_count": 34276,
      "language": "TypeScript",
      "open_issues_count": 161
    }
  ]
}`

export {
  collections,
  queryParams,
  requestTabs,
  responseTabs,
  sampleResponse,
  workspaces,
}
