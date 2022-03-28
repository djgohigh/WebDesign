$(function() {


    // 네비게이션 메뉴
    $("header nav ul.gnb > li").hover(function() {
        $("ul.sub").stop().slideDown();
    }, function() {
        $("ul.sub").stop().slideUp();
    });
    
    //네비게이션 메뉴 끝
    $(".slide ul.slide_all > li").eq(0).siblings().css("top","-300px");
        var slideI = 0;
        setInterval(function() {
            if(slideI < 2) {
                slideI++;
            } else {
                slideI = 0;
            }
        // 형제들은 위쪽으로 감추고
        $(".slide ul.slide_all > li").eq(slideI).siblings().animate({"top" : "-300px"}, 500);
        // 선택된 요소는 등장하게 한다.
        $(".slide ul.slide_all > li").eq(slideI).animate({"top" : "0px"}, 500);
        console.log(slideI);
        }, 2000);
    // 메인 슬라이드 끝
    
    // 탭메뉴 공지사항 갤러리
    $(".contents .notice_gal h3").click(function() {
        $(".contents .notice_gal h3, .contents .notice_gal ul").removeClass("on");
        
        $(this).addClass("on");
        $(this).next("ul").addClass("on");
    });
    // 탭메뉴 공지사항 갤러리 끝
    
    // 레이어팝업
    $("ul.notice li").eq(0).click(function() {
        $(".modal").fadeIn("slow");
    });
    $("button").click(function() {
        $(".modal").fadeOut("slow");
    });
    // 레이어팝업 끝
});