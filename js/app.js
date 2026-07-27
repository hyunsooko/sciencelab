// 페이지의 모든 HTML 요소가 로드된 후 실행됩니다.
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 필요한 화면 및 버튼 요소들을 가져옵니다.
    const mainPage = document.getElementById('main-page');
    const labButtons = document.querySelectorAll('.lab-card .btn');
    const backButtons = document.querySelectorAll('.back-btn');

    // 2. [실험 시작 →] 버튼을 클릭했을 때 실행되는 동작
    labButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 버튼의 data-target 속성값(예: 'lab1-page')을 가져옵니다.
            const targetId = button.getAttribute('data-target');
            const targetLab = document.getElementById(targetId);

            if (targetLab) {
                mainPage.classList.add('hidden');    // 메인 화면 숨김
                targetLab.classList.remove('hidden'); // 클릭한 실험실 화면 보여주기
                window.scrollTo(0, 0);                 // 화면 스크롤을 맨 위로 이동
            } else {
                alert('해당 실험실은 아직 준비 중입니다!');
            }
        });
    });

    // 3. [← 메인 목록으로 돌아가기] 버튼을 클릭했을 때 실행되는 동작
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 열려 있는 모든 실험실 화면을 숨깁니다.
            document.querySelectorAll('.lab-page').forEach(lab => {
                lab.classList.add('hidden');
            });
            
            // 메인 화면을 다시 보여줍니다.
            mainPage.classList.remove('hidden');
            window.scrollTo(0, 0); // 화면 스크롤을 맨 위로 이동
        });
    });
});
