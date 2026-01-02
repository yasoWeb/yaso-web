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
  "Yasmeen, your elegance turns moments into constellations.",
  "In a quieter future, your kindness will be the loudest thing.",
  "Every day feels lighter because you exist in it.",
  "You’re the soft power that time can’t outshine.",
  "The world gets better in your presence, almost without trying.",
  "If starlight had a voice, it would speak like you."
];


const garden = document.querySelector(".garden");
const phraseLayer = document.querySelector(".phraseLayer");
const phraseOverlay = document.querySelector(".phraseStream");
const flowers = [];
const MAX_FLOWERS = 70;
const MIN_FLOWERS = 12;
const MAX_PHRASES = 8;
const dpr = Math.min(window.devicePixelRatio || 1, 2);
let phraseOrder = [];
let phrasePtr = 0;
let overlayBusy = false;
const bloomQueue = [];
const FLOWER_MARGIN_PCT = 3; // keep flowers away from viewport edges
const FLOWER_JITTER_PCT = 2; // slight jitter to avoid perfect grid
const LEAF_SCALE = 0.65; // smaller leaves
const PETAL_BASE_COUNT = 6;
const PETAL_VARIATION = 2; // allows 6–8 petals for variation
let diagnosisModal = null;

// ===== Background Music via YouTube (robust loader) =====
const TRACKS = [
  { id:"asabak",   title:"Abdulrahman Mohammed & Mohab Omer — أصابك عشق", yt:"E-n6TIa2lvc" }, // lyrics version
  { id:"amr",      title:"Amr Diab & Orange — خطفوني",                   yt:"QvDb3YGYfcs" }, // lyric upload
  { id:"bigsam",   title:"BiGSaM — ست بيتي",                             yt:"l3C4cqtwpkM" }, // official MV (unchanged)
  { id:"sonder",   title:"Sonder — Too Fast",                             yt:"flM8-rR0_O8" }, // audio version

  { id:"needed",     title:"Brent Faiyaz — Needed",                       yt:"jl1Ysej81QA" },
  { id:"nerkab",     title:"Abu Ward — نركب هالسيارة (Nerkab Hal Syara)",  yt:"y6w8wcE2QK0" },
  { id:"someoneNew", title:"Sonder — Someone New",                        yt:"kX8thdw7tOE" },
  { id:"insecure",   title:"Brent Faiyaz — Insecure",                     yt:"gRXQGdQHHlw" },
  { id:"sirens",     title:"Sonder — Sirens",                             yt:"x-M3G3JXSLI" },
  { id:"deadman",    title:"Brent Faiyaz — DEAD MAN WALKING",             yt:"pBR01ndtids" },
  { id:"addictions", title:"Brent Faiyaz — ADDICTIONS (feat. Tre' Amani)", yt:"YoAjth_dwAQ" },
  { id:"aroundme",   title:"Brent Faiyaz — Around Me",                    yt:"EyfFq4ffz8w" },
  { id:"missinout",  title:"Brent Faiyaz — Missin Out",                   yt:"RCg1iIvwy0E" },
  { id:"shokran",    title:"Amr Diab — شكراً من هنا لبكرة",               yt:"Gj9pj3-M-eE" },
  { id:"gangoverluv",title:"Brent Faiyaz — Gang Over Luv",                yt:"xr-IZmMZYM8" },
  { id:"bisaraha",   title:"Abeer Nehme — بصراحة (Bi Saraha)",            yt:"rH9mDCe83v0" },
  { id:"yalayaly",   title:"Sherine — يا ليالي (Ya Layaly)",              yt:"d6R1y2wVM8Y" },
  { id:"meeny",      title:"Nour — Meen Ysadak (feat. Eldab3)",           yt:"5uh9imWsNNY" },
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

function closeDiagnosisModal() {
  if (!diagnosisModal) return;
  diagnosisModal.remove();
  diagnosisModal = null;
  document.removeEventListener("keydown", onDiagEsc, true);
}

function onDiagEsc(e) {
  if (e.key === "Escape") closeDiagnosisModal();
}

function buildDiagnosis(sc, state) {
  if (!sc?.diagnosis) return null;
  const total = sc.steps?.length || 7;
  const score = state?.score ?? 0;
  const pct = score / total;
  const base = sc.diagnosis;

  if (pct >= 0.85) return { ...base, score, total };

  if (pct >= 0.5) {
    return {
      title: `${base.title} (in progress)`,
      short: `${score}/${total} strong picks — stay consistent and it locks in.`,
      text: `You showed flashes of ${base.short.toLowerCase()} but drifted on a few choices.\nHold the same calm pace across every step and the pattern sticks.`,
      score,
      total,
    };
  }

  return {
    title: `${base.title} (realign)`,
    short: `${score}/${total}. The signal was fuzzy this round.`,
    text: `You pulled away from ${base.short.toLowerCase()} this run. Slow down, listen, and pick the options that match the steadier version of you. Next run will read clearer.`,
    score,
    total,
  };
}

function showDiagnosisModal(sc, state) {
  const diag = buildDiagnosis(sc, state);
  if (!diag) return;
  closeDiagnosisModal();

  const overlay = document.createElement("div");
  overlay.className = "diagOverlay";

  const card = document.createElement("div");
  card.className = "diagCard";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "diagClose";
  closeBtn.setAttribute("aria-label", "Close diagnosis");
  closeBtn.textContent = "×";

  const title = document.createElement("h3");
  title.className = "diagTitle";
  title.textContent = diag.title;

  const meta = document.createElement("p");
  meta.className = "diagMeta";
  meta.textContent = `Score: ${diag.score}/${diag.total}`;

  const short = document.createElement("p");
  short.className = "diagShort";
  short.textContent = diag.short;

  const body = document.createElement("p");
  body.className = "diagText";
  body.innerHTML = String(diag.text || "").replace(/\n/g, "<br>");

  closeBtn.addEventListener("click", closeDiagnosisModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeDiagnosisModal(); });

  card.appendChild(closeBtn);
  card.appendChild(title);
  card.appendChild(meta);
  card.appendChild(short);
  card.appendChild(body);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
  diagnosisModal = overlay;
  document.addEventListener("keydown", onDiagEsc, true);
}

