const path = require('path');

const isDev = true;
require('electron-is-dev');
const {app, BrowserWindow} = require('electron')
const {NFC} = require("nfc-pcsc");
const PORT = process.env.SOCKETPORT || 3001;
//const io = require("socket.io")(PORT);
const { Server } = require("socket.io");
const io = new Server( {});

const nfc = new NFC();
const nfcState = {
    reader: null,
    connected: false,
    mode: "reader"
};
const gillConfig = {};

nfc.on("reader", reader => {
    reader.aid = "F222222222";
    console.error(`${reader.reader.name}  device attached`);
    nfcState.connected = true;
    nfcState.reader = reader.reader;
    io.emit("start", reader.reader.name);

    reader.on("card", card => {
                io.emit("card", card);
                console.log(`${reader.reader.name}  card detected`);
    });
    
    reader.on("card.off", card => {
        io.emit("off", card);
        console.info(`${reader.reader.name}  card removed`, card);
    });

    reader.on("error", err => {
        io.emit("error", err.toString());
        console.error(
            `READER ${reader.reader.name} an error occurred`,
            err.toString()
        );
    });

    reader.on("end", () => {
        nfcState.connected = false;
        nfcState.reader = null;
        io.emit("end");
        console.info(`${reader.reader.name}  device removed`);
    });
});

nfc.on("nfcerror", err => {
    io.emit("error", err.toString());
    console.error("an error occurred", err.toString());
});

io.on("connection", client => {
    io.emit("getGillConfig");
    console.info("client connected");
    if (nfcState.connected) {
        io.emit("start", nfcState.reader.name);
    } else {
        io.emit("end");
    }
    client.on("subscribeToNFC", () => {
        console.info("client is subscribing to NFC events");
    });
    client.on("ereaseWallet", () => {
        console.debug("Erease mode");
        console.info("Erease mode");
        nfcState.mode = "erease";
    });
    client.on("systemConfig", config => {
        console.debug("Got gill system config");
        Object.assign(gillConfig, config);
    });
});

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({mode: 'detach'});
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if ('darwin' !== process.platform) {
        app.quit();
    }
});

app.on('activate', () => {
    if (0 === BrowserWindow.getAllWindows().length) {
        createWindow();
    }
});

io.listen(3001);