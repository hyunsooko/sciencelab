/* ==========================================================
   LAB 1 : 별의 온도와 색깔
========================================================== */

/* ------------------------------
   대표 별 데이터
------------------------------ */

const STAR_DATA = [

{
    min:0,
    max:3700,

    temp:3500,

    name:"베텔게우스",

    type:"M",

    label:"적색",

    color:"#D9534F",

    glow:"rgba(217,83,79,.55)",

    description:"표면 온도가 비교적 낮은 적색 초거성입니다.",

    discovery:"붉은 별도 매우 뜨겁지만, 푸른 별보다 온도가 낮습니다."
},

{
    min:3701,
    max:5200,

    temp:4500,

    name:"아르크투루스",

    type:"K",

    label:"주황색",

    color:"#F2994A",

    glow:"rgba(242,153,74,.55)",

    description:"주황색을 띠는 거성입니다.",

    discovery:"온도가 조금 높아질수록 붉은색에서 주황색으로 변합니다."
},

{
    min:5201,
    max:6000,

    temp:5800,

    name:"태양",

    type:"G",

    label:"황색",

    color:"#FFD54F",

    glow:"rgba(255,213,79,.60)",

    description:"우리 태양과 비슷한 표면 온도를 가진 별입니다.",

    discovery:"태양은 노란색이지만 가장 뜨거운 별은 아닙니다."
},

{
    min:6001,
    max:7500,

    temp:6700,

    name:"카노푸스",

    type:"F",

    label:"황백색",

    color:"#FFF4D8",

    glow:"rgba(255,244,216,.65)",

    description:"노란빛과 흰빛이 함께 나타나는 별입니다.",

    discovery:"온도가 높아질수록 흰빛이 강해집니다."
},

{
    min:7501,
    max:10000,

    temp:9500,

    name:"시리우스",

    type:"A",

    label:"백색",

    color:"#FFFFFF",

    glow:"rgba(255,255,255,.75)",

    description:"밤하늘에서 매우 밝게 보이는 백색 별입니다.",

    discovery:"백색 별은 태양보다 훨씬 높은 온도를 가집니다."
},

{
    min:10001,
    max:30000,

    temp:18000,

    name:"리겔",

    type:"B",

    label:"청백색",

    color:"#D7E7FF",

    glow:"rgba(215,231,255,.75)",

    description:"매우 뜨거운 청백색 초거성입니다.",

    discovery:"푸른빛이 나타나기 시작하면 표면 온도가 매우 높습니다."
},

{
    min:30001,
    max:50000,

    temp:30000,

    name:"나오스",

    type:"O",

    label:"청색",

    color:"#7EA8FF",

    glow:"rgba(126,168,255,.8)",

    description:"가장 뜨거운 청색별 가운데 하나입니다.",

    discovery:"푸른 별이 가장 높은 표면 온도를 가집니다."

}

];


/* ------------------------------
   DOM
------------------------------ */

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


/* ------------------------------
   초기화
------------------------------ */

function initLab1(){

    if(!slider) return;

    slider.addEventListener("input",updateExperiment);

    updateExperiment();

}


/* ------------------------------
   현재 별 찾기
------------------------------ */

function getCurrentStar(temp){

    for(const star of STAR_DATA){

        if(temp>=star.min && temp<=star.max){

            return star;

        }

    }

    return STAR_DATA[0];

}


/* ------------------------------
   메인 업데이트
------------------------------ */

function updateExperiment(){

    const temp = Number(slider.value);

    const currentStar = getCurrentStar(temp);

    // 현재 온도 표시

    temperatureValue.textContent =
        temp.toLocaleString()+" K";

    // 다음 단계에서 화면 전체를 업데이트

    renderEverything(currentStar);

}


/* ------------------------------
   시작
------------------------------ */

initLab1();
