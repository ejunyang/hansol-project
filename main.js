const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreenable: false, // 전체화면 모드는 아니지만 창 크기 조절 가능
    frame: true,
    webPreferences: {
      // Preload 스크립트를 사용하여 Node.js와 웹 페이지 간의 통신을 설정
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000" // 개발 중 Next.js 앱의 URL
      : `file://${path.join(__dirname, "out/index.html")}`; // 빌드된 파일 경로

  mainWindow.loadURL(url);

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.setZoomFactor(0.9);
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  app.quit();
});
