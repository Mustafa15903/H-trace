# H-trace

> *A browser-based detective thriller set inside a mysterious computer terminal.*

---

## 🎮 About the Game

A murder has been committed.

Law enforcement recovered a single piece of evidence from the crime scene — a locked computer. They have no leads. No suspects. No answers.

You are a cybersecurity agent called in to assist the investigation. Your job is simple: break into the machine, dig through everything inside, and find whatever the killer left behind — or tried to erase.

**H-trace** is a browser-based detective thriller where the entire investigation happens through a computer terminal and desktop. You'll read files, trace messages, and piece together the story of what really happened — one command at a time.

The truth is in there. Whether you act on it is your choice.

---

## 🕹️ How to Play

1. **Open `index.html`** in any modern browser
2. **Enter your name** to begin your assignment
3. **Crack the login** — a cipher stands between you and the system
4. **Navigate the terminal** — type commands to explore
5. **Investigate the desktop** — dig through files, messages, and directories
6. **Search deeper** — not everything is visible at first glance
7. **Make your decision** — what you do with what you find is up to you

> ⚠️ Your choices have consequences.

---

## 📁 Project Structure

```
H-trace/
├── index.html          # Entry point — investigator login
├── game.js             # Login logic, typing effect, password verification
├── storage.js          # Centralized localStorage utility (PlayerStorage)
├── end.html            # Ending screen
├── end.js              # Ending logic
├── README.md           # This file
└── samdesktop/
    ├── terminal.html   # System terminal
    ├── ter.js          # Terminal engine & commands
    ├── desktop.html    # Desktop environment
    └── desk.js         # Desktop logic & virtual filesystem
```

---

## 🧩 Game Flow

```
┌──────────────────────────┐
│        index.html        │
│    Investigator login    │
└──────────┬───────────────┘
           ▼
┌──────────────────────────┐
│      terminal.html       │
│    System terminal       │
└──────────┬───────────────┘
           ▼
┌──────────────────────────┐
│      desktop.html        │
│   Explore the system     │
└──────────┬───────────────┘
           ▼
┌──────────────────────────┐
│        end.html          │
│      Case outcome        │
└──────────────────────────┘
```

---

## 🔐 Login System

The login screen presents an encrypted message with a hint.
Decode it to gain access to the system.

> The answer is closer than you think.

---

## ⚙️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Structure & layout |
| **CSS3** | Scanline effects, CRT noise, animations |
| **Vanilla JavaScript** | Game logic, virtual filesystem |
| **Web Crypto API** | Secure password verification via SHA-256 |
| **localStorage** | Player name persistence across pages |
| **Google Fonts** | IBM Plex Mono & IBM Plex Sans |

---

## 🚀 Deployment

This is a **static site** — no server or build step required.

### Options:
- **GitHub Pages** — push to a repo and enable Pages
- **Netlify / Vercel** — drag-and-drop deploy
- **Any static hosting** — just upload the files


---

## 🎨 Design

- **CRT terminal aesthetic** with scanlines and noise overlay
- **Monochromatic dark theme** — black backgrounds, subtle grays
- **Typing animation** for story immersion
- **macOS-inspired desktop UI** with draggable windows, dock, and menubar
- **Virtual filesystem** with 30+ real terminal commands

---

## 📝 Credits

Developed by **Mustafa Abdulla(zashh)**

---

## 📄 License

All rights reserved. This game and its source code are the property of the author.
# H-trace
