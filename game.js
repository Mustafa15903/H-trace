// ══════════════════════════════════════
//  Hash utility — SHA-256
// ══════════════════════════════════════
async function hashText(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// ══════════════════════════════════════
//  Init
// ══════════════════════════════════════
const input = document.getElementById("userNameInput");
const terminal = document.querySelector(".terminal");

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {

        const name = input.value.trim();
        if (!name) return;

        
        PlayerStorage.save(name);

        
        input.parentElement.remove();

        showInvestigationMessage(name);
    }
});

// ══════════════════════════════════════
//  دالة إضافة سطر
// ══════════════════════════════════════
function addLine(text) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.textContent = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
    return line;
}

// ══════════════════════════════════════
//  رسالة التحقيق — typing effect
// ══════════════════════════════════════
function showInvestigationMessage(name) {

    const message = `
Welcome Mr. ${name}.
We are investigating a murder case.
This computer is among the collected evidence.
Your mission is to break its encryption
and extract any clue that may help us identify the killer.
Good luck.
    `;

    const lines = message.trim().split("\n");
    let createdLines = [];
    let lineIndex = 0;

    function typeLine() {
        if (lineIndex >= lines.length) {
            setTimeout(() => {
                createdLines.forEach(line => line.remove());
                showLoginScreen();
            }, 1000);
            return;
        }

        const currentLine = addLine("");
        createdLines.push(currentLine);

        let charIndex = 0;
        const text = lines[lineIndex].trim();

        const typingInterval = setInterval(() => {
            currentLine.textContent += text[charIndex];
            charIndex++;

            if (charIndex >= text.length) {
                clearInterval(typingInterval);
                lineIndex++;
                setTimeout(typeLine, 35);
            }
        }, 35);
    }

    typeLine();
}

// ══════════════════════════════════════
//  شاشة تسجيل الدخول
// ══════════════════════════════════════
function showLoginScreen() {

    addLine("Login to the system");
    addLine("Enter password:");
    addLine("");
    addLine("Encrypted message: { tbn8901 }");
    addLine("Hint: Each character has been shifted forward by one.");
    addLine("");

    const passwordLine = document.createElement("div");
    passwordLine.classList.add("line");

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.style.background = "transparent";
    passwordInput.style.border = "none";
    passwordInput.style.outline = "none";
    passwordInput.style.color = "#00ff00";
    passwordInput.style.fontFamily = "inherit";
    passwordInput.style.width = "100%";

    passwordLine.appendChild(passwordInput);
    terminal.appendChild(passwordLine);
    passwordInput.focus();

   
    const correctHash = "a666627c566fed63ec7197df8b8412cee8f805226e34b5829e711ec2e31162ba";

    passwordInput.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {

            const inputHash = await hashText(passwordInput.value);

            if (inputHash === correctHash) {
                addLine("Access Granted ✓");
                passwordInput.disabled = true;

                setTimeout(() => {
                    window.location.href = "samdesktop/terminal.html";
                }, 1500);

            } else {
                addLine("Access Denied ✕");
                passwordInput.value = "";
                passwordInput.focus();
            }
        }
    });
}