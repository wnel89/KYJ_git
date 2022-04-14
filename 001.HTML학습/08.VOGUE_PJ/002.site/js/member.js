//회원가입 페이지 JS  - member.js

$(()=>{ //////////////////// JQB 

    console.log("로딩완료!");

    /****************************************************** 
        [사용자 입력폼 유효성 검사하기]
        - 이벤트 종류: blur (포커스가 빠질때 발생)

        - 이벤트 대상: 
        -> 아이디가 "email2"가 아니고 class가 search가 아니며 type이 text인 input

        >>> 제이쿼리 선택표현법:
        input[type=text][id!=email2][class!=search]
        >>> 대괄호는 속성선택, != 같지않다 (제이쿼리 전용)

        -> type이 "password"인 입력요소 input

        >>> 제이쿼리 선택표현법:
        input[type=password]
    ******************************************************/
   $(`input[type=text][id!=email2][class!=search],
   input[type=password]`).blur(function(){
       // 방금 블러발생한 요소의 id는?
       let cid = $(this).attr("id");
       // cid는 current id (현재아이디)
       // attr(속성명) -> 해당속성값을 읽어옴!

       // 블러발생한 요소의 입력값은?
       let cv = $(this).val();
       // cv는 current value (현재값)
       // val() -> 선택요소의 입력값을 읽어옴!

       console.log("블러발생", cid, cv);
       
   }); //////////////////// blur ////////////////////////

}); //////////////////// JQB 