/* =========================================================
   斯蒂芬·库里主题站 · 核心数据层
   数据来源：NBA.com / StatMuse / ESPN / The Athletic / Olympics.com
   最后人工校准：2026-07-30
   ========================================================= */

const CURRY = {

  profile: {
    name: "斯蒂芬·库里",
    nameEn: "STEPHEN CURRY",
    nick: "Chef Curry · 萌神 · 库昊 · 库日天 · Baby-Faced Assassin",
    born: "1988年3月14日 · 美国俄亥俄州阿克伦",
    height: "1.88m / 6'2\"",
    weight: "83kg / 185lbs",
    position: "控球后卫",
    draft: "2009年 首轮第7顺位 · 金州勇士",
    highSchool: "夏洛特基督学校（北卡罗来纳州）",
    college: "戴维森学院（2006–2009）",
    currentTeam: "金州勇士",
    currentTeamEn: "Golden State Warriors",
    number: "30",
    seasonNow: "第 18 个赛季（2026-27）",
    age: "38岁（2026年3月已满）",
  },

  /* 生涯总计（常规赛，截至2025-26赛季结束） */
  career: {
    points: 26447,         // 队史第1
    threepm: 4233,         // 历史第1 · 唯一4000+
    threepa: 10037,        // 历史出手最多
    rebounds: 4957,
    assists: 6729,         // 队史第1
    games: 1065,
    minutes: 36140,
    fgm: 8996,
    steals: 1596,
    blocks: 281,
    tripleDoubles: 61,
    avgPts: 24.8, avgReb: 4.7, avgAst: 6.3,
    fgPct: 47.1, tpPct: 42.2, ftPct: 91.2,
    playoffPoints: 4147,    // 155场季后赛 · 场均26.8
    playoffGames: 155,
    playoffThreepm: 650,    // 历史第1
    combinedThreepm: 4883,  // 常规赛+季后赛
    scoringTitle: 2,        // 2016 & 2021
  },

  /* 17 个赛季逐季数据（常规赛） */
  seasons: [
    { year: "2009-10", team: "GSW", gp: 80, pts: 17.5, ast: 5.9, threepm: 166, fg: 46.2, tp: 43.7, note: "最佳新秀第一阵容 · 166 三分新人纪录" },
    { year: "2010-11", team: "GSW", gp: 74, pts: 18.6, ast: 5.8, threepm: 151, fg: 48.0, tp: 44.2, note: "脚踝隐患初现" },
    { year: "2011-12", team: "GSW", gp: 26, pts: 14.7, ast: 5.3, threepm: 55,  fg: 49.0, tp: 45.5, note: "脚踝手术赛季缩水" },
    { year: "2012-13", team: "GSW", gp: 78, pts: 22.9, ast: 6.9, threepm: 272, fg: 45.1, tp: 45.3, note: "🏅首次全明星 · 272 三分破单赛季纪录" },
    { year: "2013-14", team: "GSW", gp: 78, pts: 24.0, ast: 8.5, threepm: 261, fg: 47.1, tp: 42.4, note: "季后赛首轮抢七淘汰快船" },
    { year: "2014-15", team: "GSW", gp: 80, pts: 23.8, ast: 7.7, threepm: 286, fg: 48.7, tp: 44.3, champ: true, mvp: true, note: "🏆🏆首座总冠军 + 首座 MVP · 科尔上任" },
    { year: "2015-16", team: "GSW", gp: 79, pts: 30.1, ast: 6.7, threepm: 402, fg: 50.4, tp: 45.4, mvp: true, note: "⭐全票 MVP · 73-9 · 402 三分史上唯一" },
    { year: "2016-17", team: "GSW", gp: 79, pts: 25.3, ast: 6.6, threepm: 324, fg: 46.8, tp: 41.1, champ: true, note: "🏆🏆第二冠 · KD 加盟 · 季后赛 16-1" },
    { year: "2017-18", team: "GSW", gp: 51, pts: 26.4, ast: 6.1, threepm: 212, fg: 49.5, tp: 42.3, champ: true, note: "🏆🏆第三冠 · 横扫骑士" },
    { year: "2018-19", team: "GSW", gp: 69, pts: 27.3, ast: 5.2, threepm: 354, fg: 47.2, tp: 43.7, note: "总决赛 2-4 不敌猛龙 · 错失三连冠" },
    { year: "2019-20", team: "GSW", gp: 5,  pts: 20.8, ast: 6.6, threepm: 12,  fg: 40.2, tp: 24.5, note: "左手骨折 · 仅出战 5 场" },
    { year: "2020-21", team: "GSW", gp: 63, pts: 32.0, ast: 5.8, threepm: 337, fg: 48.2, tp: 42.1, note: "🏅得分王 · 附加赛惜败" },
    { year: "2021-22", team: "GSW", gp: 64, pts: 25.5, ast: 6.3, threepm: 285, fg: 43.7, tp: 38.0, champ: true, fmvp: true, note: "🏆🏆第四冠 + 首座 FMVP" },
    { year: "2022-23", team: "GSW", gp: 56, pts: 29.4, ast: 6.3, threepm: 273, fg: 49.3, tp: 42.7, note: "次轮抢七被湖人淘汰" },
    { year: "2023-24", team: "GSW", gp: 74, pts: 26.4, ast: 5.1, threepm: 357, fg: 45.0, tp: 40.8, note: "巴黎奥运夺金 · 357 三分" },
    { year: "2024-25", team: "GSW", gp: 70, pts: 24.5, ast: 6.0, threepm: 311, fg: 44.8, tp: 39.7, note: "🥇第 4000 记三分（3.13）+ 第 25000 分" },
    { year: "2025-26", team: "GSW", gp: 39, pts: 27.2, ast: 4.8, threepm: 175, fg: 46.8, tp: 39.1, note: "右膝伤缺阵 43 场 · 附加赛不敌太阳" },
  ],

  /* 历史纪录墙 */
  records: [
    { rank: "历史唯一", stat: "4,233", label: "常规赛生涯三分命中", desc: "史上首位 · 也是目前唯一突破 4000 三分大关的球员" },
    { rank: "历史第 1", stat: "650", label: "季后赛三分命中", desc: "领先第二名约 1.5 倍 · 总决赛三分纪录 152 个" },
    { rank: "史上唯一", stat: "402", label: "单赛季三分命中", desc: "2015-16 赛季 · 也是史上唯一单季命中 400+ 三分的球员" },
    { rank: "史上唯一", stat: "100%", label: "全票 MVP 选票", desc: "2016 年 131/131 张第一选票 · NBA 史上唯一" },
    { rank: "历史第 1", stat: "91.2%", label: "生涯罚球命中率", desc: "8 个赛季 90%+ · 常规赛历史罚球王" },
    { rank: "史上第 1", stat: "5 次", label: "单赛季 300+ 三分", desc: "其余所有 NBA 球员合计仅 2 次（哈登 1 + 克莱 1）" },
    { rank: "历史第 1", stat: "388", label: "单场 5+ 三分场次", desc: "超过历史第二、第三的总和（哈登 200 + 利拉德 187）" },
    { rank: "历史第 1", stat: "26 场", label: "单场 10+ 三分场次", desc: "比第二到第六名加起来还多" },
    { rank: "史上第 2", stat: "13 个", label: "单场三分命中（NBA 单场纪录并列）", desc: "2016-11-07 vs 鹈鹕 · 仅克莱 14 个高于" },
    { rank: "唯一", stat: "5×4", label: "总冠军+MVP+FMVP+奥运金牌+全票MVP", desc: "库里是 NBA 史上唯一集齐这五项荣誉的球员" },
    { rank: "历史第 1", stat: "56", label: "生涯季后赛 30+ 场次", desc: "勇士队史季后赛得分王 · 季后赛场均 26.8 分" },
    { rank: "史上第 1", stat: "8 个", label: "单赛季三分命中榜首次数", desc: "8 次领跑全联盟 · 历史唯一" },
  ],

  /* 生涯时间线（横向滚动节点） */
  timeline: [
    { year: "1988", title: "出生于俄亥俄阿克伦", desc: "父亲戴尔·库里 NBA 名宿，母亲 Sonya 排球运动员" },
    { year: "2006", title: "进入戴维森学院", desc: "放弃弗吉尼亚理工 offer · 追随父亲的脚步" },
    { year: "2008", title: "NCAA 疯狂三月 Elite Eight", desc: "10 号种子爆冷 · 全美瞩目" },
    { year: "2009", title: "首轮第 7 顺位加盟勇士", desc: "争议性选择 · 脚踝隐患让多队退缩" },
    { year: "2010", title: "新秀一阵 · 脚踝手术", desc: "脚踝伤势的伏笔" },
    { year: "2012", title: "脚踝手术 + 革命性复出", desc: "改变投篮训练方法 · 走向生涯转折" },
    { year: "2013", title: "首次全明星 + 单赛季 272 三分", desc: "打破雷·阿伦单赛季三分纪录" },
    { year: "2014", title: "首次季后赛系列胜利", desc: "首轮抢七淘汰快船" },
    { year: "2015", title: "🏆 首冠 + 首座 MVP", desc: "科尔上任 · 死亡五小成型 · 总决赛 4-2 骑士" },
    { year: "2016", title: "⭐ 全票 MVP + 73-9 + 402 三分", desc: "史上唯一 · 但总决赛 3-1 领先被骑士逆转" },
    { year: "2017", title: "🏆 KD 加盟 + 第二冠", desc: "季后赛 16-1 · 史上最具统治力的季后赛之旅" },
    { year: "2018", title: "🏆 横扫骑士 · 第三冠", desc: "四年三冠王朝" },
    { year: "2019", title: "总决赛 2-4 不敌猛龙", desc: "KD 与克莱相继重伤 · 错失三连冠" },
    { year: "2020", title: "左手骨折 · 仅 5 场", desc: "勇士 15-50 · 时代低谷" },
    { year: "2021", title: "得分王 32.0 PPG", desc: "附加赛惜败灰熊与湖人" },
    { year: "2022", title: "🏆 第四冠 + 首座 FMVP", desc: "总决赛 4-2 凯尔特人 · 弥补生涯最大遗憾" },
    { year: "2023", title: "次轮抢七被湖人淘汰", desc: "卫冕失败" },
    { year: "2024", title: "🥇 巴黎奥运夺金", desc: "复仇者联盟 · 决赛 24 分 8 三分 · 末节 4 三分雨" },
    { year: "2025", title: "🥇 第 4000 记三分（3.13）+ 第 25000 分", desc: "史上首位 4000+ 三分球员" },
    { year: "2026", title: "右膝伤 · 附加赛出局 · 备战第 18 季", desc: "37→38 岁 · 一人一城仍在续写" },
  ],

  /* 三段王朝（单一球队 Warriors） */
  stints: [
    {
      team: "崛起 2009–2014",
      color: "#1D428A",
      head: "少年库里与脚踝阴影",
      years: "5 个赛季",
      summary: "从被质疑的 7 号新秀，到单赛季 272 三分震古烁今。他在这个阶段改写了控卫的训练哲学——脚踝不断、不断康复、最终脱胎换骨。",
      stats: [
        { k: "5 季场均", v: "19.5 / 6.5 / 905 三分" },
        { k: "关键节点", v: "2013 破纪录 + 2014 首轮抢七快船" },
        { k: "最佳阵容", v: "2×（2014 三阵，2013 二阵）" },
      ],
      line: "「我那时只想证明我能在这个联盟打很久。」——库里，2014 季后赛首轮晋级后",
    },
    {
      team: "王朝 2014–2019",
      color: "#FFC72C",
      head: "五年三冠 · 史上最具统治力的跳投球队",
      years: "5 个赛季",
      summary: "史蒂夫·科尔带来 motion offense，库里与克莱的 Splash Brothers 组合把三分球变成建队基石。2016 年的 73-9 与全票 MVP 是史上最具统治力的常规赛。",
      stats: [
        { k: "常规赛战绩", v: "378-83（胜率 82%）" },
        { k: "季后赛战绩", v: "76-21" },
        { k: "荣誉", v: "3× 总冠军 + 2× MVP + 1× 抢断王 + 1× 得分王" },
      ],
      line: "「I can do all things.」—— 库里最爱的圣经经文，绣在球鞋上",
    },
    {
      team: "归来 2019–2026+",
      color: "#2A5BB7",
      head: "低谷·重生·第四冠·奥运金牌·4000 三分",
      years: "7 个赛季（仍在继续）",
      summary: "KD 离队、克莱 ACL、库里自己左手骨折——勇士一度跌至 15 胜。但归来更加壮阔：2022 第四冠 + FMVP，2024 巴黎奥运夺金，2025 第 4000 记三分。",
      stats: [
        { k: "关键荣誉", v: "1× FMVP · 1× 奥运金牌 · 1× 4000 三分里程碑" },
        { k: "重要比赛", v: "2022 G6 34 分 · 2024 奥运决赛 8 三分" },
        { k: "未来", v: "第 18 季 · 仍在金州 · 未完待续" },
      ],
      line: "「我仍然热爱这项运动，我还有东西可以奉献。」——库里，2026 年 7 月 The Athletic 专访",
    },
  ],

  /* 荣誉殿堂 */
  honors: [
    { cat: "团队", items: ["4× NBA 总冠军（2015 · 2017 · 2018 · 2022）", "1× NBA 总决赛 MVP（2022）"] },
    { cat: "个人", items: ["2× NBA MVP（2015 · 2016 · 2016 为史上唯一全票）", "2× 得分王（2016 · 2021）", "1× 抢断王（2016）"] },
    { cat: "全明星", items: ["11× NBA 全明星（2014–2025）", "1× NBA 全明星 MVP（2021）", "2× NBA 三分大赛冠军（2015 · 2021）"] },
    { cat: "最佳阵容", items: ["11× NBA 最佳阵容", "（4× 1 阵 · 4× 2 阵 · 3× 3 阵）", "2016 最佳阵容 1 阵"] },
    { cat: "国家队", items: ["1× 奥运金牌（2024 巴黎 · 美国队）", "2× FIBA 世界杯金牌（2010 · 2014）", "FIBA 世界杯 MVP（2014）"] },
    { cat: "里程碑", items: ["NBA 75 周年纪念队", "NBA 历史三分王（4,233 · 唯一破 4000）", "季后赛三分王（650 · 历史第 1）", "生涯罚球命中率历史第 1（91.2%）"] },
  ],

  /* 场外帝国 */
  offcourt: [
    { title: "Curry Brand × Under Armour", desc: "2013 年签约 UA，2020 年升级为终身合同并推出独立品牌 Curry Brand。是 NBA 球员独立品牌中规模最大的之一，已签约数十位男女球员。" },
    { title: "Eat. Learn. Play. 基金会", desc: "2014 年与妻子 Ayesha 共同创立。专注湾区儿童饥饿、教育与体育。已在奥克兰资助 10+ 所学校餐食与阅读项目，是 NBA 球员最具影响力的公益机构之一。" },
    { title: "SC30 · Unanimous Media", desc: "个人品牌 SC30 + 与索尼合资的内容公司 Unanimous Media。出品纪录片《Stephen vs the Game》、Holey Moley 节目、Podcasts，是 NBA 球员内容创业的标杆。" },
    { title: "高尔夫狂热者", desc: "The Match 创始人之一（与老虎伍兹/布雷迪/菲什巴克同场）。与奥古斯塔国家俱乐部关系深厚，曾被拍下与名人堂成员下场。是 NBA 球员中最高调的高尔夫推广大使。" },
    { title: "戴维森与父亲 Dell", desc: "戴维森学院退役其 30 号球衣（2009 年入学前）。父亲戴尔·库里 NBA 名宿，弟弟 Seth Curry 现效力篮网、妹妹 Sydel 曾任大学排球运动员——真正的篮球世家。" },
    { title: "家庭 · Ayesha & 三娃", desc: "2011 年与 Ayesha Alexander 结婚。三个孩子：Riley、Ryan、Canon——常出现在场边。Riley 已签约麦当劳全美高中生代言，是 NBA 球员子女中最具公众关注度的“星二代”之一。" },
  ],

  /* 名言轮播 */
  quotes: [
    {
      cn: "对我们来说，所有问题的核心都是——任何人处在我们的处境都会艰难。尤其是我们一直努力维系球队竞争力的人。",
      en: "It's hard for anyone in our position. We're trying to maintain competitiveness.",
      from: "2026 · The Athletic 深度专访 · 阿肯色州",
    },
    {
      cn: "我得金牌是一种疯狂的感觉。我感谢上帝给我机会去体验这一切。",
      en: "For me to get a gold medal is insane. I thank God for the opportunity.",
      from: "2024 年 8 月 10 日 · 巴黎奥运夺金后",
    },
    {
      cn: "那是我新秀赛季的老兵……真的很有趣去想我从第一个三分到第 4000 个有多远，太疯狂了。",
      en: "That was my vet when I was here my rookie year… really cool to think back how far I've come from the first one to 4,000.",
      from: "2025 年 3 月 13 日 · 第 4000 记三分之夜",
    },
    {
      cn: "你必须从零开始。你要确保每个人在精神上、灵魂上和身体上都投入到这项苦练中。",
      en: "You have to start from scratch. You want to make sure everyone is invested mentally, spiritually and physically in what the grind is.",
      from: "2026 年 7 月 · 美洲世纪锦标赛 · 谈科尔续约",
    },
    {
      cn: "我只是想打好的篮球、想待在知道怎么赢球的人身边。",
      en: "Do you want to play good basketball and be around people who know how to play the game?",
      from: "2026 年 7 月 · 对勒布朗的招募语",
    },
    {
      cn: "我们可以问一个好的问题，也可以问一个糟糕的问题——但我选择问一个好的。",
      en: "I can do all things. Through Christ who strengthens me.",
      from: "球鞋、护腕与赛前祷告 · 库里信仰标签",
    },
  ],

  /* 画廊（15 张真实赛场影像，全部取自 cdn.nba.com） */
  gallery: [
    { src: "assets/img/portrait.jpg",        cap: "2026 训练营 · 标志性定妆照" },
    { src: "assets/img/trophy-2022.jpg",     cap: "2022 · 首座 FMVP · 捧杯定妆" },
    { src: "assets/img/team-celebrate.jpg",  cap: "2022 总决赛 G6 · 全队夺冠" },
    { src: "assets/img/trophy-double.jpg",   cap: "2022 · 双杯（西部冠军 + 总冠军）" },
    { src: "assets/img/trophy-stage.jpg",    cap: "2022 · 捧杯走过 TD Garden 球场" },
    { src: "assets/img/court-rakuten.jpg",   cap: "常规赛 · Rakuten 客场球衣" },
    { src: "assets/img/splash-night.jpg",    cap: "经典指天庆祝 · Night Splash" },
    { src: "assets/img/shoot-action.jpg",    cap: "出手三分瞬间" },
    { src: "assets/img/city-edition.jpg",    cap: "CITY Edition 客场球衣" },
    { src: "assets/img/olympics-huddle.jpg", cap: "2024 巴黎奥运 · 更衣室集结" },
    { src: "assets/img/olympics-trio.jpg",   cap: "2024 巴黎奥运 · 与勒布朗、KD 并肩" },
    { src: "assets/img/olympics-golds.jpg",  cap: "2024 巴黎奥运 · 三块金牌合影" },
    { src: "assets/img/olympics-flag.jpg",   cap: "2024 巴黎奥运 · 身披美国国旗" },
    { src: "assets/img/olympics-medal.jpg",  cap: "2024 巴黎奥运 · 亲吻金牌" },
  ],
};