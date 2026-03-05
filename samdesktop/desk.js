
/* ══════════════════════
   DATA
══════════════════════ */
const notes = {
  everyday:
`tea
aet
rest
music
internet
nap
a learning
look at natural


${'─'.repeat(42)}
f  i  n  d  m  i  n  d`,

  slash:
` — Forgetting the way you used to smile at nothing
 — I reach for you in the dark and find only silence
 — Nowhere I go feels like somewhere anymore
 — Days dissolve into each other without meaning
 — Mornings are the hardest. Every single one.
 — I keep your last message unread. Just to pretend.
 — Nothing I write comes close to what I feel
 — Don't ask me if I'm okay. I won't answer honestly.`,

  task:
`[ TASK LIST ]
──────────────────────
[x] check the logs
[x] delete old records
[ ] find the key file
[ ] send final report
[ ] do NOT contact again`,

  job:
`[ JOB TASKS ]
──────────────────────
[ ] submit weekly report
[ ] review Q2 budget
[ ] follow up with team
[ ] update project docs
[ ] schedule weekly meeting
[ ] check server status
[ ] prepare Q2 presentation
[ ] sync with department head`,

  imp:
`imp.txt — [RECOVERED FROM TRASH]
──────────────────────────────────────

i don't know how to explain this.

something is wrong and i can't tell anyone.
i started noticing things about 3 weeks ago.
little things at first — files i didn't move,
folders renamed, timestamps that don't match.

i thought it was me. i thought i was tired.

then the messages started.
not direct ones. just hints.
like someone wants me to know they're watching
but doesn't want me to be sure.

who would do this? why?

balla has been acting strange since Mar 12.
avoiding eye contact. leaving early.
i found a receipt in the break room — external drive,
4TB. he doesn't do backups. we don't do backups.

i'm probably overthinking this.
i've been overthinking everything lately.

but what if i'm not?

— written Mar 16 1996, 01:44 AM
   (scheduled for deletion)`
};

const noteNames = {
  everyday:'everyday.txt',
  slash:'/',
  task:'task.txt',
  job:'job.txt',
  imp:'imp.txt'
};

const emails = {
  marya:{
    from:'marya@H-trace', subj:'Re: tonight', date:'Thu Mar 14 1996  23:41',
    body:`don't text me at this hour.\ni told you it's over.\nplease stop.\n\n— M`
  },
  aj:{
    from:'sam@H-trace → a.g@H-trace',
    subj:'please read this',
    date:'Sat Mar 16 1996  01:08',
    sent: true,
    body:`a.g,\n\ni need to talk to you about something serious.\ni can't say everything here but —\n\nsomething is happening at the company.\ni think balla is involved in something bad.\ni have a log. i have evidence.\n\nplease just come online.\ndon't ignore this.\n\n— sam\n\n──────────────────────────────\n⚠  STATUS: DELIVERED — UNREAD\n   a.g has not opened this message.`
  }
};

