let boardStatus = [];
let isGameEnded = 0;

function initializeBoard(size, mode, judge) {
  for (let i = 0; i < size; i++) {
    const arr = [];
    for (let j = 0; j < size; j++) {
      arr.push(0);
    }
    boardStatus.push(arr);
  }
  for (let i = 0; i < size + 1; i++) {
    const rowContainer = document.createElement("div");
    Object.assign(rowContainer.style, {
      display: "flex",
      width: (size + 1) * 100 + "px",
      alignItems: "center",
      justifyContent: "center",
    });
    // n行目はボタンのぎょう
    if (i < size) {
      for (let j = 0; j < size + 1; j++) {
        const container = document.createElement("div");
        container.id = "container" + i + j;
        Object.assign(container.style, {
          height: "100px",
          width: "100px",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "#384A40",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        });
        // n列目にだけボタンを置く
        if (j < size) {
          const circle = document.createElement("div");
          circle.id = "circle" + i + j;
          Object.assign(circle.style, {
            width: "80px",
            height: "80px",
            borderRadius: "50%",
          });
          container.classList.add("circleContainer");
          container.appendChild(circle);
        } else {
          const turnButton = document.createElement("button");
          turnButton.id = "row" + i;
          turnButton.classList.add("turnButton");
          Object.assign(turnButton.style, {
            height: "50px",
            width: "50px",
            margin: "10px",
          });
          container.style.borderColor = "transparent";
          container.classList.add("buttonContainer");
          container.appendChild(turnButton);
        }
        rowContainer.appendChild(container);
      }
      document.body.appendChild(rowContainer);
    } else {
      for (let j = 0; j < size + 1; j++) {
        if (j < size) {
          const container = document.createElement("div");
          container.id = "container" + i + j;
          Object.assign(container.style, {
            height: "100px",
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          });
          const turnButton = document.createElement("button");
          turnButton.id = "column" + j;
          turnButton.classList.add("turnButton");
          Object.assign(turnButton.style, {
            height: "50px",
            width: "50px",
            margin: "10px",
          });
          container.classList.add("buttonContainer");
          container.appendChild(turnButton);
          rowContainer.appendChild(container);
        } else {
          const container = document.createElement("div");
          container.id = "container" + i + j;
          Object.assign(container.style, {
            height: "100px",
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          });
          rowContainer.appendChild(container);
        }
      }
      document.body.appendChild(rowContainer);
    }
  }

  // ランダマイズして色付ける
  for (let i = 0; i < 10; i++) {
    reverseRow(Math.floor(Math.random() * 10) % mode, size, mode);
    reverseColumn(Math.floor(Math.random() * 10) % mode, size, mode);
  }
  updateCircleColor(size, mode);

  // 関数をボタンに入れる
  for (let i = 0; i < size; i++) {
    document.getElementById("row" + i).onclick = () => {
      flashRow(i, size);
      reverseRow(i, size, mode);
      updateCircleColor(size, mode);
      judge();
    };
    document.getElementById("column" + i).onclick = () => {
      flashColumn(i, size);
      reverseColumn(i, size, mode);
      updateCircleColor(size, mode);
      judge();
    };
  }
}

function freezeBoard() {
  const buttonContainers = document.querySelectorAll(".buttonContainer");
  buttonContainers.forEach((ele) => {
    ele.style.visibility = "hidden";
  });
  const buttons = document.querySelectorAll("button.turnButton");
  buttons.forEach((ele) => {
    ele.style.visibility = "hidden";
  });
  const circleContainers = document.querySelectorAll(".circleContainer");
  circleContainers.forEach((ele) => {
    ele.style.backgroundColor = "orange";
  });
}

function updateCircleColor(size, mode) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      document.getElementById("circle" + i + j).style.background = colorize(
        boardStatus[i][j],
        mode,
      );
    }
  }
}

function reverseColumn(i, size, mode) {
  boardStatus.map((rowStatus) => (rowStatus[i] += 1));
}

function reverseRow(i, size, mode) {
  boardStatus[i] = boardStatus[i].map((cell) => cell + 1);
}

function flashColumn(column, size) {
  const arr = [];
  for (let j = 0; j < size; j++) {
    const c = document.getElementById("container" + j + column);
    arr.push(c);
  }
  arr.map((e) => {
    e.style.backgroundColor = "#DCDCDC";
    setTimeout(() => (e.style.backgroundColor = ""), 30);
    return 0;
  });
}

