# Koda

Monorepo (Nx) com a biblioteca de componentes React `@koda/ui`, para uso
em projetos React e Next.js.

## Estrutura

```
packages/
  ui/
    src/    # código-fonte dos componentes (Button, Input) e tokens Tailwind
    dist/   # build gerado (ESM, CJS, types, CSS) — não versionado
```

## Começando

```sh
npm install
npx nx build ui
```

O build gera em `packages/ui/dist`:

- `index.js` / `index.cjs` — bundle ESM e CJS
- `index.d.ts` — tipos
- `styles.css` — CSS Tailwind com os tokens e classes usadas pelos componentes

Veja [packages/ui/README.md](packages/ui/README.md) para a documentação de uso
da lib, incluindo um exemplo completo de integração com Next.js.

## Tarefas comuns

```sh
npx nx build ui      # builda a lib ui (src/ -> dist/)
npx nx <target> ui    # roda qualquer target definido em packages/ui/package.json
```

Este workspace foi criado com [Nx](https://nx.dev).
