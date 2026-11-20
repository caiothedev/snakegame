# SNAKEGAME - ᴇɴ

The classic Snake game built with HTML, CSS, and JavaScript for educational purposes! It also includes a multiplayer version using WebSockets.
Clone the repository or visit the live deployment to play:<br/>
https://snakegame-one-opal.vercel.app

## Screenshots

![Main Menu](assets/screenshots/1.png)

![Solo Mode](assets/screenshots/2.png)

![Multiplayer Mode](assets/screenshots/3.png)

## Gamepad support

Play Solo or Multiplayer with compatible Xbox, PlayStation, and other standard-mapped controllers using the browser's native Gamepad API. Both modes support the D-pad and left analog stick. In Solo, A/Cross restarts after a win or loss and Start/Options pauses or resumes. In Multiplayer, A/Cross joins from the name dialog or respawns after elimination.

See [GAMEPAD.md](docs/GAMEPAD.md) for setup, button mapping, browser requirements, and troubleshooting.

## Objectives

This project was born out of a desire to learn and grow. The main objectives behind this project are:

- To deepen the understanding of vanilla JavaScript, Canvas manipulation, game loops, and real-time communication via WebSockets
- To demonstrate the ability to build a complete application from scratch, integrating a frontend, an HTTP server, and a WebSocket server
- To make the code open-source so others can study, contribute, and find inspiration

### Servers

- **HTTP Server**: Port 3000 (serving HTML/CSS/JS files)
- **WebSocket Server**: Port 8080 (managing the multiplayer game)

## Dependencies

The project was developed using the following dependencies:

- **HTML** – HTML5
- **CSS** – CSS3
- **JavaScript** – ECMAScript 2024
- **WebSocket** - (`ws` library for real-time communication)
- **[Node.js](https://nodejs.org)** for the servers

## How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org) installed

### 1. Clone the repository

```bash
git clone https://github.com/your-username/snakegame.git
cd snakegame
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the servers

In two separate terminals:

```bash
# Terminal 1 — HTTP server
npm start

# Terminal 2 — WebSocket server (multiplayer)
npm run server
```

### 4. Access in your browser

```
http://localhost:3000
```

by caiothedev<br/>
#snakegame #html #css #javascript #websocket