/* ══════════════════════
   VIRTUAL FILESYSTEM
══════════════════════ */
const vfs = {
  '/':                         ['home'],
  '/home':                     ['user'],
  '/home/user':                ['Desktop','Documents','Downloads','.bashrc','.profile','.bash_history','.bash_logout'],
  '/home/user/Desktop':        [],
  '/home/user/Documents':      ['notes.md','resume.pdf'],
  '/home/user/Downloads':      ['package.zip'],
  '/home/user/.mind':          ['important.log','.shadow','.void','imp.txt'],
};
const vfiles = {
  '.bashrc':
`# ~/.bashrc
export PATH=$HOME/bin:/usr/local/bin:$PATH
export EDITOR=nano
alias ll='ls -la'
alias ..='cd ..'`,

  '.profile':
`# ~/.profile
if [ -n "$BASH_VERSION" ]; then
  if [ -f "$HOME/.bashrc" ]; then
    . "$HOME/.bashrc"
  fi
fi`,

  '.bash_history':
`ls
pwd
cd Desktop
cat suspect.log
rm -rf /tmp/trace
chmod 400 access.key
findmind
cd .mind
cat imp.txt
cat important.log
rm imp.txt`,

  '.bash_logout': `# ~/.bash_logout\nclear`,

  'notes.md':
`# Personal Notes

- follow up on the log
- check .mind directory
- do not let Balla find out`,

  'resume.pdf':     '[binary: PDF document, cannot display]',
  'package.zip':    '[binary: Zip archive, cannot display]',

  'imp.txt':
`imp.txt — [SCHEDULED FOR DELETION]
──────────────────────────────────────

i don't know how to explain this.

something is wrong and i can't tell anyone.
i started noticing things about 3 weeks ago.
little things at first — files i didn't move,
folders renamed, timestamps that don't match.

i thought it was me. i thought i was tired.

then the messages started.
not direct ones. just hints.
like someone wants me to know they're watching
but doesn't want me to be sure.

balla has been acting strange since Mar 12.
avoiding eye contact. leaving early.
i found a receipt in the break room — external drive,
4TB. he doesn't do backups. we don't do backups.

i'm probably overthinking this.
but what if i'm not?

— written Mar 16 1996, 01:44 AM`,

  'important.log':
`[SECURE LOG — INTERNAL USE ONLY]
Generated: Mar 16 1996 02:31 AM
──────────────────────────────────────────

SUBJECT:  Employee — Balla
INCIDENT: Unauthorized data exfiltration

ENTRY 001 — Mar 12 1996
  Balla accessed restricted client database.
  Transfer detected: 4.2 GB to external IP 00.000.00.0
  No authorization on record.

ENTRY 002 — Mar 14 1996
  Direct threat received via internal mail:
  "Stay quiet or you'll regret it. I know where you live."
  Sender IP traces back to Balla's workstation.

ENTRY 003 — Mar 15 1996
  Confirmed: Balla is selling client data to organized group.
  Codename used internally: 'GANG_OUT'.
  Payment records found in his temp directory.

ENTRY 004 — Mar 16 1996
  He knows I have this file.
  I need to delete visible copies.
  If you're reading this — it worked, or I didn't make it.

──────────────────────────────────────────
STATUS: CRITICAL — DO NOT SHARE`,
};

/* locked files — permission denied */
const lockedFiles = ['.shadow', '.void'];

/* ══════════════════════
   WINDOW MANAGEMENT
══════════════════════ */
let zTop = 10;
const wids = ['note','email','files','terminal','trash'];

function openWin(id) {
  const w = document.getElementById('win-'+id);
  w.classList.add('open'); w.style.zIndex = ++zTop;
  document.getElementById('dot-'+id).classList.add('on');
}
function closeWin(id) {
  document.getElementById('win-'+id).classList.remove('open');
  document.getElementById('dot-'+id).classList.remove('on');
}

/* Drag */
wids.forEach(id => {
  const win = document.getElementById('win-'+id);
  const bar = document.getElementById('bar-'+id);
  bar.addEventListener('mousedown', e => {
    if (e.target.classList.contains('tl')) return;
    win.style.zIndex = ++zTop;
    const ox = e.clientX - win.offsetLeft, oy = e.clientY - win.offsetTop;
    const mv = ev => { win.style.left=(ev.clientX-ox)+'px'; win.style.top=Math.max(26,ev.clientY-oy)+'px'; };
    const up = () => { document.removeEventListener('mousemove',mv); document.removeEventListener('mouseup',up); };
    document.addEventListener('mousemove',mv); document.addEventListener('mouseup',up);
  });
  win.addEventListener('mousedown', () => { win.style.zIndex = ++zTop; });
});

/* ══════════════════════
   NOTES
══════════════════════ */
function openNote(key, el) {
  document.getElementById('note-body').value = notes[key];
  document.getElementById('note-stat').textContent = noteNames[key];
  document.getElementById('note-sz').textContent = notes[key].length+' B';
  document.querySelectorAll('#win-note .wrow').forEach(r=>r.classList.remove('sel'));
  el.classList.add('sel');
}

function openNoteDeleted(key, el) {
  const ta = document.getElementById('note-body');
  ta.value = notes[key];
  ta.style.borderColor = '#c00';
  ta.style.background = '#fff8f8';
  setTimeout(()=>{ ta.style.borderColor=''; ta.style.background=''; }, 1200);
  document.getElementById('note-stat').textContent = '⚠ '+noteNames[key]+' [recovered]';
  document.getElementById('note-sz').textContent = notes[key].length+' B';
  document.querySelectorAll('#win-note .wrow').forEach(r=>r.classList.remove('sel'));
  el.classList.add('sel');
}

