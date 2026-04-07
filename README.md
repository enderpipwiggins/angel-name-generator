# Angel Name Generator

A web application that generates angel names drawn from Hebrew, Christian, Islamic, and Enochian traditions. Names are composed from authentic roots with meanings, combined with tradition-appropriate suffixes.

## Prerequisites

- Node.js 18 or 20 (even-numbered LTS versions recommended)
- npm 9+

## Getting started

```bash
npm install
npm start
```

The app will be served at `http://localhost:4200`.

## Using the app

The interface provides four controls:

| Control | Description |
|---------|-------------|
| **Tradition** | Filters the suffix pool to a specific tradition, or `all` to draw from every tradition |
| **Domain** | Restricts roots to a thematic category, or `any` to pull from all domains |
| **Suffix** | Locks the generated names to a specific suffix ending (e.g. `-el`, `-iel`), or `any` |
| **Count** | Number of names to generate (1–48) |

Click **Generate** to produce a new set of names. Each result displays:

- The generated name
- The root word and its meaning
- The domain the root belongs to
- The suffix, its meaning, and its tradition of origin

## Traditions

| Tradition | Suffixes used |
|-----------|--------------|
| Hebrew | `-el`, `-iel`, `-on` |
| Christian | `-el`, `-iel`, `-on`, `-us` |
| Islamic | `-il`, `-ail`, bare form |
| Enochian | `-el`, `-iel`, `-eel`, `-qiel` |
| All | Every suffix above |

## Domains

`celestial` · `nature` · `divine` · `concepts` · `geography` · `time` · `hidden` · `war` · `healing`

## Development

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server at `http://localhost:4200` |
| `npm run build` | Build a production bundle into `dist/` |
| `npm test` | Run the Mocha unit test suite |

Built with Angular 21 and `AngelNameGeneratorService` — a standalone, dependency-free class that can also be used directly in non-Angular TypeScript projects.
