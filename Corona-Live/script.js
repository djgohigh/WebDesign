let getData = [];

$(function () {
    $.ajaxPrefilter('json', function(options, orig, jqXHR) {
        return 'jsonp';
    });
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: "http://openapi.seoul.go.kr:8088/6758584479646a38313033687442516b/json/TbCorona19CountStatus/1/5/",
        data: json,
        async: false,
        success: function (response) {
            getData = response;
            console.log(getData);
        },
    });
    // 날짜 기준일  * tdy: 오늘, ytd: 어제, inc: 증감 *
    let nowTime = getData.TbCorona19CountStatus.row[0].S_DT;
    
    // $(".l_con > div:nth-child(3)").text(`<div id="nowTime">${nowTime}</div>`);
    setNationWide();
    
    // 기준일 설정
    $(".l_con > div:nth-child(3)").text(`${nowTime}`);
    
    $(".nationWide").click(function () {
        setNationWide();
    });
    $(".seoul").click(function() {
        setSeoul();
    });
});

// 서울 확진 데이터 세팅
function setSeoul() {
    let s_hj_tdy = getData.TbCorona19CountStatus.row[0].S_HJ
    setTextDiv(s_hj_tdy, "s_hj_tdy", ".tl_sct_l1 > div:nth-child(2)");
    
    let s_hj_ytd = getData.TbCorona19CountStatus.row[1].S_HJ;
    let s_hj_inc = getData.TbCorona19CountStatus.row[0].SN_HJ;
    calIncrement(s_hj_inc, "s_hj_inc", ".tl_sct_l1 > div:nth-child(3)");
    
    let s_death_tdy = getData.TbCorona19CountStatus.row[0].S_DEATH;
    let s_death_ytd = getData.TbCorona19CountStatus.row[1].S_DEATH;
    let s_death_inc = s_death_tdy - s_death_ytd;
    setTextDiv(s_death_tdy, "s_death_tdy", ".tl_sct_l2 > div:nth-child(2)");
    calIncrement(s_death_inc, "s_death_inc", ".tl_sct_l2 > div:nth-child(3)");
}

// 전국 확진 데이터 세팅
function setNationWide() {
    let t_hj_tdy = getData.TbCorona19CountStatus.row[0].T_HJ;
    setTextDiv(t_hj_tdy, "t_hj_tdy", ".tl_sct_l1 > div:nth-child(2)");

    let t_hj_ytd = getData.TbCorona19CountStatus.row[1].T_HJ;
    let t_hj_inc = getData.TbCorona19CountStatus.row[0].N_HJ;
    calIncrement(t_hj_inc, "t_hj_inc", ".tl_sct_l1 > div:nth-child(3)");

    // 전국 사망자
    let death_tdy = getData.TbCorona19CountStatus.row[0].DEATH;
    let death_ytd = getData.TbCorona19CountStatus.row[1].DEATH;
    let death_inc = death_tdy - death_ytd;
    setTextDiv(death_tdy, "death_tdy", ".tl_sct_l2 > div:nth-child(2)");
    calIncrement(death_inc, "death_inc", ".tl_sct_l2 > div:nth-child(3)");
}

function replString(anyVal) {
    return anyVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calIncrement(increment, id, selector) {
    incrementRepl = replString(increment);
    if (increment > 0) {
        return $(selector).text(`${incrementRepl} ↑`);
    } else if (increment < 0) {
        return $(selector).text(`${incrementRepl} ↓`);
    }
}

function setTextDiv(value, id, selector) {
    valueRepl = replString(value);
    return $(selector).text(`${valueRepl}`);
}