function shuffleArray(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function nextUniquePhrase() {
  if (!phraseOrder.length || phrasePtr >= phraseOrder.length) {
    phraseOrder = shuffleArray(PHRASES);
    phrasePtr = 0;
  }
  return phraseOrder[phrasePtr++];
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
      }, 1500);
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
  const phrase = nextUniquePhrase();
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
  musicMenu.addEventListener("mouseleave", () => {
    if (!('ontouchstart' in window)) closeDropdown();
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

// Choice game data
const scenarios = [
  {
    id: "calm-orbit",
    label: "Calm Orbit",
    reward: "Some people feel like home without trying.",
    diagnosis: {
      title: "Secure Co-Regulator",
      text: "You instinctively slow the room down. You read emotional weather without needing a forecast.\nYou don’t rush connection — you make space for it.\nPeople feel calmer around you not because you fix things,\nbut because you don’t disappear when things get quiet.",
      short: "You create safety without effort."
    },
    completionText: {
      low: [
        "That run was a little chaotic 😅 Try again—softly this time.",
        "You missed a few cues, but the effort was cute. Another round?",
        "Not quite the vibe yet—one more try and you’ll feel it."
      ],
      mid: [
        "Close. You’re picking up the gentle signals 👀",
        "You’re almost there—one better choice per step and it clicks.",
        "That was warm… just not flawless. Run it back?"
      ]
    },
    steps: [
      {
        prompt: "Someone important is quiet today. You…",
        options: [
          { text: "Sit nearby and stay gentle.", feedback: "Comfort doesn't need sound.", isOptimal: true },
          { text: "Check in once then wait.", feedback: "Noted the silence.", isOptimal: false },
          { text: "Lead with jokes.", feedback: "Timing feels off.", isOptimal: false },
          { text: "Ignore it.", feedback: "Silence just stretched.", isOptimal: false }
        ]
      },
      {
        prompt: "Late-night talk drifts into randomness.",
        options: [
          { text: "Let it wander.", feedback: "Best talks have no map.", isOptimal: true },
          { text: "Keep it light only.", feedback: "Safe, but shallow.", isOptimal: false },
          { text: "Switch topics quickly.", feedback: "Missed the spark.", isOptimal: false },
          { text: "End early.", feedback: "Night had more to say.", isOptimal: false }
        ]
      },
      {
        prompt: "They vent about a rough day.",
        options: [
          { text: "Listen without fixing.", feedback: "Staying present works.", isOptimal: true },
          { text: "Offer solutions fast.", feedback: "Helpful but rushed.", isOptimal: false },
          { text: "Compare with your own story.", feedback: "Center shifted away.", isOptimal: false },
          { text: "Downplay it.", feedback: "Door closed.", isOptimal: false }
        ]
      },
      {
        prompt: "Inside jokes mean…",
        options: [
          { text: "Shared language.", feedback: "A tiny world built together.", isOptimal: true },
          { text: "Old funny memories.", feedback: "Nice but surface.", isOptimal: false },
          { text: "Silly distractions.", feedback: "Missed the depth.", isOptimal: false },
          { text: "Pointless.", feedback: "Magic lost.", isOptimal: false }
        ]
      },
      {
        prompt: "Comfortable silence feels…",
        options: [
          { text: "Peaceful.", feedback: "Trust feels easy.", isOptimal: true },
          { text: "Slightly awkward.", feedback: "You're close, not there yet.", isOptimal: false },
          { text: "Boring.", feedback: "Magic missed.", isOptimal: false },
          { text: "Unacceptable.", feedback: "Space got noisy.", isOptimal: false }
        ]
      },
      {
        prompt: "Being weird together is…",
        options: [
          { text: "Encouraged.", feedback: "Authenticity unlocked.", isOptimal: true },
          { text: "Sometimes okay.", feedback: "Half-open door.", isOptimal: false },
          { text: "Embarrassing.", feedback: "Walls up.", isOptimal: false },
          { text: "Never.", feedback: "Mask stays on.", isOptimal: false }
        ]
      },
      {
        prompt: "This connection feels like…",
        options: [
          { text: "Home.", feedback: "Warm choice.", isOptimal: true },
          { text: "Fun only.", feedback: "Nice, incomplete.", isOptimal: false },
          { text: "Casual.", feedback: "Surface level.", isOptimal: false },
          { text: "Replaceable.", feedback: "Signal fading.", isOptimal: false }
        ]
      }
    ]
  },
  {
    id: "steady-horizon",
    label: "Steady Horizon",
    reward: "Peace, loyalty, warmth — the steady kind.",
    diagnosis: {
      title: "Secure Anchor",
      text: "You don’t confuse intensity with depth. You choose consistency over chaos.\nWhen things get hard, you stay, you listen, and you build something that lasts.\nNot flashy. Just unshakeable.",
      short: "You’re the calm after the storm — and the reason it passes."
    },
    completionText: {
      low: [
        "That was a bumpy finish 😅 Try again with calmer choices.",
        "A little reactive—but you can turn it around. Again?",
        "Not the steadiest run. Let’s try for smoother."
      ],
      mid: [
        "Nice—getting steadier. You’re close 👀",
        "Almost solid. One more run and it lands.",
        "You’re building the right rhythm—just missing the last bit."
      ]
    },
    steps: [
      {
        prompt: "Conflict starts. You…",
        options: [
          { text: "Stay calm and listen.", feedback: "Emotional strength.", isOptimal: true },
          { text: "Defend right away.", feedback: "Reactive move.", isOptimal: false },
          { text: "Go distant.", feedback: "Walls up.", isOptimal: false },
          { text: "Escalate.", feedback: "Damage done.", isOptimal: false }
        ]
      },
      {
        prompt: "Support looks like…",
        options: [
          { text: "Showing up consistently.", feedback: "Reliability resonates.", isOptimal: true },
          { text: "Grand gestures only.", feedback: "Rare sparks.", isOptimal: false },
          { text: "Words without action.", feedback: "Incomplete.", isOptimal: false },
          { text: "Avoiding involvement.", feedback: "Absence noted.", isOptimal: false }
        ]
      },
      {
        prompt: "Hard conversations are…",
        options: [
          { text: "Necessary.", feedback: "Future-focused.", isOptimal: true },
          { text: "Only when forced.", feedback: "Progress slows.", isOptimal: false },
          { text: "Draining.", feedback: "Growth stalled.", isOptimal: false },
          { text: "Pointless.", feedback: "Future skipped.", isOptimal: false }
        ]
      },
      {
        prompt: "Emotional safety means…",
        options: [
          { text: "No fear in being honest.", feedback: "Real shelter.", isOptimal: true },
          { text: "Fewer arguments.", feedback: "Not the same.", isOptimal: false },
          { text: "Silence.", feedback: "Avoidance, not safety.", isOptimal: false },
          { text: "Control.", feedback: "Not safety.", isOptimal: false }
        ]
      },
      {
        prompt: "Loyalty shows in…",
        options: [
          { text: "Actions.", feedback: "Proof over promises.", isOptimal: true },
          { text: "Promises.", feedback: "Easy to make.", isOptimal: false },
          { text: "Possessiveness.", feedback: "Red flag.", isOptimal: false },
          { text: "Surveillance.", feedback: "Wrong door.", isOptimal: false }
        ]
      },
      {
        prompt: "Steady love should feel…",
        options: [
          { text: "Peaceful.", feedback: "Stability unlocked.", isOptimal: true },
          { text: "Constant intensity.", feedback: "Burnout risk.", isOptimal: false },
          { text: "Dramatic.", feedback: "Exhausting.", isOptimal: false },
          { text: "Unpredictable.", feedback: "Unsteady ground.", isOptimal: false }
        ]
      },
      {
        prompt: "This energy feels like…",
        options: [
          { text: "A future.", feedback: "Longevity chosen.", isOptimal: true },
          { text: "A phase.", feedback: "Temporary thinking.", isOptimal: false },
          { text: "A risk.", feedback: "Fear talking.", isOptimal: false },
          { text: "A burden.", feedback: "Foundation cracking.", isOptimal: false }
        ]
      }
    ]
  },
  {
    id: "inner-north",
    label: "Inner North",
    reward: "The strongest warmth starts from knowing yourself.",
    diagnosis: {
      title: "Self-Aligned Navigator",
      text: "You don’t outsource your worth. You listen inward before reacting outward.\nHealing isn’t aesthetic — it’s patient and personal.\nYou are becoming your own safe place.",
      short: "You trust your inner compass."
    },
    completionText: {
      low: [
        "That was a tough one 😅 Try again—be a little kinder to yourself.",
        "You rushed a few answers. Slow down and listen inward.",
        "Not quite aligned yet. Another try—gentle mode."
      ],
      mid: [
        "Close. You’re reading yourself better already 👀",
        "Almost there—one more run with steadier choices.",
        "Good progress. You’re one step away from clicking into place."
      ]
    },
    steps: [
      {
        prompt: "Alone time is…",
        options: [
          { text: "Necessary.", feedback: "Self-awareness unlocked.", isOptimal: true },
          { text: "Occasional.", feedback: "Decent start.", isOptimal: false },
          { text: "Lonely.", feedback: "Worth exploring.", isOptimal: false },
          { text: "Useless.", feedback: "Avoidance detected.", isOptimal: false }
        ]
      },
      {
        prompt: "Emotions should be…",
        options: [
          { text: "Felt.", feedback: "That's healing.", isOptimal: true },
          { text: "Controlled tightly.", feedback: "Careful, might bottle up.", isOptimal: false },
          { text: "Ignored.", feedback: "They return louder.", isOptimal: false },
          { text: "Hidden.", feedback: "Heavy load.", isOptimal: false }
        ]
      },
      {
        prompt: "Boundaries exist to…",
        options: [
          { text: "Protect peace.", feedback: "Healthy choice.", isOptimal: true },
          { text: "Push people away.", feedback: "Misread.", isOptimal: false },
          { text: "Create distance.", feedback: "Not the point.", isOptimal: false },
          { text: "Control others.", feedback: "Nope.", isOptimal: false }
        ]
      },
      {
        prompt: "Growth feels…",
        options: [
          { text: "Uncomfortable.", feedback: "That's how it works.", isOptimal: true },
          { text: "Only exciting.", feedback: "Half the truth.", isOptimal: false },
          { text: "Scary only.", feedback: "Valid, but don't freeze.", isOptimal: false },
          { text: "Unnecessary.", feedback: "Stuck loop.", isOptimal: false }
        ]
      },
      {
        prompt: "Self-talk should be…",
        options: [
          { text: "Kind.", feedback: "You're learning.", isOptimal: true },
          { text: "Blunt and harsh.", feedback: "Careful.", isOptimal: false },
          { text: "Critical.", feedback: "Damage accumulates.", isOptimal: false },
          { text: "Absent.", feedback: "Disconnected.", isOptimal: false }
        ]
      },
      {
        prompt: "Healing takes…",
        options: [
          { text: "Time.", feedback: "Patience rewarded.", isOptimal: true },
          { text: "Distraction.", feedback: "Temporary patch.", isOptimal: false },
          { text: "Validation only.", feedback: "External, not enough.", isOptimal: false },
          { text: "Suppression.", feedback: "Pain delayed.", isOptimal: false }
        ]
      },
      {
        prompt: "You are allowed to…",
        options: [
          { text: "Take space.", feedback: "Self-respect chosen.", isOptimal: true },
          { text: "Overgive.", feedback: "Burnout ahead.", isOptimal: false },
          { text: "Shrink.", feedback: "Don't.", isOptimal: false },
          { text: "Apologize for existing.", feedback: "Never.", isOptimal: false }
        ]
      }
    ]
  },
  {
    id: "quiet-voltage",
    label: "Quiet Voltage",
    reward: "Some bonds start quiet and become the answer.",
    diagnosis: {
      title: "Slow-Burn Attachment",
      text: "You feel it before you admit it. The pause, the tension, the lingering look.\nYou don’t rush — but when you choose, you choose fully.\nQuiet connections don’t scare you. They wake you up.",
      short: "You recognize love before it speaks."
    },
    completionText: {
      low: [
        "You dodged every obvious signal 😅 Try again—braver this time.",
        "That was denial-speedrun energy. One more round?",
        "You kept choosing the safe option… and missed the point."
      ],
      mid: [
        "Close. The tension is there—you’re almost owning it 👀",
        "Nearly. One more run and you’ll stop hesitating.",
        "That was almost fearless. Try again and commit."
      ]
    },
    steps: [
      {
        prompt: "Long eye contact means…",
        options: [
          { text: "Something unspoken.", feedback: "Chemistry noted.", isOptimal: true },
          { text: "Coincidence.", feedback: "Signal missed.", isOptimal: false },
          { text: "Awkwardness.", feedback: "Overthinking.", isOptimal: false },
          { text: "Nothing.", feedback: "Denial mode.", isOptimal: false }
        ]
      },
      {
        prompt: "Comfort plus attraction feels…",
        options: [
          { text: "Rare.", feedback: "You noticed.", isOptimal: true },
          { text: "Confusing.", feedback: "Fair, but keep looking.", isOptimal: false },
          { text: "Risky.", feedback: "True, but fear-led.", isOptimal: false },
          { text: "Avoidable.", feedback: "Dodging everything.", isOptimal: false }
        ]
      },
      {
        prompt: "Touch lingers because…",
        options: [
          { text: "It wants to.", feedback: "Honest answer.", isOptimal: true },
          { text: "Accident.", feedback: "Sure.", isOptimal: false },
          { text: "Habit.", feedback: "Doubtful.", isOptimal: false },
          { text: "It doesn't.", feedback: "Then why pause?", isOptimal: false }
        ]
      },
      {
        prompt: "Jealousy appears when…",
        options: [
          { text: "You care.", feedback: "Exactly.", isOptimal: true },
          { text: "You're insecure.", feedback: "Not really more of caring.", isOptimal: false },
          { text: "You're controlling.", feedback: "Not it.", isOptimal: false },
          { text: "Never.", feedback: "Unlikely.", isOptimal: false }
        ]
      },
      {
        prompt: "Closest ally plus more equals…",
        options: [
          { text: "Ideal.", feedback: "Dangerously perfect.", isOptimal: true },
          { text: "Complicated.", feedback: "True but worth it.", isOptimal: false },
          { text: "Impossible.", feedback: "Fear talking.", isOptimal: false },
          { text: "Wrong.", feedback: "Hard disagree.", isOptimal: false }
        ]
      },
      {
        prompt: "If feelings grow…",
        options: [
          { text: "Let them.", feedback: "Brave choice.", isOptimal: true },
          { text: "Ignore them.", feedback: "Temporary fix.", isOptimal: false },
          { text: "Joke them away.", feedback: "Avoidance.", isOptimal: false },
          { text: "Shut down.", feedback: "Loss.", isOptimal: false }
        ]
      },
      {
        prompt: "Asked honestly, you'd…",
        options: [
          { text: "Choose them.", feedback: "Box unlocked.", isOptimal: true },
          { text: "Hesitate.", feedback: "Almost.", isOptimal: false },
          { text: "Say unsure.", feedback: "Not yet.", isOptimal: false },
          { text: "Walk away.", feedback: "Game over.", isOptimal: false }
        ]
      }
    ]
  }
];

const choiceEls = {
  wrap: document.getElementById("choiceGame"),
  list: document.getElementById("scenarioList"),
  prompt: document.getElementById("gamePrompt"),
  options: document.getElementById("gameOptions"),
  feedback: document.getElementById("gameFeedback"),
  next: document.getElementById("nextStep"),
  progressBar: document.getElementById("gameProgressBar"),
  progressText: document.getElementById("gameProgressText"),
  summary: document.getElementById("gameSummary"),
  completion: document.getElementById("completionSection"),
  status: document.getElementById("gameStatus"),
  restart: document.getElementById("restartScenario"),
};

const scenarioState = {};
let activeScenarioId = scenarios[0]?.id || null;

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// === Fullscreen 3D moment overlay ===
let momentActive = false;
let momentEl = null;
let momentTimers = [];
let momentAutoResetTimer = null;
let momentWasMuted = null;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m] || m));
}

