# @koda/ui

Biblioteca de componentes React para consumo em projetos React e Next.js.

## Componentes

- `Button` — `variant="primary" | "secondary"`, aceita todas as props nativas de `<button>` e encaminha `ref` para o elemento `<button>`.
- `Input` — `label`, `error`, aceita todas as props nativas de `<input>` e encaminha `ref` para o elemento `<input>`.

Em todos os métodos abaixo, `react` e `react-dom` (>=18) são
`peerDependencies` — use as versões já instaladas no projeto consumidor,
elas não são reinstaladas automaticamente. E em todos os casos importe o CSS
**uma única vez** na raiz do app:

```ts
import '@koda/ui/styles.css';
```

---

## 1. Instalação via repositório Git

Sem precisar de um registry, direto de um repositório Git (GitHub, GitLab, etc.):

```sh
npm install git+https://github.com/sua-org/koda.git#main
```

Também é possível fixar em uma tag ou commit específico:

```sh
npm install git+https://github.com/sua-org/koda.git#v0.1.0
npm install git+https://github.com/sua-org/koda.git#a1b2c3d
```

> Como este pacote vive dentro de um monorepo (`packages/ui`), o Git sozinho
> não resolve subpastas — publique um pacote isolado (ex: um repo próprio
> para `@koda/ui`, ou um branch/tag só com o conteúdo de
> `packages/ui` via `git subtree split`) para essa instalação apontar
> direto para a raiz do pacote.

### Uso em projeto React (Vite/CRA)

```tsx
// src/main.tsx
import '@koda/ui/styles.css';
```

```tsx
// src/App.tsx
import { Button, Input } from '@koda/ui';

export function App() {
  return (
    <>
      <Input label="E-mail" placeholder="voce@empresa.com" type="email" />
      <Button variant="primary">Entrar</Button>
    </>
  );
}
```

### Uso em projeto Next.js (App Router)

```tsx
// app/layout.tsx
import '@koda/ui/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

Os componentes já são marcados com `"use client"` no bundle, então podem ser
usados livremente em Client Components:

```tsx
// app/login/login-form.tsx
'use client';

import { useState } from 'react';
import { Button, Input } from '@koda/ui';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();

  function handleSubmit() {
    if (!email.includes('@')) {
      setError('Informe um e-mail válido.');
      return;
    }
    setError(undefined);
    // ...envia o formulário
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <Input
        label="E-mail"
        placeholder="voce@empresa.com"
        type="email"
        value={email}
        error={error}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="primary" onClick={handleSubmit}>
        Entrar
      </Button>
    </div>
  );
}
```

```tsx
// app/login/page.tsx
import { LoginForm } from './login-form';

export default function LoginPage() {
  return <LoginForm />;
}
```

---

## 2. Instalação local (link/pack — útil em desenvolvimento)

Para testar mudanças da lib em outro projeto local antes de publicar.

**Opção A — `npm link` (symlink, rápido para iterar):**

```sh
# dentro de packages/ui
npm run build
npm link

# dentro do projeto consumidor (React ou Next.js)
npm link @koda/ui
```

**Opção B — `npm pack` (tarball, mais fiel ao que será publicado):**

```sh
# dentro de packages/ui
npm run build
npm pack   # gera koda-ui-0.0.1.tgz

# dentro do projeto consumidor
npm install /caminho/para/koda-ui-0.0.1.tgz
```

`npm pack` respeita o campo `files` do `package.json`, então valida o pacote
exatamente como ele seria instalado via registry.

### Uso em projeto React (Vite/CRA)

Igual ao uso via Git/registry — depois de `npm link`/`npm install` do
tarball, importe normalmente:

```tsx
// src/main.tsx
import '@koda/ui/styles.css';
```

```tsx
// src/App.tsx
import { Button, Input } from '@koda/ui';

export function App() {
  return <Button variant="primary">Entrar</Button>;
}
```

### Uso em projeto Next.js

Mesmo setup do exemplo do App Router acima (`app/layout.tsx` importando o
CSS + componentes usados em Client Components). Com `npm link`, reinicie o
`next dev` após linkar para o Next reconhecer o pacote corretamente.

---

## 3. Instalação via npm privado (registry interno)

Para publicar em um registry privado (Verdaccio, GitHub Packages, Artifactory,
npm Enterprise, etc.), configure o `.npmrc` do projeto consumidor apontando o
escopo `@koda` para o registry privado:

```ini
# .npmrc do projeto consumidor
@koda:registry=https://npm.sua-empresa.com/
//npm.sua-empresa.com/:_authToken=${NPM_TOKEN}
```

Publicação (a partir de `packages/ui`, removendo `"private": true` do
`package.json` do pacote antes do primeiro publish):

```sh
npm run build
npm publish
```

Instalação no projeto consumidor:

```sh
npm install @koda/ui
```

### Uso em projeto React (Vite/CRA)

```tsx
// src/main.tsx
import '@koda/ui/styles.css';
```

```tsx
// src/App.tsx
import { Button, Input } from '@koda/ui';

export function App() {
  return <Button variant="primary">Entrar</Button>;
}
```

### Uso em projeto Next.js (App Router)

```tsx
// app/layout.tsx
import '@koda/ui/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
'use client';

import { Button } from '@koda/ui';

export default function Page() {
  return <Button variant="primary">Entrar</Button>;
}
```

> Se o app Next.js também usa Tailwind, garanta que o `content`/scan do seu
> `globals.css` inclua `node_modules/@koda/ui/dist/**/*.js`, ou
> simplesmente confie no `styles.css` já compilado da lib (recomendado) — ele
> já traz todas as classes usadas pelos componentes.

---

## Desenvolvimento

Estrutura do pacote:

```
src/     # código-fonte dos componentes e tokens Tailwind
dist/    # build gerado (não versionado) — o que é publicado/consumido
```

```bash
npm run build       # gera dist/ (JS ESM+CJS, types, styles.css)
npm run build:js    # apenas o bundle JS (tsup)
npm run build:types # apenas as declarations (tsc)
npm run build:css   # apenas o CSS (Tailwind)
```

Este pacote foi gerado com [Nx](https://nx.dev).
