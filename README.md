# Portfólio — João Pedro

Portfólio pessoal desenvolvido com React e Vite para apresentar minha trajetória, tecnologias estudadas, habilidades e projetos publicados no GitHub.

O projeto oferece uma experiência responsiva, com apresentação dos projetos, formulário de contato, autenticação administrativa e painel para gerenciamento das mensagens recebidas.

## Tecnologias utilizadas

* **React:** construção da interface.
* **Vite:** ambiente de desenvolvimento e compilação.
* **JavaScript:** desenvolvimento das funcionalidades.
* **React Router:** gerenciamento das rotas.
* **TanStack Query:** gerenciamento e cache de consultas.
* **GitHub REST API:** consulta automática dos repositórios públicos.
* **Supabase:** autenticação, banco de dados e gerenciamento das mensagens.
* **EmailJS:** envio de notificações por e-mail.
* **Lucide React:** biblioteca de ícones.
* **CSS:** estilização e responsividade.
* **Vitest:** execução dos testes automatizados.
* **React Testing Library:** testes dos componentes React.
* **ESLint:** análise e qualidade do código.
* **Prettier:** ferramenta de formatação disponível no projeto.

## Funcionalidades

### Portfólio

* Página inicial com apresentação pessoal.
* Listagem automática de projetos publicados no GitHub.
* Página individual para cada projeto.
* Exibição de informações dos repositórios, como descrição, linguagem e data de atualização.
* Seleção de projetos em destaque pelo dashboard.
* Navegação entre as páginas.
* Página 404 para rotas inexistentes.

### Formulário de contato

* Formulário com validação individual dos campos.
* Verificação de nome, e-mail, assunto e mensagem.
* Armazenamento das mensagens no Supabase.
* Envio de notificações por e-mail utilizando EmailJS.
* Mensagens de feedback para sucesso e erro.
* Bloqueio do botão durante o envio.

### Dashboard administrativo

* Login utilizando Supabase Auth.
* Proteção de acesso para usuários autorizados.
* Listagem das mensagens recebidas.
* Visualização de mensagens pendentes e respondidas.
* Atualização do status das mensagens.
* Acesso à resposta por e-mail.
* Seleção dos projetos que aparecem em destaque no portfólio.

### Personalização

* Tema claro e escuro.
* Preferência de tema salva no navegador.
* Interface adaptada para celulares e computadores.

## Estrutura de pastas

```text
WEB_CP3/
│
├── .github/
│   └── copilot-instructions.md
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── test/
│
├── .env.example
├── .gitignore
├── AGENTS.md
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Responsabilidades das pastas

* `components`: componentes visuais reutilizáveis.
* `context`: gerenciamento de estados compartilhados.
* `hooks`: hooks personalizados.
* `pages`: páginas da aplicação.
* `services`: comunicação com APIs e serviços externos.
* `styles`: estilos globais.
* `assets`: imagens e recursos visuais.
* `test`: configurações e arquivos relacionados aos testes.

## Rotas da aplicação

| Rota                  | Descrição                       |
| --------------------- | ------------------------------- |
| `/`                   | Página inicial do portfólio     |
| `/projetos`           | Lista de projetos do GitHub     |
| `/projetos/:repoName` | Detalhes de um projeto          |
| `/contato`            | Formulário de contato           |
| `/login`              | Acesso administrativo           |
| `/dashboard`          | Painel administrativo protegido |
| Demais rotas          | Página 404                      |

## Como executar o projeto

### Pré-requisitos

* Node.js instalado.
* npm instalado.
* Git instalado para clonar o repositório.

### Instalação

1. Clone o repositório pelo GitHub.
2. Entre na pasta do projeto.
3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env` na raiz do projeto, utilizando o `.env.example` como referência.
5. Preencha as variáveis de ambiente necessárias.
6. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

7. Acesse o endereço apresentado pelo Vite no terminal.

## Variáveis de ambiente

O projeto utiliza variáveis de ambiente para configurar as integrações externas.

As variáveis necessárias devem ser preenchidas no arquivo `.env`, seguindo o modelo disponível em `.env.example`.

Integrações utilizadas:

* GitHub REST API.
* Supabase.
* EmailJS.

**Importante:** o arquivo `.env` não deve ser enviado ao GitHub. Somente chaves públicas apropriadas para uso no navegador podem utilizar o prefixo `VITE_`. Nunca coloque senhas administrativas ou chaves secretas nesse arquivo.

## Scripts disponíveis

| Comando            | Função                               |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Inicia o ambiente de desenvolvimento |
| `npm run build`    | Gera a versão de produção            |
| `npm run preview`  | Visualiza a versão compilada         |
| `npm run lint`     | Verifica problemas no código         |
| `npm run test`     | Executa os testes em modo interativo |
| `npm run test:run` | Executa os testes uma única vez      |

## Testes automatizados

Os testes são desenvolvidos utilizando Vitest e React Testing Library.

Atualmente, existem testes para:

### Validação do formulário

* Aceitação de dados válidos.
* Validação do nome.
* Validação do e-mail.
* Validação do assunto.
* Tamanho mínimo da mensagem.
* Rejeição de campos preenchidos somente com espaços.
* Aceitação de mensagem com exatamente 20 caracteres.

### Proteção do dashboard

* Redirecionamento de visitantes não autenticados.
* Permissão de acesso para administradores autenticados.
* Bloqueio de usuários autenticados sem permissão administrativa.

Para executar os testes:

```bash
npm run test:run
```

Resultado da última execução:

**10 testes aprovados.**

## Banco de dados e segurança

O Supabase é utilizado para autenticação e armazenamento das mensagens.

Principais tabelas:

* `contact_messages`: armazenamento dos contatos recebidos.
* `featured_projects`: gerenciamento dos projetos em destaque.
* `admin_users`: identificação dos usuários administradores.

As permissões de acesso são controladas por políticas RLS (Row Level Security).

## Publicação

O projeto pode ser publicado na Vercel.

Para realizar a publicação:

1. Conectar o repositório do GitHub à Vercel.
2. Configurar as variáveis de ambiente necessárias.
3. Executar o processo de publicação.
4. Verificar as páginas e integrações no endereço publicado.

Com a integração GitHub e Vercel configurada, novas alterações enviadas à branch principal podem gerar novas publicações automaticamente.

## Documentação e instruções para IA

O projeto possui arquivos de instruções para orientar o desenvolvimento:

* `AGENTS.md`: define as regras gerais de arquitetura, organização, segurança e qualidade do projeto.
* `.github/copilot-instructions.md`: reúne as instruções específicas para o GitHub Copilot.

Esses arquivos ajudam a manter a consistência do código durante o desenvolvimento e as futuras alterações.

## Resultados do Lighthouse

Auditoria realizada no Google Chrome utilizando o modo Mobile.

| Categoria | Pontuação |
|---|---:|
| Desempenho | 93 |
| Acessibilidade | 95 |
| Práticas recomendadas | 100 |
| SEO | 82 |

O desempenho mobile atingiu 93 pontos, superando a meta mínima de 80 estabelecida para o projeto.

---

Desenvolvido por **João Pedro**.

CP3 — FIAP | Engenharia de Software.
