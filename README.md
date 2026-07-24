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

## Versionamento do design system

Usamos [Changesets](https://github.com/changesets/changesets) para controlar a
versão do `@koda/ui` e gerar o changelog. Sempre que uma mudança em
`packages/ui` for commitada, siga estes passos:

1. Faça a alteração no componente (`packages/ui/src/...`).
2. Registre a mudança:
   ```sh
   npm run changeset
   ```
   - Selecione o pacote afetado (`@koda/ui`).
   - Escolha o tipo de bump:
     - **patch** — correção de bug, sem mudar a API
     - **minor** — novo componente ou prop, compatível com o que já existe
     - **major** — quebra a API (renomeou/removeu prop, mudou comportamento)
   - Escreva uma frase curta descrevendo o que mudou (vai para o changelog).
3. Isso cria um arquivo em `.changeset/*.md`. Commite esse arquivo **junto** com
   a alteração do componente, no mesmo PR.
4. Quando quiser fechar uma versão (aplicar todos os changesets pendentes):
   ```sh
   npm run version-packages
   ```
   Isso atualiza `packages/ui/package.json` (versão) e `packages/ui/CHANGELOG.md`
   automaticamente, consumindo os arquivos em `.changeset/`.
5. Commite o resultado (`package.json` + `CHANGELOG.md` + remoção dos arquivos
   de changeset consumidos).

> O pacote é privado (`"private": true`), então **não** rodamos
> `npm run release` (publicação no npm) — a versão serve apenas como registro
> interno de mudanças e compatibilidade entre os apps que consomem `@koda/ui`.

Este workspace foi criado com [Nx](https://nx.dev).