/* ══════════════════════
   MAIL
══════════════════════ */
function readMail(key, el) {
  const m = emails[key];
  const sentTag = m.sent
    ? `<span style="font-size:9px;border:1px solid #aaa;padding:0 4px;margin-left:6px;color:var(--dim);">SENT</span>`
    : '';
  document.getElementById('mail-body').innerHTML =
    `<div class="wtxt-meta">From:    ${m.from}${sentTag}\nSubject: ${m.subj}\nDate:    ${m.date}\n${'─'.repeat(36)}</div>${m.body}`;
  document.getElementById('mail-stat').textContent = m.subj;
  document.querySelectorAll('#win-email .wrow').forEach(r=>r.classList.remove('sel'));
  el.classList.remove('unread');
  el.querySelector('.unread-dot') && el.querySelector('.unread-dot').remove();
  el.classList.add('sel');
}

function showDeleted(name) {
  document.getElementById('mail-body').innerHTML =
    `<span style="color:var(--dimmer);font-family:var(--mono);font-size:10px;">// conversation with '${name}' has been deleted //\n// no recoverable data found //</span>`;
  document.getElementById('mail-stat').textContent = `[deleted — ${name}]`;
}

/* ══════════════════════
   LOCKED FILE MODAL
══════════════════════ */
function showLocked(msg) {
  document.getElementById('locked-msg').textContent = msg || 'Permission denied. File is encrypted or corrupted.';
  document.getElementById('locked-modal').classList.add('show');
}

/* ══════════════════════
   TERMINAL ENGINE
══════════════════════ */
let cwd = '/home/user';
const env = { USER:'user', HOME:'/home/user', SHELL:'zsh', TERM:'xterm-256color', PATH:'/usr/local/bin:/usr/bin:/bin' };
const cmdHistory = [];
let histIdx = -1;

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function termAppend(text, cls) {
  const out = document.getElementById('term-out');
  const d = document.createElement('div');
  if(cls) d.className=cls;
  d.innerHTML = esc(text).replace(/\n/g,'<br>');
  out.appendChild(d); out.scrollTop=out.scrollHeight;
}

function updatePS1() {
  document.getElementById('term-ps1').textContent = `user@nova ${cwd} % `;
}

function resolvePath(p) {
  if (!p||p==='~') return env.HOME;
  if (p.startsWith('~/')) return env.HOME+p.slice(1);
  if (p.startsWith('/')) return p.replace(/\/+$/,'')||'/';
  if (p==='..') { const parts=cwd.split('/'); parts.pop(); return parts.join('/')||'/'; }
  if (p==='.') return cwd;
  return (cwd==='/'?'':cwd)+'/'+p;
}

