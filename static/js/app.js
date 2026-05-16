const I18N = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_channels: "Channels",
    nav_videos: "Videos",
    nav_social: "Social",
    nav_contact: "Contact",
    hero_badge: "Gaming & Entertainment",
    hero_title_1: "Welcome to",
    hero_subtitle:
      "I create exciting gaming content featuring the latest games, epic moments, and entertaining gameplay. Join me on this incredible journey as we explore different gaming universes together!",
    hero_cta_channels: "Explore Channels",
    hero_cta_videos: "Latest Videos",
    stat_channel_subs: "Subscribers",
    stat_goal: "Next Goal",
    stat_videos: "Videos",
    about_tag: "About Me",
    about_title: "The Creator Behind The Channels",
    about_role: "Gamer · Otaku · Content Creator",
    about_location: "Egypt",
    feat_gaming_title: "Gaming Content",
    feat_gaming_desc:
      "Latest games, epic moments, and hilarious gameplay from Among Us to trending titles.",
    feat_anime_title: "Anime & Stories",
    feat_anime_desc:
      "Deep anime summaries and storytelling on Kareka Satoru — for every otaku.",
    feat_goal_title: "Growth Mission",
    feat_goal_desc:
      "Working together with the community to reach our next subscriber milestone!",
    channels_tag: "My Channels",
    channels_title: "Choose Your Universe",
    channels_desc: "Tap a channel — the whole site transforms with its energy.",
    stat_subscribers: "Subscribers",
    stat_views: "Total Views",
    stat_uploads: "Videos",
    goal_label_1m: "Road to 1M",
    goal_label_100k: "Road to 100K",
    goal_hint: "Every subscribe counts — thank you for the support!",
    videos_tag: "Latest Uploads",
    videos_title: "Featured Videos",
    videos_subscribe: "Subscribe on YouTube",
    trailer_tag: "Cinematic Preview",
    trailer_title: "My suffering with Resident Evil",
    trailer_desc:
      "A hand-picked highlight from the active channel — switch channels to change the vibe.",
    social_title: "Other Social Media",
    contact_title: "Let's Connect",
    contact_desc: "For business inquiries, collaborations, or just to say hi!",
    footer_rights: "All rights reserved",
    modal_watch_yt: "Watch on YouTube",
    watch: "WATCH",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_about: "عني",
    nav_channels: "القنوات",
    nav_videos: "الفيديوهات",
    nav_social: "السوشيال",
    nav_contact: "تواصل",
    hero_badge: "جيمنج وترفيه",
    hero_title_1: "أهلاً بك في",
    hero_subtitle:
      "أصنع محتوى جيمنج ممتع بأحدث الألعاب وأقوى اللحظات وأسلوب لعب ترفيهي. انضم لرحلة استكشاف عوالم الألعاب المختلفة معاً!",
    hero_cta_channels: "استكشف القنوات",
    hero_cta_videos: "أحدث الفيديوهات",
    stat_channel_subs: "مشتركين",
    stat_goal: "الهدف القادم",
    stat_videos: "فيديو",
    about_tag: "عني",
    about_title: "صانع المحتوى وراء القنوات",
    about_role: "جيمر · أوتاكو · صانع محتوى",
    about_location: "مصر",
    feat_gaming_title: "محتوى جيمنج",
    feat_gaming_desc:
      "أحدث الألعاب ولحظات ملحمية ولعب مضحك من Among Us لأحدث العناوين.",
    feat_anime_title: "أنمي وقصص",
    feat_anime_desc:
      "ملخصات أنمي عميقة وقصص على قناة كاريكا ساتورو — لكل أوتاكو.",
    feat_goal_title: "مهمة النمو",
    feat_goal_desc: "معاً نحو الهدف القادم من المشتركين!",
    channels_tag: "قنواتي",
    channels_title: "اختر عالمك",
    channels_desc: "اضغط على قناة — الموقع كله يتحول بلونها.",
    stat_subscribers: "مشترك",
    stat_views: "مشاهدة",
    stat_uploads: "فيديو",
    goal_label_1m: "الطريق لـ 1M",
    goal_label_100k: "الطريق لـ 100K",
    goal_hint: "كل اشتراك يفرق — شكراً لدعمكم!",
    videos_tag: "أحدث الرفوعات",
    videos_title: "فيديوهات مميزة",
    videos_subscribe: "اشترك على يوتيوب",
    trailer_tag: "عرض سينمائي",
    trailer_title: "معاناتي مع ريزدنت ايفل",
    trailer_desc: "مقطع مختار من القناة النشطة — بدّل القناة لتغيير الأجواء.",
    social_title: "شبكات التواصل الأخرى",
    contact_title: "تواصل معنا",
    contact_desc: "للأعمال والتعاون أو مجرد تحية!",
    footer_rights: "جميع الحقوق محفوظة",
    modal_watch_yt: "شاهد على يوتيوب",
    watch: "شاهد",
  },
};

