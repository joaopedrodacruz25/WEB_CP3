# Instruções para agentes de IA

## 1. Objetivo do projeto

Manter o portfólio pessoal desenvolvido em React organizado, acessível, responsivo, seguro, testável e fácil de manter.

O projeto utiliza React, Vite, JavaScript, React Router, Supabase, EmailJS e GitHub REST API.

## 2. Arquitetura e organização

A estrutura principal do projeto deve seguir estas responsabilidades:

* `src/components`: componentes visuais reutilizáveis.
* `src/pages`: páginas da aplicação.
* `src/services`: comunicação com APIs e serviços externos.
* `src/hooks`: hooks personalizados.
* `src/context`: contextos compartilhados.
* `src/styles`: estilos globais.
* `src/assets`: imagens e recursos visuais.

As regras de arquitetura são:

* Não concentrar toda a lógica em um único componente.
* Separar a apresentação visual das regras de negócio.
* Em novas funcionalidades, não realizar chamadas diretas às APIs dentro de componentes visuais.
* Priorizar a migração gradual das chamadas existentes para services, preservando as funcionalidades.
* Manter consultas e operações do Supabase dentro de services.
* Manter a comunicação com o GitHub dentro de services.
* Manter o envio de mensagens pelo EmailJS dentro de services.
* Reutilizar componentes existentes antes de criar novos.
* Preferir componentes pequenos, com responsabilidades específicas.

## 3. Tecnologias utilizadas

* React: construção da interface.
* Vite: ambiente de desenvolvimento e compilação.
* JavaScript: implementação das funcionalidades.
* React Router: gerenciamento de rotas.
* TanStack Query: gerenciamento, cache e atualização de consultas.
* Supabase: autenticação e banco de dados.
* EmailJS: envio de mensagens por e-mail.
* GitHub REST API: consulta dos repositórios públicos.
* Lucide React: biblioteca de ícones.
* CSS: estilização e responsividade.
* ESLint: análise de qualidade do código.
* Vitest e React Testing Library: ferramentas previstas para testes automatizados, após instalação e configuração.
* Prettier: ferramenta prevista para padronização da formatação, após instalação e configuração.

## 4. Convenções de código

* Componentes React devem utilizar PascalCase.
* Variáveis e funções devem utilizar camelCase.
* Hooks personalizados devem começar com `use`.
* Arquivos de componentes devem utilizar `.jsx`.
* Arquivos de serviços e funções auxiliares devem utilizar `.js`, seguindo o padrão existente.
* Utilizar nomes claros e descritivos.
* Manter textos destinados aos visitantes em português do Brasil.
* Evitar duplicação de código.
* Manter a consistência com os padrões já utilizados.

## 5. Rotas e autenticação

* Utilizar React Router para organizar as páginas.
* Cada projeto deve possuir uma rota individual.
* Manter uma página 404 para endereços inexistentes.
* Garantir que o acesso direto às rotas funcione após atualizar o navegador.
* Proteger o dashboard contra visitantes não autenticados.
* Verificar se o usuário possui autorização administrativa.
* Utilizar Supabase Auth para autenticação.
* Não depender apenas de verificações visuais no React.
* Manter as permissões de acesso protegidas por RLS no Supabase.

## 6. Integrações externas

### GitHub

* Buscar os projetos por meio da GitHub REST API.
* Não cadastrar manualmente projetos que devem vir da API.
* Exibir descrição, linguagem e data de atualização.
* Tratar erros, carregamento e listas vazias.
* Evitar requisições repetidas desnecessárias.

### Supabase

* Utilizar o arquivo de conexão existente em `src/services`.
* Armazenar mensagens na tabela `contact_messages`.
* Utilizar a tabela `featured_projects` para os projetos em destaque.
* Respeitar as permissões RLS.
* Não expor credenciais administrativas.
* Não utilizar chaves secretas no navegador.

### EmailJS

* Utilizar as variáveis de ambiente configuradas no projeto.
* Validar os campos antes do envio.
* Bloquear o botão durante o envio.
* Impedir mensagens duplicadas.
* Apresentar feedback de sucesso ou erro.
* Não expor credenciais privadas.

## 7. Segurança e variáveis de ambiente

