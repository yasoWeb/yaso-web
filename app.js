// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const toggle = document.querySelector(".navToggle");
const nav = document.querySelector("[data-nav]");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
nav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("is-open"));
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Heart particles
const heartsLayer = document.querySelector(".hearts");
const HEART_SYMBOLS = ["\u2764", "\u2765", "\u2661", "\u2665", "\u273F", "\u2727", "\u2733"];
function popHeart(x, y, opts = {}) {
  if (!heartsLayer) return;
  const el = document.createElement("div");
  el.className = `heart ${opts.variant || (Math.random() > 0.5 ? "rose" : "mint")}`;
  el.textContent = opts.symbol || HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.fontSize = `${opts.size || (12 + Math.random() * 14)}px`;
  el.style.opacity = "0";
  heartsLayer.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}
let ambientHeartsTimer;
function startAmbientHearts() {
  if (!heartsLayer) return;
  stopAmbientHearts();
  if (prefersReduced) return;
  ambientHeartsTimer = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight - 30 - Math.random() * 80;
    popHeart(x, y, { size: 12 + Math.random() * 8, variant: Math.random() > 0.5 ? "rose" : "violet" });
  }, 1200);
}
function stopAmbientHearts() {
  if (ambientHeartsTimer) {
    clearInterval(ambientHeartsTimer);
    ambientHeartsTimer = undefined;
  }
}
window.addEventListener("pointerdown", (e) => {
  if (Math.random() < 0.6) popHeart(e.clientX, e.clientY);
});

// Sparkles button
document.getElementById("confettiBtn")?.addEventListener("click", () => {
  const cx = window.innerWidth * 0.5;
  const cy = window.innerHeight * 0.4;
  const bursts = 28;
  for (let i = 0; i < bursts; i++) {
    setTimeout(() => popHeart(
      cx + (Math.random() * 160 - 80),
      cy + (Math.random() * 80 - 40),
      { symbol: HEART_SYMBOLS[i % HEART_SYMBOLS.length], size: 14 + Math.random() * 10 }
    ), i * 30);
  }
});

// Copy sweet line
const line = "Yasmeen, your elegance makes the future feel softer.";
const status = document.getElementById("copyStatus");
document.getElementById("copyBtn")?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(line);
    status.textContent = "Copied <3";
    setTimeout(() => (status.textContent = ""), 1600);
  } catch {
    status.textContent = "Couldn't copy (browser blocked it).";
    setTimeout(() => (status.textContent = ""), 2000);
  }
});

// Sound toggle now controls music playback (no flower chimes)

