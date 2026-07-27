// 주소(URL) 변경을 감지하여 알맞은 화면을 띄워주는 함수
function renderPage() {
    // 현재 주소의 # 뒤의 값을 가져옵니다 (기본값: main-page)
    const hash = window.location.hash.replace('#', '') || 'main-page';

    // 모든 view-section 화면을 가져옵니다.
    const allSections = document.querySelectorAll('.view-section');

    let matched = false;

    allSections.forEach(section => {
        if (section.id === hash) {
            section.classList.remove('hidden'); // 클릭한 대상만 보여주기
            matched = true;
        } else {
            section.classList.add('hidden');    // 나머지는 완벽히 숨기기
        }
    });

    // 만약 해당하는 페이지가 없다면(예: lab2, lab3 등 아직 안 만든 경우)
    if (!matched) {
        alert('해당 실험실은 아직 준비 중입니다!');
        window.location.hash = '#main-page'; // 다시 메인으로 돌려보냄
    }

    // 화면 스크롤을 항상 맨 위로 보냅니다.
    window.scrollTo(0, 0);
}

// 주소창이 변경될 때마다(버튼 눌렀을 때) renderPage 함수 실행
window.addEventListener('hashchange', renderPage);

// 처음에 웹페이지가 열렸을 때 실행
window.addEventListener('DOMContentLoaded', renderPage);
