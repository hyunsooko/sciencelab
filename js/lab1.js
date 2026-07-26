/* ==========================================================
   Lab1.js: 별의 온도와 색깔 실험 스크립트
========================================================== */

const STAR_DATA = [
    { min: 0,     max: 3700,  temp: 3500,  name: "베텔게우스",  type: "M", label: "적색",
      description: "표면 온도가 비교적 낮은 적색 초거성입니다.",
      discovery:   "붉은 별도 매우 뜨겁지만, 푸른 별보다 온도가 낮습니다."
    },
    { min: 3701,  max: 5200,  temp: 4500,  name: "아르크투루스", type: "K", label: "주황색",
      description: "주황색을 띠는 거성입니다.",
      discovery:   "온도가 조금 높아질수록 붉은색에서 주황색으로 변합니다."
    },
    { min: 5201,  max: 6000,  temp: 5800,  name: "태양",         type: "G", label: "황색",
      description: "우리 태양과 비슷한 표면 온도를 가진 별입니다.",
      discovery:   "태양은 노란색이지만 가장 뜨거운 별은 아닙니다."
    },
    { min: 6001,  max: 7500,  temp: 6700,  name: "카노푸스",     type: "F", label: "황백색",
      description: "노란빛과 흰빛이 함께 나타나는 별입니다.",
      discovery:   "온도가 높아질수록 흰빛이 강해집니다."
    },
    { min: 7501,  max: 10000, temp: 9500,  name: "시리우스",     type: "A", label: "백색",
      description: "밤하늘에서 매우 밝게 보이는 백색 별입니다.",
      discovery:   "백색 별은 태양보다 훨씬 높은 온도를 가집니다."
    },
    { min: 10001, max: 30000, temp: 18000, name: "리겔",        type: "B", label: "청백색",
      description: "매우 뜨거운 청백색 초거성입니다.",
      discovery:   "푸른빛이 나타나기 시작하면 표면 온도가 매우 높습니다."
    },
    { min: 30001, max: 50000, temp: 30000, name: "나오스",       type: "O", label: "청색",
      description: "가장 뜨거운 청색 별 가운데 하나입니다.",
      discovery:   "푸른 별이 가장 높은 표면 온도를 가집니다."
    }
];

// DOM 요소 선택 (querySelector 사용)
const slider = document.querySelector("#temperatureSlider");
const temperatureValue = document.querySelector("#temperatureValue");
const star = document.querySelector("#star");
const starGlow = document.querySelector("#starGlow");
const starName = document.querySelector("#starName");
const starDisplayName = document.querySelector("#starDisplayName");
const starType = document.querySelector("#starType");
const spectralType = document.querySelector("#spectralType");
const starLabel = document.querySelector("#starLabel");
const starDescription = document.querySelector("#starDescription");
const discoveryText = document.querySelector("#discoveryText");

// 실험 초기화: 슬라이더 이벤트 등록 (input, change)
function initLab1() {
    if (!slider) return;
    slider.addEventListener("input", updateExperiment);
    slider.addEventListener("change", handleSnap);
    // 페이지 로드 시 초기 업데이트 및 스타 반짝임 애니메이션
    updateExperiment();
    star.animate(
        [
            { transform: "translate(-50%, -50%) scale(0.9)" },
            { transform: "translate(-50%, -50%) scale(1.1)" },
            { transform: "translate(-50%, -50%) scale(1)" }
        ],
        { duration: 800 }
    );
}

// 온도에 맞는 대표 별 찾기
function getCurrentStar(temp) {
    for (const s of STAR_DATA) {
        if (temp >= s.min && temp <= s.max) {
            return s;
        }
    }
    return STAR_DATA[0];
}