function seedParticles(container) {
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.style.setProperty("--x", `${Math.random() * 100}%`);
    p.style.setProperty("--d", `${Math.random() * 1200}`);
    p.style.setProperty("--delay", `${Math.random() * 1200}ms`);
    container.appendChild(p);
  }
}

function seedBurst(container) {
  if (!container) return;
  const rays = 24;
  for (let i = 0; i < rays; i++) {
    const r = document.createElement("i");
    r.style.setProperty("--i", i);
    container.appendChild(r);
  }
}

function createMomentLayer(phrase) {
  const layer = document.createElement("div");
  layer.className = "momentLayer";
  layer.innerHTML = `
    <div class="momentDim"></div>
    <div class="momentCenter">
      <div class="momentGlow"></div>
      <div class="rose3d">
        <div class="roseStage">
          <div class="stem3d"></div>
          <div class="leaf3d left"></div>
          <div class="leaf3d right"></div>
          <div class="bloom3d">
            ${Array.from({ length: 18 }).map((_, i) => {
              const rot = i * (360 / 18);
              const tilt = 10 + (i % 3) * 3;
              const depth = 18 + i * 1.1;
              const lift = -i * 1.2;
              const scale = 1 - i * 0.015;
              const yaw = i % 2 === 0 ? -5 : 5; // alternate slight yaw per petal for depth
              return `<div class="petal3d" style="--i:${i};--rot:${rot}deg;--tilt:${tilt}deg;--depth:${depth}px;--lift:${lift}px;--scale:${scale};--yaw:${yaw}deg;"></div>`;
            }).join("")}
          </div>
        </div>
      </div>
      <div class="momentText">${escapeHtml(phrase)}</div>
      <div class="momentParticles"></div>
      <div class="momentBurst"></div>
    </div>
  `;
  seedParticles(layer.querySelector(".momentParticles"));
  seedBurst(layer.querySelector(".momentBurst"));
  return layer;
}