* Manter o arquivo `.env` fora do repositório.
* Manter `.env.example` versionado.
* Nunca inserir senhas, tokens privados ou chaves administrativas diretamente no código.
* Utilizar somente chaves públicas apropriadas para aplicações de navegador.
* Não utilizar a Secret Key do Supabase no React.
* Não compartilhar credenciais em commits ou documentação.
* Não desativar políticas RLS para contornar erros de permissão.

## 8. Estados da aplicação

Dados obtidos de APIs e serviços externos devem possuir:

* Estado de carregamento.
* Estado de erro.
* Estado de lista vazia.
* Exibição dos dados quando disponíveis.

Os formulários devem apresentar mensagens específicas para cada validação.

Os botões de envio e atualização devem indicar quando uma operação estiver em andamento.

## 9. Qualidade e testes

* Utilizar ESLint para identificar problemas no código.
* Utilizar Prettier para manter a formatação, após sua instalação e configuração.
* Utilizar Vitest e React Testing Library para testes, após sua instalação e configuração no projeto.
* Testar obrigatoriamente a validação do formulário.
* Testar o bloqueio de acesso ao dashboard sem autenticação.
* Atualizar os testes quando novas regras de negócio forem adicionadas.
* Não considerar uma funcionalidade concluída apenas porque o projeto compilou.
* Testar as funcionalidades no navegador e verificar as integrações externas.

Antes de concluir alterações, verificar os scripts disponíveis no `package.json` e executar as verificações correspondentes.

No PowerShell do Windows, utilizar `npm.cmd` quando necessário.

## 10. Performance e responsividade

* Buscar uma pontuação mínima de 80 no Lighthouse em dispositivos móveis.
* Otimizar imagens.
* Utilizar carregamento sob demanda quando apropriado.
* Evitar requisições repetidas à API do GitHub.
* Utilizar cache para consultas externas.
* Evitar deslocamentos inesperados de layout.
* Manter a interface funcional em celulares e computadores.
* Carregar dashboard e recursos pesados somente quando necessário.

## 11. Versionamento e Git

Utilizar uma estratégia baseada em GitHub Flow.

* A branch principal deve ser `main`.
* Cada funcionalidade deve ser desenvolvida em uma branch própria.
* Utilizar nomes como `feature/dashboard`, `feature/contact-form` e `fix/login`.
* Integrar alterações à `main` somente após revisão e testes.
* Manter histórico de commits distribuído durante o desenvolvimento.

Utilizar Conventional Commits:

* `feat:` para novas funcionalidades.
* `fix:` para correções.
* `docs:` para documentação.
* `test:` para testes.
* `refactor:` para reorganização do código.
* `style:` para alterações de formatação.

Exemplos:

* `feat: adiciona dashboard administrativo`
* `fix: corrige autenticação do Supabase`
* `test: adiciona testes do formulário`
* `docs: atualiza instruções do projeto`

Nunca adicionar `.env`, `node_modules` ou `dist` aos commits.

## 12. Documentação

O README deve apresentar:

* Objetivo do projeto.
* Tecnologias utilizadas.
* Estrutura de pastas.
* Funcionalidades disponíveis.
* Variáveis de ambiente necessárias.
* Instruções para instalação.
* Instruções para executar localmente.
* Instruções para executar testes.
* Processo de publicação.

## 13. Como a IA deve trabalhar

Antes de realizar alterações:

1. Analisar os arquivos envolvidos.
2. Entender a estrutura existente.
3. Identificar possíveis impactos em funcionalidades já implementadas.
4. Respeitar os padrões definidos neste documento.
5. Não criar arquivos ou dependências desnecessárias.

Durante as alterações:

* Preservar funcionalidades existentes.
* Evitar duplicação de componentes.
* Não inventar credenciais ou dados.
* Não desativar mecanismos de segurança.
* Não alterar configurações externas sem necessidade.

Ao concluir:

1. Informar quais arquivos foram alterados.
2. Explicar as mudanças em linguagem simples.
3. Executar os testes disponíveis.
4. Verificar a compilação.
5. Informar problemas que ainda precisam ser resolvidos.

A IA deve priorizar soluções simples, seguras, organizadas e compatíveis com as tecnologias já utilizadas no projeto.
