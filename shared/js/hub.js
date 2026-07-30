/* NBA LEGENDS · hub 入口渲染
 * 新增一位球员：在 LEGENDS 数组追加一项即可（slug 对应 players/<slug>/ 文件夹）。
 */
const LEGENDS = [
  {
    slug: "lebron-james",
    en: "LEBRON JAMES",
    cn: "勒布朗·詹姆斯",
    team: "洛杉矶湖人 · #23",
    num: "23",
    accent: "#d4af37",
    stat: "42,184",
    statLabel: "历史常规赛得分王",
    img: "players/lebron-james/assets/img/headshot.png",
    tags: ["前锋", "4×MVP", "4×冠军", "历史得分王"],
  },
  {
    slug: "stephen-curry",
    en: "STEPHEN CURRY",
    cn: "斯蒂芬·库里",
    team: "金州勇士 · #30",
    num: "30",
    accent: "#FFC72C",
    stat: "4,233",
    statLabel: "生涯三分命中（历史第 1）",
    img: "players/stephen-curry/assets/img/headshot.png",
    tags: ["控卫", "2×MVP", "4×冠军", "4000+三分第一人"],
  },
];

(function () {
  const grid = document.getElementById("legend-grid");
  const countEl = document.getElementById("legend-count");
  if (countEl) countEl.textContent = LEGENDS.length;

  const cards = LEGENDS.map((p) => {
    const tags = p.tags.map((t) => `<i>${t}</i>`).join("");
    return `
    <a class="legend-card" href="players/${p.slug}/" style="--accent:${p.accent}">
      <div class="lc-banner">
        <div class="lc-num">${p.num}</div>
      </div>
      <img class="lc-photo" src="${p.img}" alt="${p.en}" loading="lazy"
           onerror="this.style.display='none'">
      <div class="lc-body">
        <div class="lc-en">${p.en}</div>
        <div class="lc-cn">${p.cn}</div>
        <div class="lc-team">${p.team}</div>
        <div class="lc-stat"><b>${p.stat}</b><span>${p.statLabel}</span></div>
        <div class="lc-tags">${tags}</div>
        <div class="lc-go">进入主页 <span>→</span></div>
      </div>
    </a>`;
  }).join("");

  const addCard = `
    <div class="legend-add" title="在 players/ 下新建文件夹即可新增">
      <div class="plus">+</div>
      <div class="t1">添加更多球员</div>
      <div class="t2">复制 players/stephen-curry/ 为新文件夹，替换数据与图片，并在 LEGENDS 数组追加一项。</div>
    </div>`;

  grid.innerHTML = cards + addCard;

  // 进场动画
  if (window.gsap) {
    gsap.from(".legend-card", {
      duration: 0.7, opacity: 0, y: 36, stagger: 0.12, ease: "power3.out", delay: 0.15,
    });
    gsap.from(".legend-add", { duration: 0.7, opacity: 0, y: 36, delay: 0.15 + LEGENDS.length * 0.12, ease: "power3.out" });
    gsap.from(".hub-hero-title", { duration: 1, opacity: 0, y: 30, ease: "power3.out" });
    gsap.from(".hub-hero-sub, .hub-hero-meta", { duration: 0.8, opacity: 0, y: 20, delay: 0.3, stagger: 0.1, ease: "power3.out" });
  }
})();
