/* ==========================================================
   Lab1.js: 별의 온도와 색깔 실험 스크립트
========================================================== */

const STAR_DATA = [
    { min: 0,     max: 3700,  temp: 3500,  name: "베텔게우스", type: "M", label: "적색",
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
    { min: 10001, max: 29999, temp: 18000, name: "리겔",        type: "B", label: "청백색",
      description: "매우 뜨거운 청백색 초거성입니다.",
      discovery:   "푸른빛이 나타나기 시작하면 표면 온도가 매우 높습니다."
    },
    { min: 30000, max: 100000, temp: 30000, name: "나오스",      type: "O", label: "청색",
      description: "가장 뜨거운 청색 별 가운데 하나입니다.",
      discovery:   "푸른 별이 가장 높은 표면 온도를 가집니다."
    }
];

// DOM 요소 선택
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

// 현재 온도에 알맞은 별 찾기
function getCurrentStar(temp) {
    for (const s of STAR_DATA) {
        if (temp >= s.min && temp <= s.max) {
            return s;
        }
    }
    return STAR_DATA[STAR_DATA.length - 1]; // 30,000K 초과 시 무조건 O형 별(나오스) 리턴
}

// 색상 보간 함수
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

// 온도별 연속 색상 반환
function getStarColor(temp) {
    const points = [
        { t: 3500,  c: "#EF4444" },  // 적색
        { t: 4500,  c: "#F97316" },  // 주황색
        { t: 5800,  c: "#EAB308" },  // 황색
        { t: 6700,  c: "#FEF08A" },  // 황백색
        { t: 9500,  c: "#FFFFFF" },  // 백색
        { t: 18000, c: "#93C5FD" },  // 청백색
        { t: 30000, c: "#3B82F6" }   // 청색
    ];

    if (temp <= points[0].t) return points[0].c;
    if (temp >= points[points.length - 1].t) return points[points.length - 1].c;

    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i], p2 = points[i + 1];
        if (temp >= p1.t && temp <= p2.t) {
            const ratio = (temp - p1.t) / (p2.t - p1.t);
            return interpolateColor(p1.c, p2.c, ratio);
        }
    }
    return points[points.length - 1].c;
}

// 화면 별 그래픽 변경
function renderStar() {
    const temp = Number(slider.value);
    const color = getStarColor(temp);
    if (star) {
        star.style.backgroundColor = color;
        star.style.boxShadow = `0 0 40px ${color}`;
    }
    if (starGlow) {
        starGlow.style.backgroundColor = color;
        starGlow.style.boxShadow = `0 0 80px 20px ${color}`;
    }
}

// 텍스트 정보 변경
function renderInfo(currentStar) {
    if (starName) starName.textContent = currentStar.name;
    if (starDisplayName) starDisplayName.textContent = currentStar.name;
    if (starType) starType.textContent = currentStar.type + "형";
    if (spectralType) spectralType.textContent = currentStar.type;
    if (starLabel) starLabel.textContent = currentStar.label;
    if (starDescription) starDescription.textContent = currentStar.description;
}

// 발견 카드 변경
function renderDiscovery(currentStar) {
    if (discoveryText) discoveryText.textContent = currentStar.discovery;
}

// 전체 실험 업데이트
function updateExperiment() {
    if (!slider) return;
    const temp = Number(slider.value);
    if (temperatureValue) {
        temperatureValue.textContent = temp.toLocaleString() + " K";
    }

    const currentStar = getCurrentStar(temp);

    renderStar();
    renderInfo(currentStar);
    renderDiscovery(currentStar);
}

// 스냅 포인트 (대표 온도 근처로 마우스 손을 뗐을 때 자동 정렬)
const SNAP_POINTS = [3500, 4500, 5800, 6700, 9500, 18000, 30000];
function handleSnap() {
    if (!slider) return;
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

    // 1,000K 이내로 가까워지면 대표 온도로 스냅
    if (minDiff <= 1000) {
        slider.value = nearest;
    }
    updateExperiment();
}

// 초기화
function initLab1() {
    if (!slider) return;
    slider.addEventListener("input", updateExperiment);
    slider.addEventListener("change", handleSnap);
    updateExperiment();
}

document.addEventListener("DOMContentLoaded", initLab1);