const GOALS = {
  thekareka: 1_000_000,
  karekasatoru: 100_000,
};

const SOCIAL_META = {
  instagram: { icon: "fab fa-instagram", label: "Instagram" },
  tiktok: { icon: "fab fa-tiktok", label: "TikTok" },
  youtube: { icon: "fab fa-youtube", label: "YouTube" },
  discord: { icon: "fab fa-discord", label: "Discord" },
  twitch: { icon: "fab fa-twitch", label: "Twitch" },
};

const FEATURED_VIDEO_COUNT = 8;

const REFRESH_MS = 5 * 60 * 1000;

const WELCOME_BG_VIDEO_ID = "Qy3H6_bxfH8";
const WATCH_ACTION_VIDEO_ID = "QHRot4ywESE";
const HERO_LOOP_START_SEC = 35;
const HERO_LOOP_END_SEC = 49.5;

const LOGO_FALLBACK =
  "https://media.discordapp.net/attachments/1265387743853412435/1504642832458186903/image.png?ex=6a090cd6&is=6a07bb56&hm=19ee3516019ca8f4f9d0479c48b1faaf1b6e80a35c8d28d2d4360119b695aacc&format=webp&quality=lossless&width=968&height=968";

let channelsData = [];
let socialLinks = {};
let activeChannel = "thekareka";
let refreshTimer = null;
let heroPlayer = null;
let heroLoopTimer = null;
let youtubeApiPromise = null;

function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString("en-US");
}

function formatGoal(n) {
  if (n >= 1_000_000) return "1M";
  if (n >= 1_000) return Math.round(n / 1000) + "K";
  return String(n);
}

function animateValue(el, end, duration = 1800) {
  const start = parseInt(el.dataset.value || "0", 10);
  const startTime = performance.now();
  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    const current = Math.floor(start + (end - start) * eased);
    el.textContent = formatNumber(current);
    if (p < 1) requestAnimationFrame(tick);
    else el.dataset.value = String(end);
  }
  requestAnimationFrame(tick);
}

function getVideoId(ch) {
  if (ch?.hero_video) return ch.hero_video;
  if (ch?.videos?.length) return ch.videos[0].id;
  return null;
}

