function init() {
  const data = [
    { id: '1-1', path: './image/torannpu-1.png', status: false },
    { id: '1-2', path: './image/torannpu-1.png', status: false },
    { id: '2-1', path: './image/torannpu-2.png', status: false },
    { id: '2-2', path: './image/torannpu-2.png', status: false },
    { id: '3-1', path: './image/torannpu-3.png', status: false },
    { id: '3-2', path: './image/torannpu-3.png', status: false },
    { id: '4-1', path: './image/torannpu-4.png', status: false },
    { id: '4-2', path: './image/torannpu-4.png', status: false },
    { id: '5-1', path: './image/torannpu-5.png', status: false },
    { id: '5-2', path: './image/torannpu-5.png', status: false },
    { id: '6-1', path: './image/torannpu-6.png', status: false },
    { id: '6-2', path: './image/torannpu-6.png', status: false },
    { id: '7-1', path: './image/torannpu-7.png', status: false },
    { id: '7-2', path: './image/torannpu-7.png', status: false },
    { id: '8-1', path: './image/torannpu-8.png', status: false },
    { id: '8-2', path: './image/torannpu-8.png', status: false },
    { id: '9-1', path: './image/torannpu-9.png', status: false },
    { id: '9-2', path: './image/torannpu-9.png', status: false },
    { id: '10-1', path: './image/torannpu-10.png', status: false },
    { id: '10-2', path: './image/torannpu-10.png', status: false },
    { id: '11-1', path: './image/torannpu-11.png', status: false },
    { id: '11-2', path: './image/torannpu-11.png', status: false },
    { id: '12-1', path: './image/torannpu-12.png', status: false },
    { id: '12-2', path: './image/torannpu-12.png', status: false },
    { id: '13-1', path: './image/torannpu-13.png', status: false },
    { id: '13-2', path: './image/torannpu-13.png', status: false },
  ];
  shuffleData = data.sort(() => Math.random() - 0.5);
  console.log(shuffleData);
  const gameBoard = document.getElementsByClassName('cards');

  shuffleData.forEach((ele) => {
    let content =
      '<div class="flip-card" id="' +
      ele.id +
      '"><div class="flip-card-inner"><div class="flip-card-front"></div><div class="flip-card-back" style="background-image:url(' +
      ele.path +
      ')"></div></div></div>';
    gameBoard[0].insertAdjacentHTML('beforeend', content);
  });
}
init();
let players = true;
let leftCards = shuffleData.length;
const playersName = document.getElementById('playersName');

if (players) {
  playersName.src = 'image/icon-p.png';
} else {
  playersName.src = 'image/icon-c.png';
}
const score = [0, 0];
const card = document.getElementsByClassName('flip-card');
let cnt = 0;
// click function
Array.prototype.forEach.call(card, function (ele, index) {
  if (cnt < 2) {
    ele.addEventListener(
      'click',
      function () {
        if (players == true && !ele.classList.contains('open')) {
          click(ele);
        }
      },
      false
    );
  }
});
let history = [];
function click(ele) {
  ele.classList.add('open');
  cnt++;
  //   id??????
  history.push(ele.id);

  //????????????1?????????ID?????????
  // ???????????????????????????
  if (cnt == 2) {
    hantei(ele.id);
  }
}
function hantei(id) {
  if (history[history.length - 2].split('-')[0] == id.split('-')[0]) {
    //   ??????
    if (players) {
      score[0]++;
    } else {
      score[1]++;
    }
    leftCards -= 2;
    cnt = 0;
    console.log('??????', score, leftCards);
    document.getElementById('score').textContent = '??????????????????' + score[0] + '???AI???' + score[1];
    // game clear
    if (leftCards === 0) {
      setTimeout(() => (document.getElementById('clear').style.display = 'flex'), 2 * 1000);
    }
    // ai?????????????????????
    if (players == false) {
      setTimeout(() => aiAction(), 2.5 * 1000);
    }
  } else {
    // 2???????????????????????????
    setTimeout(() => document.getElementById(history[history.length - 2]).classList.remove('open'), 1.5 * 1000);
    setTimeout(() => document.getElementById(id).classList.remove('open'), 1.5 * 1000);
    cnt = 0;
    // ???????????????????????????
    players = !players;
    // ai????????????
    if (players == false) {
      setTimeout(() => (playersName.src = 'image/icon-c.png'), 2 * 1000);
      setTimeout(() => aiAction(), 2.5 * 1000);
    } else {
      setTimeout(() => (playersName.src = 'image/icon-p.png'), 2 * 1000);
    }
  }
}
// ai???????????? ??????????????????
function aiAction() {
  console.log('players : AI');
  //   ??????????????????open
  let arr = [];
  Array.prototype.forEach.call(card, (ele) => {
    if (!ele.classList.contains('open')) {
      arr.push(ele.id);
    }
  });
  //   ???????????????????????????????????????
  arr.sort(() => Math.random() - 0.5).length = 2;
  click(document.getElementById(arr[0]));
  setTimeout(() => click(document.getElementById(arr[1])), 1.5 * 1000);
}

document.getElementById('ok').addEventListener('click', () => {
  document.getElementById('start').style.display = 'none';
});