function showMoment(phrase) {
  if (momentActive) return;
  hideMoment();
  momentActive = true;
  momentEl = createMomentLayer(phrase);
  document.body.appendChild(momentEl);
  document.body.classList.add("moment-active");
  if (typeof isMuted === "function" && typeof setMuted === "function") {
    momentWasMuted = isMuted();
    setMuted(true);
  }
  requestAnimationFrame(() => momentEl?.classList.add("on"));
  momentTimers.push(setTimeout(() => momentEl?.classList.add("showText"), 3800));
  momentTimers.push(setTimeout(() => {
    momentEl?.classList.add("burst");
    setTimeout(() => momentEl?.classList.remove("burst"), 900);
  }, 4400));
  if (momentAutoResetTimer) clearTimeout(momentAutoResetTimer);
  momentAutoResetTimer = setTimeout(() => {
    hideMoment();
    if (typeof resetScenario === "function") resetScenario(activeScenarioId);
  }, 6000);
}

function hideMoment() {
  momentActive = false;
  momentTimers.forEach(clearTimeout);
  momentTimers = [];
  if (momentAutoResetTimer) {
    clearTimeout(momentAutoResetTimer);
    momentAutoResetTimer = null;
  }
  if (momentWasMuted !== null && typeof setMuted === "function") {
    setMuted(momentWasMuted);
    momentWasMuted = null;
  }
  const el = momentEl || document.querySelector(".momentLayer");
  if (!el) {
    document.body.classList.remove("moment-active");
    return;
  }
  el.classList.remove("on", "showText", "burst");
  setTimeout(() => {
    el.remove();
    if (!document.querySelector(".momentLayer")) {
      document.body.classList.remove("moment-active");
    }
    if (el === momentEl) momentEl = null;
  }, 250);
}

