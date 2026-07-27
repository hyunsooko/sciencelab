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

const MISCONCEPTION_DATA = [
    {
        question: "붉은색 별은 뜨겁고, 푸른색 별은 차갑지 않나요?",
        answer: "반대입니다! 가스레인지 불꽃이나 쇳물을 떠올려보세요. 온도가 낮을수록 붉은색을 띠고, 온도가 높을수록 푸른색을 띱니다."
    },
    {
        question: "별의 색깔을 보면 별의 크기도 알 수 있나요?",
        answer: "아닙니다. 색깔은 오직 별의 '표면 온도' 정보만 알려줍니다. 같은 노란색 별이라도 태양처럼 작은 주계열성일 수도 있고, 거대한 거성일 수도 있습니다."
    },
    {
        question: "밤하늘에서 밝게 보이는 별이 무조건 더 뜨거운 별인가요?",
        answer: "아닙니다! 별의 겉보기 밝기는 별의 실제 밝기와 지구까지의 거리에 따라 달라집니다. 온도가 낮아도 지구와 가까우면 밝게 보입니다."
    },
    {
        question: "모든 별은 평생 동안 처음에 태어난 색깔 그대로 유지되나요?",
        answer: "아닙니다. 별도 진화하면서 표면 온도가 변하기 때문에 색깔이 바뀝니다. 태양도 나중에 부풀어 오르며 붉은색 적색거성이 됩니다."
    },
    {
        question: "별의 색깔로 알 수 있는 온도는 별 중심의 온도인가요?",
        answer: "아닙니다. 우리가 눈으로 관찰하는 별의 색은 별의 '표면 온도'입니다. 별 중심부는 표면보다 훨씬 뜨거운 수천만 도에 달합니다."
    },
    {
        question: "노란색인 태양이 우주에서 가장 뜨겁고 에너지가 강한 별인가요?",
        answer: "아닙니다! 태양은 표면 온도가 약 5,800K인 중간 수준의 황색 별입니다. 청색 별은 표면 온도가 30,000K 이상으로 훨씬 뜨겁습니다."
    }
];

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
const faqContainer = document.querySelector("#faqContainer");

function getCurrentStar(temp) {
    for (const s of STAR_DATA) {
        if (temp >= s.min && temp <= s.max) {
            return s;
        }
    }
    return STAR_DATA[STAR_DATA.length - 1];
}

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

function getStarColor(temp) {
    const points = [
        { t: 3500,  c: "#EF4444" },
        { t: 4500,  c: "#F97316" },
        { t: 5800,  c: "#EAB308" },
        { t: 6700,  c: "#FEF08A" },
        { t: 9500,  c: "#FFFFFF" },
        { t: 18000, c: "#93C5FD" },
        { t: 30000, c: "#3B82F6" }
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

function renderInfo(currentStar) {
    if (starName) starName.textContent = currentStar.name;
    if (starDisplayName) starDisplayName.textContent = currentStar.name;
    if (starType) starType.textContent = currentStar.type + "형";
    if (spectralType) spectralType.textContent = currentStar.type;
    if (starLabel) starLabel.textContent = currentStar.label;
    if (starDescription) starDescription.textContent = currentStar.description;
}

function renderDiscovery(currentStar) {
    if (discoveryText) discoveryText.textContent = currentStar.discovery;
}

// 💡 질문(Q)과 답변(A)을 시각적으로 명확히 분리하여 HTML 출력
function renderRandomFAQ() {
    if (!faqContainer) return;

    const shuffled = [...MISCONCEPTION_DATA].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    faqContainer.innerHTML = selected.map(item => `
        <div class="faq-item">
            <div class="faq-question">
                <span class="q-badge">Q</span>
                <span>${item.question}</span>
            </div>
            <div class="faq-answer">
                ${item.answer}
            </div>
        </div>
    `).join('');
}

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

    if (minDiff <= 1000) {
        slider.value = nearest;
    }
    updateExperiment();
}

function initLab1() {
    if (!slider) return;
    slider.addEventListener("input", updateExperiment);
    slider.addEventListener("change", handleSnap);
    
    updateExperiment();
    renderRandomFAQ();
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initLab1);
} else {
    initLab1();
}
