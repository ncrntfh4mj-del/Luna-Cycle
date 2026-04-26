const WELLNESS = {
  menstrual: {
    phase:'menstrual', name:'생리기', emoji:'🩸', color:'#c97b8a',
    tagline:'몸이 쉬어가는 시간이에요',
    hormone:{ desc:'에스트로겐·프로게스테론 모두 낮아요. 내부 에너지를 쓰는 시기예요.', levels:{ 에스트로겐:20, 프로게스테론:10, FSH:40, LH:15 } },
    mood:'피로감, 복통, 예민함. 충분한 휴식이 최우선이에요 💤',
    yoga:[
      { name:'발라아사나 (아이 자세)', sanskrit:'Balasana', benefit:'복부 압박 완화, 요통 이완', duration:'3분', emoji:'🧘', tip:'이마를 바닥에 대고 완전히 이완해요' },
      { name:'숩타 바다코나아사나', sanskrit:'Supta Baddha Konasana', benefit:'골반 열기, 생리통 완화', duration:'5분', emoji:'🦋', tip:'블랭킷으로 무릎을 받쳐도 좋아요' },
      { name:'비파리타 카라니', sanskrit:'Viparita Karani', benefit:'다리 부종 완화, 신경계 안정', duration:'10분', emoji:'🌙', tip:'벽에 다리를 올리고 눈을 감아요' },
    ],
    meditation:{ title:'자기 자비 명상', duration:'10분', guide:'지금 내 몸이 하는 일에 감사를 보내세요. 자궁이 새로운 시작을 준비하고 있어요. 호흡을 따라 복부가 부드럽게 오르내리는 것을 느껴보세요.', music:'잔잔한 자연 소리', breathwork:'복식 호흡 — 4초 들숨, 6초 날숨' },
    diet:{
      focus:'철분 보충 · 항염증',
      meals:[
        { time:'아침', icon:'🌅', menu:'시금치 스크램블 에그 + 두유', reason:'철분 + 단백질' },
        { time:'점심', icon:'☀️', menu:'연어 샐러드 + 현미밥', reason:'오메가3 항염증' },
        { time:'저녁', icon:'🌙', menu:'렌틸콩 수프 + 통밀빵', reason:'철분 + 식이섬유' },
        { time:'간식', icon:'🍫', menu:'다크초콜릿 + 호두', reason:'마그네슘 보충' },
      ],
      avoid:'카페인, 짠 음식, 알코올',
    },
    supplements:[
      { name:'철분', dose:'18mg', timing:'식후', reason:'생리로 손실된 철분 보충', emoji:'💊' },
      { name:'마그네슘', dose:'300mg', timing:'취침 전', reason:'생리통·근육 경련 완화', emoji:'🔵' },
      { name:'오메가3', dose:'1000mg', timing:'식사 중', reason:'항염증 효과', emoji:'🐟' },
      { name:'비타민 B6', dose:'50mg', timing:'아침', reason:'기분 조절, 피로 완화', emoji:'🟡' },
    ],
    workout:{ intensity:'낮음', focus:'가볍게, 따뜻하게', videos:[
      { title:'생리통 완화 요가 10분', channel:'Yoga with Adriene', url:'https://www.youtube.com/watch?v=KmEJoKsZPaQ', duration:'10분', tag:'요가' },
      { title:'누워서 하는 스트레칭', channel:'MommaStrong', url:'https://www.youtube.com/watch?v=qULTwquOuT4', duration:'15분', tag:'스트레칭' },
    ]},
  },

  follicular: {
    phase:'follicular', name:'여포기', emoji:'🌱', color:'#8b78c9',
    tagline:'에너지가 깨어나는 시간이에요',
    hormone:{ desc:'에스트로겐이 서서히 상승해요. 뇌가 또렷해지고 에너지가 회복돼요.', levels:{ 에스트로겐:65, 프로게스테론:15, FSH:70, LH:30 } },
    mood:'활기차고 창의적이에요. 새로운 것을 시작하기 딱 좋은 때! ✨',
    yoga:[
      { name:'태양 경배 A', sanskrit:'Surya Namaskara A', benefit:'전신 활성화, 에너지 순환', duration:'5~10분', emoji:'☀️', tip:'호흡과 동작을 맞춰 유연하게' },
      { name:'전사 I', sanskrit:'Virabhadrasana I', benefit:'하체 강화, 자신감 상승', duration:'좌우 1분', emoji:'⚔️', tip:'골반을 정면으로, 가슴을 활짝 열어요' },
      { name:'나무 자세', sanskrit:'Vrksasana', benefit:'균형감각, 집중력', duration:'좌우 1분', emoji:'🌳', tip:'시선을 한 점에 고정하면 쉬워요' },
    ],
    meditation:{ title:'의도 설정 명상', duration:'8분', guide:'이번 주기에 이루고 싶은 것을 마음속에 그려보세요. 새싹이 땅을 뚫고 나오듯, 당신의 에너지가 회복되고 있어요.', music:'업리프팅 인스트루멘탈', breathwork:'활기찬 호흡 — 4초 들숨, 4초 날숨, 4초 정지' },
    diet:{
      focus:'에스트로겐 대사 지원 · 에너지 충전',
      meals:[
        { time:'아침', icon:'🌅', menu:'그릭 요거트 + 베리 + 견과류', reason:'프로바이오틱 + 항산화' },
        { time:'점심', icon:'☀️', menu:'닭가슴살 퀴노아 볼', reason:'단백질 + 복합 탄수화물' },
        { time:'저녁', icon:'🌙', menu:'두부 스테이크 + 브로콜리', reason:'파이토에스트로겐 + 설포라판' },
        { time:'간식', icon:'🥑', menu:'아보카도 토스트', reason:'건강한 지방 + 포만감' },
      ],
      avoid:'과도한 정제 탄수화물',
    },
    supplements:[
      { name:'비타민 D3', dose:'2000IU', timing:'아침 식사 후', reason:'에스트로겐 생성 지원', emoji:'☀️' },
      { name:'아연', dose:'15mg', timing:'식사 중', reason:'난포 성숙 지원', emoji:'🔮' },
      { name:'비타민 B군', dose:'복합제', timing:'아침', reason:'에너지 대사 활성화', emoji:'🟡' },
      { name:'프로바이오틱스', dose:'10억 CFU', timing:'공복', reason:'장-호르몬 축 균형', emoji:'🦠' },
    ],
    workout:{ intensity:'중간~높음', focus:'새로운 루틴 도전하기 좋아요', videos:[
      { title:'30분 전신 필라테스', channel:'Move with Nicole', url:'https://www.youtube.com/watch?v=TKKc7R0Hxq4', duration:'30분', tag:'필라테스' },
      { title:'초급 HIIT 유산소', channel:'Heather Robertson', url:'https://www.youtube.com/watch?v=ml6cT4AZdqI', duration:'25분', tag:'HIIT' },
    ]},
  },fertile: {
    phase:'fertile', name:'가임기', emoji:'🌿', color:'#4a9e72',
    tagline:'빛나는 절정의 시간이에요',
    hormone:{ desc:'에스트로겐 최고조! LH 급증 직전. 사회적 자신감과 매력이 최고점이에요.', levels:{ 에스트로겐:90, 프로게스테론:20, FSH:80, LH:75 } },
    mood:'자신감 넘치고 사교적이에요. 발표·미팅·데이트 최고의 날! 🌟',
    yoga:[
      { name:'여신 자세', sanskrit:'Utkata Konasana', benefit:'골반 강화, 여성성 에너지', duration:'2분', emoji:'👸', tip:'발가락을 45도로 벌리고 깊게 앉아요' },
      { name:'활 자세', sanskrit:'Dhanurasana', benefit:'생식기관 자극, 에너지 순환', duration:'30초×3', emoji:'🏹', tip:'발목을 잡고 가슴을 높이 들어요' },
      { name:'낙타 자세', sanskrit:'Ustrasana', benefit:'심장 열기, 자신감', duration:'30초×3', emoji:'🐪', tip:'허리가 아닌 가슴으로 뒤로 젖혀요' },
    ],
    meditation:{ title:'풍요 명상', duration:'10분', guide:'지금 이 순간 당신은 가장 빛나고 있어요. 온몸에서 따뜻한 빛이 퍼져나가는 것을 느껴보세요. 당신의 창의성, 아름다움, 힘에 연결되어보세요.', music:'업리프팅 바이노럴 비트', breathwork:'완전 호흡 — 복식→흉식→쇄골 순서로 가득 채우기' },
    diet:{
      focus:'항산화 · 배란 지원',
      meals:[
        { time:'아침', icon:'🌅', menu:'베리 스무디볼 + 치아씨드', reason:'항산화 + 오메가3' },
        { time:'점심', icon:'☀️', menu:'연어 포케볼 + 아보카도', reason:'배란을 돕는 건강 지방' },
        { time:'저녁', icon:'🌙', menu:'석류 드레싱 샐러드 + 렌틸', reason:'에스트로겐 대사 지원' },
        { time:'간식', icon:'🍓', menu:'딸기 + 다크초콜릿', reason:'항산화 + 기분 UP' },
      ],
      avoid:'트랜스지방, 가공식품',
    },
    supplements:[
      { name:'엽산', dose:'400mcg', timing:'아침', reason:'세포 건강 + 배란 지원', emoji:'🍃' },
      { name:'CoQ10', dose:'200mg', timing:'식사 중', reason:'난자 질 개선', emoji:'⚡' },
      { name:'비타민 C', dose:'500mg', timing:'식사 후', reason:'배란 유도 + 항산화', emoji:'🍊' },
      { name:'오메가3', dose:'1000mg', timing:'식사 중', reason:'자궁 혈류 개선', emoji:'🐟' },
    ],
    workout:{ intensity:'높음', focus:'최고의 퍼포먼스! 강도 높은 운동도 거뜬해요', videos:[
      { title:'45분 댄스 유산소', channel:'Zumba Fitness', url:'https://www.youtube.com/watch?v=CLyGRSuLYMs', duration:'45분', tag:'댄스' },
      { title:'바디웨이트 서킷', channel:'Heather Robertson', url:'https://www.youtube.com/watch?v=vc1E5CfRfos', duration:'35분', tag:'근력' },
    ]},
  },

  ovulation: {
    phase:'ovulation', name:'배란일', emoji:'🌕', color:'#c89a2a',
    tagline:'사이클에서 가장 강한 하루예요',
    hormone:{ desc:'LH 급증으로 난자 배출. 에스트로겐 최고점, 테스토스테론도 소폭 상승!', levels:{ 에스트로겐:100, 프로게스테론:25, FSH:90, LH:100 } },
    mood:'자신감·에너지 모두 최고! 오늘 중요한 일을 처리하세요 👑',
    yoga:[
      { name:'전사 III', sanskrit:'Virabhadrasana III', benefit:'균형·집중·전신 강화', duration:'좌우 45초', emoji:'🦅', tip:'한 다리로 비행기처럼 수평을 맞춰요' },
      { name:'측면 플랭크', sanskrit:'Vasisthasana', benefit:'코어·팔 강화, 의지력', duration:'좌우 30초', emoji:'💪', tip:'발꿈치를 포개고 엉덩이를 높게 유지해요' },
      { name:'반달 자세', sanskrit:'Ardha Chandrasana', benefit:'균형, 에너지 확장', duration:'좌우 1분', emoji:'🌙', tip:'바닥 손가락 끝만 가볍게 짚어요' },
    ],
    meditation:{ title:'파워 시각화 명상', duration:'12분', guide:'눈을 감고 오늘 가장 빛나는 자신의 모습을 생생하게 그려보세요. 목표를 이미 이룬 것처럼 느껴보고, 그 감정을 온몸에 새겨보세요.', music:'파워풀 오케스트라', breathwork:'박스 호흡 — 4초 들숨·정지·날숨·정지' },
    diet:{
      focus:'배란 지원 · 항산화 최대화',
      meals:[
        { time:'아침', icon:'🌅', menu:'아보카도 에그 토스트 + 석류주스', reason:'건강 지방 + 항산화' },
        { time:'점심', icon:'☀️', menu:'참치 샐러드 + 퀴노아', reason:'단백질 + 아연' },
        { time:'저녁', icon:'🌙', menu:'구운 연어 + 아스파라거스', reason:'오메가3 + 엽산' },
        { time:'간식', icon:'🌰', menu:'호박씨 + 아몬드 한 줌', reason:'아연 + 마그네슘' },
      ],
      avoid:'술, 카페인 과다',
    },
    supplements:[
      { name:'비타민 E', dose:'400IU', timing:'식사 후', reason:'난자 보호 + 항산화', emoji:'🌿' },
      { name:'CoQ10', dose:'200mg', timing:'아침', reason:'배란 에너지 지원', emoji:'⚡' },
      { name:'셀레늄', dose:'55mcg', timing:'식사 중', reason:'갑상선·생식 기능 지원', emoji:'🔶' },
      { name:'오메가3', dose:'1000mg', timing:'식사 중', reason:'프로스타글란딘 균형', emoji:'🐟' },
    ],
    workout:{ intensity:'높음', focus:'개인 기록 세우기 좋은 날', videos:[
      { title:'30분 전신 근력 운동', channel:'Heather Robertson', url:'https://www.youtube.com/watch?v=UBMk30rjy0o', duration:'30분', tag:'근력' },
      { title:'고강도 카디오', channel:'Sydney Cummings', url:'https://www.youtube.com/watch?v=Mvo2snJGhtM', duration:'40분', tag:'HIIT' },
    ]},
  },

  luteal: {
    phase:'luteal', name:'황체기', emoji:'🍂', color:'#c9783a',
    tagline:'내면으로 돌아가는 시간이에요',
    hormone:{ desc:'프로게스테론이 주도해요. 후반부로 갈수록 두 호르몬이 떨어지며 PMS가 올 수 있어요.', levels:{ 에스트로겐:55, 프로게스테론:80, FSH:20, LH:15 } },
    mood:'집중력이 좋지만 후반엔 예민해질 수 있어요. 나를 위한 시간을 챙겨요 🍵',
    yoga:[
      { name:'비틀기 자세', sanskrit:'Ardha Matsyendrasana', benefit:'소화기 자극, 독소 배출', duration:'좌우 1분', emoji:'🌀', tip:'날숨에 더 깊이 비틀어요' },
      { name:'다리 자세', sanskrit:'Setu Bandhasana', benefit:'자궁 순환 촉진, 피로 회복', duration:'1분×3', emoji:'🌉', tip:'발바닥으로 바닥을 밀어요' },
      { name:'레그스업 자세', sanskrit:'Viparita Karani', benefit:'다리 붓기, 신경계 진정', duration:'10분', emoji:'🌙', tip:'눈을 감고 완전히 내려놓아요' },
    ],
    meditation:{ title:'자기 돌봄 명상', duration:'15분', guide:'지금 내 몸이 어떤지 조용히 스캔해보세요. 긴장된 곳은 없나요? 그 부분에 따뜻한 빛을 보내주세요. 내가 나에게 가장 좋은 친구가 되어주는 시간이에요.', music:'Lo-fi 힐링 음악', breathwork:'4-7-8 호흡 — 4초 들숨, 7초 정지, 8초 날숨' },
    diet:{
      focus:'PMS 예방 · 혈당 안정',
      meals:[
        { time:'아침', icon:'🌅', menu:'귀리죽 + 바나나 + 아몬드밀크', reason:'세로토닌 전구체 트립토판' },
        { time:'점심', icon:'☀️', menu:'고구마 + 닭가슴살 + 나물', reason:'복합 탄수화물 혈당 안정' },
        { time:'저녁', icon:'🌙', menu:'두부 된장국 + 잡곡밥 + 김치', reason:'마그네슘 + 프로바이오틱' },
        { time:'간식', icon:'🍌', menu:'바나나 + 카모마일 차', reason:'기분 안정 + 수면 개선' },
      ],
      avoid:'설탕, 정제 탄수화물, 카페인',
    },
    supplements:[
      { name:'마그네슘', dose:'400mg', timing:'취침 전', reason:'PMS 증상 완화 + 수면', emoji:'🔵' },
      { name:'비타민 B6', dose:'50mg', timing:'아침', reason:'기분 조절, 부종 완화', emoji:'🟡' },
      { name:'달맞이꽃 오일', dose:'1000mg', timing:'식사 후', reason:'유방 통증·PMS 완화', emoji:'🌼' },
      { name:'칼슘', dose:'500mg', timing:'저녁 식사 후', reason:'PMS 증상 50% 감소', emoji:'🦴' },
    ],
    workout:{ intensity:'중간', focus:'스트레스 해소 + 부종 완화', videos:[
      { title:'PMS 완화 요가', channel:'Yoga with Adriene', url:'https://www.youtube.com/watch?v=3CwbP3oSnh0', duration:'25분', tag:'요가' },
      { title:'저강도 유산소 걷기', channel:'Walk at Home', url:'https://www.youtube.com/watch?v=enLAHpFD2b0', duration:'30분', tag:'걷기' },
    ]},
  },
};

WELLNESS['next-period'] = { ...WELLNESS.menstrual, name:'예상 생리일', emoji:'🩸' };
