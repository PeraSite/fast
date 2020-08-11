var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = []; //줄들 기억하기 위함 [[tr],[tr],[tr]]
var 칸들 = []; //칸들 기억하기 위함 [[td,td,td],[td,td,td],[td,td,td]]
var 턴 = 'X';
var 결과 = document.createElement('div');
//칸 클릭 이벤트
var 비동기콜백 = function(이벤트){
    //해당 클릭 이벤트 위치 알려주기
    console.log(이벤트.target); //칸
    // 부모 위치 알려주기
    console.log(이벤트.target.parentNode); //줄
    // 부모의 부모
    console.log(이벤트.target.parentNode.parentNode);//테이블

    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
    console.log(몇줄);
    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
    console.log(몇칸);

    if(칸들[몇줄][몇칸].textContent !== ''){ //칸이 이미 채워져 있는가

    }else{
        칸들[몇줄][몇칸].textContent =턴;
         //세칸 다 채워졌나??
        var 다참 = false;
        if(칸들[몇줄][0].textContent === 턴 &&
        칸들[몇줄][1].textContent === 턴 &&
        칸들[몇줄][2].textContent===턴){ //가로줄 검사
            다참= true;
        }
        //세로줄
        if(칸들[0][몇칸].textContent===턴 &&
        칸들[1][몇칸].textContent===턴 &&
        칸들[2][몇칸].textContent===턴 ){
            다참= true;
        }
        //대각선 칸 줄 이 같을때 검사해야함
        console.log("역 대각선: "+Math.abs(몇줄-몇칸));
        if(몇줄 -몇칸 === 0 || Math.abs(몇줄-몇칸)===2){
            console.log('대각선 통과');
            //같은지 검사
            if((칸들[0][0].textContent === 턴 &&
            칸들[1][1].textContent === 턴 &&
            칸들[2][2].textContent === 턴 ) || (칸들[0][2].textContent===턴 && 칸들[2][0].textContent ===턴 && 칸들[1][1].textContent ===턴)){
                다참 =true;
            }
        }

        //다 찼으면
        if(다참){
            결과.textContent = 턴 +'님이 승리';
            바디.append(결과);
            //초기화
            턴 = 'X';
            칸들.forEach(function(줄){
                줄.forEach(function(칸){
                    칸.textContent='';
                });
            });
        }else{ // 다 안찼으면
            //턴을 넘김
            if(턴 === 'X'){
                턴 = 'O';

            }else{
                턴 = 'X';
            }
        }

    }

};
//3x3 테이블 추가
for( var i=1; i<=3; i+=1){
    var 줄 = document.createElement('tr');
    줄들.push(줄);
    칸들.push([]);
    for( var j=1; j<=3; j+=1){
        var 칸 = document.createElement('td');
        //칸을 눌렀을 때
        칸.addEventListener('click',비동기콜백);
        칸들[i-1].push(칸);
        줄.append(칸);
    }
    테이블.appendChild(줄);
}
바디.appendChild(테이블);
console.log(줄들,칸들);