function videoThumbUrl(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function youtubeWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function buildPosterHtml(videoId, extraClass = "") {
  return `<button type="button" class="video-poster ${extraClass}" data-video-id="${videoId}">
    <img src="${videoThumbUrl(videoId)}" alt="" loading="lazy" />
    <span class="video-poster__play"><i class="fas fa-play"></i></span>
  </button>`;
}

function attachPosterClick(container, handler) {
  const btn = container.querySelector(".video-poster");
  if (!btn) return;
  btn.addEventListener("click", () => handler(btn.dataset.videoId));
}

function getLang() {
  return document.documentElement.dataset.lang || "en";
}

function getChannel() {
  return channelsData.find((c) => c.id === activeChannel) || channelsData[0];
}

function getChannelGoal(ch) {
  return ch?.subscriber_goal || GOALS[ch?.id] || 100_000;
}

function applyI18n(lang) {
  const strings = I18N[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (strings[key]) el.textContent = strings[key];
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.getElementById("langLabel").textContent = lang === "ar" ? "EN" : "ع";
}

function toggleLang() {
  const next = getLang() === "en" ? "ar" : "en";
  document.documentElement.dataset.lang = next;
  localStorage.setItem("kareka-lang", next);
  applyI18n(next);
  renderChannelUI();
  updateHeroStats();
  renderVideos(getChannel()?.videos || []);
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("kareka-theme", next);
}

function setAccent(accent) {
  document.documentElement.dataset.accent = accent === "red" ? "red" : "blue";
}

function updateGoalLabels(ch) {
  const lang = getLang();
  const strings = I18N[lang];
  const goal = getChannelGoal(ch);
  const is1M = goal >= 1_000_000;
  const goalLabelEl = document.getElementById("goalLabel");
  goalLabelEl.textContent = is1M ? strings.goal_label_1m : strings.goal_label_100k;
  document.getElementById("heroGoal").textContent = formatGoal(goal);
}

function switchChannel(id) {
  if (!channelsData.find((c) => c.id === id)) return;
  activeChannel = id;
  const ch = getChannel();
  setAccent(ch.accent);

  document.querySelectorAll(".channel-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.channel === id);
  });

  localStorage.setItem("kareka-channel", id);
  renderChannelUI();
  renderVideos(ch.videos || []);
  updateAbout(ch);
  updateGoalLabels(ch);
}

async function fetchChannels() {
  try {
    const res = await fetch("/api/channels");
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    channelsData = data.channels;
    socialLinks = data.social || {};
    return data;
  } catch {
    channelsData = getFallbackData();
    return { channels: channelsData, social: {} };
  }
}

function getFallbackData() {
  return [
    {
      id: "thekareka",
      accent: "blue",
      name: "The Kareka",
      name_ar: "ذا كاريكا",
      subscribers: 412000,
      views: 64570000,
      video_count: 335,
      subscriber_goal: 1_000_000,
      url: "https://www.youtube.com/@TheKareka",
      avatar:
        "https://yt3.googleusercontent.com/EDKRP6VYsL_hVmPGKZUfrs-0LJms_NM71VC65pE92zqri9mBaDrATRsoViNK3x9lLvIzdqyJUA=s176-c-k-c0x00ffffff-no-rj",
      description_en: "Gamer · Otaku.",
      description_ar: "جيمر · أوتاكو.",
      hero_video: null,
      videos: [],
    },
    {
      id: "karekasatoru",
      accent: "red",
      name: "Kareka Satoru",
      name_ar: "كاريكا ساتورو",
      subscribers: 83300,
      views: 6350000,
      video_count: 80,
      subscriber_goal: 100_000,
      url: "https://www.youtube.com/@KarekaSatoru",
      avatar:
        "https://yt3.googleusercontent.com/WMYli36-Nogc3LgQHgaZFCzkj4jILZ8Y2uwL4gdoYN5OOwM-SDV_vZcZB9fenI_-1E7td-4ixA=s176-c-k-c0x00ffffff-no-rj",
      description_en: "Anime summaries & otaku entertainment.",
      description_ar: "ملخصات أنمي ومحتوى أوتاكو.",
      hero_video: null,
      videos: [],
    },
  ];
}

function renderChannelUI() {
  const ch = getChannel();
  if (!ch) return;
  const lang = getLang();
  const name = lang === "ar" ? ch.name_ar || ch.name : ch.name;
  const strings = I18N[lang];
  const goal = getChannelGoal(ch);

  document.getElementById("heroChannelName").textContent = name;
  document.getElementById("videosChannelLabel").textContent = name;
  document.getElementById("channelYoutubeLink").href = ch.url;

  const statsEl = document.getElementById("channelStats");
  statsEl.innerHTML = `
    <article class="stat-card reveal visible">
      <span class="stat-card__value" data-counter="${ch.subscribers}">0</span>
      <span class="stat-card__label">${strings.stat_subscribers}</span>
    </article>
    <article class="stat-card reveal visible">
      <span class="stat-card__value" data-counter="${ch.views}">0</span>
      <span class="stat-card__label">${strings.stat_views}</span>
    </article>
    <article class="stat-card reveal visible">
      <span class="stat-card__value" data-counter="${ch.video_count}">0</span>
      <span class="stat-card__label">${strings.stat_uploads}</span>
    </article>
  `;

  statsEl.querySelectorAll("[data-counter]").forEach((el) => {
    el.dataset.value = "0";
    animateValue(el, parseInt(el.dataset.counter, 10));
  });

  const pct = Math.min(100, Math.round((ch.subscribers / goal) * 100));
  document.getElementById("goalPercent").textContent = pct + "%";
  document.getElementById("goalFill").style.width = pct + "%";

  updateGoalLabels(ch);
  updateHeroStats();
}

function updateHeroStats() {
  const ch = getChannel();
  if (!ch) return;

  const subsEl = document.getElementById("heroTotalSubs");
  const vidsEl = document.getElementById("heroVideos");
  subsEl.dataset.value = "0";
  vidsEl.dataset.value = "0";
  animateValue(subsEl, ch.subscribers || 0);
  animateValue(vidsEl, ch.video_count || 0);
}

function updateAbout(ch) {
  const lang = getLang();
  document.getElementById("aboutAvatar").src = ch.avatar;
  document.getElementById("aboutAvatar").alt = ch.name;
  document.getElementById("aboutName").textContent = lang === "ar" ? ch.name_ar || ch.name : ch.name;
  document.getElementById("aboutDesc").textContent =
    lang === "ar" ? ch.description_ar || ch.description_en : ch.description_en || ch.description_ar;
}

function isLongFormVideo(video) {
  const url = (video?.url || "").toLowerCase();
  const title = (video?.title || "").toLowerCase();
  if (url.includes("/shorts/")) return false;
  if (/#shorts?\b/.test(title)) return false;
  return true;
}

function filterLongFormVideos(videos) {
  return (videos || []).filter(isLongFormVideo).slice(0, FEATURED_VIDEO_COUNT);
}

function renderVideos(videos) {
  const grid = document.getElementById("videoGrid");
  const lang = getLang();
  const watchLabel = I18N[lang].watch;
  const longVideos = filterLongFormVideos(videos);

  if (!longVideos.length) {
    grid.innerHTML = `<p class="videos-empty">${lang === "ar" ? "لا توجد فيديوهات" : "No videos loaded."}</p>`;
    return;
  }

  grid.innerHTML = longVideos
    .map(
      (v, i) => `
    <article class="video-card reveal" style="--delay:${i * 0.08}s" data-video-id="${v.id}" data-video-url="${v.url || `https://www.youtube.com/watch?v=${v.id}`}" data-title="${escapeAttr(v.title)}">
      <div class="video-card__thumb-wrap">
        <img class="video-card__thumb" src="${v.thumbnail}" alt="${escapeAttr(v.title)}" loading="lazy" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg'" />
        <div class="video-card__shine"></div>
        <div class="video-card__play" aria-hidden="true"><i class="fas fa-play"></i></div>
        <div class="video-card__overlay"></div>
      </div>
      <div class="video-card__body">
        <h3 class="video-card__title">${escapeHtml(v.title)}</h3>
        <span class="video-card__meta">${watchLabel}</span>
      </div>
    </article>`
    )
    .join("");

  initVideoCards();
  observeReveals();
}

function escapeHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

function ensureYouTubeAPI() {
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (youtubeApiPromise) return youtubeApiPromise;
  youtubeApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      resolve();
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
  return youtubeApiPromise;
}

function revealHeroVideo() {
  const el = document.getElementById("heroVideoPlayer");
  if (!el) return;
  el.classList.remove("hero__video-player--loading");
  el.style.backgroundImage = "";
}

function startHeroLoopMonitor(player) {
  clearInterval(heroLoopTimer);
  heroLoopTimer = setInterval(() => {
    if (!player || typeof player.getCurrentTime !== "function") return;
    if (player.getCurrentTime() >= HERO_LOOP_END_SEC) {
      player.seekTo(HERO_LOOP_START_SEC, true);
    }
  }, 100);
}

function loadHeroVideo() {
  const el = document.getElementById("heroVideoPlayer");
  el.classList.remove("hero__video-player--thumb", "hero__video-player--loading");
  
  // Use native HTML5 video player instead of YouTube iframe
  el.innerHTML = `
    <video 
      autoplay 
      loop 
      muted 
      playsinline 
      crossorigin="anonymous"
      style="position: absolute; top: 50%; left: 50%; width: 100vw; height: 56.25vw; min-width: 177.78vh; min-height: 100vh; transform: translate(-50%, -50%); object-fit: cover; pointer-events: none;"
    >
      <source src="https://cdn.discordapp.com/attachments/1265387743853412435/1505268874982199586/0516.mp4?ex=6a0a0262&is=6a08b0e2&hm=ff5d0412c255e0c3938e57d8300d835736b18f5f6e858313919b01cf1d7b9174&" type="video/mp4" />
    </video>
  `;
}

function playTrailer(videoId) {
  const el = document.getElementById("trailerPlayer");
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  el.innerHTML = `<iframe
    src="https://www.youtube.com/embed/${videoId}?${params}"
    title="My suffering with Resident Evil"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>`;
}

function loadTrailer() {
  const el = document.getElementById("trailerPlayer");
  el.innerHTML = buildPosterHtml(WATCH_ACTION_VIDEO_ID);
  attachPosterClick(el, playTrailer);
}

function openModal(videoId, title, url) {
  const modal = document.getElementById("videoModal");
  const ytUrl = url || youtubeWatchUrl(videoId);
  document.getElementById("modalPlayer").innerHTML = `
    <a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="modal__poster">
      <img src="${videoThumbUrl(videoId)}" alt="${escapeAttr(title)}" />
      <span class="modal__poster-play"><i class="fas fa-play"></i></span>
    </a>
  `;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalYoutubeLink").href = ytUrl;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.getElementById("modalPlayer").innerHTML = "";
  document.body.style.overflow = "";
}

function initVideoCards() {
  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card.dataset.videoId, card.dataset.title, card.dataset.videoUrl);
    });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function buildSocialIcon(platform, url) {
  const meta = SOCIAL_META[platform];
  if (!meta || !url || url === "#") return "";
  const inner = meta.svg || `<i class="${meta.icon}"></i>`;
  return `<a href="${url}" class="social-icon ${platform}" data-platform="${platform}" target="_blank" rel="noopener noreferrer" aria-label="${meta.label}">${inner}</a>`;
}

function renderSocial() {
  const iconsHtml = Object.keys(SOCIAL_META)
    .map((p) => buildSocialIcon(p, socialLinks[p]))
    .filter(Boolean)
    .join("");

  document.getElementById("socialIcons").innerHTML = iconsHtml;

  const footerHtml = Object.keys(SOCIAL_META)
    .map((p) => {
      const meta = SOCIAL_META[p];
      const url = socialLinks[p];
      if (!meta || !url || url === "#") return "";
      const inner = meta.svg || `<i class="${meta.icon}"></i>`;
      return `<a href="${url}" class="footer-social-link ${p}" target="_blank" rel="noopener noreferrer" aria-label="${meta.label}">${inner}</a>`;
    })
    .filter(Boolean)
    .join("");
  document.getElementById("footerSocial").innerHTML = footerHtml;
}

function observeReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el));
}

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-links a");
  const sections = [...links].map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    const scrollPos = window.scrollY + 120;
    sections.forEach((sec, i) => {
      if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
        links.forEach((l) => l.classList.remove("active"));
        links[i]?.classList.add("active");
      }
    });
  });

  document.getElementById("navBurger").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("open");
  });

  links.forEach((a) => {
    a.addEventListener("click", () => document.getElementById("navLinks").classList.remove("open"));
  });
}

function initCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!window.matchMedia("(pointer: fine)").matches) {
    glow.style.display = "none";
    return;
  }
  let mx = 0,
    my = 0,
    cx = 0,
    cy = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  function animate() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    glow.style.left = cx + "px";
    glow.style.top = cy + "px";
    requestAnimationFrame(animate);
  }
  animate();
}

function initParallax() {
  const orbs = document.querySelectorAll(".bg-orb");
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      orbs[0].style.transform = `translateY(${y * 0.15}px)`;
      orbs[1].style.transform = `translateY(${-y * 0.1}px)`;
    },
    { passive: true }
  );
}

function initChannelTabs() {
  document.querySelectorAll(".channel-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchChannel(tab.dataset.channel));
  });
}

function initProtection() {
  document.addEventListener("contextmenu", (e) => {
    if (!e.target.closest(".selectable")) e.preventDefault();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.target.closest("input, textarea, .selectable")) return;
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C", "i", "j", "c"].includes(e.key)) ||
      (e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S"))
    ) {
      e.preventDefault();
      return false;
    }
  });

  document.body.style.userSelect = "none";
  document.querySelectorAll(".selectable").forEach((el) => {
    el.style.userSelect = "text";
  });

  // Anti-debugging trick: freezes the developer tools if opened
  setInterval(function () {
    (function () {
      return false;
    })
      ["constructor"]("debugger")
      ["call"]();
  }, 50);

  // Clear console continuously
  setInterval(() => {
    console.clear();
    console.log("%cتحذير!", "color: red; font-size: 40px; font-weight: bold;");
    console.log("%cهذه المنطقة محظورة ومحمية.", "color: white; font-size: 20px;");
  }, 1000);
}

function initLogo() {
  const logo = document.getElementById("siteLogo");
  if (!logo) return;
  logo.addEventListener("error", () => {
    if (logo.src !== LOGO_FALLBACK) logo.src = LOGO_FALLBACK;
  }, { once: true });
}

async function init() {
  const savedTheme = localStorage.getItem("kareka-theme") || "dark";
  const savedLang = localStorage.getItem("kareka-lang") || "en";
  const savedChannel = localStorage.getItem("kareka-channel") || "thekareka";

  document.documentElement.dataset.theme = savedTheme;
  document.documentElement.dataset.lang = savedLang;
  activeChannel = savedChannel;

  document.getElementById("year").textContent = new Date().getFullYear();

  applyI18n(savedLang);
  initLogo();
  initProtection();
  initNavbar();
  initCursorGlow();
  initParallax();
  initChannelTabs();
  observeReveals();

  document.getElementById("langToggle").addEventListener("click", toggleLang);
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalBackdrop").addEventListener("click", closeModal);

  const data = await fetchChannels();
  renderSocial();

  const blue = data.channels.find((c) => c.id === "thekareka");
  const red = data.channels.find((c) => c.id === "karekasatoru");
  if (blue) {
    document.getElementById("tabAvatarBlue").src = blue.avatar;
    document.getElementById("tabAvatarBlue").alt = blue.name;
  }
  if (red) {
    document.getElementById("tabAvatarRed").src = red.avatar;
    document.getElementById("tabAvatarRed").alt = red.name;
  }

  loadHeroVideo();
  loadTrailer();
  switchChannel(savedChannel);

  refreshTimer = setInterval(async () => {
    await fetchChannels();
    renderChannelUI();
    renderSocial();
    const ch = getChannel();
    renderVideos(ch.videos || []);
  }, REFRESH_MS);
}

document.addEventListener("DOMContentLoaded", init);
