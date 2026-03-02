# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo structure

This is a monorepo containing two independent projects:

```
benji.codes/
├── riddleyu/      # Daily 成语 puzzle game
└── gecijielong/   # Chinese lyrics learning app
```

Each project has its own `package.json`, `vite.config.js`, `vercel.json`, and `CLAUDE.md` with project-specific instructions.

## Working on a project

Navigate into the project directory and run commands there:

```bash
cd riddleyu && npm install && npm run dev
cd gecijielong && npm install && npm run dev
```

Each project is deployed independently to Vercel, with its root directory set to the project subfolder.
