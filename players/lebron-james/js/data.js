/* =========================================================
   勒布朗·詹姆斯主题站 · 核心数据层
   数据来源：NBA.com / Basketball-Reference / Olympics.com / ESPN
   最后人工校准：2026-07-27
   ========================================================= */

const LBJ = {

  profile: {
    name: "勒布朗·詹姆斯",
    nameEn: "LeBRON JAMES",
    nick: "King James · 小皇帝 · 老詹 · LBJ",
    born: "1984年12月30日 · 美国俄亥俄州阿克伦",
    height: "2.06m / 6'9\"",
    weight: "113kg / 250lbs",
    position: "小前锋 / 控球前锋",
    draft: "2003年 首轮第1顺位 · 克利夫兰骑士",
    highSchool: "圣文森特-圣玛丽高中（阿克伦）",
    currentTeam: "费城76人",
    currentTeamEn: "Philadelphia 76ers",
    number: "23",
    seasonNow: "第 24 个赛季（NBA 历史第一人）",
    age: "41岁（2026年12月30日将满42岁）",
  },

  /* 生涯总计（常规赛，截至2025-26赛季结束） */
  career: {
    points: 43440,      // 历史第1
    rebounds: 12095,
    assists: 12016,     // 历史第4
    games: 1622,        // 历史第1
    minutes: 61029,     // 历史第1
    fgm: 15961,         // 历史第1
    steals: 2345,
    blocks: 1150,
    tripleDoubles: 125, // 历史第5
    avgPts: 26.8, avgReb: 7.5, avgAst: 7.4,
    fgPct: 50.7, tpPct: 34.8,
    playoffPoints: 8521,   // 历史第1
    playoffGames: 292,     // 历史第1
    playoffWins: 184,      // 历史第1
    combinedPoints: 51961, // 常规赛+季后赛，历史唯一5万+
    paintPoints: 20370,    // 近30年追踪数据历史第1
  },

  /* 23个赛季逐季数据（常规赛） */
  seasons: [
    { year: "2003-04", team: "CLE", gp: 79, pts: 20.9, reb: 5.5, ast: 5.9, fg: 41.7, tp: 29.0, note: "最佳新秀 ROY" },
    { year: "2004-05", team: "CLE", gp: 80, pts: 27.2, reb: 7.4, ast: 7.2, fg: 47.2, tp: 35.1, note: "首次全明星+最佳阵容" },
    { year: "2005-06", team: "CLE", gp: 79, pts: 31.4, reb: 7.0, ast: 6.6, fg: 48.0, tp: 33.5, note: "场均31.4分生涯最高" },
    { year: "2006-07", team: "CLE", gp: 78, pts: 27.3, reb: 6.7, ast: 6.0, fg: 47.6, tp: 31.9, note: "首进总决赛" },
    { year: "2007-08", team: "CLE", gp: 75, pts: 30.0, reb: 7.9, ast: 7.2, fg: 48.4, tp: 31.5, note: "得分王" },
    { year: "2008-09", team: "CLE", gp: 81, pts: 28.4, reb: 7.6, ast: 7.2, fg: 48.9, tp: 34.4, note: "MVP", mvp: true },
    { year: "2009-10", team: "CLE", gp: 76, pts: 29.7, reb: 7.3, ast: 8.6, fg: 50.3, tp: 33.3, note: "MVP 连庄", mvp: true },
    { year: "2010-11", team: "MIA", gp: 79, pts: 26.7, reb: 7.5, ast: 7.0, fg: 51.0, tp: 33.0, note: "The Decision · 热火首年" },
    { year: "2011-12", team: "MIA", gp: 62, pts: 27.1, reb: 7.9, ast: 6.2, fg: 53.1, tp: 36.2, note: "MVP + 首冠 + FMVP", mvp: true, champ: true },
    { year: "2012-13", team: "MIA", gp: 76, pts: 26.8, reb: 8.0, ast: 7.3, fg: 56.5, tp: 40.6, note: "MVP + 两连冠 + FMVP · 27连胜", mvp: true, champ: true },
    { year: "2013-14", team: "MIA", gp: 77, pts: 27.1, reb: 6.9, ast: 6.3, fg: 56.7, tp: 37.9, note: "单场61分生涯之夜" },
    { year: "2014-15", team: "CLE", gp: 69, pts: 25.3, reb: 6.0, ast: 7.4, fg: 48.8, tp: 35.4, note: "回家 · 重返总决赛" },
    { year: "2015-16", team: "CLE", gp: 76, pts: 25.3, reb: 7.4, ast: 6.8, fg: 52.0, tp: 30.9, note: "1-3逆转73胜勇士夺冠 + FMVP", champ: true },
    { year: "2016-17", team: "CLE", gp: 74, pts: 26.4, reb: 8.6, ast: 8.7, fg: 54.8, tp: 36.3, note: "总决赛场均三双" },
    { year: "2017-18", team: "CLE", gp: 82, pts: 27.5, reb: 8.6, ast: 9.1, fg: 54.2, tp: 36.7, note: "82场全勤 · 连续第8年总决赛" },
    { year: "2018-19", team: "LAL", gp: 55, pts: 27.4, reb: 8.5, ast: 8.3, fg: 51.0, tp: 33.9, note: "加盟湖人" },
    { year: "2019-20", team: "LAL", gp: 67, pts: 25.3, reb: 7.8, ast: 10.2, fg: 49.3, tp: 34.8, note: "助攻王 + 第4冠 + FMVP", champ: true },
    { year: "2020-21", team: "LAL", gp: 45, pts: 25.0, reb: 7.7, ast: 7.8, fg: 51.3, tp: 36.5, note: "" },
    { year: "2021-22", team: "LAL", gp: 56, pts: 30.3, reb: 8.2, ast: 6.2, fg: 52.4, tp: 35.9, note: "37岁场均30+" },
    { year: "2022-23", team: "LAL", gp: 55, pts: 28.9, reb: 8.3, ast: 6.8, fg: 50.0, tp: 32.1, note: "超越贾巴尔加冕历史得分王" },
    { year: "2023-24", team: "LAL", gp: 71, pts: 25.7, reb: 7.3, ast: 8.3, fg: 54.0, tp: 41.0, note: "首届NBA杯冠军+MVP · 40000分" },
    { year: "2024-25", team: "LAL", gp: 70, pts: 24.4, reb: 7.8, ast: 8.2, fg: 51.3, tp: 37.6, note: "父子同台历史首现 · 最佳阵容二阵" },
    { year: "2025-26", team: "LAL", gp: 60, pts: 20.9, reb: 6.1, ast: 7.2, fg: null, tp: null, note: "第22次全明星 · 湖人谢幕季" },
  ],

  /* 四段（五站）生涯旅程 */
  stints: [
    {
      team: "克利夫兰骑士 1.0", years: "2003 — 2010", logo: "assets/img/logo_1610612739.svg",
      color: "#6F263D",
      stats: "7个赛季 · 2×MVP · 2007年首进总决赛 · 队史得分王",
      desc: "天选之子降临家乡球队。2003年选秀状元，从阿克伦走出的孩子直接扛起整座克利夫兰。2007年东部决赛G5面对活塞连砍25分包办球队最后30分中的29分，22岁单核带队闯入总决赛。2009、2010年连庄MVP，成为联盟门面。"
    },
    {
      team: "迈阿密热火", years: "2010 — 2014", logo: "assets/img/logo_1610612748.svg",
      color: "#98002E",
      stats: "4个赛季 · 2×总冠军 · 2×FMVP · 2×MVP · 27连胜",
      desc: "「The Decision」震动世界。与韦德、波什组成三巨头，四年四进总决赛、两度登顶。2012年东决G6客场45分15篮板封神，2013年总决赛G7中投锁定两连冠。2012-13赛季率队打出NBA历史第二长的27连胜。"
    },
    {
      team: "克利夫兰骑士 2.0", years: "2014 — 2018", logo: "assets/img/logo_1610612739.svg",
      color: "#6F263D",
      stats: "4个赛季 · 2016年总冠军 + FMVP · 连续4年总决赛",
      desc: "「I'm Coming Home」。2016年总决赛面对73胜历史最佳战绩的勇士，1-3落后上演史诗逆转，抢七大战追身钉板大帽伊戈达拉定格历史。为克利夫兰带来52年来首个职业体育冠军——「Cleveland, this is for you!」"
    },
    {
      team: "洛杉矶湖人", years: "2018 — 2026", logo: "assets/img/logo_1610612747.svg",
      color: "#552583",
      stats: "8个赛季 · 2020年总冠军 + FMVP · 历史得分王 · 父子同台",
      desc: "空降好莱坞。2020年泡泡园区率队夺冠并全票FMVP，成为历史唯一在三支不同球队都拿下FMVP的球员。2023年2月7日超越贾巴尔加冕NBA历史得分王；2024年与儿子布朗尼同场竞技，书写体育史首对NBA父子队友的传奇。"
    },
    {
      team: "费城76人", years: "2026 — ", logo: "assets/img/logo_1610612755.svg",
      color: "#006BB6",
      stats: "第24个赛季 · 2年800万美元 · 最后的决定",
      desc: "「This is my last decision.」2026年7月24日官宣加盟，大幅降薪超过92%，联手恩比德、马克西、杰伦·布朗组成四巨头，向76人队史自1983年后的首座总冠军、也是个人第5冠发起最后的冲锋。"
    },
  ],

  /* 荣誉殿堂 */
  honors: [
    { num: 4, title: "NBA总冠军", years: "2012 · 2013 · 2016 · 2020" },
    { num: 4, title: "总决赛MVP", years: "2012 · 2013 · 2016 · 2020" },
    { num: 4, title: "常规赛MVP", years: "2009 · 2010 · 2012 · 2013" },
    { num: 22, title: "NBA全明星", years: "2005 — 2026 连续入选 · 历史第1" },
    { num: 21, title: "最佳阵容", years: "13次一阵 · 历史第1" },
    { num: 3, title: "全明星赛MVP", years: "2006 · 2008 · 2018" },
    { num: 6, title: "最佳防守阵容", years: "5次一阵 · 1次二阵" },
    { num: 1, title: "得分王", years: "2007-08赛季 · 场均30.0分" },
    { num: 1, title: "助攻王", years: "2019-20赛季 · 场均10.2次" },
    { num: 1, title: "最佳新秀", years: "2003-04赛季" },
    { num: 1, title: "NBA杯冠军+MVP", years: "2023年首届季中锦标赛" },
    { num: 3, title: "奥运金牌", years: "2008 · 2012 · 2024（另有2004铜牌）" },
    { num: 1, title: "奥运男篮MVP", years: "2024巴黎奥运会" },
    { num: 1, title: "NBA75大巨星", years: "2021年入选75周年纪念阵容" },
    { num: 20, title: "月最佳球员", years: "历史第1" },
    { num: 68, title: "周最佳球员", years: "历史第1（断档领先）" },
  ],

  /* 历史纪录 */
  records: [
    { num: "43,440", label: "常规赛总得分 · 历史第1", desc: "2023年2月7日超越贾巴尔，此后每一分钟都在刷新自己保持的纪录" },
    { num: "51,961", label: "常规赛+季后赛总得分", desc: "NBA历史唯一突破5万分大关的球员，2025年3月4日达成" },
    { num: "8,521", label: "季后赛总得分 · 历史第1", desc: "领先第二名乔丹2500+分，断档式存在" },
    { num: "1,622", label: "常规赛出场数 · 历史第1", desc: "2025-26赛季超越帕里什登顶，曾与NBA历史上36%的球员同场竞技" },
    { num: "1,297", label: "连续得分上双场次", desc: "2007.1.6—2025.12.1，横跨近19年的神迹，历史第一远超乔丹866场" },
    { num: "10K-10K-10K", label: "万分+万板+万助", desc: "历史唯一达成10000分+10000篮板+10000助攻的球员" },
    { num: "30队40+", label: "对全部30队均砍40+", desc: "历史唯一；同时对全部30队都拿下过三双（仅3人）" },
    { num: "10次", label: "总决赛之旅", desc: "2011-2018连续8年总决赛，比肩拉塞尔时代凯尔特人" },
    { num: "3队FMVP", label: "三队总决赛MVP", desc: "历史唯一在热火、骑士、湖人三支不同球队均获FMVP" },
    { num: "41轮", label: "季后赛系列赛胜利 · 历史第1", desc: "超过联盟中24支球队的队史总和" },
    { num: "184胜", label: "季后赛胜场 · 历史第1", desc: "比21支现役球队的队史季后赛胜场都多" },
    { num: "20,370", label: "禁区得分 · 近30年第1", desc: "比追踪期内任何球员多出5000+分；历史唯一2000扣篮+2000三分" },
    { num: "23季", label: "连续23季场均20+5+5", desc: "历史最长纪录，其余球员无人超过连续10季；且23季全部场均20+" },
    { num: "40+", label: "19岁前3次 · 40岁后2次", desc: "历史唯一在青少年时期与40岁之后都多次单场40+的球员" },
    { num: "42.4天", label: "常规赛总出场时间61,029分钟", desc: "折算相当于连续不间断作战42天，历史第1" },
    { num: "449分", label: "全明星赛总得分 · 历史第1", desc: "22次全明星全部为球迷与教练双重认可的时代印记" },
  ],

  /* 生涯时间线 */
  timeline: [
    { year: "1984", title: "阿克伦之子诞生", desc: "12月30日，勒布朗·雷蒙·詹姆斯出生于俄亥俄州阿克伦的单身母亲家庭，童年在动荡中辗转12次搬家。", img: null },
    { year: "2002", title: "天选之子", desc: "高二即登上《体育画报》封面，标题「The Chosen One」。圣文森特-圣玛丽高中全美直播比赛，ESPN首次全美直播高中赛事。", img: null },
    { year: "2003", title: "状元及第", desc: "6月26日，18岁的詹姆斯被家乡球队克利夫兰骑士以首轮第1顺位选中，跳过大学直接登陆NBA。", img: null },
    { year: "2004", title: "最佳新秀", desc: "新秀赛季场均20.9分5.5篮板5.9助攻，成为历史第三位新秀即20+5+5的球员，全票最佳新秀。", img: null },
    { year: "2007", title: "首闯总决赛", desc: "东决G5对活塞独得48分，包办球队最后30分中的29分，22岁单核率队首进总决赛。", img: null },
    { year: "2009", title: "首座MVP", desc: "场均28.4分7.6篮板7.2助攻，率队66胜联盟第一，捧起首座常规赛MVP；2010年成功连庄。", img: null },
    { year: "2010", title: "The Decision", desc: "7月8日电视直播宣布「把天赋带到南海岸」，加盟迈阿密热火，与韦德、波什组成三巨头。", img: null },
    { year: "2012", title: "首冠加冕", desc: "总决赛4-1击败雷霆，场均28.6+10.2+7.4荣膺FMVP，同年包揽MVP+总冠军+奥运金牌，比肩乔丹。", img: null },
    { year: "2013", title: "两连冠伟业", desc: "27连胜+MVP+总决赛抢七胜马刺，雷·阿伦G6世纪三分救命，G7中投锁定两连冠与连庄FMVP。", img: null },
    { year: "2014", title: "王者归乡", desc: "发表《I'm Coming Home》公开信重返骑士，许下为克利夫兰带来冠军的诺言。", img: null },
    { year: "2016", title: "克利夫兰的救赎", desc: "总决赛1-3落后逆转73胜勇士，七项数据两队第一，抢七世纪追帽+欧文准绝杀。为家乡带来52年首冠，泪洒赛场：「Cleveland, this is for you!」", img: null },
    { year: "2018", title: "西游洛杉矶", desc: "连续第8年总决赛后加盟湖人，开启好莱坞篇章。", img: null },
    { year: "2020", title: "泡泡园区第四冠", desc: "疫情停摆后的奥兰多园区，率湖人夺冠并全票FMVP，成为历史唯一三队FMVP；该季场均10.2助攻首夺助攻王。", img: "assets/img/champ-2020.jpg" },
    { year: "2022", title: "首位现役亿万富翁", desc: "《福布斯》认证其净资产突破10亿美元，成为NBA历史上首位现役期间跻身亿万富翁行列的球员。", img: null },
    { year: "2023", title: "历史得分王", desc: "2月7日对雷霆砍下38分，以38,390分超越贾巴尔尘封39年的纪录，加冕NBA历史得分王。同年12月率湖人夺得首届NBA杯并当选MVP。", img: "assets/img/kareem-record.jpg" },
    { year: "2024", title: "父子同台 & 巴黎摘金", desc: "10月22日与儿子布朗尼同场登场，NBA历史首对父子队友。同年夏天担任美国奥运代表团旗手，率梦之队巴黎夺金并当选奥运男篮MVP。", img: "assets/img/bronny.jpg" },
    { year: "2025", title: "5万分先生", desc: "3月4日常规赛+季后赛总得分突破50,000分大关，历史唯一。第21次入选最佳阵容延续历史纪录。", img: null },
    { year: "2026", title: "最后的决定", desc: "7月24日官宣加盟费城76人：2年800万、降薪92%只为第5冠。「我仍然热爱这项运动，我还有东西可以奉献。」生涯第24个赛季，前无古人。", img: "assets/img/lebron-embiid-76ers.jpg" },
  ],

  /* 场外帝国 */
  offcourt: [
    { tag: "商业帝国", title: "SpringHill 公司", desc: "2020年与商业伙伴马弗里克·卡特联合创办的娱乐传媒集团，估值达7.25亿美元。旗下出品《空中大灌篮2：新传奇》、Netflix热片《必胜球探》、脱口秀《The Shop》等。" },
    { tag: "终身合约", title: "NIKE 十亿美元合约", desc: "2016年与耐克签下价值超10亿美元的终身合约，为耐克历史上首份篮球运动员终身合同。LeBron系列战靴已迭代至第23代。" },
    { tag: "体育投资", title: "芬威体育集团合伙人", desc: "2021年入股芬威体育集团（FSG）成为合伙人，持有英超利物浦、MLB波士顿红袜、NHL匹兹堡企鹅等顶级体育资产股权。" },
    { tag: "投资神话", title: "Blaze Pizza", desc: "2012年以不足100万美元投资的披萨连锁，巅峰估值超4亿美元，被誉为「NBA球员最成功投资案例」之一。" },
    { tag: "教育公益", title: "I PROMISE 学校", desc: "2018年在阿克伦创办的公立学校，专门招收高危弱势儿童，提供免费校车、餐食、校服乃至家庭食品储藏室；毕业生可获阿克伦大学全额奖学金。配套I PROMISE Village为困难家庭提供过渡住房。" },
    { tag: "社会发声", title: "More Than a Vote", desc: "2020年联合创立投票权组织，推动非裔美国人投票权保护，将「More Than an Athlete」的信条延伸至公共领域。" },
    { tag: "家庭", title: "詹姆斯一家", desc: "与妻子萨瓦娜高中相识相伴至今，育有二子一女：布朗尼（2024年次轮55顺位加盟湖人，父子历史首次同队同台）、布莱斯（亚利桑那大学）、小女儿朱莉。" },
    { tag: "多元布局", title: "投资版图", desc: "Lobos 1707龙舌兰、Ladder运动营养、Beats耳机早期股权（苹果收购获利数千万美元）、芬威赛车等，构建横跨体育、娱乐、消费的商业矩阵。" },
  ],

  quotes: [
    { text: "我仍然热爱这项运动，我还有东西可以奉献。", textEn: "I still truly love this game, and I have more to give.", from: "2026年7月24日 · 宣布加盟76人" },
    { text: "我只是一个来自阿克伦的孩子。", textEn: "I'm just a kid from Akron, Ohio.", from: "2016年夺冠夜" },
    { text: "在俄亥俄东北部，没有什么是被给予的，一切都是挣来的。", textEn: "In Northeast Ohio, nothing is given. Everything is earned.", from: "2014年《I'm Coming Home》公开信" },
    { text: "克利夫兰，这是为你而赢的！", textEn: "Cleveland, this is for you!", from: "2016年6月19日 · 总决赛抢七终场哨响" },
    { text: "不为金钱，不为家庭。我依然想要牺牲、想要苦练、想要竞争、想要赢。", textEn: "I'm not going for money. I'm not going for family. I still want to sacrifice. I still want to grind. I still want to compete, to win.", from: "2026年7月24日 · 最后的决定" },
    { text: "不要为成为最伟大的人而设限，要为每天变得更好而努力。", textEn: "Strive for greatness.", from: "个人座右铭" },
  ],

  gallery: [
    { src: "assets/img/hero-portrait.jpg", cap: "2025-26赛季 · 湖人城市版球衣" },
    { src: "assets/img/hero-dark.jpg", cap: "赛前入场 · 光影之王" },
    { src: "assets/img/lakers-white.jpg", cap: "2025-26赛季 · 主场作战" },
    { src: "assets/img/lakers-yellow-point.jpg", cap: "指挥若定 · 第23个赛季" },
    { src: "assets/img/streak-1297.jpg", cap: "连续1297场得分上双 · 骑士岁月" },
    { src: "assets/img/heat-spoelstra.jpg", cap: "热火两连冠 · 与斯波教练" },
    { src: "assets/img/champ-2020.jpg", cap: "2020园区夺冠 · 第4座FMVP" },
    { src: "assets/img/kareem-record.jpg", cap: "2023.2.7 贾巴尔亲手传承 · 历史得分王之夜" },
    { src: "assets/img/record-night.jpg", cap: "与萧华、贾巴尔同框 · 38,390分" },
    { src: "assets/img/bronny.jpg", cap: "父子同台 · 历史首对NBA父子队友" },
    { src: "assets/img/playoffs-2026.jpg", cap: "2026季后赛 · 第19次季后赛之旅" },
    { src: "assets/img/defense-2026.jpg", cap: "铁血防守 · 41岁的拼劲" },
    { src: "assets/img/pass-2026.jpg", cap: "妙传瞬间 · 生涯12016次助攻" },
    { src: "assets/img/allstar-2026.jpg", cap: "2026洛杉矶全明星 · 连续第22次入选" },
    { src: "assets/img/alltime-fg-leader.jpg", cap: "生涯四段旅程 · 历史投篮命中数第一" },
    { src: "assets/img/warmup-dark.jpg", cap: "赛前热身 · 王者的专注" },
    { src: "assets/img/back-23.jpg", cap: "23号背影 · 一个时代的符号" },
    { src: "assets/img/profile-close.jpg", cap: "侧颜 · 岁月雕刻的传奇" },
    { src: "assets/img/lebron-embiid-usa.jpg", cap: "2024巴黎奥运 · 与恩比德并肩夺金" },
    { src: "assets/img/lebron-embiid-76ers.jpg", cap: "从对手到队友 · 费城新篇" },
    { src: "assets/img/maxey-hug.jpg", cap: "马克西的拥抱 · 新队友的敬意" },
  ],
};
