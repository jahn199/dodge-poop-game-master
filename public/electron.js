/*
개발 서버용 electron 버전
electron.js를 사용하기 위해서는
npm run electron을 실행하기 전에

npm run build 작업을 진행하고
npm run electron을 실행하기
*/
const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startUrl = isDev
      ? "http://localhost:3000"
      :` file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startUrl);

  mainWindow.on("closed", () => (mainWindow = null));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//
/*
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;
//게임을 만들고 시작할 때 가로 세로 크기 지정
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { // 웹 설정에서
      nodeIntegration: true, //node.js를 이용해서 필요 추가 설정할 수 있게 허용
    },
  });

  // 앱에서 실행할 때 메인으로 사용할 html 설정
  //index.html이 아니라 app.html을 메인으로 설정하길 원한다면 ↓ app.html로 변경
  mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
*/

