//콘솔 색깔 출력 상수
const 노란색 = '\u001b[33m'
const 초록색 = '\u001b[32m'
const 빨간색 = '\u001b[31m'
const 원래색 = '\u001b[0m'

class 노드 {
  constructor(값, 다음) {
    this.값 = 값;
    this.다음 = 다음;
  }
}

class 연결리스트만들기 {
  constructor() {
    this.머리 = null;
    this.길이 = 0;
  }

  추가(값) {
    const 새로운노드 = new 노드(값, null)
    if (this.머리 === null) {
      this.머리 = 새로운노드;
    } else {
      let 현재노드 = this.머리;
      while (현재노드.다음 != null) {
        현재노드 = 현재노드.다음
      }
      현재노드.다음 = 새로운노드
    }

    this.길이++
  }

  삭제() {
    if (this.머리 === null) {
      console.log(`${노란색}삭제할 노드가 없습니다.${원래색}`)
    } else {
      if (this.길이 === 1) {
        this.머리 = null;
      } else {
        let 현재노드 = this.머리;
        for (let 번째 = 1; 번째 < this.길이 - 1; 번째++) {
          현재노드 = 현재노드.다음;
        }
        현재노드.다음 = null;
      }

      this.길이--
    }
  }

  삽입(값, 인덱스) {
    let 인덱스숫자 = parseInt(인덱스)
    if (인덱스숫자 < 0 || 인덱스숫자 > this.길이 - 1 ) {
      console.log(`${노란색}리스트 범위 내의 인덱스를 입력하세요.${원래색}`)
      return
    }
    
    const 새로운노드 = new 노드(값, null)

    if (this.머리 === null) {
      console.log(`${노란색}먼저 요소를 추가하세요.${원래색}`)
      return
    } else if (인덱스숫자 === 0){
      새로운노드.다음 = this.머리
      this.머리 = 새로운노드
    } else {
      let 이전노드 = null;
      let 현재노드 = this.머리;

      while(인덱스숫자 > 0){
        이전노드 = 현재노드;
        현재노드 = 현재노드.다음;
        인덱스숫자--
      }

      이전노드.다음 = 새로운노드
      새로운노드.다음 = 현재노드
    }

    this.길이++
  }

  출력() {
    if (this.머리 === null) {
      console.log(`${노란색}노드가 생성되지 않았습니다.${원래색}`)
      return
    } else {
      let 현재노드 = this.머리
      let 노드들 = [];

      while (현재노드 != null) {
        노드들.push(현재노드.값)
        현재노드 = 현재노드.다음
      }

      console.log(노드들.join(' → '), `, 길이 ${this.길이}\n`)
    }
  }

  초기화(){
    while(this.머리 !== null){
      this.삭제()
    }
  }
}

// 연결리스트 생성
const 연결리스트 = new 연결리스트만들기();

// 터미널 입력 받기
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(`${초록색}연결리스트 만들기${원래색}`)

rl.on("line", (line) => {
  const input = line.split(' ')

  switch (input[0]) {
    case '종료':
      rl.close()
      break;
    case '추가':
      if (input[1] === undefined || input[1] === "") {
        console.log(`${노란색}잘못된 값입니다.${원래색}`)
        break;
      }
      연결리스트.추가(input[1])
      break;
    case '삽입':
      if (isNaN(input[2])) {
        console.log(`${노란색}잘못된 값입니다.${원래색}`)
        break;
      } else if (parseInt(input[2] < 1)) {
        console.log(`${노란색}1보다 큰 인덱스를 작성하세요.${원래색}`)
        break;
      }
      연결리스트.삽입(input[1], input[2])
      break;
    case '삭제':
      연결리스트.삭제()
      break;
    case '초기화':
      연결리스트.초기화()
      break;
    case '출력':
      연결리스트.출력()
      break;
    default:
      console.log(`${노란색}잘못된 값입니다.${원래색}`)
  }
})

rl.on('close', () => {
  console.log(`${빨간색}종료되었습니다.${원래색}`)
})