const commands = {

  help(){
    return {t:
`┌─ Commands ─────────────────────────────────────────────────────┐
│  Navigation   ls  cd  pwd                                      │
│  Files        cat  head  tail  touch  rm  cp  mv  mkdir        │
│  Info         whoami  id  hostname  uname  date  uptime        │
│  System       ps  kill  df  du  top  free                      │
│  Environment  echo  env  export  history  alias  which         │
│  Network      ping  ifconfig  netstat  ssh                     │
│  Utilities    wc  grep  sort  uniq  file  find  chmod  man     │
│  Special      f*****d  backtoterminal                          │
└────────────────────────────────────────────────────────────────┘`};
  },

  ls(args){
    const showH = args.some(a=>/^-.*a/.test(a));
    const longF = args.some(a=>/^-.*l/.test(a));
    const pathA = args.find(a=>!a.startsWith('-'));
    const path  = resolvePath(pathA||cwd);
    const dir   = vfs[path];
    if(!dir) return {t:`ls: ${pathA||cwd}: No such file or directory`,e:1};
    let items = showH ? ['.','..', ...dir] : dir.filter(n=>!n.startsWith('.'));
    if(!longF) return {t: items.length ? items.join('  ') : '(empty)'};
    const lines = items.map(n=>{
      const full=path+'/'+n, isDir=!!vfs[full];
      const perm = lockedFiles.includes(n)?'----------':isDir?'drwxr-xr-x':'-rw-r--r--';
      const sz   = isDir?'  -   ':String(vfiles[n]?vfiles[n].length:'-').padStart(6);
      return `${perm}  1 user user  ${sz}  Mar 16 1996  ${n}${isDir?'/':''}`;
    });
    return {t:lines.join('\n')};
  },

  cd(args){
    const t=args[0]||env.HOME, p=resolvePath(t);
    if(!vfs[p]) return {t:`cd: ${t}: No such directory`,e:1};
    cwd=p; updatePS1(); return null;
  },

  pwd(){ return {t:cwd}; },

  cat(args){
    if(!args[0]) return {t:'Usage: cat <file>',e:1};
    const name=args[0].split('/').pop();
    if(lockedFiles.includes(name)) return {t:`cat: ${name}: Permission denied`,e:1};
    if(vfiles[name]!==undefined) return {t:vfiles[name]};
    if(vfs[resolvePath(args[0])]) return {t:`cat: ${args[0]}: Is a directory`,e:1};
    return {t:`cat: ${args[0]}: No such file or directory`,e:1};
  },

  head(args){
    const n=args.includes('-n')?parseInt(args[args.indexOf('-n')+1])||5:5;
    const f=args.find(a=>!a.startsWith('-'));
    if(!f) return {t:'Usage: head [-n N] <file>',e:1};
    const name=f.split('/').pop();
    if(lockedFiles.includes(name)) return {t:`head: ${name}: Permission denied`,e:1};
    const c=vfiles[name];
    if(c===undefined) return {t:`head: ${f}: No such file`,e:1};
    return {t:c.split('\n').slice(0,n).join('\n')};
  },

  tail(args){
    const n=args.includes('-n')?parseInt(args[args.indexOf('-n')+1])||5:5;
    const f=args.find(a=>!a.startsWith('-'));
    if(!f) return {t:'Usage: tail [-n N] <file>',e:1};
    const name=f.split('/').pop();
    if(lockedFiles.includes(name)) return {t:`tail: ${name}: Permission denied`,e:1};
    const c=vfiles[name];
    if(c===undefined) return {t:`tail: ${f}: No such file`,e:1};
    return {t:c.split('\n').slice(-n).join('\n')};
  },

  touch(args){
    if(!args[0]) return {t:'Usage: touch <file>',e:1};
    const name=args[0];
    if(!vfs[cwd]) return {t:`touch: ${cwd}: No such directory`,e:1};
    if(!vfs[cwd].includes(name)) vfs[cwd].push(name);
    if(vfiles[name]===undefined) vfiles[name]='';
    return {t:`touched: ${name}`,ok:1};
  },

  rm(args){
    const t=args.filter(a=>!a.startsWith('-'));
    if(!t[0]) return {t:'Usage: rm [-r] <file>',e:1};
    const name=t[0]; const dir=vfs[cwd];
    const idx=dir?dir.indexOf(name):-1;
    if(idx===-1) return {t:`rm: ${name}: No such file or directory`,e:1};
    dir.splice(idx,1); delete vfiles[name];
    return {t:`removed '${name}'`,ok:1};
  },

  mkdir(args){
    if(!args[0]) return {t:'Usage: mkdir <dir>',e:1};
    const name=args[0], full=cwd+'/'+name;
    if(vfs[full]) return {t:`mkdir: ${name}: File exists`,e:1};
    vfs[full]=[]; if(vfs[cwd]&&!vfs[cwd].includes(name)) vfs[cwd].push(name);
    return {t:`mkdir: created directory '${name}'`,ok:1};
  },

  cp(args){
    if(args.length<2) return {t:'Usage: cp <src> <dst>',e:1};
    const sn=args[0].split('/').pop(), dn=args[1].split('/').pop();
    if(lockedFiles.includes(sn)) return {t:`cp: ${args[0]}: Permission denied`,e:1};
    if(vfiles[sn]===undefined) return {t:`cp: ${args[0]}: No such file`,e:1};
    vfiles[dn]=vfiles[sn];
    if(vfs[cwd]&&!vfs[cwd].includes(dn)) vfs[cwd].push(dn);
    return {t:`'${args[0]}' -> '${args[1]}'`,ok:1};
  },

  mv(args){
    if(args.length<2) return {t:'Usage: mv <src> <dst>',e:1};
    const sn=args[0].split('/').pop(), dn=args[1].split('/').pop();
    if(lockedFiles.includes(sn)) return {t:`mv: ${args[0]}: Permission denied`,e:1};
    if(vfiles[sn]===undefined) return {t:`mv: ${args[0]}: No such file`,e:1};
    vfiles[dn]=vfiles[sn]; delete vfiles[sn];
    if(vfs[cwd]){ const i=vfs[cwd].indexOf(sn); if(i>-1){vfs[cwd].splice(i,1);vfs[cwd].push(dn);} }
    return {t:`renamed '${args[0]}' -> '${args[1]}'`,ok:1};
  },

  whoami(){ return {t:env.USER}; },
  hostname(){ return {t:'nova.local'}; },

  id(){ return {t:`uid=1000(${env.USER}) gid=1000(${env.USER}) groups=1000(${env.USER}),80(admin),20(staff)`}; },

  uname(args){
    if(args.includes('-a')) return {t:'Darwin nova.local 28.0.0 macOS 2050 x86_64 Apple Neural Engine'};
    if(args.includes('-r')) return {t:'28.0.0'};
    if(args.includes('-m')) return {t:'x86_64'};
    return {t:'Darwin'};
  },

  date(args){
    const d=new Date();
    if(args[0]==='+%s') return {t:Math.floor(d.getTime()/1000)+''};
    if(args[0]==='+%Y') return {t:d.getFullYear()+''};
    if(args[0]==='+%H:%M') return {t:d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false})};
    return {t:d.toString()};
  },

  uptime(){
    const m=Math.floor(Math.random()*59+1), h=Math.floor(Math.random()*5+1);
    return {t:` ${new Date().toLocaleTimeString()}  up ${h}:${String(m).padStart(2,'0')},  1 user,  load avg: 0.12 0.18 0.22`};
  },

  echo(args){
    return {t:args.join(' ').replace(/\$(\w+)/g,(_,k)=>env[k]??'')};
  },

  env(){ return {t:Object.entries(env).map(([k,v])=>`${k}=${v}`).join('\n')}; },

  export(args){
    if(!args[0]) return {t:'Usage: export KEY=VALUE',e:1};
    const eq=args[0].indexOf('=');
    if(eq<0){ env[args[0]]=''; return {t:`export: ${args[0]}`,ok:1}; }
    const k=args[0].slice(0,eq), v=args[0].slice(eq+1);
    env[k]=v; return {t:`${k}=${v}`,ok:1};
  },

  history(){
    if(!cmdHistory.length) return {t:'(empty)'};
    return {t:cmdHistory.map((c,i)=>`  ${String(i+1).padStart(3,'0')}  ${c}`).join('\n')};
  },

  alias(){
    return {t:`ll='ls -la'\n..='cd ..'\ngrep='grep --color=auto'`};
  },

  which(args){
    if(!args[0]) return {t:'Usage: which <command>',e:1};
    const builtins=['ls','cd','cat','echo','pwd','cp','mv','rm','mkdir','grep','find','chmod','chown','ps','kill','ping','ssh','curl','df','du','top','free'];
    if(commands[args[0]]||builtins.includes(args[0])) return {t:`/usr/bin/${args[0]}`};
    return {t:`${args[0]} not found`,e:1};
  },

  ps(){
    return {t:
`  PID TTY          TIME CMD
    1 ?        00:00:01 launchd
  312 ?        00:00:03 kernel_task
  540 ?        00:00:00 WindowServer
  891 ttys001  00:00:00 zsh
  895 ttys001  00:00:00 ps`};
  },

  kill(args){
    const pid=parseInt(args[args.length-1]);
    if(!pid) return {t:'Usage: kill [-9] <pid>',e:1};
    if(pid===1||pid===312) return {t:`kill: ${pid}: Operation not permitted`,e:1};
    return {t:`process ${pid} terminated`,ok:1};
  },

  df(args){
    return {t:
`Filesystem       Size   Used  Avail  Use%  Mounted on
/dev/disk0s2    500G    82G   418G    16%  /
tmpfs            16G   512M    16G     3%  /tmp
/dev/disk1s1    256G   190G    66G    74%  /home`};
  },

  du(args){
    const path=args.find(a=>!a.startsWith('-'))||cwd;
    return {t:`4.2M\t${path}`};
  },

  top(){
    return {t:
`Processes: 142 total, 3 running
CPU usage: 4.2% user, 1.1% sys, 94.7% idle
MemRegions: 42156 total — 2.1G wired, 4.8G used, 9.1G free

  PID  COMMAND      %CPU   MEM
    1  launchd       0.0   3.2M
  540  WindowServer  2.1  88.4M
  891  zsh           0.0   4.1M
  312  kernel_task   1.8 320.0M

(press q to quit — static view)`};
  },

  free(){
    return {t:
`              total        used        free
Mem:       16384000     6291456    10092544
Swap:       8192000      204800     7987200`};
  },

  chmod(args){
    const t=args.filter(a=>!a.startsWith('-')&&!/^\d+$/.test(a));
    if(args.length<2) return {t:'Usage: chmod <mode> <file>',e:1};
    return {t:`mode changed: ${args[args.length-1]}`,ok:1};
  },

  chown(args){
    if(args.length<2) return {t:'Usage: chown <user> <file>',e:1};
    return {t:`owner changed: ${args[args.length-1]}`,ok:1};
  },

  find(args){
    const path=args[0]&&!args[0].startsWith('-')?args[0]:cwd;
    const name=args.includes('-name')?args[args.indexOf('-name')+1]:null;
    const rp=resolvePath(path);
    const dir=vfs[rp];
    if(!dir) return {t:`find: ${path}: No such file or directory`,e:1};
    const results=[rp, ...dir.map(n=>`${rp}/${n}`)].filter(p=>!name||p.includes(name.replace('*','')));
    return {t:results.join('\n')};
  },

  ssh(args){
    return {t:`ssh: connect to host ${args[0]||'localhost'} port 22: Connection refused`,e:1};
  },

  curl(args){
    return {t:`curl: (7) Failed to connect: network disabled`,e:1};
  },

  wget(args){
    return {t:`wget: unable to resolve host — network disabled`,e:1};
  },

  ping(args){
    const host=args.find(a=>!a.startsWith('-'))||'localhost';
    const n=args.includes('-c')?parseInt(args[args.indexOf('-c')+1])||4:4;
    let out=`PING ${host}: 56 data bytes\n`;
    for(let i=0;i<n;i++) out+=`64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${(Math.random()*20+1).toFixed(3)} ms\n`;
    out+=`--- ${host} ping statistics ---\n${n} packets transmitted, ${n} received, 0% packet loss`;
    return {t:out};
  },

  ifconfig(){
    return {t:
`lo0: flags=8049<UP,LOOPBACK,RUNNING> mtu 16384
      inet 127.0.0.1 netmask 0xff000000
eth0: flags=8863<UP,BROADCAST,RUNNING,SIMPLEX> mtu 1500
      inet 192.168.1.100 netmask 0xffffff00 broadcast 192.168.1.255
      ether a1:b2:c3:d4:e5:f6`};
  },

  netstat(){
    return {t:
`Active Internet connections
Proto Recv-Q Send-Q  Local                  Foreign                State
tcp4       0      0  192.168.1.100.55301    1.1.1.1.443            ESTABLISHED
tcp4       0      0  192.168.1.100.55302    93.184.12.7.443        ESTABLISHED
tcp6       0      0  *.22                   *.*                    LISTEN`};
  },

  wc(args){
    const f=args.find(a=>!a.startsWith('-'));
    if(!f) return {t:'Usage: wc <file>',e:1};
    const name=f.split('/').pop();
    if(lockedFiles.includes(name)) return {t:`wc: ${name}: Permission denied`,e:1};
    const c=vfiles[name];
    if(c===undefined) return {t:`wc: ${f}: No such file`,e:1};
    const l=c.split('\n').length, w=c.split(/\s+/).filter(Boolean).length, b=c.length;
    return {t:`${String(l).padStart(8)} ${String(w).padStart(8)} ${String(b).padStart(8)} ${f}`};
  },

  grep(args){
    const flags=args.filter(a=>a.startsWith('-'));
    const rest=args.filter(a=>!a.startsWith('-'));
    if(rest.length<2) return {t:'Usage: grep [-i] <pattern> <file>',e:1};
    const [pat,file]=rest;
    const name=file.split('/').pop();
    if(lockedFiles.includes(name)) return {t:`grep: ${name}: Permission denied`,e:1};
    const c=vfiles[name];
    if(!c) return {t:`grep: ${file}: No such file`,e:1};
    const re=new RegExp(pat,flags.includes('-i')?'i':'');
    const hits=c.split('\n').filter(l=>re.test(l));
    return hits.length?{t:hits.join('\n')}:{t:'(no match)'};
  },

  sort(args){
    const r=args.includes('-r');
    const f=args.find(a=>!a.startsWith('-'));
    if(!f) return {t:'Usage: sort [-r] <file>',e:1};
    const c=vfiles[f.split('/').pop()];
    if(!c) return {t:`sort: ${f}: No such file`,e:1};
    const lines=c.split('\n').sort();
    return {t:(r?lines.reverse():lines).join('\n')};
  },

  uniq(args){
    const f=args.find(a=>!a.startsWith('-'));
    if(!f) return {t:'Usage: uniq <file>',e:1};
    const c=vfiles[f.split('/').pop()];
    if(!c) return {t:`uniq: ${f}: No such file`,e:1};
    const lines=c.split('\n');
    return {t:lines.filter((l,i)=>l!==lines[i-1]).join('\n')};
  },

  file(args){
    if(!args[0]) return {t:'Usage: file <name>',e:1};
    const name=args[0];
    if(vfs[resolvePath(name)]) return {t:`${name}: directory`};
    if(/\.(txt|md|log)$/.test(name)) return {t:`${name}: ASCII text`};
    if(/\.key$/.test(name))  return {t:`${name}: PEM certificate data`};
    if(/\.zip$/.test(name))  return {t:`${name}: Zip archive data`};
    if(/\.pdf$/.test(name))  return {t:`${name}: PDF document`};
    if(lockedFiles.includes(name.split('/').pop())) return {t:`${name}: data (encrypted, cannot determine type)`};
    if(vfiles[name.split('/').pop()]!==undefined) return {t:`${name}: ASCII text`};
    return {t:`${name}: cannot determine`,e:1};
  },

  man(args){
    const m={
      ls:'ls — list directory contents\nUsage: ls [-a] [-l] [dir]',
      cd:'cd — change working directory\nUsage: cd [dir]',
      cat:'cat — concatenate and print files\nUsage: cat <file>',
      grep:'grep — search for patterns\nUsage: grep [-i] <pattern> <file>',
      rm:'rm — remove files\nUsage: rm [-r] <file>',
      ping:'ping — send ICMP packets\nUsage: ping [-c N] <host>',
      wc:'wc — count lines/words/bytes\nUsage: wc <file>',
      find:'find — search for files\nUsage: find [path] [-name pattern]',
      chmod:'chmod — change file mode\nUsage: chmod <mode> <file>',
      findmind:'findmind — access restricted memory partition\nUsage: findmind\nWarning: restricted area. Logs this access.',
    };
    if(!args[0]) return {t:'Usage: man <command>'};
    return m[args[0]]?{t:m[args[0]]}:{t:`No manual entry for ${args[0]}`,e:1};
  },

  /* ── FINDMIND — special command ── */
  findmind(){
    if(!vfs['/home/user/.mind']) vfs['/home/user/.mind']=['important.log','.shadow','.void'];
    cwd='/home/user/.mind';
    updatePS1();
    return {t:
`
███████╗██╗███╗   ██╗██████╗ ███╗   ███╗██╗███╗   ██╗██████╗
██╔════╝██║████╗  ██║██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗
█████╗  ██║██╔██╗ ██║██║  ██║██╔████╔██║██║██╔██╗ ██║██║  ██║
██╔══╝  ██║██║╚██╗██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║██║  ██║
██║     ██║██║ ╚████║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║██████╔╝
╚═╝     ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝

[ACCESS GRANTED] — Partition: /home/user/.mind/
─────────────────────────────────────────────────────
  important.log    3.1 KB    [readable]
  .shadow          ??? B     [locked — permission denied]
  .void            ??? B     [locked — permission denied]
─────────────────────────────────────────────────────
Type:  cat important.log  to read the log.
`, cls:'term-out-mind'};
  },

  sleep(args){
    const n=parseInt(args[0])||1;
    return {t:`sleeping ${n}s... (simulated)`,ok:1};
  },

  nano(args){
    return {t:`nano: ${args[0]||'new file'} — editor not available in this terminal.`};
  },

  vim(args){
    return {t:`vim: ${args[0]||'new file'} — editor not available. Try nano.`};
  },

  backtoterminal(){
    setTimeout(()=>{ window.location.href='terminal.html'; }, 400);
    return {t:'redirecting to terminal.html...', ok:1};
  },

  clear(){ return {t:'__clear__'}; },
  exit() { return {t:'__exit__'}; },
};

