window.addEventListener("load", ()=> {

    // 배너 슬라이드
    // 이벤트 대상: 이동버튼 (.abtn)
    // 변경 대상: 슬라이드 박스 (#slide)

    let abtn = document.querySelectorAll(".abtn");
    let slide = document.querySelector("#slide");

    // 슬라이드 li에 순번 속성 주기
    (() => {
        let tg = slide.querySelectorAll("li");
        for (let i = 0; i < tg.length; i++){
            tg[i].setAttribute("data-seq", i);
        }
    })

    // 광클금지 상태값
    let prot = 0

    // 슬라이드를 양쪽으로 이동하는 함수 goSlide

    const goSlide = (dir, gb) => {
        // dir - 이동방향(1:오른쪽,0:왼쪽)
        // gb - 구분코드(인터발 호출일때만 값이 전달됨)

        // 0. 광클금지 //////////
        if (prot) return;
        prot = 1;
        setTimeout(() => prot = 0, 600);
        // 0.6초후 잠금해제! //////

        if (!gb) clearAuto(); // 인터발 함수 지우기
        // 슬라이드 li요소들 변수할당!
        let sli = slide.querySelectorAll("li");

        if (dir) { // dir===1 이면 true

            // (1) 슬라이드박스의 left값을 -100%로 이동
            slide.style.left = "-100%";
            slide.style.transition = ".6s ease-out";

            // 슬라이드 이동 후 (2),(3) 실행함!
            // 일정시간 후 한번실행하는 타이밍함수는? setTimeout
            setTimeout(() => {
                // (2) 첫번째 슬라이드li를 잘라서 맨뒤로 보낸다!
                slide.appendChild(sli[0]);
                // appendChild(요소) - 선택요소 맨뒤이동

                // (3) 동시에 left값을 0으로 변경함!
                slide.style.left = "0";
                slide.style.transition = "none";
                // 트랜지션 없어야 애니메이션 안보임!

            }, 800);
        }
        else {
            // li요소 대상
            // (1) 먼저 맨뒤의 슬라이드 li를 맨앞으로 이동
            slide.insertBefore(sli[sli.length - 1], sli[0]);
            // insertBefore(넣을놈,넣을놈전놈)
            // sli.length-1 -> 컬렉션 마지막번호는 [개수-1]

            // (2) 이때 left -100%로 변경한다!(트랜지션없음!)
            slide.style.left = "-100%";
            slide.style.transition = "none";

            // (3) 이후 left값을 0으로 변경하며 애니메이션함
            // 주의: 위의 설정코드와 분리를 위해 setTimeout으로
            // 약간의 시차를 줌!
            setTimeout(() => {
                slide.style.left = "0";
                slide.style.transition = ".6s ease-out";
            }, 10); /// 0.01초 시차! ////

        }
    }; ////////////// goSlide함수 ///////////////

    // 오른쪽버튼 클릭시
    abtn[1].onclick = () => goSlide(1);

    // 왼쪽버튼 클릭시
    abtn[0].onclick = () => goSlide(0);

    // 인터발용변수
    let autoI;

    ////////////////////
    // 인터발 호출함수 //
    ////////////////////
    const autoCall = () => {
        // 인터발 자동호출!
        autoI = setInterval(() => goSlide(1, 1), 4000);
        // 지우기 위해 변수에 할당함!
    }; /////// autoCall함수 ///////////

    // 인터발 호출함수 최초호출!
    autoCall();

    // 타임아웃용 변수
    let autoT;

    ////////////////////
    // 인터발 삭제함수 //
    ////////////////////
    // -> 슬라이드 이동버튼 클릭시 호출됨!
    const clearAuto = () => {

        console.log("인터발 지우기!");

        // 1. 인터발 지우기 + 타임 아웃 지우기
        clearInterval(autoI);
        clearTimeout(autoT);
        // 한번씩 세팅되는 타임아웃을 안지우면
        // 여러개가 작동하여 실행 쓰나미가 발생한다.

        // 2. 일정시간 후 다시 인터발 호출하기
        autoT = setTimeout(autoCall,4000);
        // 4초 후 autoCall함수 호출!

    };

})