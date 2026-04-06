# benji.codes

A collection of Chinese language tools and games, deployed as a single Next.js 15 app at [benji.codes](https://benji.codes).

## Projects

| Route | Name | Description |
|-------|------|-------------|
| `/riddleyu` | 谜语日 | Daily 成语 puzzle — decode the four-character idiom from cryptic clues |
| `/gecijielong` | 歌词接龙 | Chain Mandarin song lyrics together in a flowing dragon of verse |
| `/geciqiao` | 歌词桥 | Study Mandarin through the lyrics of artists you love |
| `/tongyizuo` | 同义词星图 | Visualize Mandarin synonym clusters in semantic space |
| `/zhujie` | 注解 | Paste Chinese text and get rich, contextual annotations |
| `/gumai` | 古脉 | Explore the living network of classical Chinese texts |
| `/jazz` | 爵士和弦 | Interactive jazz chord progression analysis |
| `/engine` | 知识引擎 | Knowledge graph dashboard for learning progress |

Projects can be enabled/disabled in `projects.config.ts`. Disabled projects appear on the landing page with a "coming soon" banner and return 404 via middleware.

## Development

```bash
npm install
npm run dev    # localhost:3000
```

All projects run from the root — visit `localhost:3000/<project>` to work on a specific one.

## Structure

```
benji.codes/
├── app/                    # Next.js App Router pages + API routes
├── projects.config.ts      # Enable/disable projects
├── middleware.ts            # Blocks disabled project routes
├── riddleyu/               # Project source code
├── gecijielong/
├── geciqiao/
├── tongyizuo/
├── zhujie/
├── gumai/
├── jazz/
├── engine/
└── .disabled-app-pages/    # Staged app/ pages for disabled projects
```
