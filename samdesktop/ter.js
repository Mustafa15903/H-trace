const termBody = document.getElementById("term-body");
const windows = {};

/* Clock */
function updateClock() {
  const el = document.getElementById("clock");
  el.textContent = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

/* Add line */
function addLine(text, cls='output') {
  const div = document.createElement("div");
  div.classList.add("line", cls);
  div.textContent = text;
  termBody.appendChild(div);
  termBody.scrollTop = termBody.scrollHeight;
}

/* Create input */
function createInput() {
  const wrap = document.createElement("div");
  wrap.classList.add("prompt-line");

  const sym = document.createElement("span");
  sym.classList.add("prompt-sym");
  sym.textContent = "system@desktop:~$ ";

  const input = document.createElement("input");
  input.autocomplete = "off";
  input.spellcheck = false;
  input.autofocus = true;

  wrap.appendChild(sym);
  wrap.appendChild(input);
  termBody.appendChild(wrap);
  termBody.scrollTop = termBody.scrollHeight;

  setTimeout(()=>input.focus(), 50);

  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const command = input.value.trim();
      input.disabled = true;
      sym.style.color = "#555";
      input.style.color = "#777";
      handleCommand(command);
      createInput();
    }
  });
}

/* Window system */
function openWindow(name, content) {
  if (windows[name]) {
    addLine("Window already open.", 'error');
    return;
  }
  const win = document.createElement("div");
  win.className = "window";
  win.textContent = `[ ${name.toUpperCase()} WINDOW ]\n\n${content}`;
  termBody.appendChild(win);
  windows[name] = win;
  termBody.scrollTop = termBody.scrollHeight;
}

function closeWindow(name) {
  if (!windows[name]) {
    addLine("Window not found.", 'error');
    return;
  }
  windows[name].remove();
  delete windows[name];
  addLine(`closed: ${name}`, 'ok');
}

/* Commands */
function handleCommand(cmd) {
  if(!cmd) return;

  // echo typed command
  const echo = document.createElement("div");
  echo.classList.add("line","cmd");
  echo.textContent = "system@desktop:~$ " + cmd;
  // already shown in prompt, skip

  if (!cmd.startsWith("/")) {
    addLine("Unknown command. Use /help", 'error');
    return;
  }

  const args = cmd.split(" ");

  switch(args[0]) {

    case "/help":
      addLine("Available commands:", 'output');
      addLine("/help            - Show commands");
      addLine("/desktop         - Open desktop");
      addLine("/files           - List files");
      addLine("/open report     - Open report window");
      addLine("/close report    - Close report window");
      addLine("/windows         - List open windows");
      addLine("/clear           - Clear terminal");
      addLine("/about           - System info");
      break;

    case "/desktop":
      addLine("Loading desktop...", 'ok');
      setTimeout(() => { window.location.href = "desktop.html"; }, 800);
      break;

    case "/files":
      addLine("Files:");
      addLine("- report.txt");
      addLine("- suspect.log");
      addLine("- access.key");
      break;

    case "/open":
      if (args[1] === "report") {
        openWindow("report", "Victim last seen at 22:14\nLocation: Sector 7\nStatus: Classified");
      } else {
        addLine("File not found.", 'error');
      }
      break;

    case "/close":
      closeWindow(args[1]);
      break;

    case "/windows":
      addLine("Active windows:");
      if (Object.keys(windows).length === 0) {
        addLine("No open windows.");
      } else {
        Object.keys(windows).forEach(w => addLine("- " + w));
      }
      break;

    case "/clear":
      termBody.innerHTML = '';
      break;

    case "/about":
      addLine("Secure Investigation Desktop OS");
      addLine("Version 1.0");
      addLine("Access Level: Restricted");
      break;

    default:
      addLine("Command not recognized.", 'error');
  }
}

/* Boot sequence */
const bootLines = [
  {t:"Secure Investigation Desktop OS", cls:"boot"},
  {t:"Booting system...",                cls:"boot"},
  {t:"Type /help to see available commands", cls:"boot"},
  {t:"", cls:"boot"},
];
let bi = 0;
function bootNext() {
  if(bi < bootLines.length) {
    addLine(bootLines[bi].t, bootLines[bi].cls);
    bi++;
    setTimeout(bootNext, 120);
  } else {
    createInput();
  }
}
bootNext();