// 슬라이더 입력 시 화면 업데이트
function updateExperiment() {
    const temp = Number(slider.value);
    // 현재 온도 표시
    temperatureValue.textContent = temp.toLocaleString() + " K";
    // 대표 별 정보 조회
    const currentStar = getCurrentStar(temp);
    // 화면 전체 갱신 (후술하는 render*** 함수 호출)
    renderStar(currentStar);
    renderInfo(currentStar);
    renderTable(currentStar);
    renderDiscovery(currentStar);
    // 별 애니메이션: 크기 변화 효과
    star.animate(
        [
            { transform: "translate(-50%, -50%) scale(0.92)" },
            { transform: "translate(-50%, -50%) scale(1.08)" },
            { transform: "translate(-50%, -50%) scale(1)" }
        ],
        { duration: 250 }
    );

// 두 색상(c1, c2) 사이 t 비율의 보간 색 계산
function interpolateColor(c1, c2, t) {
    const c1Num = parseInt(c1.slice(1), 16);
    const c2Num = parseInt(c2.slice(1), 16);
    const r1 = (c1Num >> 16) & 0xff, g1 = (c1Num >> 8) & 0xff, b1 = c1Num & 0xff;
    const r2 = (c2Num >> 16) & 0xff, g2 = (c2Num >> 8) & 0xff, b2 = c2Num & 0xff;
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return `rgb(${r}, ${g}, ${b})`;
}

// 온도에 따른 별 색 계산 (구간 보간)
function getStarColor(temp) {
    const points = [
        { t: 3500,  c: "#D9534F" },  // 적색
        { t: 4500,  c: "#F2994A" },  // 주황색
        { t: 5800,  c: "#FFD54F" },  // 황색
        { t: 6700,  c: "#FFF6DA" },  // 황백색
        { t: 9500,  c: "#FFFFFF" },  // 백색
        { t: 18000, c: "#D8E8FF" },  // 청백색
        { t: 30000, c: "#7EA8FF" }   // 청색
    ];
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i], p2 = points[i + 1];
        if (temp >= p1.t && temp <= p2.t) {
            const ratio = (temp - p1.t) / (p2.t - p1.t);
            return interpolateColor(p1.c, p2.c, ratio);
        }
    }
    return points[points.length - 1].c;
}

// 별 렌더링: 색상 적용 및 슬라이더 배경 그라데이션 (스타일 속성 변경)
function renderStar(currentStar) {
    const temp = Number(slider.value);
    const color = getStarColor(temp);
    star.style.background = color;
    star.style.boxShadow = `0 0 90px ${color}`;
    if (starGlow) {
        starGlow.style.background = color;
    }
    slider.style.background = `linear-gradient(90deg, ${color}, #ffffff, ${color})`;
}

// 정보 렌더링: 이름, 유형, 레이블, 설명 업데이트
function renderInfo(currentStar) {
    starName.textContent = currentStar.name;
    starDisplayName.textContent = currentStar.name;
    starType.textContent = currentStar.type + "형";
    spectralType.textContent = currentStar.type;
    starLabel.textContent = currentStar.label;
    starDescription.textContent = currentStar.description;
}

// 교과서 표 강조: 현재 별 유형 행에 active 클래스 적용
function renderTable(currentStar) {
    const rows = document.querySelectorAll(".temperature-table tbody tr");
    rows.forEach(row => {
        row.classList.toggle("active", row.dataset.type === currentStar.type);
    });
}

// 발견 카드 렌더링: 오늘의 발견 텍스트 업데이트
function renderDiscovery(currentStar) {
    discoveryText.textContent = currentStar.discovery;
}

   // 대표 온도 값 목록 (스냅 기준점)
const SNAP_POINTS = [3500, 4500, 5800, 6700, 9500, 18000, 30000];

// 슬라이더 변경 이벤트 핸들러: 가장 근접한 대표 온도로 자동 보정
function handleSnap() {
    const value = Number(slider.value);
    let nearest = SNAP_POINTS[0];
    let minDiff = Infinity;
    SNAP_POINTS.forEach(pt => {
        const diff = Math.abs(value - pt);
        if (diff < minDiff) {
            minDiff = diff;
            nearest = pt;
        }
    });
    // 기준점으로부터 500K 이내면 스냅
    if (minDiff <= 500) {
        slider.value = nearest;
    }
    updateExperiment();
}

slider.addEventListener("change", handleSnap);

initLab1();   
}