// Starfield background
const starCanvas = document.getElementById("stars");
if (starCanvas) {
  const ctx = starCanvas.getContext("2d");
  let stars = [];
  function resize() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    stars = new Array(140).fill(0).map(() => ({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 1.6 + 0.4,
      p: Math.random() * Math.PI * 2
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (const s of stars) {
      s.p += 0.02;
      const alpha = 0.3 + Math.sin(s.p) * 0.25;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  resize();
  draw();
  window.addEventListener("resize", resize);
}

// Romantic phrases (80+)
const PHRASES = [
  // best/most romantic
  "You make the ordinary feel like a secret miracle.",
  "You're the soft light my day keeps searching for.",
  "Even time slows down when you smile.",
  "You're my favorite kind of beautiful—quiet and true.",
  "You bloom in my thoughts without trying.",
  "You're the reason my future feels warmer.",
  "I'd choose you in every timeline.",
  "You turn moments into memories.",
  "If elegance had a name, it would be yours.",
  "You feel like peace in human form.",
  "You're a sunrise I never get used to.",
  "You're the softest kind of magic.",
  "You're the sweetest plot twist.",
  "You belong in every beautiful thing.",
  "You're my favorite thought to return to.",
  "You're proof that gentleness is powerful.",
  "You make the future feel romantic.",
  "Your name looks beautiful in my thoughts.",
  "You're the gentlest kind of unforgettable.",
  "You're the reason romance still makes sense.",

  // All cheesy ones 
  "Yasmeen… you’re my favorite notification.",
  "If you were a song, I’d put you on repeat forever.",
  "You must be tired… you’ve been running through my mind all day.",
  "I’m not a photographer, but I can picture us together.",
  "Are you Wi-Fi? Because I’m feeling a strong connection.",
  "You’re the ‘wow’ in my ‘wowww’.",
  "You’re the reason I forget what I was saying.",
  "If smiles were currency, you’d make me rich.",
  "You’re the plot twist I actually wanted.",
  "You’re my favorite kind of distraction.",
  "I’d choose you in every playlist, every time.",
  "You’re the sunshine… and I’m definitely the sunflower.",
  "Your name looks good in my future.",
  "You’re my comfort person — even in my thoughts.",
  "I wasn’t planning on falling… then you said hi.",
  "You’re cute. That’s it. That’s the whole sentence.",
  "You’re the sparkle my day was missing.",
  "You’re the reason my heart does that stupid little thing.",
  "If you were a dessert, you’d be the one I pretend I’m ‘just tasting’.",
  "You’re like a soft song at 2 AM — calming and addictive.",
  "You make my heart say ‘again’.",
  "You’re the cherry on top of my brain.",
  "You’re the main character. I’m just lucky to be in the scene.",
  "I like you more than I like sleep. That’s serious.",
  "You’re my favorite ‘what if’ that feels like ‘when’.",
  "You make my heart do parkour.",
  "You’re the reason I believe in cute coincidences.",
  "If you were a star, I’d never look away.",
  "You’re the kind of pretty that makes me forget my manners.",
  "You’re the softest flex the universe ever made.",
  "I’m jealous of your mirror.",
  "You’re my type: kind, elegant, and dangerously adorable.",
  "You’re the reason I opened my phone… and forgot why.",
  "You’re the sweet in my ‘sweet dreams’.",
  "You’re my favorite ‘hello’ and my hardest ‘bye’.",
  "You’re the calm that still makes my heart race.",
  "You + me = a very cute problem.",
  "I’m not saying you’re perfect… but my heart disagrees.",
  "You’re the reason my playlist suddenly sounds romantic.",
  "If you were a season, you’d be spring (with extra butterflies).",
  "You’re my daily dose of ‘aww’.",
  "You’re the ‘I can’t stop smiling’ kind of person.",
  "You’re the reason I believe in good timing.",
  "Your vibe? Illegal. Too good.",
  "You’re my favorite reason to be nervous.",
  "You’re the dream I don’t want to wake up from.",
  "You’re the cutest part of my day — every day.",
  "I’d pause my game for you. That’s love.",
  "You make my heart feel like it’s wearing fresh sneakers.",
  "I don’t need luck… I just need you.",
  "You’re the ‘extra’ I actually wanted.",
  "You’re the reason my heart learned new words.",
  "You’re my favorite kind of chaos: cute.",
  "You’re the only person who can make silence feel romantic.",
  "You’re the reason my future feels softer.",
  "You’re like a warm hoodie… but in human form.",
  "You’re my favorite ‘oops’ — as in, oops I fell for you.",
  "If beauty was a crime… you’d be serving life.",
  "You’re the reason my heart has a playlist now.",
  "You make me forget my ‘cool’ settings.",
  "I’m into you like flowers are into sunlight.",
  "You’re the reason my heart keeps hitting ‘send’.",
  "You’re my favorite kind of ‘can’t explain it’.",
  "You make my day look better in every filter.",
  "I’d cross the street just to walk next to you.",
  "You’re the reason I suddenly believe in romance again.",
  "You’re the cutest yes my heart ever said.",
  "You’re my favorite soft moment.",
  "You’re the reason my brain plays love songs uninvited.",
  "You’re the ‘wow’ my life was missing.",
  "You’re the kind of pretty that feels peaceful.",
  "You make my heart feel like it’s smiling.",
];


const garden = document.querySelector(".garden");
const phraseLayer = document.querySelector(".phraseLayer");
const phraseOverlay = document.querySelector(".phraseStream");
const flowers = [];
const MAX_FLOWERS = 70;
const MIN_FLOWERS = 12;
const MAX_PHRASES = 8;
const dpr = Math.min(window.devicePixelRatio || 1, 2);
let overlayBusy = false;
const bloomQueue = [];
const FLOWER_MARGIN_PCT = 3; // keep flowers away from viewport edges
const FLOWER_JITTER_PCT = 2; // slight jitter to avoid perfect grid
const LEAF_SCALE = 0.65; // smaller leaves
const PETAL_BASE_COUNT = 6;
const PETAL_VARIATION = 2; // allows 6–8 petals for variation

// ===== Background Music via YouTube (robust loader) =====
const TRACKS = [
  { id:"asabak", title:"Abdulrahman Mohammed & Mohab Omer — أصابك عشق", yt:"E-n6TIa2lvc" }, // lyrics version
  { id:"amr",    title:"Amr Diab & Orange — خطفوني",                 yt:"QvDb3YGYfcs" }, // lyric upload
  { id:"bigsam", title:"BiGSaM — ست بيتي",                           yt:"l3C4cqtwpkM" }, // official MV (unchanged)
  { id:"sonder", title:"Sonder — Too Fast",                          yt:"flM8-rR0_O8" }, // audio version
];

const musicMenu = document.getElementById("musicMenu");
const musicPill = document.getElementById("musicPill");
const musicDropdown = document.getElementById("musicDropdown");
const musicList = document.getElementById("musicList");
const musicNow = document.getElementById("musicNow");
const soundToggle = document.getElementById("soundToggle");
const ctrlPrev = document.getElementById("ctrlPrev");
const ctrlPlay = document.getElementById("ctrlPlay");
const ctrlStop = document.getElementById("ctrlStop");
const ctrlNext = document.getElementById("ctrlNext");
const musicSeek = document.getElementById("musicSeek");
const musicTime = document.getElementById("musicTime");

let player = null;
let currentTrackId = null;

const LS_LAST = "lastTrackId";
const LS_MUTED = "musicMuted";

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function hash2d(x, y) {
  return (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
}

function isMuted() {
  return localStorage.getItem(LS_MUTED) === "1";
}

function setMuted(m) {
  localStorage.setItem(LS_MUTED, m ? "1" : "0");
  if (player?.mute) m ? player.mute() : player.unMute();
  updateMusicUI();
}

function pickRandomTrack() {
  const last = localStorage.getItem(LS_LAST);
  let pick = TRACKS[Math.floor(Math.random() * TRACKS.length)].id;
  if (TRACKS.length > 1 && pick === last) {
    pick = TRACKS.find(t => t.id !== last)?.id || pick;
  }
  localStorage.setItem(LS_LAST, pick);
  return pick;
}

function getTrack(id) {
  return TRACKS.find(t => t.id === id) || TRACKS[0];
}

function loadYouTubeAPI() {
  return new Promise((resolve, reject) => {
    console.log("[Music] loadYouTubeAPI: start");
    if (window.YT?.Player) return resolve();

    const existing = document.querySelector('script[data-yt-api="1"]');
    if (existing) {
      console.log("[Music] loadYouTubeAPI: script already injected, waiting...");
      const t0 = Date.now();
      const timer = setInterval(() => {
        if (window.YT?.Player) { clearInterval(timer); console.log("[Music] loadYouTubeAPI: ready"); resolve(); }
        if (Date.now() - t0 > 8000) { clearInterval(timer); console.warn("[Music] loadYouTubeAPI: timeout"); reject(new Error("YT API timed out")); }
      }, 100);
      return;
    }

    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    s.dataset.ytApi = "1";
    s.onerror = () => { console.error("[Music] loadYouTubeAPI: script error"); reject(new Error("YT API failed to load (blocked?)")); };

    window.onYouTubeIframeAPIReady = () => { console.log("[Music] onYouTubeIframeAPIReady fired"); resolve(); };

    console.log("[Music] loadYouTubeAPI: injecting", s.src);
    document.head.appendChild(s);
  });
}

async function ensurePlayer(startTrackId) {
  console.log("[Music] ensurePlayer: start", { startTrackId });
  await loadYouTubeAPI();

  const el = document.getElementById("ytPlayer");
  if (!el) { console.error("[Music] ensurePlayer: #ytPlayer missing in HTML"); throw new Error("#ytPlayer div missing in HTML"); }

  const t = getTrack(startTrackId);
  currentTrackId = t.id;
  console.log("[Music] ensurePlayer: using track", { id: t.id, yt: t.yt });

  if (player?.loadVideoById) {
    console.log("[Music] ensurePlayer: reusing existing player");
    player.loadVideoById(t.yt);
    setMuted(isMuted());
    return player;
  }

  console.log("[Music] ensurePlayer: creating new YT.Player");
  player = new YT.Player("ytPlayer", {
    videoId: t.yt,
    host: "https://www.youtube-nocookie.com",
    playerVars: {
      autoplay: 1,
      controls: 0,
      playsinline: 1,
      rel: 0,
      modestbranding: 1,
      origin: window.location.origin
    },
    events: {
      onReady: () => {
        console.log("[Music] player onReady");
        setMuted(isMuted());
        console.log("[Music] player onReady: muted?", isMuted());
        if (!isMuted()) {
          try { player.playVideo(); } catch (_) {}
        }
        try { console.log("[Music] player onReady: state", player.getPlayerState?.()); } catch {}
        updateMusicUI();
        if (!isMuted()) startProgressTimer();
      },
      onStateChange: (e) => {
        console.log("[Music] player onStateChange", e?.data);
        if (e.data === YT.PlayerState.ENDED) {
          try { player.playVideo(); } catch (_) {}
        }
        updateMusicUI();
        if (e.data === YT.PlayerState.PLAYING) startProgressTimer();
      }
    }
  });

  return player;
}

function loadTrack(id) {
  console.log("[Music] loadTrack: requested", id);
  const t = getTrack(id);
  currentTrackId = t.id;
  localStorage.setItem(LS_LAST, t.id);
  console.log("[Music] loadTrack: resolved", { id: t.id, yt: t.yt });

  if (player?.loadVideoById) {
    console.log("[Music] loadTrack: existing player -> loadVideoById");
    player.loadVideoById(t.yt);
    setMuted(isMuted());
    try { player.playVideo(); } catch (_) {}
  } else {
    console.log("[Music] loadTrack: player not ready, ensuring player");
    ensurePlayer(t.id).catch(console.error);
  }

  updateMusicUI();
}

function togglePlay() {
  console.log("[Music] togglePlay");
  if (!player) return;
  const state = player.getPlayerState?.();
  console.log("[Music] togglePlay: current state", state);
  if (state === YT.PlayerState.PLAYING) player.pauseVideo();
  else player.playVideo();
  try { console.log("[Music] togglePlay: new state", player.getPlayerState?.()); } catch {}
  updateMusicUI();
}

function toggleMuteAndPlay() {
  console.log("[Music] toggleMuteAndPlay");
  const nextMuted = !isMuted();
  setMuted(nextMuted);
  console.log("[Music] toggleMuteAndPlay: muted now?", nextMuted);

  if (player?.playVideo) {
    try { player.playVideo(); } catch (_) {}
  }
  try { console.log("[Music] toggleMuteAndPlay: state after click", player?.getPlayerState?.()); } catch {}
  updateMusicUI();
}

function promptEnableSound() {
  const userAllowed = confirm("🔊 Enable Sound?\n\nAllow: Enable music\nCancel: Keep sound off");
  console.log("[Music] promptEnableSound: userAllowed =", userAllowed);
  if (userAllowed) {
    console.log("[Music] promptEnableSound: setting unmuted and playing");
    setMuted(false);
    try { 
      if (player?.playVideo) {
        player.playVideo();
        console.log("[Music] promptEnableSound: playVideo called");
      }
    } catch (e) { 
      console.error("[Music] promptEnableSound: playVideo failed:", e); 
    }
  } else {
    console.log("[Music] promptEnableSound: user denied, keeping muted");
    setMuted(true);
  }
}

function stopPlayback() {
  if (!player?.stopVideo) return;
  try { player.stopVideo(); } catch (_) {}
  updateMusicUI();
}

function nextTrack() {
  const list = TRACKS;
  const idx = list.findIndex(t => t.id === currentTrackId);
  const next = list[(idx + 1) % list.length];
  loadTrack(next.id);
}

function prevTrack() {
  const list = TRACKS;
  const idx = list.findIndex(t => t.id === currentTrackId);
  const prev = list[(idx - 1 + list.length) % list.length];
  loadTrack(prev.id);
}

function formatTime(sec) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2,'0')}`;
}

let progressTimer;
function startProgressTimer() {
  clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    if (!player?.getCurrentTime) return;
    const cur = player.getCurrentTime();
    const dur = player.getDuration?.() || 0;
    if (musicSeek) {
      const pct = dur ? (cur / dur) * 100 : 0;
      musicSeek.value = String(pct);
    }
    if (musicTime) musicTime.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
  }, 500);
}

function updateMusicUI() {
  const track = getTrack(currentTrackId);
  if (musicNow && track) musicNow.textContent = track.title;
  if (soundToggle) {
    const muted = isMuted();
    soundToggle.textContent = muted ? "Sound: Off" : "Sound: On";
    soundToggle.setAttribute("aria-pressed", muted ? "false" : "true");
  }
  if (musicDropdown) {
    musicDropdown.querySelectorAll(".musicTrack").forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.trackId === currentTrackId);
    });
  }
  console.log("[Music] updateMusicUI", { currentTrackId, muted: isMuted() });
}

function buildDropdown() {
  console.log("[Music] buildDropdown: building", TRACKS.length, "tracks");
  if (!musicDropdown) return;
  const container = musicList || musicDropdown;
  container.querySelectorAll(".musicTrack").forEach(el => el.remove());
  
  TRACKS.forEach(track => {
    const btn = document.createElement("button");
    btn.className = "musicTrack";
    btn.type = "button";
    btn.dataset.trackId = track.id;
    btn.textContent = track.title;
    btn.setAttribute("role", "menuitem");
    btn.addEventListener("click", () => {
      console.log("[Music] buildDropdown: click track", track.id);
      loadTrack(track.id);
      closeDropdown();
    });
    container.appendChild(btn);
  });
  updateMusicUI();
}

function openDropdown() {
  if (!musicMenu) return;
  musicMenu.classList.add("open");
  musicPill?.setAttribute("aria-expanded", "true");
}

function closeDropdown() {
  if (!musicMenu) return;
  musicMenu.classList.remove("open");
  musicPill?.setAttribute("aria-expanded", "false");
}

window.__music = {
  tracks: TRACKS,
  getCurrent: () => currentTrackId,
  loadTrack,
  togglePlay,
  toggleMuteAndPlay,
  stop: stopPlayback,
  next: nextTrack,
  prev: prevTrack,
  seekPct: (pct) => {
    const dur = player?.getDuration?.() || 0;
    if (!dur || !player?.seekTo) return;
    const target = dur * (pct / 100);
    player.seekTo(target, true);
  },
  isMuted,
  updateUI: updateMusicUI
};

buildDropdown();

function streamPhrase(text, onDone) {
  if (!phraseOverlay) {
    onDone?.();
    return;
  }
  if (overlayBusy) return;
  overlayBusy = true;
  phraseOverlay.innerHTML = '<div class="text"></div>';
  const node = phraseOverlay.querySelector(".text");
  phraseOverlay.classList.add("is-visible");
  if (prefersReduced) {
    node.textContent = text;
    setTimeout(() => {
      phraseOverlay.classList.remove("is-visible");
      overlayBusy = false;
      onDone?.();
    }, 1200);
    return;
  }
  let i = 0;
  const speed = 32;
  const timer = setInterval(() => {
    node.textContent = text.slice(0, i++);
    if (i > text.length) {
      clearInterval(timer);
      setTimeout(() => {
        phraseOverlay.classList.remove("is-visible");
        overlayBusy = false;
        onDone?.();
      }, 900);
    }
  }, speed);
}

function animateFlowerToCenter(btn, rect) {
  if (!phraseLayer) return;
  const canvas = btn.querySelector("canvas");
  if (!canvas) return;
  const clone = canvas.cloneNode();
  clone.width = canvas.width;
  clone.height = canvas.height;
  const cctx = clone.getContext("2d");
  cctx.drawImage(canvas, 0, 0);

  const shell = document.createElement("div");
  shell.className = "center-flower";
  shell.style.left = `${rect.left}px`;
  shell.style.top = `${rect.top}px`;
  shell.style.width = `${rect.width}px`;
  shell.style.height = `${rect.height}px`;
  shell.appendChild(clone);
  phraseLayer.appendChild(shell);

  const targetX = window.innerWidth * 0.5;
  const targetY = window.innerHeight * 0.35;
  const dx = targetX - (rect.left + rect.width / 2);
  const dy = targetY - (rect.top + rect.height / 2);
  shell.style.setProperty("--dx", `${dx}px`);
  shell.style.setProperty("--dy", `${dy}px`);

  requestAnimationFrame(() => shell.classList.add("to-center"));
  setTimeout(() => shell.remove(), prefersReduced ? 800 : 1600);
}

function createFlowerElement() {
  const btn = document.createElement("button");
  btn.className = "pflower";
  btn.type = "button";
  btn.setAttribute("aria-label", "Flower: trigger romantic phrase");

  const depth = Math.ceil(Math.random() * 3);
  const size = 38 + Math.random() * 18; // bloom size
  const stem = 70 + Math.random() * 60; // stem height
  const widthCss = size * 1.9;
  const heightCss = stem + size * 1.6;

  btn.dataset.depth = String(depth);
  btn.style.setProperty("--w", `${widthCss}px`);
  btn.style.setProperty("--h", `${heightCss}px`);

  const canvas = document.createElement("canvas");
  const wPx = Math.max(64, Math.round(widthCss * dpr));
  const hPx = Math.max(80, Math.round(heightCss * dpr));
  canvas.width = wPx;
  canvas.height = hPx;
  canvas.style.width = `${widthCss}px`;
  canvas.style.height = `${heightCss}px`;
  btn.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const finalPixels = new Uint8ClampedArray(wPx * hPx * 4);
  const working = new Uint8ClampedArray(finalPixels.length);
  const imgData = new ImageData(working, wPx, hPx);

  const bloomRadius = size * dpr * 0.5;
  const cx = wPx / 2;
  const cy = hPx - stem * dpr;
  const petals = PETAL_BASE_COUNT + Math.floor(Math.random() * (PETAL_VARIATION + 1));
  const lightDir = { x: -0.3, y: -0.9 };

  function drawPixel(px, py, color) {
    const idx = (py * wPx + px) * 4;
    finalPixels[idx] = color.r;
    finalPixels[idx + 1] = color.g;
    finalPixels[idx + 2] = color.b;
    finalPixels[idx + 3] = color.a;
  }

  function renderFlowerPixels() {
    for (let y = 0; y < hPx; y++) {
      for (let x = 0; x < wPx; x++) {
        const nx = x / dpr;
        const ny = y / dpr;
        const dx = nx - cx / dpr;
        const dy = ny - cy / dpr;
        const len = Math.sqrt(dx * dx + dy * dy);
        const theta = Math.atan2(dy, dx);

        // base alpha
        let a = 0;
        let r = 0, g = 0, b = 0;

        // Stem area
        const stemTop = hPx / dpr - stem;
        if (ny >= stemTop) {
          const t = (ny - stemTop) / (stem + 1);
          const sway = Math.sin(theta + ny * 0.03) * 1.5;
          const distStem = Math.abs(dx - sway);
          if (distStem < 2.6) {
            const leafBand = Math.abs((ny % 24) - 12) < 6;
            const baseG = 180 + hash2d(x, y) * 50;
            r = 40; g = baseG; b = 130;
            if (leafBand) { g += 30; }
            a = 255;
          }
        }

        // Leaves
        const leafY = hPx / dpr - stem * 0.55;
        const ly = ny - leafY;
        const lxL = dx + size * 0.25;
        const lxR = dx - size * 0.25;
        const leafW = size * 0.25 * LEAF_SCALE;
        const leafH = size * 0.08 * LEAF_SCALE;
        const leafMask = (lx, ly, rot) => {
          const c = Math.cos(rot), s = Math.sin(rot);
          const rx = lx * c - ly * s;
          const ry = lx * s + ly * c;
          const ell = (rx * rx) / (leafW * leafW) + (ry * ry) / (leafH * leafH);
          return ell < 1;
        };
        if (leafMask(lxL, ly, -0.5) || leafMask(lxR, ly, 0.6)) {
          const grain = hash2d(x, y);
          r = 48 + grain * 16;
          g = 170 + grain * 40;
          b = 110 + grain * 18;
          a = 240;
        }

        // Petals (super simple rose/superformula inspired)
        const petalRadius = bloomRadius * (0.74 + 0.2 * Math.cos(petals * theta));
        const inner = len < petalRadius && ny < cy / dpr + bloomRadius * 0.95;
        if (inner) {
          const edge = petalRadius - len;
          const softness = 0.18 + hash2d(x, y) * 0.06;
          const rim = Math.max(0, Math.min(1, edge / (bloomRadius * softness)));
          const centerGlow = Math.max(0, 1 - len / (bloomRadius * 0.9));
          const light = Math.max(0, (dx / bloomRadius) * lightDir.x + (dy / bloomRadius) * lightDir.y);
          const grain = hash2d(x, y);
          const tint = 228 + rim * 18 + centerGlow * 12;
          r = tint + light * 26 + grain * 6;
          g = tint + light * 18 + centerGlow * 8;
          b = 218 + rim * 12 + light * 16;
          a = 185 + rim * 55 + centerGlow * 40;
        }

        // Center
        const centerR = bloomRadius * 0.25;
        if (len < centerR) {
          const grain = hash2d(x, y);
          r = 240 + grain * 10;
          g = 206 + grain * 40;
          b = 120 + grain * 20;
          a = 255;
        }

        if (a > 0) drawPixel(x, y, { r, g, b, a });
      }
    }
  }

  renderFlowerPixels();

  function paintStep(revealIndex = 0) {
    if (prefersReduced) {
      working.set(finalPixels);
      ctx.putImageData(imgData, 0, 0);
      return;
    }
    const chunk = 1200;
    const end = Math.min(finalPixels.length, revealIndex + chunk);
    working.set(finalPixels.subarray(revealIndex, end), revealIndex);
    ctx.putImageData(imgData, 0, 0);
    if (end < finalPixels.length) {
      requestAnimationFrame(() => paintStep(end));
    }
  }
  paintStep();

  return btn;
}

function spawnPhrase(text, x, y) {
  if (!phraseLayer) return;
  while (phraseLayer.children.length >= MAX_PHRASES) {
    phraseLayer.removeChild(phraseLayer.firstChild);
  }
  const el = document.createElement("div");
  el.className = "floatingPhrase";
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  if (prefersReduced) {
    el.style.animation = "none";
    el.style.opacity = "1";
  }
  phraseLayer.appendChild(el);
  setTimeout(() => el.remove(), prefersReduced ? 1200 : 2400);
}

function processQueue() {
  if (overlayBusy) return;
  const next = bloomQueue.shift();
  if (!next) return;
  runBloom(next.btn);
}

function triggerBloom(btn) {
  if (btn.dataset.cooldown === "1") return;
  btn.dataset.cooldown = "1";
  btn.classList.add("is-blooming");
  setTimeout(() => {
    btn.classList.remove("is-blooming");
    btn.dataset.cooldown = "0";
  }, 900);
  bloomQueue.push({ btn });
  processQueue();
}

function runBloom(btn) {
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const phrase = randomItem(PHRASES);
  const onDone = () => {
    overlayBusy = false;
    processQueue();
  };
  streamPhrase(phrase, onDone);
  animateFlowerToCenter(btn, rect);
}
function attachFlowerInteraction(btn) {
  const handler = () => triggerBloom(btn);
  btn.addEventListener("pointerenter", handler);
  btn.addEventListener("pointerdown", (e) => { e.preventDefault(); handler(); });
  btn.addEventListener("focus", handler);
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler();
    }
  });
}

function ensureFlowers() {
  if (!garden) return;
  const progress = (window.scrollY + window.innerHeight * 0.8) / document.documentElement.scrollHeight;
  const target = Math.min(MAX_FLOWERS, Math.max(MIN_FLOWERS, Math.round(progress * MAX_FLOWERS)));
  while (flowers.length < target) {
    const f = createFlowerElement();
    attachFlowerInteraction(f);
    garden.appendChild(f);
    flowers.push(f);
  }
  layoutFlowers();
}

function layoutFlowers() {
  if (!flowers.length) return;
  const total = flowers.length;
  const span = 100 - FLOWER_MARGIN_PCT * 2;
  flowers.forEach((f, i) => {
    const base = FLOWER_MARGIN_PCT + (span * (i + 0.5)) / total;
    const jitter = (Math.random() * 2 - 1) * FLOWER_JITTER_PCT;
    const pos = Math.min(100 - FLOWER_MARGIN_PCT, Math.max(FLOWER_MARGIN_PCT, base + jitter));
    f.style.left = `${pos}%`;
  });
}

let scrollRaf;
window.addEventListener("scroll", () => {
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
  scrollRaf = requestAnimationFrame(ensureFlowers);
});
window.addEventListener("resize", ensureFlowers);

// Start
ensureFlowers();
startAmbientHearts();

// Init music on page load (runs first, independent of UI)
setMuted(true);
const startId = pickRandomTrack();
console.log("[Music] init: starting with", startId);
ensurePlayer(startId).catch((err) => {
  console.warn("[Music] Music init failed:", err.message);
});

// Prompt user to enable sound after a delay
setTimeout(() => {
  console.log("[Music] showing sound prompt");
  promptEnableSound();
}, 2500);

// Music widget UI bindings
if (musicMenu) {
  musicPill?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (musicMenu.classList.contains("open")) closeDropdown(); else openDropdown();
  });
  musicMenu.addEventListener("mouseenter", () => {
    if (!('ontouchstart' in window)) openDropdown();
  });
  soundToggle?.addEventListener("click", () => toggleMuteAndPlay());
  ctrlPlay?.addEventListener("click", () => togglePlay());
  ctrlStop?.addEventListener("click", () => stopPlayback());
  ctrlNext?.addEventListener("click", () => nextTrack());
  ctrlPrev?.addEventListener("click", () => prevTrack());
  musicSeek?.addEventListener("input", (e) => {
    if (!player?.seekTo) return;
    const dur = player.getDuration?.() || 0;
    const pct = parseFloat(e.target.value || "0");
    const target = dur * (pct / 100);
    try { player.seekTo(target, true); } catch (_) {}
  });
  
  document.addEventListener("click", (e) => {
    if (!musicMenu.contains(e.target)) closeDropdown();
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") closeDropdown();
  });
}

// Global debug helper
window.__music = window.__music || {};
window.__music.debug = () => {
  try {
    const state = player?.getPlayerState?.();
    console.table({
      hasYT: !!window.YT,
      hasPlayerConstructor: !!window.YT?.Player,
      playerExists: !!player,
      playerState: state,
      muted: isMuted(),
      currentTrackId,
    });
  } catch(e) { console.error("[Music] debug error", e); }
};