function flashRow(row, size) {
  const arr = [];
  for (let j = 0; j < size; j++) {
    const c = document.getElementById("container" + row + j);
    arr.push(c);
  }
  arr.map((e) => {
    e.style.backgroundColor = "#DCDCDC";
    setTimeout(() => (e.style.backgroundColor = ""), 30);
    return 0;
  });
}

function colorize(i, mode) {
  const palette = ["blue", "red", "green", "pink"];
  return palette[i % mode];
}

function judge(mode, stopTimer, stopOjama, stopMusic) {
  isGameEnded = boardStatus.flat().every((ele) => ele % mode === 0);
  if (isGameEnded) {
    clearInterval(stopTimer);
    clearInterval(stopOjama);
    stopMusic();
    const endModal = document.createElement("div");
    Object.assign(endModal.style, {
      position: "absolute",
      top: "30px",
      left: "30px",
      padding: "5px",
      backgroundColor: "gray",
      alignItems: "center",
      justifyContent: "center",
    });

    const message = document.createElement("div");
    message.innerText = "おめでとう！\n記録: " +
      document.getElementById("timer").innerText;
    endModal.appendChild(message);
    Object.assign(message.style, {
      fontSize: "40px",
      backgroundColor: "transparent",
    });

    const reloadButton = document.createElement("button");
    reloadButton.innerText = "もっかいやる";
    Object.assign(reloadButton.style, {
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
    });
    reloadButton.onclick = () => {
      location.reload();
    };
    setTimeout(() => freezeBoard(), 35);
    endModal.appendChild(reloadButton);
    document.body.appendChild(endModal);
  }
}

function startTimer() {
  let timer = document.createElement("div");
  Object.assign(timer.style, {
    height: "20px",
    width: "20px",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  });
  timer.id = "timer";
  document.body.appendChild(timer);

  const startTime = new Date().getTime(); // 現在時刻を取得
  const updateTimer = () => {
    const now = new Date().getTime();
    const diff = now - startTime;
    const calcMin = Math.floor(diff / 1000 / 60) % 60;
    const calcSec = Math.floor(diff / 1000) % 60;
    const calcMilliSec = diff % 1000;
    timer.innerText = `${calcMin}'${calcSec}"${calcMilliSec}`;
  };
  return setInterval(updateTimer, 10);
}

function startGame(size, mode, interval) {
  const stopTimer = startTimer();
  const stopOjama = startOjama(interval, size);
  const stopMusic = startMusic();
  const _judge = () => judge(mode, stopTimer, stopOjama, stopMusic);
  initializeBoard(size, mode, _judge);
}

function startMusic() {
  const backgroundMusic = document.createElement("audio");
  backgroundMusic.src = "/reverseGame/audio/picopicomarch.mp3";
  backgroundMusic.id = "backgroundMusic";
  backgroundMusic.autoplay = true;
  document.body.appendChild(backgroundMusic);
  document.getElementById("backgroundMusic").play();
  return () => document.getElementById("backgroundMusic").pause();
}

function initialize(startGame) {
  const startButton = document.createElement("button");
  Object.assign(startButton.style, {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
  });
  startButton.id = "startButton";
  startButton.innerText = "ゲームをはじめる";
  startButton.onclick = () => {
    document.getElementById("rule").remove();
    document.getElementById("startButton").remove();
    startGame();
  };
  document.body.appendChild(startButton);

  // なぜか画像読み込みに時間がかかるので最初に読み込んでおく
  const enemy = document.createElement("img");
  enemy.src = "/reverseGame/img/magical_dog.png";
  enemy.id = "enemy";
  Object.assign(enemy.style, {
    position: "absolute",
    top: "500px",
    left: "630px",
    height: "150px",
    width: "150px",
  });
  enemy.style.display = "none";
  document.body.appendChild(enemy);
}

function startOjama(interval, size) {
  const enemy = document.getElementById("enemy");
  enemy.style.display = "";

  let threshold = 0.6;
  const stopOjama = setInterval(() => {
    if (Math.random() > threshold) {
      enemy.style.transform = "rotate(-30deg)";
      setTimeout(() => (enemy.style.transform = ""), 100);
      document.getElementById("row" + Math.floor(Math.random() * size)).click();
      document.getElementById("row" + Math.floor(Math.random() * size)).click();
      document
        .getElementById("column" + Math.floor(Math.random() * size))
        .click();
      if (Math.random() > 0.6) {
        threshold += 0.03;
      }
    }
  }, interval);

  return stopOjama;
}

function main() {
  const SIZE = 5;
  const MODE = 4;
  const OJAMA_INTERVAL = 1000;
  initialize(() => startGame(SIZE, MODE, OJAMA_INTERVAL));
}

main();
