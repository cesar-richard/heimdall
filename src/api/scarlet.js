import openSocket from "socket.io-client";
import { getConfig } from "./gill/OFFLINE";
let socket = {};

export function initializeSocket({ system_id }) {
  socket = openSocket("http://localhost:3001");
  getConfig({ system_id }).then(config => {
    socket.emit("systemConfig", config.data);
  });
}

export function subscribeNfc({
  onCard = () => {},
  onOff = () => {},
  onError = () => {},
  onStart = () => {},
  onEnd = () => {}
}) {
  socket.on("card", card => onCard(card));
  socket.on("off", card => onOff(card));
  socket.on("error", err => onError(err));
  socket.on("start", reader => onStart(reader));
  socket.on("end", reader => onEnd(reader));
  socket.on("getGillConfig", () =>
    getConfig().then(config => {
      socket.emit("systemConfig", config.data);
    })
  );
}

export function setMode(mode) {
  return new Promise((res, rej) => {
    switch (mode) {
      case "erease":
        return res(socket.emit("ereaseWallet"));
        break;
      default:
        return rej(`Mode ${mode} not implemented.`);
        break;
    }
  });
}