// Math-based petal generator: builds a closed path from a polar curve
// r(θ) = a * sin(kθ) with shaping; converted to SVG points and smoothed
function makePetalPath(cx, cy, a, k, rotRad, squishX, squishY) {
  const pts = [];
  const steps = 140;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI; // half turn gives petal-like loop
    // Base rose-curve radius (always positive here)
    let r = a * Math.sin(k * t);
    r = Math.pow(Math.max(0, r), 0.72) * a; // soften + add volume

    // Convert polar to cartesian (petal points upward)
    const x0 = r * Math.cos(t);
    const y0 = -r * Math.sin(t);

    // Squish for realism
    let x = x0 * squishX;
    let y = y0 * squishY;

    // Rotate around origin
    const xr = x * Math.cos(rotRad) - y * Math.sin(rotRad);
    const yr = x * Math.sin(rotRad) + y * Math.cos(rotRad);

    pts.push([cx + xr, cy + yr]);
  }

  // Simple smoothing: quadratic through points
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  d += " Z";
  return d;
}

function createRoseSvg() {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", "roseSvg");
  svg.setAttribute("viewBox", "0 0 420 520");

  // defs: gradients + subtle grain + soft light
  const defs = document.createElementNS(ns, "defs");
  defs.innerHTML = `
    <linearGradient id="stemG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a9b46"/>
      <stop offset="100%" stop-color="#1f6d2b"/>
    </linearGradient>
    <radialGradient id="leafG" cx="30%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#57c66a"/>
      <stop offset="60%" stop-color="#2f9b45"/>
      <stop offset="100%" stop-color="#1f6d2b"/>
    </radialGradient>
    <radialGradient id="petalG" cx="30%" cy="25%" r="85%">
      <stop offset="0%" stop-color="#ffd1dc" stop-opacity="0.85"/>
      <stop offset="35%" stop-color="#ff5b8d"/>
      <stop offset="75%" stop-color="#c2185b"/>
      <stop offset="100%" stop-color="#7b103d"/>
    </radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="0.8" result="b"/>
      <feColorMatrix type="matrix" values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 0.92 0" />
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  `;
  svg.appendChild(defs);

  // Stem (drawn)
  const stem = document.createElementNS(ns, "path");
  stem.setAttribute("class", "stemPath");
  stem.setAttribute("d", "M 210 500 C 210 440 205 385 210 330 C 215 275 230 245 220 200 C 214 170 210 150 210 130");
  stem.setAttribute("fill", "none");
  stem.setAttribute("stroke", "url(#stemG)");
  stem.setAttribute("stroke-width", "8");
  stem.setAttribute("stroke-linecap", "round");
  stem.setAttribute("filter", "url(#soft)");
  svg.appendChild(stem);

  // Leaves group
  const leafGroup = document.createElementNS(ns, "g");
  leafGroup.setAttribute("class", "leafGroup");
  leafGroup.innerHTML = `
    <path d="M 210 355 C 175 350 155 330 145 305 C 165 305 190 312 210 330 C 220 338 225 347 210 355 Z"
      fill="url(#leafG)" filter="url(#soft)" opacity="0.95"/>
    <path d="M 214 320 C 250 315 275 295 290 270 C 268 268 240 278 220 296 C 210 305 204 315 214 320 Z"
      fill="url(#leafG)" filter="url(#soft)" opacity="0.95"/>
  `;
  svg.appendChild(leafGroup);

  // Petals (math-generated)
  const centerX = 210;
  const centerY = 155;
  const petalCount = 9;
  for (let i = 0; i < petalCount; i++) {
    const p = document.createElementNS(ns, "path");
    p.setAttribute("class", "petal");
    p.dataset.i = String(i);

    // Vary petal parameters for realism
    const a = 92 - i * 6;
    const k = 2 + (i % 3) * 0.25;
    const rot = (i * (Math.PI * 2)) / petalCount + (i % 2 ? 0.12 : -0.08);
    const sx =     1.0 - i * 0.03;
    const sy = 1.12 - i * 0.02;
    const d = makePetalPath(centerX, centerY, a, k, rot, sx, sy);
    p.setAttribute("d", d);
    p.setAttribute("fill", "url(#petalG)");
    p.setAttribute("filter", "url(#soft)");
    p.style.setProperty("--r", `${(i - 4) * 10}deg`);
    p.style.opacity = "0";
    svg.appendChild(p);
  }

  // Bud highlight (tiny)
  const bud = document.createElementNS(ns, "circle");
  bud.setAttribute("cx", "210");
  bud.setAttribute("cy", "155");
  bud.setAttribute("r", "10");
  bud.setAttribute("fill", "rgba(255,255,255,0.12)");
  bud.setAttribute("filter", "url(#soft)");
  svg.appendChild(bud);

  return svg;
}

function createParticles(layer, countSpark = 22, countHeart = 10) {
  // sparkles
  for (let i = 0; i < countSpark; i++) {
    const s = document.createElement("i");
    s.className = "spark";
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const d = 1200 + Math.random() * 1400;
    const delay = Math.random() * 900;
    s.style.left = `${x}%`;
    s.style.top = `${y}%`;
    s.style.animationDuration = `${d}ms`;
    s.style.animationDelay = `${delay}ms`;
    layer.appendChild(s);
  }

  // hearts
  for (let i = 0; i < countHeart; i++) {
    const h = document.createElement("i");
    h.className = "heart";
    const x = 15 + Math.random() * 70;
    const y = 70 + Math.random() * 25;
    const d = 2200 + Math.random() * 1600;
    const delay = 300 + Math.random() * 1400;
    h.style.left = `${x}%`;
    h.style.top = `${y}%`;
    h.style.animationDuration = `${d}ms`;
    h.style.animationDelay = `${delay}ms`;
    h.style.opacity = "0";
    layer.appendChild(h);
  }
}

function createBurst(layer, rays = 18) {
  for (let i = 0; i < rays; i++) {
    const r = document.createElement("i");
    const a = (i / rays) * 360;
    r.style.left = "50%";
    r.style.top = "55%";
    r.style.setProperty("--a", `${a}deg`);
    layer.appendChild(r);
  }
}

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }
function easeInOutCubic(t){ return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }

