# ARCHITECTURE.md

Este documento descreve as principais decisões técnicas, organização do projeto e desafios enfrentados durante o desenvolvimento da aplicação **Movie Explorer**.

## 📌 Visão Geral

A aplicação foi construída como uma SPA (Single Page Application) utilizando **React + Vite**, com foco em:

- Escalabilidade
- Separação de responsabilidades
- Boa experiência do usuário
- Código testável

## 🧠 Decisões Técnicas

### ⚛️ React + Vite

Escolhido por:

- Setup rápido e leve
- Excelente performance em desenvolvimento
- Integração simples com TypeScript

### 🔄 TanStack Query (React Query)

Utilizado para:

- Gerenciar requisições assíncronas
- Cache automático de dados
- Controle de loading e erro
- Evitar múltiplas chamadas desnecessárias

**Motivação:** reduzir complexidade de estados manuais (`useState/useEffect`)

### 🧭 TanStack Router

- Gerenciamento de rotas moderno e tipado
- Suporte a guards (`beforeLoad`)
- Melhor controle de navegação

### 🧠 Zustand

Escolhido para estado global:

- Simples e leve
- Sem boilerplate
- Ideal para armazenar:
  - favoritos
  - dados persistentes

### 📝 React Hook Form + Zod

- Validação declarativa e tipada
- Performance superior a soluções tradicionais
- Integração perfeita com TypeScript

### 🎨 Tailwind CSS

- Estilização rápida
- Consistência visual
- Facilita criação de componentes reutilizáveis

### 🧪 Vitest + Testing Library

- Testes rápidos (rodando com Vite)
- Foco em comportamento do usuário
- Fácil integração com React

## 📁 Estrutura de Pastas

```bash
src/
 ├── components/     # Componentes reutilizáveis (UI e layout)
 ├── pages/          # Páginas principais (Home, Login, etc.)
 ├── services/       # Integração com API (TMDB)
 ├── store/          # Estado global (Zustand)
 ├── hooks/          # Hooks customizados (ex: debounce)
 ├── test/           # Testes automatizados
 ├── types/          # Tipagens TypeScript
 ├── lib/            # Utilitários e helpers
```

### 🧩 Organização

- **components/** → UI desacoplada da lógica
- **pages/** → composição das telas
- **services/** → camada de acesso à API
- **store/** → estado global isolado
- **hooks/** → reutilização de lógica
- **types/** → centralização de tipos

👉 Isso facilita manutenção e escalabilidade.

---

## 🔐 Autenticação sem Backend

Como não havia backend disponível, foi implementada uma **autenticação fake**.

### ✔ Como funciona

- Ao realizar login:
  - Um token fake é salvo no `localStorage`

- Exemplo:

```ts
localStorage.setItem("token", "fake-jwt-token");
```

- Função utilitária:

```ts
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
```

### 🔒 Proteção de rotas

Utilizando `beforeLoad` do TanStack Router:

```ts
beforeLoad: () => {
  if (!isAuthenticated()) {
    throw redirect({ to: "/" });
  }
};
```

## 🌐 Desafios com a API ( TMDB)

Durante o desenvolvimento, alguns desafios foram encontrados:

### ⚠️ 1. Limitações de parâmetros

A API possui regras específicas:

- Filtros não podem ser combinados livremente
- Alguns endpoints exigem parâmetros específicos

👉 Solução:

- Separação entre:
  - `searchMovies`
  - `discoverMovies`

---

### ⚠️ 2. Paginação

- Cada requisição depende da página atual
- Mudança de filtros precisa resetar página

👉 Solução:

```ts
setPage(1);
```

Sempre que:

- busca muda
- filtro muda

---

### ⚠️ 3. Performance (muitas requisições)

Problema:

- Cada digitação fazia request

👉 Solução: debounce

```ts
const debouncedSearch = useDebounce(search, 500);
```

---

### ⚠️ 4. Estados múltiplos (search vs filter vs popular)

Problema:

- Qual lista mostrar?

👉 Solução:

```ts
function getMoviesToShow() {
  if (search) return searchData;
  if (filters) return discoverData;
  return popularMovies;
}
```

### ⚠️ 5. Loading global

Com múltiplas queries:

```ts
const isGlobalLoading = initialLoading || isSearching || isFiltering;
```

## 🧩 Considerações Finais

O projeto foi estruturado visando:

- 📦 Código modular
- ⚡ Performance
- 🧪 Testabilidade
- 📈 Escalabilidade

Mesmo sendo um projeto sem backend, foi possível simular:

- autenticação
- proteção de rotas
- fluxo real de aplicação

## 🚀 Possíveis melhorias futuras

- Integração com backend real (JWT)
- Persistência de favoritos em API
- Melhor tratamento de erros
- Mostrar o ultimo parâmetro pesquisado e não ter prioridade em qual dado é mostrado
- Cache mais avançado (React Query)
