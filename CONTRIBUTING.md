# CONTRIBUTING - ᴇɴ

Thank you for considering contributing to **SnakeGame**! This is a learning project, so every contribution — from a typo fix to a new feature — is very welcome.

## How Can I Contribute?

- **Reporting bugs**: open an *issue* describing the problem
- **Suggesting improvements**: new ideas for solo mode, multiplayer or the interface
- **Improving documentation**: README, code comments or this very file
- **Submitting code**: bug fixes, optimizations and new features

## Reporting Bugs

Before opening an *issue*, check whether the problem has already been reported. When creating a new one, include:

- A clear description of the problem
- Steps to reproduce it
- The expected behavior and what actually happened
- Affected game mode (solo or multiplayer)
- Browser, operating system and Node.js version
- Screenshots or console messages, if possible

## Setting Up the Environment

### Prerequisites

- [Node.js](https://nodejs.org) installed
- [Git](https://git-scm.com) installed

### Step by step

1. **Fork** the repository
2. Clone your fork:

```bash
git clone https://github.com/your-username/snakegame.git
cd snakegame
```

3. Install dependencies:

```bash
npm install
```

4. Start the servers in two separate terminals:

```bash
# Terminal 1 — HTTP server (port 3000)
npm start

# Terminal 2 — WebSocket server (port 8080)
npm run server
```

5. Open `http://localhost:3000` in your browser

## Contribution Workflow

1. Create a *branch* from `main` with a descriptive name:

```bash
git checkout -b feat/feature-name
```

   Suggested prefixes: `feat/`, `fix/`, `docs/`, `style/`, `refactor/`

2. Make your changes
3. Test locally (see below)
4. Make small commits with clear messages:

```bash
git commit -m "fix: snake border collision in multiplayer"
```

5. Push the *branch* to your fork:

```bash
git push origin feat/feature-name
```

6. Open a **Pull Request** to `main` explaining what changed and why. If it resolves an *issue*, mention it (e.g. `Closes #12`)

## Code Style

Keep consistency with the existing code:

- **Vanilla JavaScript** — no frontend frameworks
- **4-space indentation**
- **No semicolons** at the end of lines
- Use `const` and `let` (never `var`)
- Variable and function names in **camelCase** and in English
- Player-facing messages in **Portuguese**
- Modules use **ES Modules** (`import` / `export`)
- Avoid adding new dependencies unless necessary

### Security

The HTTP server only serves the public paths listed in `PUBLIC_ENTRIES` (`server.js`). If you create a new public folder, add it there. Never expose server or configuration files.

On the WebSocket server, **validate every message received** from clients — never trust data sent by the browser.

## Testing

There are no automated tests yet, so test manually before opening a PR:

- **Solo mode**: play a full match, test pause, game over and color switching
- **Multiplayer mode**: open several tabs at `http://localhost:3000` and check that players appear and move correctly
- **Connection**: open `test_multiplayer.html` to check communication with the WebSocket server
- **Console**: make sure there are no errors in the browser console or the terminal
- **Responsiveness**: check that the interface still works on different screen sizes

## Questions

If you have any questions, open an *issue*, happy to help!

by caiothedev<br/>
#contributing #code