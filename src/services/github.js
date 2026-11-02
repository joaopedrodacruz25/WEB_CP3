const GITHUB_API = 'https://api.github.com'

export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'seu-usuario-github'

async function githubRequest(path) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (response.status === 403) {
    throw new Error('O GitHub limitou temporariamente as consultas. Tente novamente em alguns minutos.')
  }
  if (response.status === 404) {
    throw new Error('Usuário ou repositório não encontrado no GitHub. Confira o nome configurado.')
  }
  if (!response.ok) {
    throw new Error('Não foi possível carregar os dados do GitHub. Tente novamente.')
  }
  return response.json()
}

export async function getRepositories() {
  if (GITHUB_USERNAME === 'seu-usuario-github') {
    throw new Error('Configure seu usuário do GitHub no arquivo .env para carregar seus projetos.')
  }
  const repositories = await githubRequest(
    `/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=100&type=owner`,
  )
  return repositories
    .filter((repo) => !repo.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
}

export async function getRepository(repoName) {
  if (GITHUB_USERNAME === 'seu-usuario-github') {
    throw new Error('Configure seu usuário do GitHub no arquivo .env para consultar este projeto.')
  }
  return githubRequest(`/repos/${encodeURIComponent(GITHUB_USERNAME)}/${encodeURIComponent(repoName)}`)
}
