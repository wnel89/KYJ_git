// 옷소매 갤러리 JS - main.js

$(()=>{ /////////////// jQB ///////////////////////

    console.log("로딩완료!");

    // 변경 대상: .gbx - 갤러리 부모 박스
    let gbx = $(".gbx");

    // 광클 금지 상태변수
    let prot = 0; // 0은 허용 1은 허용안함

    // 양쪽 이동버튼 클릭시 ///
    // 대상: .abtn
    $(".abtn").click(function () {
        
        // 광클 금지 //
        if(prot) return;
        prot = 1; // 잠금!
        setTimeout(() => {
            prot = 0
        }, 400); // 클릭시 넘어가는 걸 잠궜지만 0.4초 뒤에 풀림

        console.log("오른쪽이냐?", $(this).is(".rb"));

        // 1. 오른쪽 버튼 클릭시
        // 선택자.is(".rb") -> 클래스가 "rb"면 true
        if($(this).is(".rb")){
            // 오른쪽 이동은 맨 앞 div요소를 맨 뒤로 이동!
            // 대상:
            gbx.append(gbx.find("div").first());
            // append(첫번째 div)
        } //////// if
        // 2. 왼쪽 버튼 클릭시 //
        else{
            // 왼쪽이동은 맨 뒤 div요소를 맨 앞으로 이동!
            // 대상:
            gbx.prepend(gbx.find("div").last());
            // prepend(마지막 div)
        } ////// else //////
        
        // 자동넘김 지우기
        clearInterval(autoI);
        clearTimeout(autoT); // 쓰나미 실행방지
        // 일정시간 후 자동호출!
        autoT = setTimeout(autoCall,4000);
        // 4초 후 자동넘김함수 호출

    }); //////// click

    // 인터발용 변수
    let autoI;
    // 타임아웃용 변수
    let autoT;

    // 자동넘김 함수
    const autoCall = ()=>{

        autoI = setInterval(()=>{
            gbx.append(gbx.find("div").first());
        },2000);
        
        // $(".rb").trigger("click"); 
        // trigger(이벤트) -> 이벤트 강제발생
    }; /////// autoCall 함수 ///////////

    // 자동넘김 함수 최초 호출
    autoCall();

}); /////////////////// jQB ///////////////////////