/* Terminal key handler */
function termKey(e) {
  const inp = document.getElementById('term-in');

  if (e.key==='ArrowUp') {
    if(histIdx<cmdHistory.length-1) histIdx++;
    inp.value=cmdHistory[cmdHistory.length-1-histIdx]||'';
    setTimeout(()=>inp.setSelectionRange(inp.value.length,inp.value.length),0);
    e.preventDefault(); return;
  }
  if (e.key==='ArrowDown') {
    if(histIdx>0) histIdx--; else { histIdx=-1; inp.value=''; e.preventDefault(); return; }
    inp.value=cmdHistory[cmdHistory.length-1-histIdx]||'';
    e.preventDefault(); return;
  }
  if (e.key==='Tab') {
    const partial=inp.value.trim().split(/\s+/).pop()||'';
    if(partial) {
      const dir=vfs[cwd]||[];
      const allCmds=Object.keys(commands);
      const pool=inp.value.trim().includes(' ')?dir:[...dir,...allCmds];
      const matches=pool.filter(n=>n.startsWith(partial));
      if(matches.length===1){
        const parts=inp.value.split(/\s+/); parts[parts.length-1]=matches[0];
        inp.value=parts.join(' ');
      } else if(matches.length>1) {
        const out=document.getElementById('term-out');
        const d=document.createElement('div');
        d.style.color='#aaa'; d.innerHTML=matches.join('  ');
        out.appendChild(d); out.scrollTop=out.scrollHeight;
      }
    }
    e.preventDefault(); return;
  }
  if (e.key!=='Enter') return;

  const raw=inp.value.trim(); inp.value=''; histIdx=-1;
  const out=document.getElementById('term-out');

  const cd=document.createElement('div');
  cd.innerHTML=`<span class="term-prompt">user@nova ${cwd} %</span> ${esc(raw)}`;
  out.appendChild(cd);

  if(!raw){ out.scrollTop=out.scrollHeight; return; }
  cmdHistory.push(raw);

  const parts=raw.split(/\s+/), name=parts[0], args=parts.slice(1);
  const fn=commands[name];

  if(!fn) {
    termAppend(`zsh: command not found: ${name}`, 'term-out-err');
  } else {
    const r=fn(args);
    if(!r){ out.scrollTop=out.scrollHeight; return; }
    if(r.t==='__exit__'){ closeWin('terminal'); return; }
    if(r.t==='__clear__'){ out.innerHTML=''; return; }
    if(r.t) termAppend(r.t, r.cls||(r.e?'term-out-err':r.ok?'term-out-ok':''));
    /* trigger popup after reading important.log */
    if((name==='cat'||name==='head'||name==='tail') && args.join(' ').includes('important.log') && !r.e) {
      triggerImportantLogPopup();
    }
  }
  out.scrollTop=out.scrollHeight;
}