// --- Procedural rose renderer (Canvas) ---
function renderRoseMoment(targetEl, phrase) {
  clearRoseMoment(targetEl);

  const root = document.createElement("section");
  root.className = "moment";

  const overlay = document.createElement("div");
  overlay.className = "momentOverlay";

  const inner = document.createElement("div");
  inner.className = "momentInner";

  const canvas = document.createElement("canvas");
  canvas.className = "momentCanvas";

  const text = document.createElement("div");
  text.className = "momentText";
  text.textContent = phrase;

  inner.appendChild(canvas);
  root.appendChild(overlay);
  root.appendChild(inner);
  root.appendChild(text);
  targetEl.appendChild(root);
  document.body.classList.add("moment-active");
  const autoClearMs = 5000;

  // Turn on overlay/canvas entrance
  requestAnimationFrame(() => root.classList.add("isOn"));

  // HiDPI sizing
  function resize() {
    const rect = inner.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1));
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.dataset.dpr = String(dpr);
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const ctx = canvas.getContext("2d");
  const dpr = Number(canvas.dataset.dpr || 1);

  // Scene parameters
  const W = () => canvas.width;
  const H = () => canvas.height;

  // Particles (bokeh + hearts)
  const particles = [];
  const particleCount = 34;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random(),
      y: 0.55 + Math.random() * 0.4,
      r: 0.006 + Math.random() * 0.018,
      sp: 0.00012 + Math.random() * 0.00026,
      phase: Math.random() * Math.PI * 2,
      kind: Math.random() < 0.25 ? "heart" : "bokeh"
    });
  }

  // A simple burst rays effect
  let burstOn = false;
  let burstT = 0;
  const burstSchedule = [3200, 4600, 5400];

  // Timing
  const t0 = performance.now();
  const durStem = 1600;
  const durLeaves = 900;
  const durBloom = 2100;
  const showTextAt = 3900;

  // Rose placement
  function getAnchor() {
    const w = W(), h = H();
    return {
      cx: w * 0.5,
      cy: h * 0.62,
      bloomX: w * 0.5,
      bloomY: h * 0.30
    };
  }

  // Stem curve (cubic bezier points)
  function stemPoint(s, a) {
    // s: 0..1
    const { cx, cy, bloomY } = a;
    const y0 = cy;
    const y1 = bloomY + (cy - bloomY) * 0.10;
    // slight sway
    const sway = Math.sin(s * 2.6) * (W() * 0.012);
    const x = cx + sway;
    const y = lerp(y0, y1, s);
    return { x, y };
  }

  function drawBackgroundGlow() {
    const w = W(), h = H();
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    // base tint
    ctx.fillStyle = "rgba(26, 6, 30, 0.45)";
    ctx.fillRect(0, 0, w, h);
    // dark vignette + soft pink center glow
    const g1 = ctx.createRadialGradient(w*0.5, h*0.55, w*0.05, w*0.5, h*0.55, w*0.65);
    g1.addColorStop(0, "rgba(255,105,180,0.20)");
    g1.addColorStop(0.55, "rgba(255,105,180,0.10)");
    g1.addColorStop(1, "rgba(255,105,180,0.02)");
    ctx.fillStyle = g1;
    ctx.fillRect(0,0,w,h);
    ctx.restore();
  }

  function drawParticles(time) {
    const w = W(), h = H();
    ctx.save();
    for (const p of particles) {
      p.y -= p.sp;
      p.phase += 0.012;
      if (p.y < -0.2) { p.y = 1.05; p.x = Math.random(); }

      const x = p.x * w + Math.sin(p.phase) * w * 0.01;
      const y = p.y * h;
      const r = p.r * w;

      if (p.kind === "bokeh") {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, "rgba(255,255,255,0.20)");
        g.addColorStop(0.35, "rgba(255,105,180,0.18)");
        g.addColorStop(1, "rgba(255,105,180,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
      } else {
        // tiny heart
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI/4);
        const s = r * 0.55;
        const g = ctx.createRadialGradient(0,0,0, 0,0, s*2);
        g.addColorStop(0, "rgba(255,255,255,0.25)");
        g.addColorStop(0.35, "rgba(255,105,180,0.78)");
        g.addColorStop(1, "rgba(255,105,180,0)");
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(-s*0.6, 0, s, 0, Math.PI*2);
        ctx.arc( s*0.6, 0, s, 0, Math.PI*2);
        ctx.moveTo(-s*1.4, 0);
        ctx.lineTo(0, s*2.2);
        ctx.lineTo(s*1.4, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.restore();
  }

  function drawStem(progress) {
    const a = getAnchor();
    const w = W();
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // stem gradient
    const p0 = stemPoint(0, a);
    const p1 = stemPoint(1, a);
    const g = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
    g.addColorStop(0, "#1f6d2b");
    g.addColorStop(0.55, "#2f9b45");
    g.addColorStop(1, "#1b5e20");

    const n = 80;
    ctx.strokeStyle = g;
    ctx.lineWidth = w * 0.012;
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = w * 0.02;

    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const s = (i / n) * progress;
      const pt = stemPoint(s, a);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawLeaf(x, y, scale, flip) {
    const w = W();
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flip ? -1 : 1, 1);
    ctx.rotate(flip ? -0.45 : 0.35);
    ctx.scale(scale, scale);

    const g = ctx.createRadialGradient(-10, -10, 1, 0, 0, 80);
    g.addColorStop(0, "#57c66a");
    g.addColorStop(0.55, "#2f9b45");
    g.addColorStop(1, "#1b5e20");
    ctx.fillStyle = g;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    // leaf shape (bezier)
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(35, -20, 70, -8, 88, 18);
    ctx.bezierCurveTo(62, 28, 32, 24, 0, 0);
    ctx.closePath();
    ctx.fill();

    // vein highlight
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = w * 0.0025;
    ctx.beginPath();
    ctx.moveTo(6, 2);
    ctx.quadraticCurveTo(40, 8, 78, 16);
    ctx.stroke();

    ctx.restore();
  }

  function drawLeaves(progress) {
    const a = getAnchor();
    const pMid1 = stemPoint(0.48, a);
    const pMid2 = stemPoint(0.62, a);
    const s = easeOutCubic(progress);
    drawLeaf(pMid1.x - W()*0.02, pMid1.y, 0.55*s, true);
    drawLeaf(pMid2.x + W()*0.02, pMid2.y, 0.58*s, false);
  }

  // Petal polar curve with shading; layered petals with rotation
  function petalPolar(theta, a, k) {
    // base rose curve, shaped for petal volume
    let r = a * Math.sin(k * theta);
    r = Math.max(0, r);
    r = Math.pow(r, 0.72);
    return r;
  }

  function drawPetal(cx, cy, baseR, rot, open, depth) {
    const w = W();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);

    // color shade by depth
    const shade = clamp(0.92 - depth*0.05, 0.62, 0.96);
    const g = ctx.createRadialGradient(-w*0.018, -w*0.028, w*0.006, 0, 0, baseR*1.42);
    g.addColorStop(0, `rgba(255, 235, 244, ${0.82*shade})`);
    g.addColorStop(0.32, `rgba(255, 140, 182, ${0.95*shade})`);
    g.addColorStop(0.62, `rgba(214, 52, 104, ${0.94*shade})`);
    g.addColorStop(0.86, `rgba(150, 20, 70, ${0.9*shade})`);
    g.addColorStop(1, `rgba(90, 8, 38, ${0.88*shade})`);

    ctx.fillStyle = g;
    ctx.shadowColor = "rgba(0,0,0,0.28)";
    ctx.shadowBlur = w * 0.02;

    const steps = 180;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI; // half loop makes a petal
      const r = petalPolar(t, baseR * open, 2.1) * baseR;
      const x = (r * Math.cos(t)) * (1.0 - depth*0.02);
      const y = (-r * Math.sin(t)) * (1.18 - depth*0.02);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    // highlight edge + subtle vein
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = w * 0.0016;
    ctx.stroke();

    // inner vein glow for volume
    const vein = ctx.createLinearGradient(-baseR*0.18, -baseR*0.1, baseR*0.22, baseR*0.36);
    vein.addColorStop(0, "rgba(255,255,255,0.08)");
    vein.addColorStop(0.5, "rgba(255,180,200,0.16)");
    vein.addColorStop(1, "rgba(90,0,20,0)");
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = vein;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.restore();
  }

  function drawBloom(progress) {
    const a = getAnchor();
    const t = easeInOutCubic(progress);
    const cx = a.bloomX;
    const cy = a.bloomY;

    // bloom opening amount
    const outerOpen = lerp(0.55, 0.92, t);
    const innerOpen = lerp(0.38, 0.74, t);

    // Outer ring: broader petals with slight wobble
    const outerCount = 14;
    for (let i = outerCount - 1; i >= 0; i--) {
      const depth = i * 0.7;
      const rot = (i * (Math.PI * 2)) / outerCount + Math.sin(i * 1.3) * 0.08;
      const baseR = W() * 0.07 + (outerCount - i) * (W() * 0.0045);
      drawPetal(cx, cy, baseR, rot, outerOpen, depth);
    }

    // Inner ring: tighter petals to close the center
    const innerCount = 10;
    for (let i = innerCount - 1; i >= 0; i--) {
      const depth = 6 + i * 0.85;
      const rot = (i * (Math.PI * 2)) / innerCount + 0.35 + Math.sin(i * 2.1) * 0.05;
      const baseR = W() * 0.048 + (innerCount - i) * (W() * 0.0032);
      drawPetal(cx, cy, baseR, rot, innerOpen, depth);
    }

    // bud core glow
    ctx.save();
    const r0 = W()*0.028;
    const gCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, r0*2.8);
    gCore.addColorStop(0, "rgba(255,240,245,0.35)");
    gCore.addColorStop(0.35, "rgba(255,140,180,0.32)");
    gCore.addColorStop(0.7, "rgba(120,10,40,0.42)");
    gCore.addColorStop(1, "rgba(40,2,14,0.6)");
    ctx.fillStyle = gCore;
    ctx.beginPath();
    ctx.arc(cx, cy, r0*2.4, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function drawBurst() {
    if (!burstOn) return;
    const w = W(), h = H();
    const a = getAnchor();
    const cx = a.bloomX, cy = a.bloomY + h*0.02;
    const t = easeOutCubic(clamp(burstT, 0, 1));

    ctx.save();
    ctx.globalAlpha = 1 - t;
    const rays = 28;
    for (let i = 0; i < rays; i++) {
      const ang = (i / rays) * Math.PI * 2;
      const len = lerp(w*0.03, w*0.16, t);
      const x2 = cx + Math.cos(ang) * len;
      const y2 = cy + Math.sin(ang) * len;
      const grad = ctx.createLinearGradient(cx, cy, x2, y2);
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(1, "rgba(255,105,180,0.0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = w*0.0032;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  let raf = 0;
  function frame(now) {
    const t = now - t0;
    const stemP = clamp(t / durStem, 0, 1);
    const leafP = clamp((t - 900) / durLeaves, 0, 1);
    const bloomP = clamp((t - 1400) / durBloom, 0, 1);

    drawBackgroundGlow();
    drawParticles(t);
    drawStem(easeOutCubic(stemP));
    if (leafP > 0) drawLeaves(leafP);
    if (bloomP > 0) drawBloom(bloomP);

    if (t >= showTextAt) root.classList.add("showText");
    if (!burstOn && burstSchedule.length && t >= burstSchedule[0]) {
      burstOn = true;
      burstT = 0;
      burstSchedule.shift();
    }
    if (burstOn) { burstT += 0.03; drawBurst(); if (burstT >= 1) burstOn = false; }

    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  // Auto-dismiss after a brief showcase
  const autoTimer = window.setTimeout(() => {
    root.classList.add("fadeOut");
    window.setTimeout(() => clearRoseMoment(targetEl), 600);
  }, autoClearMs);

  // Store cleanup hooks on element
  root._momentCleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.clearTimeout(autoTimer);
    root.remove();
    if (!document.querySelector(".moment")) {
      document.body.classList.remove("moment-active");
    }
  };

  return root;
}

function clearRoseMoment(targetEl) {
  const existing = targetEl.querySelectorAll(".moment");
  existing.forEach(el => {
    if (typeof el._momentCleanup === "function") el._momentCleanup();
    else el.remove();
  });
  if (!document.querySelector(".moment")) {
    document.body.classList.remove("moment-active");
  }
}

// Main: render cinematic reward under completion area
function renderRewardScene(container, phrase) {
  // container: element under the game completion UI
  // phrase: string to show after bloom
  const scene = document.createElement("section");
  scene.className = "rewardScene";

  const backdrop = document.createElement("div");
  backdrop.className = "rewardBackdrop";

  const inner = document.createElement("div");
  inner.className = "rewardInner";

  const glow = document.createElement("div");
  glow.className = "rewardGlow";

  const particles = document.createElement("div");
  particles.className = "particles";
  createParticles(particles);

  const burst = document.createElement("div");
  burst.className = "burst";
  createBurst(burst);

  const svg = createRoseSvg();

  const text = document.createElement("div");
  text.className = "rewardText";
  text.textContent = phrase;

  inner.appendChild(glow);
  inner.appendChild(particles);
  inner.appendChild(burst);
  inner.appendChild(svg);

  scene.appendChild(backdrop);
  scene.appendChild(inner);
  scene.appendChild(text);

  container.appendChild(scene);

  // start sequence
  requestAnimationFrame(() => scene.classList.add("isOn"));

  // show phrase after bloom completes
  window.setTimeout(() => {
    scene.classList.add("showText");
  }, 3300);

  // cheerful burst right after phrase appears
  window.setTimeout(() => {
    scene.classList.add("burstOn");
    window.setTimeout(() => scene.classList.remove("burstOn"), 900);
  }, 4000);

  return scene;
}
function buildRose(container) {
  const rose = document.createElement("div");
  rose.className = "rose";

  rose.innerHTML = `
    <div class="stem"></div>
    <div class="leaf left"></div>
    <div class="leaf right"></div>
    <div class="bloom">
      <div class="petal p1"></div>
      <div class="petal p2"></div>
      <div class="petal p3"></div>
      <div class="petal p4"></div>
      <div class="petal p5"></div>
    </div>
  `;

  container.appendChild(rose);

  requestAnimationFrame(() => {
    rose.classList.add("grow");
  });
}

function pickRandom(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

function getCompletionMessage(sc, score) {
  const rewardUnlocked = score >= 6;
  if (rewardUnlocked) return { message: sc.reward, rewardUnlocked: true };

  const tier = score <= 3 ? sc.completionText?.low : sc.completionText?.mid;
  const pool = Array.isArray(tier) && tier.length ? tier : [""];
  return { message: pickRandom(pool), rewardUnlocked: false };
}

function ensureScenarioState(id) {
  if (!scenarioState[id]) {
    scenarioState[id] = {
      currentStepIndex: 0,
      score: 0,
      selections: new Array(7).fill(null),
      isComplete: false,
      rewardUnlocked: false,
      roseRendered: false,
      rewardRendered: false,
      momentRendered: false,
    };
  }
  return scenarioState[id];
}

function getActiveScenario() {
  return scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];
}

function renderScenarioButtons() {
  if (!choiceEls.list) return;
  choiceEls.list.innerHTML = "";
  scenarios.forEach((sc) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `scenarioBtn${sc.id === activeScenarioId ? " is-active" : ""}`;
    btn.textContent = sc.label;
    btn.addEventListener("click", () => {
      activeScenarioId = sc.id;
      ensureScenarioState(sc.id);
      renderScenarioButtons();
      resetScenario(sc.id, false);
    });
    choiceEls.list.appendChild(btn);
  });
}

function setFeedback(text) {
  if (choiceEls.feedback) choiceEls.feedback.textContent = text || "";
}

function updateStatus() {
  const sc = getActiveScenario();
  const state = ensureScenarioState(sc.id);
  if (choiceEls.status) {
    choiceEls.status.textContent = `${sc.label} · Score ${state.score}/7` + (state.isComplete ? " · Complete" : "");
  }
}

function renderStep() {
  const sc = getActiveScenario();
  const state = ensureScenarioState(sc.id);
  const step = sc.steps[state.currentStepIndex];
  if (!step) return;

  if (choiceEls.prompt) choiceEls.prompt.textContent = step.prompt;
  setFeedback("");

  if (choiceEls.progressText) {
    choiceEls.progressText.textContent = `Step ${state.currentStepIndex + 1} of ${sc.steps.length}`;
  }
  if (choiceEls.progressBar) {
    const pct = ((state.currentStepIndex) / sc.steps.length) * 100;
    choiceEls.progressBar.style.width = `${pct}%`;
  }

  if (choiceEls.options) {
    choiceEls.options.innerHTML = "";
    step.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choiceOption";
      btn.textContent = opt.text;
      if (state.selections[state.currentStepIndex] !== null) btn.disabled = true;
      btn.addEventListener("click", () => handleOptionSelect(idx));
      choiceEls.options.appendChild(btn);
    });
  }

  if (choiceEls.next) {
    choiceEls.next.disabled = true;
    choiceEls.next.textContent = state.currentStepIndex === sc.steps.length - 1 ? "Finish" : "Continue";
  }

  if (choiceEls.summary) {
    choiceEls.summary.textContent = state.isComplete ? "Run complete. Try again for a perfect score to unlock the reward." : "";
  }

  updateStatus();
}

function handleOptionSelect(optionIndex) {
  const sc = getActiveScenario();
  const state = ensureScenarioState(sc.id);
  if (state.isComplete) return;
  if (state.selections[state.currentStepIndex] !== null) return;

  const step = sc.steps[state.currentStepIndex];
  const opt = step.options[optionIndex];
  state.selections[state.currentStepIndex] = optionIndex;
  if (opt.isOptimal) state.score += 1;

  if (choiceEls.options) {
    choiceEls.options.querySelectorAll(".choiceOption").forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === optionIndex) btn.classList.add("is-selected");
      if (idx === optionIndex && opt.isOptimal) btn.classList.add("is-correct");
      if (idx === optionIndex && !opt.isOptimal) btn.classList.add("is-wrong");
    });
  }

  setFeedback(opt.feedback);

  if (choiceEls.next) {
    choiceEls.next.disabled = false;
    choiceEls.next.textContent = state.currentStepIndex === sc.steps.length - 1 ? "Finish" : "Continue";
  }
  updateStatus();
}

