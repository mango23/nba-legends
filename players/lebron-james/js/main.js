/* =========================================================
   LEBRON JAMES · THE KING'S REALM — 交互引擎
   ========================================================= */
(function () {
  "use strict";
  gsap.registerPlugin(ScrollTrigger);
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 预加载 ---------- */
  const preloader = $("#preloader");
  const pctEl = $("#preloader .pct");
  let pct = 0;
  const imgs = Array.from(document.images);
  const total = Math.max(imgs.length, 1);
  let loaded = 0;
  function bump() {
    loaded++;
    const target = Math.round((loaded / total) * 100);
    gsap.to({ v: pct }, {
      v: target, duration: 0.5, ease: "power2.out",
      onUpdate: function () { pct = Math.round(this.targets()[0].v); pctEl.textContent = pct + "%"; }
    });
  }
  imgs.forEach((im) => {
    if (im.complete) bump();
    else { im.addEventListener("load", bump); im.addEventListener("error", bump); }
  });
  const minWait = new Promise((r) => setTimeout(r, 1900));
  const allLoaded = new Promise((r) => {
    const t = setInterval(() => { if (loaded >= total) { clearInterval(t); r(); } }, 120);
    setTimeout(() => { clearInterval(t); r(); }, 7000); // 兜底
  });
  Promise.all([minWait, allLoaded]).then(() => {
    pctEl.textContent = "100%";
    gsap.to(preloader, {
      yPercent: -100, duration: 1, ease: "power4.inOut", delay: 0.25,
      onComplete: () => { preloader.style.display = "none"; heroIntro(); }
    });
  });

  /* ---------- 自定义光标 ---------- */
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  if (window.matchMedia("(hover: hover)").matches) {
    const rx = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
    window.addEventListener("mousemove", (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      rx(e.clientX); ry(e.clientY);
    });
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a,button,.chart-tab,.stint-tab,.gal-item,.news-card,.quote-dots i,.chip"))
        document.body.classList.add("cursor-hover");
      else document.body.classList.remove("cursor-hover");
    });
  } else {
    document.body.style.cursor = "auto";
  }

  /* ---------- 导航 ---------- */
  const nav = $("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  /* ---------- 金色粒子 ---------- */
  const cv = $("#particles"), ctx = cv.getContext("2d");
  let W, H, parts = [];
  function resize() {
    W = cv.width = cv.offsetWidth * devicePixelRatio;
    H = cv.height = cv.offsetHeight * devicePixelRatio;
  }
  resize();
  window.addEventListener("resize", resize);
  const N = reduceMotion ? 0 : 90;
  for (let i = 0; i < N; i++) {
    parts.push({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 2.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.00016,
      vy: -Math.random() * 0.00035 - 0.00006,
      a: Math.random() * 0.55 + 0.12,
      tw: Math.random() * Math.PI * 2,
    });
  }
  let mouseX = 0.5, mouseY = 0.5;
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / innerWidth; mouseY = e.clientY / innerHeight;
  });
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.x += p.vx + (mouseX - 0.5) * 0.0003;
      p.y += p.vy;
      p.tw += 0.03;
      if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
      if (p.x < -0.05) p.x = 1.05; if (p.x > 1.05) p.x = -0.05;
      const alpha = p.a * (0.65 + 0.35 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226, 190, 92, ${alpha})`;
      ctx.shadowColor = "rgba(212,175,55,.8)";
      ctx.shadowBlur = 6 * devicePixelRatio;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    requestAnimationFrame(draw);
  })();

  /* ---------- Hero 入场 & 视差 ---------- */
  function heroIntro() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-tag", { y: 30, opacity: 0, duration: 0.8 })
      .from(".hero-name", { y: 70, opacity: 0, duration: 1.1 }, "-=0.4")
      .from(".hero-cn", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(".chip", { y: 34, opacity: 0, stagger: 0.09, duration: 0.7 }, "-=0.4")
      .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.2");
  }
  gsap.to(".hero-bg", {
    yPercent: 14, ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to(".hero-giant", {
    yPercent: -30, ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
  });
  if (!reduceMotion) {
    $("#hero").addEventListener("mousemove", (e) => {
      const dx = (e.clientX / innerWidth - 0.5), dy = (e.clientY / innerHeight - 0.5);
      gsap.to(".hero-giant", { x: dx * -36, duration: 1.2, ease: "power3.out" });
      gsap.to(".hero-inner", { x: dx * 14, y: dy * 10, duration: 1.2, ease: "power3.out" });
    });
  }

  /* ---------- 通用 reveal ---------- */
  $$(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%" }
    });
  });
  $$(".sec-bg-word").forEach((el) => {
    gsap.fromTo(el, { xPercent: -56 }, {
      xPercent: -44, ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  /* ---------- 数字滚动 ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const dec = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 2.2, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
      onUpdate: () => {
        el.firstChild.nodeValue = dec
          ? obj.v.toFixed(dec)
          : Math.round(obj.v).toLocaleString("en-US");
      }
    });
  }
  $$(".stat-num[data-count]").forEach(countUp);

  /* ---------- 最新动态 ---------- */
  const newsWrap = $("#newsGrid");
  const newsData = (typeof NEWS_DATA !== "undefined") ? NEWS_DATA : (window.NEWS_DATA || { items: [] });
  const items = newsData.items || [];
  $("#newsUpdated").textContent = newsData.updatedAt ? `更新于 ${newsData.updatedAt}` : "";
  newsWrap.innerHTML = items.map((n, i) => {
    if (i === 0) {
      return `
      <article class="news-card hero-card reveal">
        <div class="txt">
          <span class="news-date">${n.date}</span><span class="news-tag">${n.tag}</span>
          <h3 class="news-title">${n.title}</h3>
          <p class="news-desc">${n.desc}</p>
          <a class="news-link" href="${n.url}" target="_blank" rel="noopener">阅读原文</a>
        </div>
        <div class="pic"><img src="assets/img/lebron-embiid-76ers.jpg" alt="勒布朗与恩比德" loading="lazy"></div>
      </article>`;
    }
    return `
      <article class="news-card reveal">
        <span class="news-date">${n.date}</span><span class="news-tag">${n.tag}</span>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-desc">${n.desc}</p>
        <a class="news-link" href="${n.url}" target="_blank" rel="noopener">阅读原文</a>
      </article>`;
  }).join("");
  // 跑马灯
  const tickerTrack = $("#tickerTrack");
  const tickItems = items.map((n) => `<span class="ticker-item"><i></i><b>${n.date}</b>${n.title}</span>`).join("");
  tickerTrack.innerHTML = tickItems + tickItems; // 双份无缝循环
  // 新闻卡 reveal 需在渲染后绑定
  $$("#newsGrid .reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" }
    });
  });

  /* ---------- 数据殿堂：赛季图表 ---------- */
  const chart = $("#seasonChart");
  const cctx = chart.getContext("2d");
  const chartKeys = {
    pts: { label: "场均得分", color: "#f5d76e", max: 35 },
    reb: { label: "场均篮板", color: "#9ed3ff", max: 12 },
    ast: { label: "场均助攻", color: "#ff8fa5", max: 12 },
    gp: { label: "出场数", color: "#b7f5c8", max: 90 },
  };
  let chartKey = "pts";
  let chartProg = 0;
  let hoverIdx = -1;
  const seasons = LBJ.seasons;

  function fitChart() {
    const dpr = devicePixelRatio || 1;
    chart.width = chart.offsetWidth * dpr;
    chart.height = chart.offsetHeight * dpr;
    drawChart();
  }
  window.addEventListener("resize", fitChart);

  function drawChart() {
    const dpr = devicePixelRatio || 1;
    const w = chart.width, h = chart.height;
    const padL = 46 * dpr, padR = 16 * dpr, padT = 20 * dpr, padB = 56 * dpr;
    const cw = w - padL - padR, chh = h - padT - padB;
    const cfg = chartKeys[chartKey];
    cctx.clearRect(0, 0, w, h);

    // 网格
    cctx.strokeStyle = "rgba(255,255,255,.06)";
    cctx.fillStyle = "rgba(255,255,255,.38)";
    cctx.font = `${11 * dpr}px "PingFang SC"`;
    cctx.textAlign = "right";
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const y = padT + (chh / steps) * i;
      cctx.beginPath(); cctx.moveTo(padL, y); cctx.lineTo(w - padR, y); cctx.stroke();
      const val = cfg.max - (cfg.max / steps) * i;
      cctx.fillText(val.toFixed(chartKey === "gp" ? 0 : 0), padL - 8 * dpr, y + 4 * dpr);
    }

    const n = seasons.length;
    const bw = (cw / n) * 0.56;
    const xOf = (i) => padL + (cw / n) * i + (cw / n) / 2;

    // 冠军/MVP 背景带
    seasons.forEach((s, i) => {
      if (s.champ || s.mvp) {
        cctx.fillStyle = s.champ ? "rgba(212,175,55,.09)" : "rgba(85,37,131,.14)";
        cctx.fillRect(padL + (cw / n) * i, padT, cw / n, chh);
      }
    });

    // 柱状
    seasons.forEach((s, i) => {
      const v = s[chartKey];
      const bh = (v / cfg.max) * chh * chartProg;
      const x = xOf(i) - bw / 2, y = padT + chh - bh;
      const g = cctx.createLinearGradient(0, y, 0, padT + chh);
      g.addColorStop(0, cfg.color);
      g.addColorStop(1, "rgba(212,175,55,.05)");
      cctx.fillStyle = hoverIdx === i ? cfg.color : g;
      cctx.beginPath();
      const r = Math.min(4 * dpr, bw / 2);
      cctx.roundRect(x, y, bw, bh, [r, r, 0, 0]);
      cctx.fill();
    });

    // 折线
    cctx.beginPath();
    seasons.forEach((s, i) => {
      const x = xOf(i), y = padT + chh - (s[chartKey] / cfg.max) * chh * chartProg;
      i === 0 ? cctx.moveTo(x, y) : cctx.lineTo(x, y);
    });
    cctx.strokeStyle = "rgba(255,255,255,.75)";
    cctx.lineWidth = 1.6 * dpr;
    cctx.stroke();
    seasons.forEach((s, i) => {
      const x = xOf(i), y = padT + chh - (s[chartKey] / cfg.max) * chh * chartProg;
      cctx.beginPath();
      cctx.arc(x, y, (hoverIdx === i ? 5 : 2.6) * dpr, 0, Math.PI * 2);
      cctx.fillStyle = hoverIdx === i ? "#fff" : "rgba(255,255,255,.85)";
      cctx.fill();
    });

    // X 轴
    cctx.fillStyle = "rgba(255,255,255,.4)";
    cctx.textAlign = "center";
    cctx.font = `${10 * dpr}px "Bebas Neue", "Arial Narrow"`;
    seasons.forEach((s, i) => {
      if (i % 2 === 0 || n < 12) cctx.fillText("'" + s.year.slice(2, 4), xOf(i), h - padB + 18 * dpr);
    });
    cctx.font = `${10 * dpr}px "PingFang SC"`;
    cctx.fillStyle = "rgba(212,175,55,.7)";
    cctx.fillText("金底 = 夺冠赛季 · 紫底 = MVP赛季 · 悬停查看详情", padL + cw / 2, h - 10 * dpr);

    // 悬浮提示
    if (hoverIdx >= 0) {
      const s = seasons[hoverIdx];
      const x = xOf(hoverIdx);
      const lines = [
        `${s.year} · ${s.team}`,
        `得分 ${s.pts}  篮板 ${s.reb}  助攻 ${s.ast}`,
        `出场 ${s.gp}  命中率 ${s.fg ? s.fg + "%" : "—"}`,
      ];
      if (s.note) lines.push(s.note);
      cctx.font = `${11.5 * dpr}px "PingFang SC"`;
      const tw = Math.max(...lines.map((l) => cctx.measureText(l).width)) + 24 * dpr;
      const th = (lines.length * 19 + 14) * dpr;
      let bx = x - tw / 2;
      bx = Math.max(padL, Math.min(bx, w - padR - tw));
      const by = padT + 6 * dpr;
      cctx.fillStyle = "rgba(10,10,14,.94)";
      cctx.strokeStyle = "rgba(212,175,55,.5)";
      cctx.beginPath(); cctx.roundRect(bx, by, tw, th, 8 * dpr); cctx.fill(); cctx.stroke();
      cctx.textAlign = "left";
      lines.forEach((l, li) => {
        cctx.fillStyle = li === 0 ? "#f5d76e" : "rgba(242,240,234,.88)";
        cctx.fillText(l, bx + 12 * dpr, by + (22 + li * 19) * dpr);
      });
    }
  }

  chart.addEventListener("mousemove", (e) => {
    const rect = chart.getBoundingClientRect();
    const dpr = devicePixelRatio || 1;
    const padL = 46, padR = 16;
    const cw = rect.width - padL - padR;
    const relX = (e.clientX - rect.left) - padL;
    const idx = Math.floor((relX / cw) * seasons.length);
    hoverIdx = idx >= 0 && idx < seasons.length ? idx : -1;
    drawChart();
  });
  chart.addEventListener("mouseleave", () => { hoverIdx = -1; drawChart(); });

  $$(".chart-tab").forEach((t) => {
    t.addEventListener("click", () => {
      $$(".chart-tab").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      chartKey = t.dataset.key;
      gsap.fromTo({ v: 0 }, { v: 0 }, {
        v: 1, duration: 0.9, ease: "power3.out",
        onUpdate: function () { chartProg = this.targets()[0].v; drawChart(); }
      });
    });
  });
  ScrollTrigger.create({
    trigger: ".chart-wrap", start: "top 80%", once: true,
    onEnter: () => {
      fitChart();
      gsap.fromTo({ v: 0 }, { v: 0 }, {
        v: 1, duration: 1.6, ease: "power3.out",
        onUpdate: function () { chartProg = this.targets()[0].v; drawChart(); }
      });
    }
  });

  /* ---------- 赛季表格 ---------- */
  const tbody = $("#seasonTbody");
  tbody.innerHTML = seasons.map((s) => `
    <tr>
      <td class="yr">${s.year}
        <span class="team-tag team-${s.team}">${s.team}</span>
        ${s.mvp ? '<span class="pill mvp">MVP</span>' : ""}
        ${s.champ ? '<span class="pill champ">🏆 总冠军+FMVP</span>' : ""}
        ${s.note ? `<span class="tnote">${s.note}</span>` : ""}
      </td>
      <td>${s.gp}</td><td><b>${s.pts}</b></td><td>${s.reb}</td><td>${s.ast}</td>
      <td>${s.fg ? s.fg + "%" : "—"}</td><td>${s.tp ? s.tp + "%" : "—"}</td>
    </tr>`).join("");

  /* ---------- 纪录 ---------- */
  $("#recordsGrid").innerHTML = LBJ.records.map((r) => `
    <div class="record-card reveal">
      <div class="record-num">${r.num}</div>
      <div class="record-label">${r.label}</div>
      <p class="record-desc">${r.desc}</p>
    </div>`).join("");

  /* ---------- 时间线 ---------- */
  const tlTrack = $("#tlTrack");
  tlTrack.innerHTML = LBJ.timeline.map((t) => `
    <div class="tl-card ${t.img ? "has-img" : ""}">
      ${t.img ? `<div class="tl-img"><img src="${t.img}" alt="${t.title}" loading="lazy"></div>` : ""}
      <div class="tl-year">${t.year}</div>
      <div class="tl-title">${t.title}</div>
      <p class="tl-desc">${t.desc}</p>
    </div>`).join("");
  const tlScroll = () => tlTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.12;
  const tlTween = gsap.to(tlTrack, {
    x: () => -tlScroll(),
    ease: "none",
    scrollTrigger: {
      trigger: "#timeline", start: "top top",
      end: () => "+=" + tlScroll(),
      pin: true, scrub: 1, invalidateOnRefresh: true,
      onUpdate: (self) => { $("#tlProgressBar").style.width = (self.progress * 100) + "%"; }
    }
  });

  /* ---------- 四段旅程 ---------- */
  const stintWrap = $("#stintPanel");
  function renderStint(i) {
    const s = LBJ.stints[i];
    stintWrap.innerHTML = `
      <div class="stint-logo-box" style="--stint-glow:${s.color}33">
        <img src="${s.logo}" alt="${s.team}">
      </div>
      <div>
        <div class="stint-years">${s.years}</div>
        <h3 class="stint-name">${s.team}</h3>
        <p class="stint-stats">${s.stats}</p>
        <p class="stint-desc">${s.desc}</p>
      </div>`;
    gsap.from(stintWrap.children, { y: 26, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" });
  }
  $$(".stint-tab").forEach((t, i) => {
    t.addEventListener("click", () => {
      $$(".stint-tab").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      renderStint(i);
    });
  });
  renderStint(4); // 默认展示 76 人新篇章

  /* ---------- 荣誉 ---------- */
  $("#honorGrid").innerHTML = LBJ.honors.map((h) => `
    <div class="honor-card reveal">
      <div class="honor-num"><span class="x">×</span>${h.num}</div>
      <div class="honor-title">${h.title}</div>
      <div class="honor-years">${h.years}</div>
    </div>`).join("");
  $$(".honor-card").forEach((c) => {
    c.addEventListener("mousemove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      c.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });

  /* ---------- 场外 ---------- */
  $("#offGrid").innerHTML = `
    <div class="off-banner reveal">
      <img src="assets/img/bronny.jpg" alt="父子同台" loading="lazy">
      <div class="cap">
        <h3>More Than An Athlete</h3>
        <p>从阿克伦的贫民窟到十亿美元商业帝国，从 I PROMISE 学校到好莱坞制片公司——勒布朗用二十年证明：他不只是一名运动员。2024年10月，他与儿子布朗尼同场登场，成为NBA历史上首对同队效力的父子。</p>
      </div>
    </div>` +
    LBJ.offcourt.map((o) => `
      <div class="off-card reveal">
        <span class="off-tag">${o.tag}</span>
        <div class="off-title">${o.title}</div>
        <p class="off-desc">${o.desc}</p>
      </div>`).join("");

  /* ---------- 画廊 ---------- */
  const galTrack = $("#galTrack");
  galTrack.innerHTML = LBJ.gallery.map((g, i) => `
    <div class="gal-item" data-i="${i}">
      <img src="${g.src}" alt="${g.cap}" loading="lazy">
      <div class="cap">${g.cap}</div>
    </div>`).join("");
  const lightbox = $("#lightbox"), lbImg = $("#lightbox img"), lbCap = $("#lightbox .lb-cap");
  let lbIdx = 0;
  function openLb(i) {
    lbIdx = (i + LBJ.gallery.length) % LBJ.gallery.length;
    const g = LBJ.gallery[lbIdx];
    lbImg.src = g.src; lbCap.textContent = g.cap;
    lightbox.classList.add("open");
    gsap.fromTo(lbImg, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" });
  }
  galTrack.addEventListener("click", (e) => {
    const item = e.target.closest(".gal-item");
    if (item) openLb(parseInt(item.dataset.i));
  });
  $(".lb-prev").addEventListener("click", () => openLb(lbIdx - 1));
  $(".lb-next").addEventListener("click", () => openLb(lbIdx + 1));
  $(".lb-close").addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("open"); });
  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") lightbox.classList.remove("open");
    if (e.key === "ArrowLeft") openLb(lbIdx - 1);
    if (e.key === "ArrowRight") openLb(lbIdx + 1);
  });

  /* ---------- 名言轮播 ---------- */
  const qText = $("#quoteText"), qEn = $("#quoteEn"), qFrom = $("#quoteFrom"), qDots = $("#quoteDots");
  let qIdx = 0, qTimer;
  qDots.innerHTML = LBJ.quotes.map((_, i) => `<i class="${i === 0 ? "on" : ""}"></i>`).join("");
  function showQuote(i) {
    qIdx = i;
    $$("#quoteDots i").forEach((d, di) => d.classList.toggle("on", di === i));
    const q = LBJ.quotes[i];
    gsap.to([qText, qEn, qFrom], {
      opacity: 0, y: -16, duration: 0.4, ease: "power2.in",
      onComplete: () => {
        qText.textContent = q.text; qEn.textContent = q.textEn; qFrom.textContent = "—— " + q.from;
        gsap.fromTo([qText, qEn, qFrom], { opacity: 0, y: 26 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" });
      }
    });
  }
  function qAuto() { clearInterval(qTimer); qTimer = setInterval(() => showQuote((qIdx + 1) % LBJ.quotes.length), 6000); }
  $$("#quoteDots i").forEach((d, i) => d.addEventListener("click", () => { showQuote(i); qAuto(); }));
  qAuto();

  /* ---------- 渲染后再绑定的 reveal ---------- */
  $$("#recordsGrid .reveal, #honorGrid .reveal, #offGrid .reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%" }
    });
  });

  /* ---------- 页脚年份 ---------- */
  $("#footYear").textContent = new Date().getFullYear();
})();