/* important.log popup logic */
let impPopupTriggered = false;
let impNoTimer = null;

function triggerImportantLogPopup() {
  if(impPopupTriggered) return;
  impPopupTriggered = true;
  /* wait 15 seconds after reading, then show */
  setTimeout(() => {
    document.getElementById('imp-modal').classList.add('show');
  }, 15000);
}

function impChooseYes() {
  document.getElementById('imp-step1').style.display = 'none';
  document.getElementById('imp-step2').style.display = 'block';
  const name = PlayerStorage.get();
  setTimeout(() => {
    window.location.href = 'end.html?name=' + encodeURIComponent(name) + '&choice=yes';
  }, 1800);
}

function impSubmitName() {
  const name = PlayerStorage.get();
  window.location.href = 'end.html?name=' + encodeURIComponent(name) + '&choice=yes';
}

function impChooseNo() {
  document.getElementById('imp-step1').style.display = 'none';
  document.getElementById('imp-step3').style.display = 'block';
  let t = 5;
  document.getElementById('imp-no-cd').textContent = t;
  impNoTimer = setInterval(() => {
    t--;
    document.getElementById('imp-no-cd').textContent = t;
    if(t <= 0) {
      clearInterval(impNoTimer);
      window.location.href = 'end.html?choice=no';
    }
  }, 1000);
}

function goToWarnPage() {
  window.location.href = 'end.html';
}

/* Clock */
function tick(){ document.getElementById('top-clock').textContent=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}); }
tick(); setInterval(tick,3000);