function goNextStep() {
  const sc = getActiveScenario();
  const state = ensureScenarioState(sc.id);
  if (state.selections[state.currentStepIndex] === null) return;
  const isLast = state.currentStepIndex === sc.steps.length - 1;
  if (isLast) {
    finalizeScenario();
  } else {
    state.currentStepIndex += 1;
    renderStep();
  }
}

function finalizeScenario() {
  const sc = getActiveScenario();
  const state = ensureScenarioState(sc.id);
  state.isComplete = true;

  const result = getCompletionMessage(sc, state.score);
  state.rewardUnlocked = result.rewardUnlocked;

  if (state.rewardUnlocked && !state.momentRendered) {
    showMoment(sc.reward);
    state.momentRendered = true;
  }

  if (choiceEls.progressBar) choiceEls.progressBar.style.width = "100%";
  if (choiceEls.next) {
    choiceEls.next.disabled = true;
    choiceEls.next.textContent = "Complete";
  }
  if (choiceEls.summary) {
    choiceEls.summary.textContent = result.message || "";
  }
  updateStatus();
}

function resetScenario(id = activeScenarioId, rerenderButtons = true) {
  ensureScenarioState(id);
  scenarioState[id].currentStepIndex = 0;
  scenarioState[id].score = 0;
  scenarioState[id].selections = new Array(7).fill(null);
  scenarioState[id].isComplete = false;
  scenarioState[id].rewardUnlocked = false;
  scenarioState[id].roseRendered = false;
  scenarioState[id].rewardRendered = false;
  scenarioState[id].momentRendered = false;
  hideMoment();
  closeDiagnosisModal();
  if (choiceEls.wrap) {
    choiceEls.wrap.querySelectorAll(".rose").forEach((node) => node.remove());
    choiceEls.wrap.querySelectorAll(".rewardScene").forEach((node) => node.remove());
  }
  if (choiceEls.completion) choiceEls.completion.innerHTML = "";
  if (rerenderButtons) renderScenarioButtons();
  renderStep();
}

function initChoiceGame() {
  if (!choiceEls.wrap || !scenarios.length) return;
  renderScenarioButtons();
  resetScenario(activeScenarioId, false);
  choiceEls.next?.addEventListener("click", goNextStep);
  choiceEls.restart?.addEventListener("click", () => resetScenario(activeScenarioId));
}

initChoiceGame();
