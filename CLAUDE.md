# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo structure

Single Next.js 15 monorepo. Each sub-project is a route at `benji.codes/<project_name>`, controlled by `projects.config.ts`.

```
benji.codes/
├── app/                    # Next.js App Router (pages + API routes)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page (reads projects.config.ts)
│   ├── LandingClient.tsx   # Landing page client component
│   ├── globals.css         # Landing page styles
│   ├── riddleyu/           # /riddleyu route
│   ├── gecijielong/        # /gecijielong route
│   ├── geciqiao/           # /geciqiao route
│   └── api/                # API routes namespaced per project
│       ├── riddleyu/
│       └── gecijielong/
├── projects.config.ts      # Enable/disable projects, metadata
├── middleware.ts            # Blocks routes for disabled projects
├── riddleyu/               # Source code (components, lib, styles)
├── gecijielong/            # Source code
├── geciqiao/               # Source code
├── gumai/                  # Source code (disabled)
├── tongyizuo/              # Source code (disabled)
├── zhujie/                 # Source code (disabled)
├── engine/                 # Source code (disabled)
├── jazz/                   # Source code (disabled)
└── .disabled-app-pages/    # Staging: app/ pages for disabled projects
```

## Running locally

```bash
npm install
npm run dev   # localhost:3000
```

## Enabling/disabling projects

Set `enabled: true/false` in `projects.config.ts`. Disabled projects:
- Don't appear on the landing page
- Return 404 via middleware
- Their app/ pages must be in `.disabled-app-pages/` to avoid build errors

## Disabled projects needing migration fixes

These projects have partial migrations in `.disabled-app-pages/` but need build fixes before enabling:

- **tongyizuo** — React type mismatch with `dynamic()` and `@types/react` 18.3.x (`refs` property error). Pages and API routes are ready in `.disabled-app-pages/tongyizuo/` and `.disabled-app-pages/api/tongyizuo/`.
- **zhujie** — Pages and API routes migrated in `.disabled-app-pages/zhujie/` and `.disabled-app-pages/api/zhujie/`. Needs tsconfig includes re-added and build tested.
- **gumai** — Pages and API routes migrated in `.disabled-app-pages/gumai/` and `.disabled-app-pages/api/gumai/`. Needs tsconfig includes re-added and build tested.
- **engine** — Not yet migrated. Source in `engine/`.
- **jazz** — Not yet started. Only has `dist/` and `node_modules/`.

## Migration pattern for re-enabling a project

1. Move files from `.disabled-app-pages/<project>/` → `app/<project>/`
2. Move files from `.disabled-app-pages/api/<project>/` → `app/api/<project>/`
3. Add source includes to `tsconfig.json` (be selective — only `lib/`, `components/`, `styles/`)
4. Set `enabled: true` in `projects.config.ts`
5. Run `npm run build` to verify

## Key conventions

- API routes namespaced: `/api/<project>/<endpoint>`
- Env vars namespaced: `<PROJECT>_DATABASE_URL` (e.g., `GECIJIELONG_DATABASE_URL`)
- Vite projects use `dynamic(() => import(...), { ssr: false })` page wrappers
- Lazy DB initialization pattern with `getDb()` to avoid build-time env var evaluation
- Path aliases: `@riddleyu/*`, `@tongyizuo/*`, etc. defined in tsconfig paths

## Per-project CLAUDE.md

Each project directory has its own CLAUDE.md with project-specific details (tech stack, aesthetic, data model, etc.).
