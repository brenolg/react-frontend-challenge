# Movie Explorer

Aplicação web desenvolvida em **React + Vite** que permite explorar filmes utilizando dados da API do TMDB. O usuário pode buscar, filtrar e favoritar filmes, além de visualizar detalhes individuais.

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- TanStack Query (React Query)
- TanStack Router
- Zustand (gerenciamento de estado)
- React Hook Form + Zod (formulários e validação)
- Tailwind CSS
- Vitest + Testing Library (testes)

## Funcionalidades

- 🔐 Autenticação fake (simulada via localStorage)
- 🔎 Busca de filmes por nome
- 🎯 Filtros por:
  - Gênero
  - Ano
  - Nota mínima

- 📄 Paginação de resultados
- ⭐ Lista de favoritos
- 🎬 Página de detalhes do filme
- ⚡ Debounce na busca
- 🧪 Testes automatizados (Login e Home)

## Autenticação

A autenticação é **simulada (fake)** e não depende de backend.

### Credenciais padrão:

```txt
Email: admin@email.com
Senha: 123456
```

Ao logar:

- Um token fake é salvo no `localStorage`
- Rotas protegidas são liberadas (`/home`, `/favorites`, etc.)

## 📁 Estrutura do Projeto

```bash
src/
 ├── components/     # Componentes reutilizáveis
 ├── pages/          # Páginas (Home, Login, Favorites, MovieDetails)
 ├── services/       # Chamadas de API
 ├── store/          # Zustand (estado global)
 ├── hooks/          # Hooks customizados
 ├── test/           # Testes (Vitest)
 ├── types/          # Tipagens
```

---

## ⚙️ Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar o projeto

```bash
npm run dev
```

Acesse:

```txt
http://localhost:5173
```

## 🧪 Rodar os testes

### Rodar testes

```bash
npm run test
```

### Interface visual

```bash
npm run test:ui
```

---

## 🔒 Rotas protegidas

- `/home`
- `/movie/:id`
- `/favorites`

Usuários não autenticados são redirecionados para `/`.

## 🧠 Diferenciais do projeto

- Uso de React Query para gerenciamento de cache e requisições
- Debounce na busca para evitar múltiplas chamadas
- Separação clara de responsabilidades (services, store, hooks)
- Testes automatizados com Vitest
- Tipagem forte com TypeScript
