(function () {
    var oCarousel = document.querySelector('#carousel');

    var oMoveUnit = document.querySelector('section');
    var oMU_ul = document.querySelector('section ul');
    var oImgLis = document.querySelectorAll('section ul li');
    var imgLength = oImgLis.length;

    var oLeftBtn = document.querySelector('#leftBtn');
    var oRightBtn = document.querySelector('#rightBtn');

    var oCircles = document.querySelectorAll('footer ol li');

    var singleWidth = 450;
    var animateTime = 600;
    var tweenStyle = 'Linear';
    var interval = 2600;
    var lock = false;
    var now = 0;

    oMU_ul.appendChild(oImgLis[0].cloneNode(true));

    function leiRight(){
        if(oMoveUnit.isanimated)return;

        now++;
        changeCircle();
        animate(oMoveUnit,{'top':-singleWidth * now},animateTime,tweenStyle,function () {
            if(now > imgLength - 1){
                now = 0;
                this.style.top = 0;
            }
        });
    }
    var timer = setInterval(leiRight,interval);
    oCarousel.onmouseover = function () {
        clearInterval(timer);
    };
    oCarousel.onmouseout = function () {
        timer = setInterval(leiRight,interval);
    };

    oRightBtn.onclick = leiRight;
    oLeftBtn.onclick = function () {
        if(oMoveUnit.isanimated)return;

        now--;
        if(now < 0){
            now = imgLength - 1;
            oMoveUnit.style.top = -singleWidth * imgLength + "px";
        }
        changeCircle();
        animate(oMoveUnit,{'top':-singleWidth * now},animateTime,tweenStyle);
    };
    for(var j = 0;j < imgLength;j++){
        (function (m) {
            oCircles[m].onclick = function () {
                if(oMoveUnit.isanimated)return;
                now = m;
                changeCircle();
                animate(oMoveUnit,{'top':-singleWidth * now},animateTime,tweenStyle);
            };
        })(j);
    }

    function changeCircle(){
        var n = now;
        if(n === imgLength){
            n = 0;
        }
        for(var i = 0;i < imgLength;i++){
            oCircles[i].className = "";
        }
        oCircles[n].className = 'cur';
    }
})();